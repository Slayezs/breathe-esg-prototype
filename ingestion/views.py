from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from organizations.models import Organization
from .models import (DataSource,RawRecord)
from emissions.models import EmissionRecord
from .utils import (normalize_unit,validate_record)
from .parsers.sap_parser import parse_sap
from .parsers.utility_parser import parse_utility
from .parsers.travel_parser import parse_travel


class UploadAPIView(APIView):

    def post(self, request):

        uploaded_file = request.FILES.get('file')

        source_type = request.data.get('source_type')

        if not uploaded_file:
            return Response(
                {'error': 'File required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not source_type:
            return Response(
                {'error': 'Source type required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        organization = Organization.objects.first()

        datasource = DataSource.objects.create(
            organization=organization,
            source_type=source_type,
            uploaded_file=uploaded_file
        )

        file_path = datasource.uploaded_file.path

        if source_type == 'SAP':
            parsed_records = parse_sap(file_path)

        elif source_type == 'UTILITY':
            parsed_records = parse_utility(file_path)

        elif source_type == 'TRAVEL':
            parsed_records = parse_travel(file_path)

        else:
            return Response(
                {'error': 'Invalid source type'},
                status=status.HTTP_400_BAD_REQUEST
            )

        created_count = 0

        for item in parsed_records:

            RawRecord.objects.create(
                datasource=datasource,
                raw_payload=item,
                ingest_status='SUCCESS'
            )

            normalized_value, normalized_unit = normalize_unit(
                item['value'],
                item['unit']
            )

            flags = validate_record(
                normalized_value,
                normalized_unit
            )

            EmissionRecord.objects.create(
                organization=organization,
                source_type=source_type,
                scope=item['scope'],
                category=item['category'],
                activity_value=item['value'],
                original_unit=item['unit'],
                normalized_unit=normalized_unit,
                normalized_value=normalized_value,
                reporting_date=item['date'],
                validation_flags=flags
            )

            created_count += 1

        return Response({
            'message': 'Upload successful',
            'records_created': created_count
        })