from io import TextIOWrapper
from django.contrib import admin
from django.http import HttpRequest
from django.shortcuts import redirect, render
from django.contrib.admin import SimpleListFilter

# Register your models here.
from django.urls import path

from .models import Transaction
from .forms import CsvImportForm


class CategoryAssignFilter(SimpleListFilter):
    title = 'Categories to assign'
    parameter_name = 'category_assign'
    default_value = None
    no_category_filter = 'no_category'
    no_category_for_inflow_filter = 'no_category_inflow'
    no_category_for_outflow_filter = 'no_category_outflow'

    def lookups(self, request, model_admin):
        return [
            (self.no_category_filter, 'No category'),
            (self.no_category_for_inflow_filter, 'No category for inflow'),
            (self.no_category_for_outflow_filter, 'No category outflow')
        ]

    def queryset(self, request, queryset):
        if self.value() == self.no_category_filter:
            return queryset.filter(category__isnull=True)
        if self.value() == self.no_category_for_outflow_filter:
            return queryset.filter(category__isnull=True, inflow__isnull=True)
        if self.value() == self.no_category_for_inflow_filter:
            return queryset.filter(category__isnull=True, outflow__isnull=True)

        return queryset

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'category', 'payee', 'inflow', 'outflow', 'memo')
    list_filter = ['category', CategoryAssignFilter]
    readonly_fields = ('to_account_number', 'date', 'payee', 'memo', 'inflow', 'outflow')
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

                file = TextIOWrapper(uploaded_file.file, encoding='latin-1')
                result = Transaction.objects.create_from_file(file, request.user)

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
