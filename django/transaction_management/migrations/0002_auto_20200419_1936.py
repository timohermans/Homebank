# Generated by Django 3.0.5 on 2020-04-19 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction_management', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='code',
            field=models.CharField(editable=False, max_length=50, unique=True),
        ),
    ]
