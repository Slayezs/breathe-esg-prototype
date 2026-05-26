## Overview

The system is designed as a lightweight ESG data ingestion and analyst review platform. The architecture focuses on handling messy enterprise sustainability data from multiple source systems while maintaining auditability and normalization consistency.

The platform supports three source types:

- SAP fuel and procurement exports
- Utility electricity exports
- Corporate travel exports

The primary design goal was to separate raw imported data from normalized analyst-reviewed data.

---

# Core Design Principles

## 1. Raw data preservation

Imported records are preserved exactly as received from the source system.

Why:
- audit traceability
- debugging
- source-of-truth verification
- enterprise compliance workflows

This is implemented using the `RawRecord` model.

---

## 2. Normalized reporting layer

Different source systems expose different structures, units, and naming conventions.

The platform converts source-specific rows into a unified normalized structure for analyst review and downstream reporting.

This is implemented using the `EmissionRecord` model.

---

## 3. Auditability

ESG data often undergoes external audit and regulatory review.

The system therefore tracks:
- upload source
- review status
- audit locking
- analyst actions

This is implemented using:
- `DataSource`
- `AuditLog`
- `locked_for_audit`

---

## 4. Multi-tenancy

The architecture supports multiple client organizations.

Each uploaded source and emission record belongs to an `Organization`.

This prevents data mixing between tenants.

---

# Data Model

---

# Organization

Represents a client company onboarded into the platform.

Example:
- Tata Steel
- Infosys
- Reliance

Fields:
- name
- created_at

Purpose:
- multi-tenancy isolation
- future organization-level reporting

---

# DataSource

Represents an uploaded source file.

Examples:
- SAP CSV upload
- utility CSV upload
- travel CSV upload

Fields:
- organization
- source_type
- uploaded_file
- uploaded_at

Purpose:
- source-of-truth tracking
- upload traceability
- ingestion audit history

---

# RawRecord

Stores the original imported row exactly as received.

Fields:
- datasource
- raw_payload
- ingest_status
- error_message
- created_at

Purpose:
- preserve original imported structure
- audit traceability
- debugging ingestion failures

The raw payload is stored as JSON because source structures vary significantly across systems.

---

# EmissionRecord

Represents normalized ESG activity data.

Fields:
- organization
- source_type
- scope
- category
- activity_value
- original_unit
- normalized_unit
- normalized_value
- reporting_date
- review_status
- validation_flags
- locked_for_audit

Purpose:
- analyst review workflow
- standardized reporting layer
- downstream emissions calculations

---

# AuditLog

Tracks analyst actions performed on records.

Fields:
- record
- action
- changed_by
- timestamp

Examples:
- APPROVED
- REJECTED
- LOCKED_FOR_AUDIT

Purpose:
- analyst accountability
- audit trail generation
- workflow traceability

---

# Scope Categorization

The system supports Scope 1, Scope 2, and Scope 3 categorization.

## Scope 1
Direct fuel combustion.

Mapped from:
- SAP fuel records

Examples:
- diesel
- petrol
- natural gas

---

## Scope 2
Purchased electricity.

Mapped from:
- utility electricity exports

Examples:
- kWh usage
- MWh usage

---

## Scope 3
Indirect business activities.

Mapped from:
- travel platform exports

Examples:
- flights
- hotels
- taxis
- rail

---

# Normalization Strategy

Different sources expose inconsistent units.

Examples:
- MWh
- kWh
- liters
- gallons

The platform normalizes units into a consistent reporting format.

Current normalization examples:
- MWh → kWh

The original imported unit is preserved for auditability.

---

# Validation Strategy

The platform performs lightweight validation during ingestion.

Current validations:
- negative values
- suspicious spikes
- unknown units

Validation results are stored in:
- validation_flags

Purpose:
- surface suspicious rows to analysts
- improve data quality review workflows

---

# Review Workflow

New records enter the system with:

- review_status = PENDING

Analysts can:
- approve records
- reject records
- lock records for audit

Once locked:
- records become immutable

This simulates enterprise ESG signoff workflows.

---

# Source Handling Strategy

The system uses source-specific parsers:

- SAP parser
- utility parser
- travel parser

Each parser converts source-specific structures into a common normalized format.

This keeps ingestion extensible while maintaining a unified reporting schema.

---

# Why Raw + Normalized Separation Matters

Separating raw imported data from normalized reporting data provides:

- audit traceability
- rollback capability
- debugging support
- source transparency
- safer analyst workflows

This is a common enterprise data engineering pattern and was prioritized heavily in the system design.