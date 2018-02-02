from django.db import models


class Apply(models.Model):
    name = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"Имя")
    phone = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"Телефон")
    type = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"Тип")
    city = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"Город")
    created = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name=u"Оставлена")

    def __str__(self):
        return '%s - %s' % (self.name, self.phone)

    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
