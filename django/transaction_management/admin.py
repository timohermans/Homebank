from io import TextIOWrapper
from django.contrib import admin
from django.http import HttpRequest
from django.shortcuts import redirect, render

# Register your models here.
from django.urls import path

from .models import Transaction
from .models import Category
from .forms import CsvImportForm

admin.site.register(Category)


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
            form = CsvImportForm(request.POST, request.FILES)

            if form.is_valid():
                uploaded_file = request.FILES['csv_file']

                file = TextIOWrapper(uploaded_file.file, encoding=request.encoding)
                result = form.execute(file)

                # do something here
                self.message_user(request,
                                  f"Import result: {result.amount_successful} successful, {result.amount_duplicate} duplicate(s), {result.amount_faulty} failed")
                return redirect("..")
        else:
            form = CsvImportForm()

        return render(
            request, "admin/csv_form.html", {"form": form}
        )


admin.site.register(Transaction, TransactionAdmin)
