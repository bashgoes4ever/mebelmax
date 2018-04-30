from django.db import models


class ProductGroup(models.Model):
    name = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"")

    def __str__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'


class ProductSpring(models.Model):
    name = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"")

    def __str__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = 'Пружинный блок'
        verbose_name_plural = 'Пружинные блок'


class Product(models.Model):
    is_active = models.BooleanField(default=True, verbose_name=u"Активен")
    name = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"Название")
    subtitle = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"Подзаголовок")
    price = models.IntegerField(blank=True, null=True, default=None, verbose_name=u"Цена")
    toughness = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"Жесткость")
    press = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"MAX нагрузка")
    height = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"Высота")
    date = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"Срок службы")
    guaranty = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"Гарантия")
    link = models.CharField(max_length=256, blank=True, null=True, default=None, verbose_name=u"Ссылка на основной сайт")
    group = models.ForeignKey(ProductGroup, blank=True, null=True, default=None, on_delete=models.CASCADE,
                              verbose_name = u"Группа")
    spring = models.ForeignKey(ProductSpring, blank=True, null=True, default=None, on_delete=models.CASCADE,
                              verbose_name = u"Тип пружины")

    def __str__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = 'Матрас'
        verbose_name_plural = '*Матрасы'


class ProductImage(models.Model):
    product = models.ForeignKey(Product, blank=True, null=True, default=None, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='static/img/products/')

    def __str__(self):
        return '%s' % self.id


class ProductSizes(models.Model):
    product = models.ForeignKey(Product, blank=True, null=True, default=None, on_delete=models.CASCADE)
    width = models.IntegerField(blank=True, null=True, default=None, verbose_name=u"Ширина")
    length = models.IntegerField(blank=True, null=True, default=None, verbose_name=u"Длина")
    price = models.IntegerField(blank=True, null=True, default=None, verbose_name=u"Цена")

    def __str__(self):
        return '%s' % self.id


class ProductMaterials(models.Model):
    product = models.ForeignKey(Product, blank=True, null=True, default=None, on_delete=models.CASCADE)
    material = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"Слой")

    def __str__(self):
        return '%s' % self.id

    class Meta:
        verbose_name = 'Состав по слоям'
        verbose_name_plural = 'Состав по слоям'


class ExtraProduct(models.Model):
    name = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"Название")
    subtitle = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"Описание")
    price = models.IntegerField(blank=True, null=True, default=None, verbose_name=u"Цена")
    link = models.CharField(max_length=256, blank=True, null=True, default=None, verbose_name=u"Ссылка на основной сайт")

    def __str__(self):
        return '%s' % self.name

    class Meta:
        verbose_name = 'Дополнительный товар'
        verbose_name_plural = '**Дополнительные товары'


class ExtraProductImage(models.Model):
    product = models.ForeignKey(ExtraProduct, blank=True, null=True, default=None, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='static/img/products/')

    def __str__(self):
        return '%s' % self.id


class ExtraSizes(models.Model):
    product = models.ForeignKey(ExtraProduct, blank=True, null=True, default=None, on_delete=models.CASCADE)
    width = models.IntegerField(blank=True, null=True, default=None, verbose_name=u"Ширина")
    length = models.IntegerField(blank=True, null=True, default=None, verbose_name=u"Длина")
    price = models.IntegerField(blank=True, null=True, default=None, verbose_name=u"Цена")

    def __str__(self):
        return '%s' % self.id


class ExtraMaterials(models.Model):
    product = models.ForeignKey(ExtraProduct, blank=True, null=True, default=None, on_delete=models.CASCADE)
    material = models.CharField(max_length=128, blank=True, null=True, default=None, verbose_name=u"Слой")

    def __str__(self):
        return '%s' % self.id

    class Meta:
        verbose_name = 'Состав по слоям'
        verbose_name_plural = 'Состав по слоям'
