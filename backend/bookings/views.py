from rest_framework import viewsets, permissions
from .models import User, Flight, Booking
from .serializers import UserSerializer, FlightSerializer, BookingSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

    @action(detail=False, methods=['get'])
    def search(self, request):
        origin = request.query_params.get('origin')
        destination = request.query_params.get('destination')
        date = request.query_params.get('date')
        flights = self.queryset.filter(origin=origin, destination=destination, departure_time__date=date)
        serializer = self.get_serializer(flights, many=True)
        return Response(serializer.data)
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        flight_id = request.data['flight']
        flight = Flight.objects.get(id=flight_id)
        if flight.seat_count > 0:
            flight.seat_count -= 1
            flight.save()
            return super().create(request, *args, **kwargs)
        else:
            return Response({"error": "No seats available"}, status=400)


