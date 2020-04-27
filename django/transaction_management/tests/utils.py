import os
from datetime import date

from django.contrib.auth.models import User

from transaction_management.models import Transaction
from transaction_management.utils import create_unique_code


def open_file(file_path, options='r'):
    """opens a file at relative location. e.g. open_file('../file_above.csv')
    :param file_path: str
    :param options: str, default 'r'
    """
    data_dir = os.path.dirname(__file__)
    return open(os.path.join(data_dir, file_path), options)


def create_transaction(**kwargs) -> Transaction:
    """
    Creates a transaction in the db and returns it. Can use all transaction keys

    :key user: for which user. Note that a user will be created if None supplied
    :key category: Category to hook up to. No category will be created
    :return: Transaction
    """
    transfer_date = kwargs.get('date', date(2020, 4, 20))
    to_account_number = kwargs.get('to_account_number', 'NL11RABO0101010444')
    memo = kwargs.get('memo', 'small memo')
    payee = kwargs.get('payee', 'timo')
    inflow = kwargs.get('inflow', 10.5)
    outflow = kwargs.get('outflow')
    category = kwargs.get('category')
    user = kwargs.get('user')

    if not user:
        user = User.objects.create_user('timo')

    transaction = Transaction(
        date=transfer_date,
        to_account_number=to_account_number,
        payee=payee,
        memo=memo,
        inflow=inflow,
        outflow=outflow,
        category=category,
        user=user
    )
    transaction.code = create_unique_code(transaction)
    transaction.save()
    return transaction
