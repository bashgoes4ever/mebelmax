from django.shortcuts import render
from products.models import Product, ProductGroup, ProductSpring, ExtraProduct


def mebel(request):
    products = Product.objects.filter(is_active=True)
    springs = ProductSpring.objects.all()
    groups = ProductGroup.objects.all()
    extras = ExtraProduct.objects.all()
    return render(request, 'mebel/index.html', locals())
