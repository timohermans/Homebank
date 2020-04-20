from django.urls import path

from . import views

app_name = 'transactions'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('<int:pk>/', views.DetailView.as_view(), name="detail"),
    path('upload/', views.upload, name="upload")
]