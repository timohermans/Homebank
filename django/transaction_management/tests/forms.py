# given a transaction file
# when being uploaded in the admin panel
# then it will be checked for correct file
# then it will be parsed to transaction rows
#   and checked for errornous rows
#   and checked for duplicate rows
# then correct rows will be stored in the database

import os
from django.test import TestCase
from transaction_management.forms import CsvImportForm
from transaction_management.models import Transaction
from transaction_management.tests.utils import open_file


class CsvImportFileTestCase(TestCase):
    def test_process_single_transaction_file(self):
        file = open_file('./data/single_dummy.csv')
        csv_form = CsvImportForm({'name': 'rabobank'}, {'csv_file': file})

        result = csv_form.execute(file)
        transactions = Transaction.objects.all()

        self.assertEqual(result.amount_successful, 1)
        self.assertEqual(1, len(transactions))

    def test_process_multiple_transactions_file(self):
        file = open_file('./data/bad-dummy.csv')
        csv_form = CsvImportForm({'name': 'rabobank'}, {'csv_file': file})

        result = csv_form.execute(file)
        transactions = Transaction.objects.all()

        self.assertEqual(result.amount_duplicate, 1)
        self.assertEqual(result.amount_faulty, 2)
        self.assertEqual(result.amount_successful, 1)
        self.assertEqual(len(transactions), 1)
