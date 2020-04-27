from django import forms
from transaction_management.models import Transaction
from transaction_management.managers import RabobankCsvRowParser
from utils import FileValidator, csv_content_types_allowed


class CsvImportForm(forms.Form):
    name = forms.CharField(max_length=5)
    csv_file = forms.FileField(validators=[FileValidator(content_types=csv_content_types_allowed)])
    parser = RabobankCsvRowParser()

    # overwrite a field: clean_<name>
    def clean_name(self):
        pass

    def execute(self, uploaded_file):
        return Transaction.objects.create_from_file(uploaded_file)
