from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, FlightViewSet, BookingViewSet


router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'flights', FlightViewSet)
router.register(r'bookings', BookingViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
