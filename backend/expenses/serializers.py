from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Transaction, Profile, CategoryLimit


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
    category_name = serializers.CharField(source='category.name')
    class Meta:
        fields = [
            'id',
            'category',
            'category_name',
            'limit'
        ]

class TransactionSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Transaction
        fields = ['id', 'amount',  'type', 'category', 'category_name' ,'date', 'description']

    def validate(self, data):
        category = data.get('category')
        type_ = data.get('type')

        if category != type_:
            raise serializers.ValidationError(
                "Transaction type and category do not match"
            )
        return data