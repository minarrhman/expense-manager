from rest_framework import serializers
from .models import Category, Transaction

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'type']

class TransactionSerializer(serializers.ModelSerializer):
    category_name = serializers.Charfield(source='category.name', read_only=True)
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