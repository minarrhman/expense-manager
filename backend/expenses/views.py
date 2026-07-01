from django.shortcuts import render
from django.utils import timezone
from datetime import date, timedelta
from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView
from django.utils.timezone import now
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q, Sum,F
from django.db.models.functions import TruncMonth
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category, Transaction, CategoryLimit, Profile, SavingsModel
from .serializers import (CategorySerializer, TransactionSerializer,
                           RegisterSerializer,SavingsGoalSerializer,
                           ProfileSerializer, CategoryLimitSerializer)
from .utils.date_range import get_date_range
from .pagination import TransactionPagination

from django.http import JsonResponse
from .management.commands import seed_categories, seed_data



# Create your views here.
def run_seed_categories(request):
    try:
        seed_categories()
        return JsonResponse({"message": "Categories seeded"})
    except Exception as e:
        return JsonResponse({"error": str(e)})
    
def run_seed_data(request):
    try:
        seed_data()
        return JsonResponse({"message": "Data seeded"})
    except Exception as e:
        return JsonResponse({"error": str(e)})


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response({"message":"User is created successfully"}, status=201)
        return Response(serializer.errors, status=400)


class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile
    

class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None   # <- Disable pagination

    def get_queryset(self):
        return Category.objects.all().order_by("type", "name")

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

class SavingsGoalView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SavingsGoalSerializer

    def get_queryset(self):
        return SavingsModel.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SavingsGoalDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SavingsGoalSerializer

    def get_queryset(self):
        return SavingsModel.objects.filter(user=self.request.user)

class ReportSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        transactions = Transaction.objects.filter(
            user=user,
        )

        income = transactions.filter(
            type="income"
        ).aggregate(total=Sum("amount"))["total"] or 0

        expense = transactions.filter(
            type="expense"
        ).aggregate(total=Sum("amount"))["total"] or 0

        balance = income - expense

        return Response({
            "income": float(income),
            "expense": float(expense),
            "balance": float(balance)
        })

class CategoryBreakdownView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        start, end = get_date_range(request)

        expenses = (
            Transaction.objects.filter(
                user=request.user,
                date__range=[start, end],
                type="expense"
            )
            .values(
                "category__id",
                category_name=F("category__name")
            )
            .annotate(total=Sum("amount"))
            .order_by("-total")
        )

        data = []

        for expense in expenses:
            data.append({
                "category_id": expense["category__id"],
                "category_name": expense["category_name"],
                "total": float(expense["total"])
            })

        return Response(data)


class MonthlyTrendView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        monthly_data = (
            Transaction.objects.filter(
                user=request.user,
            )
            .annotate(month=TruncMonth("date"))
            .values("month", "type")
            .annotate(total=Sum("amount"))
            .order_by("month")
        )

        formatted = {}

        for item in monthly_data:
            month_key = item["month"].strftime("%Y-%m")
            label = item["month"].strftime("%b")

            if month_key not in formatted:
                formatted[month_key] = {
                    "month": month_key,
                    "label": label,
                    "income": 0,
                    "expense": 0,
                }

            formatted[month_key][item["type"]] = float(item["total"])

        return Response(list(formatted.values()))

class TransactionListCreateView(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = TransactionPagination

    def get_queryset(self):
        today = timezone.localdate()

        range_filter = self.request.query_params.get(
            "range",
            "this_month",
        )

        start = None
        end = None

        # ---------- Date Filters ----------

        if range_filter == "this_month":
            start = today.replace(day=1)
            end = today

        elif range_filter == "last_month":
            first_day_this_month = today.replace(day=1)
            end = first_day_this_month - timedelta(days=1)
            start = end.replace(day=1)

        elif range_filter == "3m":
            start = today - timedelta(days=90)
            end = today

        elif range_filter == "6m":
            start = today - timedelta(days=180)
            end = today

        elif range_filter == "year":
            start = today.replace(month=1, day=1)
            end = today

        elif range_filter == "custom":
            start = self.request.query_params.get("start")
            end = self.request.query_params.get("end")

        queryset = Transaction.objects.filter(
            user=self.request.user
        )

        if start and end:
            queryset = queryset.filter(
                date__range=[start, end]
            )

        # ---------- Search ----------

        search = self.request.query_params.get("search")

        if search:
            queryset = queryset.filter(
                Q(description__icontains=search)
                | Q(category__name__icontains=search)
            )

        # ---------- Type Filter ----------

        transaction_type = self.request.query_params.get("type")

        if transaction_type and transaction_type != "all":
            queryset = queryset.filter(type=transaction_type)

        return queryset.order_by("-date", "-id")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)
class DashboardView(APIView):
    permission_classes = [IsAuthenticated]
    def generate_ai_insight(self, income, expense, warnings):

        savings_rate = ((income - expense) / income * 100) if income else 0

        if expense > income:
            return {
                "type": "danger",
                "title": "Overspending Alert",
                "message": "You are spending more than you earn this month."
            }

        if savings_rate < 20:
            return {
                "type": "warning",
                "title": "Low Savings Rate",
                "message": f"You are saving only {int(savings_rate)}% of your income."
            }

        if len(warnings) > 0:
            return {
                "type": "warning",
                "title": "Budget Attention Needed",
                "message": "Some categories are close to or over limit."
            }

        return {
            "type": "success",
            "title": "Great Job!",
            "message": "Your spending habits look healthy this month."
        }
    def get(self, request):

        # getting the user from the jwt token
        user = request.user

        income = (Transaction.objects.filter(user=user)).filter(type='income').aggregate(total=Sum('amount'))['total'] or 0
        expense = (Transaction.objects.filter(user=user)).filter(type='expense').aggregate(total=Sum('amount'))['total'] or 0
        balance = income - expense



        start, end = get_date_range(request)
        #getting all user transaction
        transaction = Transaction.objects.filter(user=user, date__range=[start,end])

        #total income 
        current_month_income = transaction.filter(type='income').aggregate(total=Sum('amount'))['total'] or 0

        # total expense 
        current_month_expemse = transaction.filter(type='expense').aggregate(total=Sum('amount'))['total'] or 0




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
        
        ai_insight = self.generate_ai_insight(current_month_income, current_month_expemse, category_warnings)
        
        return Response({
            'name':user.first_name,
            'start_date':start,
            'end_date':end,
            "ai_insight":ai_insight,
            'total_income':current_month_income,
            'total_expense':current_month_expemse,
            'balance':balance,
            'category_expense': list(category_expense),
            'recent_transactions':recent_data,
            'category_warnings':category_warnings,
        })