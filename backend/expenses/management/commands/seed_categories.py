from django.core.management.base import BaseCommand

from expenses.models import Category


class Command(BaseCommand):
    help = "Seed default income and expense categories"

    DEFAULT_CATEGORIES = [
        # Expense Categories
        ("Food", "expense"),
        ("Transport", "expense"),
        ("Shopping", "expense"),
        ("Rent", "expense"),
        ("Bills", "expense"),
        ("Entertainment", "expense"),
        ("Healthcare", "expense"),
        ("Education", "expense"),
        ("Travel", "expense"),
        ("Subscriptions", "expense"),
        ("Insurance", "expense"),
        ("Investment", "expense"),
        ("Gifts", "expense"),
        ("Other Expense", "expense"),

        # Income Categories
        ("Salary", "income"),
        ("Freelance", "income"),
        ("Business", "income"),
        ("Investment Return", "income"),
        ("Bonus", "income"),
        ("Gift", "income"),
        ("Refund", "income"),
        ("Other Income", "income"),
    ]

    def handle(self, *args, **kwargs):
        created = 0

        for name, category_type in self.DEFAULT_CATEGORIES:
            _, was_created = Category.objects.get_or_create(
                name=name,
                defaults={
                    "type": category_type,
                },
            )

            if was_created:
                created += 1
                self.stdout.write(
                    self.style.SUCCESS(f"Created: {name}")
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"\nFinished! {created} categories created."
            )
        )