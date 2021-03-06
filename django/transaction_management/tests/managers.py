from django.test import TestCase

from transaction_management.managers import RabobankCsvRowParser
from transaction_management.models import Transaction
from django.contrib.auth.models import User
from datetime import date


class TransactionManagerTest(TestCase):
    def test_retrieves_only_own_transactions(self):
        user = User.objects.create_superuser('test 1')

        transaction = Transaction.objects.create(
            date=date(2020, 4, 20),
            to_account_number='NL11RABO0101010444',
            payee='timo',
            memo='small memo',
            inflow=10.5,
            user=user
        )

        self.assertEqual(transaction.user, user)

        user_2 = User.objects.create_superuser('test 2')

        self.assertEqual(len(user_2.transactions.all()), 0)
        self.assertEqual(len(Transaction.objects.for_user(user_2)), 0)


class RabobankCsvRowParserTest(TestCase):
    def setUp(self) -> None:
        self.parser = RabobankCsvRowParser()

    def test_parses_inflow_transaction(self):
        user = User.objects.create_user("timo")
        csv_row = ['NL11RABO0104955555', 'EUR', 'RABONL2U', '000000000000007213', '2019-09-01', '2019-09-01', '+2,50',
                   '+1868,12', 'NL42RABO0114164838', 'J.M.G. Kerkhoffs eo', '', '', 'RABONL2U', 'cb', '', '', '', '',
                   '', 'Spotify', ' ', '', '', '', '', '']

        transaction = self.parser.parse(csv_row)
        transaction.user = user

        transaction.full_clean()
        transaction.save()

    def test_generates_an_unique_identifier_based_on_the_row_values(self):
        csv_row = ['NL11RABO0104955555', 'EUR', 'RABONL2U', '000000000000007213', '2019-09-01', '2019-09-01', '+2,50',
                   '+1868,12', 'NL42RABO0114164838', 'J.M.G. Kerkhoffs eo', '', '', 'RABONL2U', 'cb', '', '', '', '',
                   '', 'Spotify', ' ', '', '', '', '', '']

        transaction = self.parser.parse(csv_row)

        self.assertEqual('6a25f09148bead1f64212179d61f9c37', transaction.code)

    def test_fails_parser_an_invalid_row(self):
        csv_row = [0, 0, 0, 0, None]

        self.assertRaises(IndexError, self.parser.parse, csv_row)

    def test_incasso_id_get_appended_to_memo(self):
        csv_row = ['NL11RABO0104955555', 'EUR', 'RABONL2U', '000000000000007213', '2019-09-01', '2019-09-01', '-2,50',
                   '+1868,12', 'NL42RABO0114164838', 'J.M.G. Kerkhoffs eo', '', '', 'RABONL2U', 'cb', '', '',
                   'abc-def-ghi', '', '', 'Sport abo', ' ', '', '', '', '', '']  # rubocop:disable Layout/LineLength

        transaction = self.parser.parse(csv_row)

        self.assertEqual('Sport abo (Incasso: abc-def-ghi)', transaction.memo)
