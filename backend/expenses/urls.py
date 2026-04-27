from django.urls import path
from .views import CategoryListCreateView, TransactionListCreateView, RegisterView

#defining urls

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('categories/', CategoryListCreateView.as_view()),
    path('transactions', TransactionListCreateView.as_view()),
]
