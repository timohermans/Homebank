import csv
from decimal import InvalidOperation

from django import forms
from django.core.exceptions import ValidationError

from transaction_management.services.rabobank_csv_row_parser import RabobankCsvRowParser


class FilePersistResult:
    def __init__(self, amount_successful, amount_duplicate, amount_faulty):
        self.amount_successful = amount_successful
        self.amount_duplicate = amount_duplicate
        self.amount_faulty = amount_faulty


class CsvImportForm(forms.Form):
    name = forms.CharField(max_length=5)
    csv_file = forms.FileField()
    parser = RabobankCsvRowParser()
    amount_success = 0
    amount_duplicate = 0
    amount_faulty = 0

    # overwrite a field: clean_<name>
    def clean_name(self):
        pass

    def execute(self, uploaded_file) -> FilePersistResult:
        csv_reader = csv.reader(uploaded_file, delimiter=',', quotechar='"')
        next(csv_reader)  # skip header

        for row in csv_reader:
            self._process_row(row)

        return FilePersistResult(self.amount_success, self.amount_duplicate, self.amount_faulty)

    def _process_row(self, row):
        try:
            transaction = self.parser.parse(row)
            transaction.full_clean()
            transaction.save()
            self.amount_success += 1
        except ValidationError as error:
            if 'code' in error.message_dict:
                self.amount_duplicate += 1
            else:
                self.amount_faulty += 1
        except (InvalidOperation, IndexError, ValueError):
            self.amount_faulty += 1
