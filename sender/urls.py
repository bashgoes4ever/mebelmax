from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^sender/&', views.sender, name='sender'),
    url(r'^checkform/&', views.checkform, name='checkform'),
    url(r'^paycheck/', views.paycheck, name='paycheck'),
    url(r'^payconfirm/', views.payconfirm, name='payconfirm')
]