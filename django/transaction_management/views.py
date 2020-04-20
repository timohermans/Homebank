from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
from django.views import generic

# Create your views here.
from .models import Transaction


class IndexView(generic.ListView):
    template_name = 'transactions/index.html'
    context_object_name = 'transaction_list'

    def get_queryset(self):
        return Transaction.objects.order_by('-date')

class DetailView(generic.DetailView):
    model = Transaction
    template_name = 'transactions/detail.html'

def upload(request):
    return HttpResponse("You're trying to upload a transaction file")
