from django.urls import path
from .views import CategoryListCreateView, TransactionListCreateView, RegisterView, DashboardView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

#defining urls

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/' , TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('categories/', CategoryListCreateView.as_view()),
    path('transactions/', TransactionListCreateView.as_view()),
    path('dashboard/', DashboardView.as_view()),
]
