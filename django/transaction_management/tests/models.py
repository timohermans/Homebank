from datetime import date
from django.test import TestCase

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

from transaction_management.models import Transaction, Category
from transaction_management.tests.utils import create_transaction


class TransactionTestCase(TestCase):
    def create_transaction(self):
        user = User.objects.create_user('transaction test user')
        return Transaction(
            date=date(2020, 4, 20),
            to_account_number='NL11RABO0101010444',
            payee='timo',
            memo='small memo',
            inflow=10.5,
            user=user
        )

    def test_can_save(self):
        transaction = self.create_transaction()
        transaction.full_clean()

    def test_must_have_either_in_or_outflow(self):
        transaction = self.create_transaction()

        transaction.inflow = None
        self.assertRaises(ValidationError, transaction.clean)
        transaction.outflow = 10
        transaction.clean()
        transaction.inflow = 10
        self.assertRaises(ValidationError, transaction.clean)
        transaction.outflow = None
        transaction.clean()

    def test_in_and_outflow_are_decimals(self):
        transaction = self.create_transaction()

        transaction.inflow = 'tien'
        self.assertRaises(ValidationError, transaction.full_clean)

        transaction.inflow = 10
        transaction.outflow = 'tien'
        self.assertRaises(ValidationError, transaction.full_clean)

    def test_does_not_assign_category_to_nonsimilar_memo(self):
        user = User.objects.create_user('timo')
        category = Category.objects.create(name='Boodschappen')
        create_transaction(user=user, payee="Kruidvat 7898 SITTARD", memo="Betaalautomaat 16:20 pasnr.029", category=category)

        transaction_2 = create_transaction(payee="Kerres Sittard Sittard", memo="Betaalautomaat 16:47 pasnr. 008", user=user)

        self.assertIsNone(transaction_2.category)

    def test_assign_category_to_similar_memo(self):
        user = User.objects.create_user('timo')
        category = Category.objects.create(name='Vrije tijd')
        create_transaction(user=user, payee="Lidl 176 Sittard Ind SITTARD", memo="Betaalautomaat 18:10 pasnr. 029", category=category)

        transaction_2 = create_transaction(payee="Lidl 176 Sittard Ind SITTARD", memo="Betaalautomaat 14:14 pasnr. 008", user=user)

        self.assertEqual(transaction_2.category, category)

    def test_does_not_assign_when_category_supplied(self):
        user = User.objects.create_user('timo')
        category = Category.objects.create(name='Vrije tijd')
        category_2 = Category.objects.create(name='Verplicht')
        create_transaction(user=user, memo="spotify 1", category=category)

        transaction_2 = create_transaction(memo="spotify 2", user=user, category=category_2)

        self.assertEqual(transaction_2.category, category_2)

    def test_assigns_category_to_other_transactions(self):
        """
        When assigning a category to a transaction, try to give the category to other transactions
        that look similar
        """
        user = User.objects.create_user('timo')
        category = Category.objects.create(name='Vrije tijd')
        transaction_good = create_transaction(payee="Lidl 176 Sittard Ind SITTARD", memo="Betaalautomaat 14:14 pasnr. 008", user=user)
        transaction_good_2 = create_transaction(payee="Lidl 176 Sittard Ind SITTARD", memo="Betaalautomaat 18:10 pasnr. 029", user=user)
        transaction_bad = create_transaction(payee="Jan Linders Sittard SITTARD", memo="Betaalautomaat 14:20 pasnr. 008", user=user)

        transaction_base =  create_transaction(payee="Lidl 176 Sittard Ind SITTARD", memo="Betaalautomaat 10:10 pasnr. 100", user=user)
        transaction_base.save()
        transaction_base.category = category
        transaction_base.save()

        self.assertEqual(Transaction.objects.get(pk=transaction_good.id).category, category)
        self.assertEqual(Transaction.objects.get(pk=transaction_good_2.id).category, category)
        self.assertIsNone(Transaction.objects.get(pk=transaction_bad.id).category)

