from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from expenses.models import Category, Transaction, CategoryLimit, Profile
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = "Seed database with sample data"

    def handle(self, *args, **kwargs):

        from django.contrib.auth.models import User
        from expenses.models import Category, Transaction, CategoryLimit, Profile
        from datetime import datetime, timedelta
        import random

        self.stdout.write("⚠️ Clearing old data...")

        # 🔥 DELETE OLD DATA (order matters)
        Transaction.objects.all().delete()
        CategoryLimit.objects.all().delete()
        Category.objects.all().delete()
        User.objects.exclude(is_superuser=True).delete()

        self.stdout.write("✅ Old data cleared")

        # 👤 Create user
        user = User.objects.create_user(
            username="depta",
            password="123456",
            first_name="Depta",
            last_name="Chowdhury",
            email="depta@example.com"
        )

        # Ensure profile
        Profile.objects.get_or_create(user=user)
        user.profile.monthly_budget = 20000
        user.profile.save()

        # 📊 Create categories
        categories_data = [
            ("Food", "expense"),
            ("Transport", "expense"),
            ("Entertainment", "expense"),
            ("Shopping", "expense"),
            ("Bills", "expense"),
            ("Others",'expense'),
            ("Salary", "income"),
            ("Freelance", "income"),
        ]

        categories = {}

        for name, ctype in categories_data:
            cat = Category.objects.create(
                name=name,
                type=ctype,
                user=None
            )
            categories[name] = cat

        # 🎯 Category limits
        CategoryLimit.objects.create(user=user, category=categories["Food"], limit=10000)
        CategoryLimit.objects.create(user=user, category=categories["Transport"], limit=4000)
        CategoryLimit.objects.create(user=user, category=categories["Entertainment"], limit=3500)

        # 📅 Generate 6 months data
        start_date = datetime.now() - timedelta(days=180)

        self.stdout.write("📊 Generating transactions...")

        for i in range(180):
            date = start_date + timedelta(days=i)

            # 💰 Salary on 1st
            if date.day == 1:
                Transaction.objects.create(
                    user=user,
                    amount=random.randint(20000, 25000),
                    type="income",
                    category=categories["Salary"],
                    date=date,
                    description="Monthly Salary"
                )

            # 💻 Freelance mid-month
            if date.day == 15:
                Transaction.objects.create(
                    user=user,
                    amount=random.randint(5000, 20000),
                    type="income",
                    category=categories["Freelance"],
                    date=date,
                    description="Freelance Work"
                )

            # 💸 Daily expenses
            for _ in range(random.randint(0, 2)):
                Transaction.objects.create(
                    user=user,
                    amount=random.randint(100, 1200),
                    type="expense",
                    category=random.choice([
                        categories["Food"],
                        categories["Transport"],
                        categories["Entertainment"],
                        categories["Shopping"],
                        categories["Bills"],
                    ]),
                    date=date,
                    description="Daily Expense"
                )

        self.stdout.write(self.style.SUCCESS("✅ Fresh realistic data generated!"))
