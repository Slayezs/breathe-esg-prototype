from django.db import models
from organizations.models import Organization


class DataSource(models.Model):

    SOURCE_TYPES = [
        ('SAP', 'SAP'),
        ('UTILITY', 'Utility'),
        ('TRAVEL', 'Travel'),
    ]

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(
        max_length=20,
        choices=SOURCE_TYPES
    )

    uploaded_file = models.FileField(
        upload_to='uploads/'
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f'{self.source_type} - {self.organization.name}'


class RawRecord(models.Model):

    STATUS_CHOICES = [
        ('SUCCESS', 'Success'),
        ('FAILED', 'Failed'),
    ]

    datasource = models.ForeignKey(
        DataSource,
        on_delete=models.CASCADE
    )

    raw_payload = models.JSONField()

    ingest_status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES
    )

    error_message = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f'RawRecord {self.id}'
