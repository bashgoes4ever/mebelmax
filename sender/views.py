from django.http import JsonResponse
from .models import Apply
from sender.bot import send_app


def sender(request):
    r = request.POST
    if len(r) != 0:
        name = r.get('name')
        phone = r.get('phone')
        type = r.get('type')
        city = ''
        if 'city' in r:
            city = r.get('city')
        Apply.objects.create(name=name, phone=phone, type=type, city=city)
        send_app(name, phone, type, city)
    return JsonResponse(r)
