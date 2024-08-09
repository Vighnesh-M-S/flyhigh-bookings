from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='custom_user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='custom_user',
    )

class Flight(models.Model):
    id = models.AutoField(primary_key=True)  # Auto-incrementing primary key
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    depart_time = models.DateTimeField()
    depart_weekday = models.CharField(max_length=10)  # or IntegerField if you prefer numeric weekdays
    duration = models.DurationField()  # Assuming duration is stored as a time delta
    arrival_time = models.DateTimeField()
    arrival_weekday = models.CharField(max_length=10)  # or IntegerField
    flight_no = models.CharField(max_length=20)
    airline_code = models.CharField(max_length=10)
    airline = models.CharField(max_length=100)
    economy_fare = models.DecimalField(max_digits=10, decimal_places=2)
    business_fare = models.DecimalField(max_digits=10, decimal_places=2)
    first_fare = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.airline} {self.flight_no} from {self.origin} to {self.destination}"

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    booking_time = models.DateTimeField(auto_now_add=True)


