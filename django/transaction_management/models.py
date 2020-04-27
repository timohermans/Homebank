from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models
from fuzzywuzzy import process, fuzz

# Create your models here.
from transaction_management.managers import TransactionManager


class Category(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=False, null=True)

    def __str__(self):
        return f"{self.name}({self.id})"

    class Meta:
        verbose_name_plural = "Categories"


class Transaction(models.Model):
    score_threshold = 90
    objects = TransactionManager()

    code = models.CharField(unique=True, max_length=50, editable=False)
    to_account_number = models.CharField(max_length=34)
    date = models.DateField()
    payee = models.CharField(max_length=200)
    memo = models.CharField(max_length=200)
    outflow = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
    inflow = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
    category = models.ForeignKey(
        Category, models.SET_NULL, blank=True, null=True)
    user = models.ForeignKey(User, models.CASCADE, related_name='transactions')

    @property
    def description(self):
        return f'{self.payee} - {self.memo}'

    class Meta:
        ordering: ["date"]

    def clean(self):
        self._validate_either_inflow_or_outflow()

    def _validate_either_inflow_or_outflow(self):
        if not self.inflow and not self.outflow:
            raise ValidationError("Either supply an in- or ouflow")

        if self.inflow and self.outflow:
            raise ValidationError("Cannot have both in and outflow")

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        self._try_assign_category(self)
        super(Transaction, self).save(force_insert, force_update, using, update_fields)
        self._try_assign_others_with_category()

    def _try_assign_category(self, transaction_to_assign) -> bool:
        if transaction_to_assign.category is not None or transaction_to_assign.pk:
            return

        transactions = Transaction.objects.for_user(self.user).filter(category__isnull=False)

        transactions_by_description = dict([(t.description, t) for t in transactions])

        transaction_best_match = process.extractOne(transaction_to_assign.description, transactions_by_description, score_cutoff=self.score_threshold)

        if transaction_best_match:
            transaction_to_assign.category = transaction_best_match[0].category
            return True

        return False

    def _try_assign_others_with_category(self):
        if self.category is None:
            return

        transactions = Transaction.objects.for_user(self.user).filter(category__isnull=True)

        for transaction in transactions:
            result = fuzz.WRatio(transaction.description, self.description)

            if result > self.score_threshold:
                transaction.category = self.category
                transaction.save()




    def __str__(self):
        return f'{self.payee} - {self.memo} ({self.id})'




