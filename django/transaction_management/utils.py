from hashlib import md5


def create_unique_code(transaction):
    """
    Creates a unique code based on the attributes of a transaction model

    :param transaction: Transaction
    :return: hash string
    """
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
