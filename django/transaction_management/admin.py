from django.contrib import admin
from django.http import HttpRequest
from django.shortcuts import redirect, render
from django import forms

# Register your models here.
from django.urls import path

from .models import Transaction
from .models import Category

admin.site.register(Category)


class CsvImportForm(forms.Form):
    name = forms.CharField(max_length=5)
    csv_file = forms.FileField()


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', '__str__')
    search_fields = ['payee', 'memo']
    change_list_template = "transaction/change_list.html"

    def get_urls(self):
        urls = super().get_urls()
        additional_urls = [
            path('import-csv/', self.import_csv)
        ]

        return additional_urls + urls

    def import_csv(self, request: HttpRequest):
        if request.method == 'POST':
            form = CsvImportForm(request.POST)

            # do something here
            self.message_user(request, "Your csv file has been imported.. Well, not yet")
            return redirect("..")
        else:
            form = CsvImportForm()

        return render(
            request, "admin/csv_form.html", {"form": form}
        )


admin.site.register(Transaction, TransactionAdmin)
