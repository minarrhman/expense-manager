from django.urls import path
from .views import (CategoryListCreateView, TransactionListCreateView, RegisterView,
    CategoryLimitDetailView,CategoryLimitView,
    DashboardView,ProfileView, ReportSummaryView,
    CategoryBreakdownView, MonthlyTrendView,TransactionDetailView,
    SavingsGoalDetailView,SavingsGoalView)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

#defining urls

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/' , TokenObtainPairView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('categories/', CategoryListCreateView.as_view()),
    path('category-limits/',CategoryLimitView.as_view()),
    path('category-limits/<int:pk>/', CategoryLimitDetailView.as_view()),
    path('savings-goal/',SavingsGoalView.as_view()),
    path('savings-goal/<int:pk>/',SavingsGoalDetailView.as_view()),
    path('transactions/', TransactionListCreateView.as_view()),
    path('transactions/<int:pk>/', TransactionDetailView.as_view()),
    path('dashboard/', DashboardView.as_view()),
    path('reports/summary/', ReportSummaryView.as_view()), 
    path('reports/category-breakdown/', CategoryBreakdownView.as_view()),
    path('reports/monthly-trend/',MonthlyTrendView.as_view())
]
