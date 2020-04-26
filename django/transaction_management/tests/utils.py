import os


def open_file(file_path, options='r'):
    """opens a file at relative location. e.g. open_file('../file_above.csv')
    :param file_path: str
    :param options: str, default 'r'
    """
    data_dir = os.path.dirname(__file__)
    return open(os.path.join(data_dir, file_path), options)
