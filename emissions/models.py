from django.db import models
from organizations.models import Organization


class EmissionRecord(models.Model):

    REVIEW_STATUS = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(max_length=20)
    scope = models.CharField(max_length=20)
    category = models.CharField(max_length=100)
    activity_value = models.FloatField()
    original_unit = models.CharField(max_length=50)
    normalized_unit = models.CharField(max_length=50)
    normalized_value = models.FloatField()
    reporting_date = models.DateField()
    review_status = models.CharField(
        max_length=20,
        choices=REVIEW_STATUS,
        default='PENDING'
    )

    validation_flags = models.JSONField(
        default=list
    )

    locked_for_audit = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f'{self.category} - {self.scope}'