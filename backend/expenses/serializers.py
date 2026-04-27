from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Transaction, Profile


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
    



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'type']

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