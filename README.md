## Overview

This project is a prototype ESG data ingestion and analyst review platform built using:

- Django REST Framework
- React
- Bootstrap
- SQLite

The system ingests sustainability-related operational data from multiple enterprise sources, normalizes the data into a unified reporting structure, and allows analysts to review, approve, reject, and lock records for audit workflows.

---

# Supported Source Types

The platform currently supports:

1. SAP fuel and procurement exports
2. Utility electricity exports
3. Corporate travel exports

Each source type is ingested through a source-specific parser and converted into a normalized reporting schema.

---

# Core Features

## Multi-source ingestion

Supports:
- SAP CSV uploads
- utility CSV uploads
- travel CSV uploads

---

## Raw data preservation

Original imported rows are preserved exactly as uploaded for:
- auditability
- debugging
- traceability

---

## Normalization layer

The platform converts inconsistent source units into standardized formats.

Examples:
- MWh → kWh

---

## Validation engine

The ingestion workflow detects:
- negative values
- suspicious spikes
- unknown units

Validation flags are surfaced to analysts inside the review dashboard.

---

## Analyst review workflow

Analysts can:
- review records
- approve records
- reject records
- lock finalized records for audit

---

## Audit locking

Once records are locked:
- review actions are blocked
- records become immutable

This simulates enterprise ESG signoff workflows.

---

# Technology Stack

## Backend

- Django
- Django REST Framework
- SQLite
- pandas

---

## Frontend

- React
- Bootstrap
- Axios
- React Router

---

# Project Structure

```text
backend/
frontend/
organizations/
ingestion/
emissions/
audit/
sample_data/
```

---

# API Endpoints

## Upload Data

POST:

```text
/api/upload/
```

Form data:
- file
- source_type

Supported source types:
- SAP
- UTILITY
- TRAVEL

---

## Fetch Records

GET:

```text
/api/records/
```

---

## Review Record

POST:

```text
/api/review/<id>/
```

Body:

```json
{
  "action": "APPROVED"
}
```

Supported actions:
- APPROVED
- REJECTED

---

## Lock Record

POST:

```text
/api/lock/<id>/
```

---

# Running Backend

## Create virtual environment

```bash
python -m venv venv
```

---

## Activate virtual environment

### Windows

```bash
venv\\Scripts\\activate
```

### Linux/Mac

```bash
source venv/bin/activate
```

---

## Install dependencies

```bash
pip install -r requirements.txt
```

---

## Run migrations

```bash
python manage.py migrate
```

---

## Create superuser

```bash
python manage.py createsuperuser
```

---

## Start backend server

```bash
python manage.py runserver
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

# Running Frontend

## Install dependencies

```bash
cd frontend
npm install
```

---

## Start frontend server

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Sample Data

Realistic enterprise-style datasets are included for testing:

- SAP fuel/procurement exports
- utility electricity exports
- corporate travel exports

These datasets intentionally include:
- inconsistent units
- suspicious values
- validation edge cases
- localized SAP fields

---

# Design Priorities

The implementation prioritized:
- realistic ingestion workflows
- auditability
- normalization
- analyst usability
- engineering clarity

over:
- infrastructure complexity
- advanced authentication
- enterprise integrations

---

# Future Improvements

Potential future enhancements:
- live SAP integrations
- OCR utility bill parsing
- asynchronous ingestion
- emissions factor calculations
- advanced anomaly detection
- role-based permissions
- PostgreSQL migration

---

# Deployment

The application is designed to be deployed using:
- Render (backend)
- Vercel (frontend)

---

# Assignment Focus

This prototype was intentionally designed around:
- enterprise ingestion workflows
- ESG auditability
- normalization architecture
- analyst review workflows
- realistic operational data handling