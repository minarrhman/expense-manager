from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import isAuthenticated
from django.db.models import Q

from .models import Category, Transaction
from .serializers import CategorySerializer, TransactionSerializer

# Create your views here.

class CategoryListCreateView(generics.ListCreateView):
    serialzerclass = CategorySerializer
    permission_classes = [isAuthenticated]

    def get_queryset(self):
        user = self.request.user

        return Category.objects.filter(
            Q(user=user) | Q(user__isnull=True)
        )
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TransactionListCreateView(generics.ListCreateView):
    serializer = TransactionSerializer
    permission_classes = [isAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(
            user=self.request.user
        ).order_by('-date')
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        