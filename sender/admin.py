from django.contrib import admin
from .models import *


class ApplyAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Apply._meta.fields]
    list_filter = ['created']

    class Meta:
        model = Apply


admin.site.register(Apply, ApplyAdmin)
