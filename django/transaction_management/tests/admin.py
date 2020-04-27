from django.contrib.auth.models import User
from django.contrib.messages import get_messages
from django.test import TestCase

from transaction_management.tests.utils import open_file

class TransactionAdminTestCase(TestCase):
    def setUp(self) -> None:
        user = User.objects.create_superuser(username='test', password='test')
        self.client.force_login(user)

    def test_can_go_to_overview(self):
        response = self.client.get('/admin/transaction_management/transaction/')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'href="import-csv/"')

    def test_shows_csv_import(self):
        response = self.client.get('/admin/transaction_management/transaction/import-csv/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'admin/csv_form.html')

    def test_upload_csv(self):
        file = open_file('./data/single_dummy.csv')
        file_form = {'csv_file': file, 'name': 'Timo'}
        response = self.client.post('/admin/transaction_management/transaction/import-csv/', data=file_form)
        self.assertEqual(response.status_code, 302)

    def test_upload_invalid_file(self):
        file = open_file('./data/invalid_file.png', 'rb')
        file_form = {'csv_file': file, 'name': 'Invalid'}
        response = self.client.post('/admin/transaction_management/transaction/import-csv/', data=file_form)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context['form'].is_valid(), False)
        self.assertContains(response, 'Files of type image/png are not supported.')

    def test_show_upload_result(self):
        file = open_file('./data/bad-dummy.csv')
        file_form = {'csv_file': file, 'name': 'Timo'}
        response = self.client.post('/admin/transaction_management/transaction/import-csv/', data=file_form)
        self.assertEqual(response.status_code, 302)

        messages = list(get_messages(response.wsgi_request))
        self.assertEqual(len(messages), 1)
        self.assertEqual(str(messages[0]), 'Import result: 1 successful, 1 duplicate(s), 2 failed')

