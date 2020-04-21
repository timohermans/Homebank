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


class CsvImportFileTestCase(TestCase):
    def setUp(self):
        self.data_dir = os.path.dirname(__file__)

    def open_file(self, file_path):
        return open(os.path.join(self.data_dir, file_path))

    def test_process_single_transaction_file(self):
        file = self.open_file('./data/single_dummy.csv')
        csv_form = CsvImportForm({'name': 'rabobank'}, {'csv_file': file})

        result = csv_form.execute(file)
        transactions = Transaction.objects.all()

        self.assertEqual(result.amount_successful, 1)
        self.assertEqual(1, len(transactions))

    def test_process_multiple_transactions_file(self):
        file = self.open_file('./data/bad-dummy.csv')
        csv_form = CsvImportForm({'name': 'rabobank'}, {'csv_file': file})

        result = csv_form.execute(file)
        transactions = Transaction.objects.all()

        self.assertEqual(result.amount_duplicate, 1)
        self.assertEqual(result.amount_faulty, 2)
        self.assertEqual(result.amount_successful, 1)
        self.assertEqual(len(transactions), 1)
