from django.http import JsonResponse
from django.http import HttpResponse
from .models import Apply
from sender.bot import send_app
from products import models
import re
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMessage


def sender(request):
    r = request.POST
    if len(r) != 0:
        name = r.get('name')
        phone = r.get('phone')
        type = r.get('type')
        city = ''
        msg = '{}\nИмя: {}\nТелефон: {}'.format(type, name, phone)
        if 'city' in r and len(r.get('city')) != 0:
            city = r.get('city')
            msg = msg + '\nГород: {}'.format(city)

        Apply.objects.create(name=name, phone=phone, type=type, city=city)
        
        send_app(name, phone, type, city)

        email = EmailMessage(type, msg, to=['2758544@mail.ru'])
        email.send()

    return JsonResponse(r)


def checkform(request):
    r = request.POST
    BASE = 'https://paymaster.ru/Payment/Init?LMI_MERCHANT_ID=807b704b-6f01-4647-a9d0-95acb329501d&'
    
    client_name = r.get('name')
    client_city = r.get('city')
    client_street = r.get('street')
    client_address = r.get('address')
    client_phone = r.get('phone').replace(' ', '').replace('(', '').replace(')', '').replace('-', '')
    client_mail = r.get('mail')

    product_price = r.get('accurate-price')
    product_size = r.get('product-size')
    product_title = r.get('product-title')
    product_subtitle = r.get('product-subtitle')

    only_size = re.findall(r'\d+x\d+', product_size)[0]

    width = only_size.split('x')[0]
    length = only_size.split('x')[1]

    product = ''

    try:
        product = models.Product.objects.get(name__iexact=product_title, subtitle__iexact=product_subtitle).productsizes_set.get(width=int(width), length=int(length))
    except:
        product = models.ExtraProduct.objects.get(name__iexact=product_title, subtitle__iexact=product_subtitle).extrasizes_set.get(width=int(width), length=int(length))
  
    if int(product.price) != int(product_price):
        return JsonResponse({'response': 'http://matras-mebelmax.com'})
    else:

        product_size = only_size.split('x')[0]+'x'+only_size.split('x')[1]

        LMI_PAYMENT_AMOUNT = 'LMI_PAYMENT_AMOUNT='+str(product_price)
        LMI_CURRENCY = '&LMI_CURRENCY=RUB'
        LMI_PAYMENT_DESC = '&LMI_PAYMENT_DESC='+product_title+','+product_subtitle+','+product_size+','+client_city+','+client_street+','+client_address
        LMI_PAYER_PHONE_NUMBER = '&LMI_PAYER_PHONE_NUMBER='+str(client_phone)
        LMI_PAYER_EMAIL = '&LMI_PAYER_EMAIL='+client_mail
        LMI_SIM_MODE = '&LMI_SIM_MODE=0'
        C_NAME = '&C_NAME='+client_name
        C_CITY = '&C_CITY='+client_city
        C_STREET = '&C_STREET='+client_street
        C_ADDRESS = '&C_ADDRESS='+client_address
        C_MAIL = '&C_MAIL='+client_mail
        C_PHONE = '&C_PHONE='+client_phone

        PAYMENT_URL = BASE + LMI_PAYMENT_AMOUNT + LMI_CURRENCY + LMI_PAYMENT_DESC + LMI_PAYER_PHONE_NUMBER + LMI_PAYER_EMAIL + LMI_SIM_MODE + C_NAME + \
                            C_CITY + C_STREET + C_ADDRESS + C_PHONE + C_MAIL

        return JsonResponse({'response': PAYMENT_URL})


@csrf_exempt
def paycheck(request):
    r = request.POST

    return HttpResponse()

@csrf_exempt
def payconfirm(request):
    r = request.POST

    name= ''
    phone = ''
    city = ''
    street = ''
    address = ''
    mail = ''
    info = ''
    price = ''


    if 'C_NAME' in r:
        name = r.get('C_NAME')

    if 'C_PHONE' in r:
        phone = r.get('C_PHONE')

    type = 'Оплачен матрас!'

    if 'C_CITY' in r:
        city = r.get('C_CITY')

    if 'C_STREET' in r:
        street = r.get('C_STREET')

    if 'C_ADDRESS' in r:
        address = r.get('C_ADDRESS')

    if 'C_MAIL' in r:
        mail = r.get('C_MAIL')

    if 'LMI_PAYMENT_DESC' in r:
        info = r.get('LMI_PAYMENT_DESC').split(',')
        info = ', '.join(info[:3])

    if 'LMI_PAYMENT_AMOUNT' in r and 'LMI_CURRENCY' in r: 
        price = str(r.get('LMI_PAYMENT_AMOUNT')) + ' ' + r.get('LMI_CURRENCY')

    send_app(name, phone, type, city=city, street=street, address=address, mail=mail, info=info, price=price)

    msg = 'Имя: {}\nТелефон: {}\nE-mail: {}\nГород: {}\nУлица: {}\nКвартира: {}\nИнформация о товаре: {}\nСумма платежа: {}\n'.format(name, phone, mail, city, street, address, info, price)

    email = EmailMessage('Оплачен матрас!', msg, to=['2758544@mail.ru'])
    email.send()

    return HttpResponse()