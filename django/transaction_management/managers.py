import csv
from datetime import datetime
from decimal import InvalidOperation, Decimal
from hashlib import md5

from django.core.exceptions import ValidationError
from django.db import models


class FileParseResult:
    def __init__(self):
        self.amount_successful = 0
        self.amount_duplicate = 0
        self.amount_faulty = 0


class TransactionManager(models.Manager):
    def create_from_file(self, file_stream) -> FileParseResult:
        result = FileParseResult()
        parser = RabobankCsvRowParser()
        csv_reader = csv.reader(file_stream, delimiter=',', quotechar='"')
        next(csv_reader)  # skip header

        for row in csv_reader:
            self._process_row(row, result, parser)

        return result

    def _process_row(self, row, result, parser):
        try:
            transaction = parser.parse(row)
            transaction.full_clean()
            transaction.save()
            result.amount_successful += 1
        except ValidationError as error:
            if 'code' in error.message_dict:
                result.amount_duplicate += 1
            else:
                result.amount_faulty += 1
        except (InvalidOperation, IndexError, ValueError):
            result.amount_faulty += 1


class RabobankCsvRowParser:
    to_account_number_index = 0
    date_index = 4
    amount_index = 6
    payee_index = 9
    memo_index = 19
    automatic_incasso_id_index = 16
    positive_amount_character = '+'

    def parse(self, row: list):
        from transaction_management.models import Transaction

        amount_str = self._get_amount_str(row)
        is_positive_amount = amount_str[0] == self.positive_amount_character
        amount = Decimal(amount_str[1:])
        transaction = Transaction(
            to_account_number=row[self.to_account_number_index],
            date=datetime.strptime(row[self.date_index], '%Y-%m-%d'),
            payee=row[self.payee_index],
            memo=self._parse_memo_text_from(row),
            inflow=self._parse_inflow_from(amount, is_positive_amount),
            outflow=self._parse_outflow_from(amount, is_positive_amount),
        )

        transaction.code = self._create_unique_code(transaction)
        return transaction

    def _get_amount_str(self, row):
        return row[self.amount_index].replace(',', '.')

    def _parse_memo_text_from(self, row) -> str:
        memo = row[self.memo_index]
        incasso_id = row[self.automatic_incasso_id_index]
        incasso_text = '' if not incasso_id.strip(
        ) else f" (Incasso: {incasso_id})"

        return f"{memo}{incasso_text}"

    def _parse_inflow_from(self, amount, is_positive_amount):
        return amount if is_positive_amount else None

    def _parse_outflow_from(self, amount, is_positive_amount):
        return amount if not is_positive_amount else None

    def _create_unique_code(self, transaction):
        attrs = (
            transaction.date,
            transaction.to_account_number,
            transaction.inflow,
            transaction.outflow,
            transaction.payee,
            transaction.memo)

        attrs_joined = '|'.join([str(attr)
                                 for attr in attrs if attr is not None])
        return md5('|'.join(attrs_joined).encode('utf-8')).hexdigest()
