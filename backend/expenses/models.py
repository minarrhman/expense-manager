from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField(null=True,blank=True)
    profile_photo = models.ImageField(upload_to='profiles/', null = True, blank=True)
    monthly_budget = models.DecimalField(max_digits=10, decimal_places=2,null=True, blank=True)

    def __str__(self):
        return f"{  self.user.name}'s profile"


class Category(models.Model):
    TYPE_CHOICES =(
        ('income','Income'),
        ('expense','Expense'),
    )

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=15, choices=TYPE_CHOICES)
    #allowing user to create categories as per their preference
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        #shows category name
        return self.name

class CategoryLimit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category= models.ForeignKey(Category, on_delete=models.CASCADE)
    limit = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.user} - {self.category} limit"


class Transaction(models.Model):
    TYPE_CHOICES = (
        ('income','Income'),
        ('expense','Expense'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=15, choices=TYPE_CHOICES)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    date = models.DateField()
    description = models.CharField(max_length=100, blank=True, null=True) 
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self,*args,**kwargs):
        #checks the transaction type matches the selected category or not 
        if self.category.type != self.type:
            raise ValueError("Transaction type and category must match")
        super().save(*args,**kwargs)

    def __str__(self):
        return f"{self.user} - {self.amount} - {self.type}" 
    