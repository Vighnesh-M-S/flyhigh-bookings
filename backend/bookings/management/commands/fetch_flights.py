# yourapp/management/commands/import_flights.py
import csv
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from bookings.models import Flight

class Command(BaseCommand):
    help = 'Import flight data from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The path to the CSV file to be imported')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']

        with open(csv_file, newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                flight_id = int(row['id'])
                origin = row['origin']
                destination = row['destination']
                depart_time = datetime.strptime(row['depart_time'], '%Y-%m-%d %H:%M:%S')
                depart_weekday = row['depart_weekday']
                duration = timedelta(minutes=int(row['duration']))
                arrival_time = datetime.strptime(row['arrival_time'], '%Y-%m-%d %H:%M:%S')
                arrival_weekday = row['arrival_weekday']
                flight_no = row['flight_no']
                airline_code = row['airline_code']
                airline = row['airline']
                economy_fare = float(row['economy_fare'])
                business_fare = float(row['business_fare'])
                first_fare = float(row['first_fare'])

                # Create or update the flight
                Flight.objects.update_or_create(
                    id=flight_id,  # Use the id from the CSV
                    defaults={
                        'origin': origin,
                        'destination': destination,
                        'depart_time': depart_time,
                        'depart_weekday': depart_weekday,
                        'duration': duration,
                        'arrival_time': arrival_time,
                        'arrival_weekday': arrival_weekday,
                        'flight_no': flight_no,
                        'airline_code': airline_code,
                        'airline': airline,
                        'economy_fare': economy_fare,
                        'business_fare': business_fare,
                        'first_fare': first_fare,
                    }
                )

        self.stdout.write(self.style.SUCCESS('Successfully imported flight data'))
