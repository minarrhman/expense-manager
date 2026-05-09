from django.shortcuts import render
from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q, Sum
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category, Transaction, CategoryLimit, Profile
from .serializers import CategorySerializer, TransactionSerializer, RegisterSerializer, ProfileSerializer, CategoryLimitSerializer
from .utils.date_range import get_date_range
from .pagination import TransactionPagination

# Create your views here.

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response({"message":"User is created successfully"}, status=201)
        return Response(serializer.errors, status=400)


class ProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile
    

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
class CategoryLimitView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CategoryLimitSerializer

    def get_queryset(self):
        return CategoryLimit.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user= self.request.user)

class CategoryLimitDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CategoryLimitSerializer

    def get_queryset(self):
        return CategoryLimit.objects.filter(user=self.request.user)

class TransactionListCreateView(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = TransactionPagination
    def get_queryset(self):
        start, end = get_date_range(self.request)

        queryset = Transaction.objects.filter(
            user=self.request.user,
            date__range=[start, end]
        ).order_by('-date', '-id')

        search = self.request.query_params.get("search")
        transaction_type = self.request.query_params.get("type")

        if search:
            queryset = queryset.filter(
                Q(description__icontains=search) |
                Q(category__name__icontains=search)
            )

        if transaction_type and transaction_type != 'all':
            queryset = queryset.filter(type=transaction_type)

        return queryset
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        # getting the user from the jwt token
        user = request.user

        start, end = get_date_range(request)
        #getting all user transaction
        transaction = Transaction.objects.filter(user=user, date__range=[start,end])

        #total income 
        total_income = transaction.filter(type='income').aggregate(total=Sum('amount'))['total'] or 0

        # total expense 
        total_expense = transaction.filter(type='expense').aggregate(total=Sum('amount'))['total'] or 0

        # balance 
        balance = total_income - total_expense



        category_expense = (
            transaction
            .filter(type='expense')
            .values('category__name')
            .annotate(total=Sum('amount'))
        )


        #getting last five transaction
        recent_transactions = transaction.order_by('-date','-id')[:5]

        #serializing the recent data in JSON

        from .serializers import TransactionSerializer
        
        recent_data = TransactionSerializer(recent_transactions, many=True).data


        #setting monthly budget feature and warnings 

        profile = user.profile
        monthly_budget = profile.monthly_budget or 0

        remaining_budget = monthly_budget - total_expense

        limits = CategoryLimit.objects.filter(user=user)
        category_warnings = []

        for limit in limits:
            spent = transaction.filter(
                type='expense',
                category=limit.category
            ).aggregate(total=Sum('amount'))['total'] or 0

            if spent>limit.limit:
                category_warnings.append({
                    'category':limit.category.name,
                    'limit':limit.limit,
                    'spent':spent,
                    'exceeded_by': spent - limit.limit
                })


        return Response({
            'start_date':start,
            'end_date':end,
            'total_income':total_income,
            'total_expense':total_expense,
            'balance':balance,
            'category_expense': list(category_expense),
            'recent_transactions':recent_data,
            'category_warnings':category_warnings,
        })