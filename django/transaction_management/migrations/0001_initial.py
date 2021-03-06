# Generated by Django 3.0.5 on 2020-04-18 20:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=50, unique=True)),
                ('to_account_number', models.CharField(max_length=34)),
                ('date', models.DateField()),
                ('payee', models.CharField(max_length=200)),
                ('memo', models.CharField(max_length=200)),
                ('outflow', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('inflow', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='transaction_management.Category')),
            ],
        ),
    ]
