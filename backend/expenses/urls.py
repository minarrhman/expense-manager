from django.urls import path
from .views import CategoryListCreateView, TransactionListCreateView

#defining urls

urlpatterns = [
    path('categories/', CategoryListCreateView.as_view()),
    path('transactions', TransactionListCreateView.as_view()),
]
