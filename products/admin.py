from django.contrib import admin
from .models import *


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ProductSizeInline(admin.TabularInline):
    model = ProductSizes
    extra = 3


class ProductMaterialInline(admin.TabularInline):
    model = ProductMaterials
    extra = 4


class ProductAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Product._meta.fields]
    inlines = [ProductImageInline, ProductSizeInline, ProductMaterialInline]

    class Meta:
        model = Product


admin.site.register(Product, ProductAdmin)


class ExtraProductImageInline(admin.TabularInline):
    model = ExtraProductImage
    extra = 1


class ExtraProductAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ExtraProduct._meta.fields]
    inlines = [ExtraProductImageInline]

    class Meta:
        model = ExtraProduct


admin.site.register(ExtraProduct, ExtraProductAdmin)


class ProductGroupAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ProductGroup._meta.fields]

    class Meta:
        model = ProductGroup


admin.site.register(ProductGroup, ProductGroupAdmin)


class ProductSpringAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ProductSpring._meta.fields]

    class Meta:
        model = ProductSpring


admin.site.register(ProductSpring, ProductSpringAdmin)