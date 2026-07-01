from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from expenses.models import Category, Transaction, CategoryLimit, Profile
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = "Seed database with sample data"

    def handle(self, *args, **kwargs):

        self.stdout.write("⚠️ Clearing old data...")

        Transaction.objects.all().delete()
        CategoryLimit.objects.all().delete()
        User.objects.exclude(is_superuser=True).delete()

        self.stdout.write(self.style.SUCCESS("✅ Old data cleared"))

        # Create demo user
        user = User.objects.create_user(
            username="depta",
            password="123456",
            first_name="Depta",
            last_name="Chowdhury",
            email="depta@example.com",
        )

        Profile.objects.get_or_create(user=user)

        # -----------------------------
        # Load predefined categories
        # -----------------------------
        categories = {
            category.name: category
            for category in Category.objects.all()
        }

        required_categories = [
            "Salary",
            "Freelance",
            "Food",
            "Transport",
            "Entertainment",
            "Shopping",
            "Bills",
        ]

        missing = [
            name for name in required_categories
            if name not in categories
        ]

        if missing:
            self.stdout.write(
                self.style.ERROR(
                    f"Missing categories: {', '.join(missing)}"
                )
            )
            self.stdout.write(
                self.style.WARNING(
                    "Run: python manage.py seed_categories"
                )
            )
            return

        # -----------------------------
        # Budget Limits
        # -----------------------------
        CategoryLimit.objects.create(
            user=user,
            category=categories["Food"],
            limit=10000,
        )

        CategoryLimit.objects.create(
            user=user,
            category=categories["Transport"],
            limit=4000,
        )

        CategoryLimit.objects.create(
            user=user,
            category=categories["Entertainment"],
            limit=3500,
        )

        # -----------------------------
        # Generate 6 months of data
        # -----------------------------
        start_date = datetime.now() - timedelta(days=180)

        self.stdout.write("📊 Generating transactions...")

        for i in range(180):

            date = start_date + timedelta(days=i)

            # Monthly Salary
            if date.day == 1:
                Transaction.objects.create(
                    user=user,
                    amount=random.randint(25000, 35000),
                    type="income",
                    category=categories["Salary"],
                    date=date,
                    description="Monthly Salary",
                )

            # Freelancing
            if date.day == 15:
                Transaction.objects.create(
                    user=user,
                    amount=random.randint(5000, 15000),
                    type="income",
                    category=categories["Freelance"],
                    date=date,
                    description="Freelance Work",
                )

            # Daily expenses
            for _ in range(random.randint(0, 2)):
                Transaction.objects.create(
                    user=user,
                    amount=random.randint(100, 1200),
                    type="expense",
                    category=random.choice(
                        [
                            categories["Food"],
                            categories["Transport"],
                            categories["Entertainment"],
                            categories["Shopping"],
                            categories["Bills"],
                        ]
                    ),
                    date=date,
                    description="Daily Expense",
                )

        self.stdout.write(
            self.style.SUCCESS(
                "✅ Fresh realistic data generated!"
            )
        )