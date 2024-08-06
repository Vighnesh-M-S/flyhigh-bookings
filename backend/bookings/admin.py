from django.contrib import admin
from .models import User, Flight, Booking

admin.site.register(User)
admin.site.register(Flight)
admin.site.register(Booking)
