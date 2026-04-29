from django.shortcuts import render
from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q, Sum
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category, Transaction
from .serializers import CategorySerializer, TransactionSerializer, RegisterSerializer

# Create your views here.

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response({"message":"User is created successfully"}, status=201)
        return Response(serializer.errors, status=400)
    

class CategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        return Category.objects.filter(
            Q(user=user) | Q(user__isnull=True)
        )
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TransactionListCreateView(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(
            user=self.request.user
        ).order_by('-date')
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # getting the user from the jwt token
        user = request.user

        #getting all user transaction
        transaction = Transaction.objects.filter(user=user)

        #total income 
        total_income = transaction.filter(type='income').aggregate(total=Sum('amount'))['total'] or 0

        # total expense 
        total_expense = transaction.filter(type='expense').aaggregate(total=Sum('amount'))['total'] or 0

        # balance 
        balance = total_income - total_expense

        category_expense = (
            transaction
            .filter(type='expense')
            .values('category__name')
            .annotate(total=Sum('amount'))
        )

        recent_transactions = transaction.order_by('-date')[:5]

        #serializing the recent data in JSON

        from .serializers import TransactionSerializer
        
        recent_data = TransactionSerializer(recent_transactions, many=True).data

        return Response({
            'total_income':total_income,
            'total_expense':total_expense,
            'balance':balance,
            'category_expense': list(category_expense),
            'recent_transactions':recent_data
        })