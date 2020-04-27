from django.test import TestCase

from transaction_management.models import Category
from transaction_management.migrations.utils import seed_categories


class MigrationApp:
    def get_model(self, app, model_name):
        return Category

class MigrationsTestCases(TestCase):
    def setUp(self) -> None:
        categories = Category.objects.all()
        for category in categories:
            category.delete()


    def test_category_seed(self):
        apps = MigrationApp()
        seed_categories(apps, None)

        category = Category.objects.get(name='Hypotheek')
        self.assertIsNotNone(category)
        self.assertEqual(category.description, 'Vaste lasten voor je huis')


