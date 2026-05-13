from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Transaction, Profile, CategoryLimit, SavingsModel
from django.db.models import Sum 
from django.utils.timezone import now
from decimal import Decimal


class RegisterSerializer(serializers.ModelSerializer):
    date_of_birth = serializers.DateField(required=False)
    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'password',
            'date_of_birth'
        ]
        extra_kwargs = {
            'password':{'write_only':True}
        }
    def create(self, validated_data):
        date_of_birth = validated_data.pop('date_of_birth',None)

        user = User.objects.create_user(
            username=validated_data['username'],
            first_name = validated_data.get('first_name',''),
            last_name = validated_data.get('last_name',''),
            email=validated_data.get('email',''),
            password=validated_data['password']
        )

        if date_of_birth:
            user.profile.date_of_birth = date_of_birth
            user.profile.save()

        return user

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    class Meta:
        model = Profile
        fields=[
            'username',
            'email',
            'first_name',
            'last_name',
            'date_of_birth',
            'monthly_budget',
            'profile_photo'
        ]
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user',{})

        user = instance.user
        user.first_name = user.data.get('first_name', user.first_name)
        user.last_name = user.data.get('last_name',user.last_name)
        user.email = user.data.get('email', user.email)
        user.save()

        instance.date_of_birth = validated_data.get('date_of_birth', instance.date_of_birth)
        instance.monthly_budget = validated_data.get('monthly_budget', instance.monthly_budget)
        instance.profile_photo = validated_data.get('profile_photo', instance.profile_photo)
        instance.save()

        return instance

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'type']

class CategoryLimitSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    spent = serializers.SerializerMethodField()
    remaining = serializers.SerializerMethodField()
    percentage_used = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()    
    class Meta:
        model = CategoryLimit
        fields = [
            'id',
            'category',
            'category_name',
            'limit',
            'spent',
            'remaining',
            'percentage_used',
            'status'
        ]
    
    def validate_category(self, value):
        if value.type != "expense":
            raise serializers.ValidationError(
                "Only expense categories have limits"
            )
        return value
    def validate(self, data):
        user = self.context['request'].user
        category = data.get('category')

        queryset = CategoryLimit.objects.filter(
            user = user,
            category=category
        )

        if self.instance:
            queryset = queryset.exclude(id=self.instance.id)
        if queryset.exists():
            raise serializers.ValidationError({
                'category':'This category already has a limit set'
            })
        
        return data
    def get_current_month_expense(self, obj):
        today = now()

        total = Transaction.objects.filter(
            user = obj.user,
            category=obj.category,
            type = 'expense',
            date__year = today.year,
            date__month = today.month
        ).aggregate(total=Sum('amount'))['total']
        return total or Decimal('0.00')
    
    def get_spent(self,obj):
        return self.get_current_month_expense(obj)
    
    def get_remaining(self,obj):
        spent = self.get_current_month_expense(obj)

        if obj.limit is None:
            return Decimal('0.00')
        remaining = obj.limit - spent
        return remaining
    def get_percentage_used(self,obj):
        spent = self.get_current_month_expense(obj)
        if not obj.limit or obj.limit == 0:
            return 0
        percentage = (spent/obj.limit)*100

        return round(percentage, 2)
    def get_status(self, obj):
        percentage = self.get_percentage_used(obj)

        if percentage>=100:
            return "exceeded"
        elif percentage >80:
            return "warning"
        return "safe"
    
class SavingsGoalSerializer(serializers.ModelSerializer):
    progress_percentage = serializers.ReadOnlyField()
    current_amount = serializers.ReadOnlyField()
    remaining_amount = serializers.ReadOnlyField()

    class Meta:
        model = SavingsModel
        fields = [
            'id',
            'title',
            'target_amount',
            'current_amount',
            'start_date',
            'target_date',
            'progress_percentage',
            'remaining_amount',
        ]

    def get_remaining_amount(self, obj):
        return obj.target_amount - obj.current_amount

class TransactionSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Transaction
        fields = ['id', 'amount',  'type', 'category', 'category_name' ,'date', 'description']

    def validate(self, data):
        category = data.get('category')
        type_ = data.get('type')

        if category.type != type_:
            raise serializers.ValidationError(
                "Transaction type and category do not match"
            )
        return data