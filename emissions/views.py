from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import EmissionRecord
from audit.models import AuditLog

class EmissionListAPIView(APIView):

    def get(self, request):
        records = EmissionRecord.objects.all().values()
        return Response(records)


class ReviewRecordAPIView(APIView):

    def post(self, request, pk):
        action = request.data.get('action')
        if action not in ['APPROVED', 'REJECTED']:
            return Response(
                {'error': 'Invalid action'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            record = EmissionRecord.objects.get(id=pk)

        except EmissionRecord.DoesNotExist:
            return Response(
                {'error': 'Record not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        if record.locked_for_audit:
            return Response(
                {'error': 'Record locked'},
                status=status.HTTP_400_BAD_REQUEST
            )

        record.review_status = action
        record.save()

        AuditLog.objects.create(
            record=record,
            action=action,
            changed_by='Analyst'
        )

        return Response({
            'message': f'Record {action.lower()}'
        })


class LockRecordAPIView(APIView):

    def post(self, request, pk):

        try:
            record = EmissionRecord.objects.get(id=pk)

        except EmissionRecord.DoesNotExist:
            return Response(
                {'error': 'Record not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        record.locked_for_audit = True
        record.save()

        AuditLog.objects.create(
            record=record,
            action='LOCKED_FOR_AUDIT',
            changed_by='Analyst'
        )

        return Response({
            'message': 'Record locked'
        })