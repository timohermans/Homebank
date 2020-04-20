from datetime import date
from unittest import TestCase
from django.core.exceptions import ValidationError

from transaction_management.models import Transaction


class TransactionTestCase(TestCase):
    def setUp(self) -> None:
        self.transaction = Transaction(
            date=date(2020, 4, 20),
            to_account_number='NL11RABO0101010444',
            payee='timo',
            memo='small memo',
            inflow=10.5
        )

    def test_can_save(self):
        transaction = self.transaction
        transaction.full_clean()

    def test_must_have_either_in_or_outflow(self):
        transaction = self.transaction

        transaction.inflow = None
        self.assertRaises(ValidationError, transaction.clean)
        transaction.outflow = 10
        transaction.clean()
        transaction.inflow = 10
        self.assertRaises(ValidationError, transaction.clean)
        transaction.outflow = None
        transaction.clean()

    def test_in_and_outflow_are_decimals(self):
        transaction = self.transaction

        transaction.inflow = 'tien'
        self.assertRaises(ValidationError, transaction.full_clean)

        transaction.inflow = 10
        transaction.outflow = 'tien'
        self.assertRaises(ValidationError, transaction.full_clean)
