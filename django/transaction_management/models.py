from django.core.exceptions import ValidationError
from django.core.validators import DecimalValidator
from django.db import models


# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name}({self.id})"

    class Meta:
        verbose_name_plural = "Categories"


class Transaction(models.Model):
    code = models.CharField(unique=True, max_length=50, editable=False)
    to_account_number = models.CharField(max_length=34)
    date = models.DateField()
    payee = models.CharField(max_length=200)
    memo = models.CharField(max_length=200)
    outflow = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
    inflow = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)
    category = models.ForeignKey(
        Category, models.SET_NULL, blank=True, null=True)

    class Meta:
        ordering: ["date"]

    def clean(self):
        self._validate_either_inflow_or_outflow()

    def _validate_either_inflow_or_outflow(self):
        if not self.inflow and not self.outflow:
            raise ValidationError("Either supply an in- or ouflow")

        if self.inflow and self.outflow:
            raise ValidationError("Cannot have both in and outflow")

    def __str__(self):
        return f"{self.date} - {self.payee} - {'+' if self.inflow else '-'}{self.inflow if self.inflow > 0 else self.outflow}"
