from django.apps import AppConfig
from django.core.serializers import register_serializer


class TransactionManagementConfig(AppConfig):
    name = 'transaction_management'

    def ready(self):
        register_serializer('yml', 'django.core.serializers.pyyaml')
