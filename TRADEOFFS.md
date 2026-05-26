# Overview

This document explains major functionality intentionally excluded from the prototype and why those tradeoffs were made.

The assignment emphasized engineering judgment and prioritization within a four-day timeline.

The goal was to maximize:
- architecture quality
- workflow realism
- auditability
- ingestion design

instead of maximizing feature count.

---

# 1. Did not implement live enterprise integrations

## Excluded

- SAP OData APIs
- SAP BAPIs
- Concur OAuth integrations
- utility provider APIs

## Why

Enterprise integrations require:
- authentication flows
- credential management
- API contracts
- sandbox access
- infrastructure hardening

Implementing these realistically would consume most of the assignment timeline while adding limited evaluation value.

CSV ingestion preserved realistic enterprise ingestion workflows without excessive infrastructure complexity.

---

# 2. Did not implement OCR or PDF parsing

## Excluded

- utility bill OCR
- PDF extraction pipelines

## Why

OCR introduces significant complexity:
- image preprocessing
- extraction accuracy
- document variability
- error handling

The assignment primarily evaluates:
- ingestion architecture
- normalization
- workflow design

Portal CSV exports are also very common in enterprise sustainability operations.

---

# 3. Did not implement automated emissions factor calculations

## Excluded

- emissions factor databases
- carbon calculations
- regional factor mapping

## Why

The assignment context explicitly stated:

"The hard part of our job isn't computing carbon."

The prototype therefore focused on:
- ingestion
- normalization
- review workflows
- auditability

rather than emissions science.

---

# 4. Did not implement advanced authentication or RBAC

## Excluded

- JWT authentication
- SSO
- role hierarchies
- permission systems

## Why

Authentication infrastructure would significantly increase implementation complexity while contributing minimally to the assignment evaluation areas.

The prototype instead prioritized:
- analyst workflow clarity
- ingestion quality
- auditability

---

# 5. Did not implement asynchronous ingestion

## Excluded

- Celery
- Redis queues
- background workers

## Why

The uploaded datasets are relatively small in the prototype environment.

Synchronous ingestion simplified:
- deployment
- debugging
- local development

while remaining sufficient for the assignment scope.

---

# 6. Did not implement advanced anomaly detection

## Excluded

- ML anomaly detection
- trend analysis
- statistical outlier engines

## Why

The assignment only required visibility into suspicious records.

Simple rule-based validation:
- negative values
- suspicious spikes
- unknown units

was sufficient to demonstrate analyst review workflows.

---

# 7. Did not implement editing workflows

## Excluded

- analyst inline editing
- data correction UI

## Why

The prototype focused on:
- ingestion
- review
- approval
- audit locking

Adding editable normalized rows would require:
- conflict handling
- version tracking
- additional audit complexity

which was intentionally deferred.

---

# 8. Did not implement advanced frontend UX

## Excluded

- charts
- drag-and-drop uploads
- advanced filtering
- virtualized tables

## Why

The assignment prioritized:
- realistic workflows
- engineering judgment
- architecture quality

The frontend was intentionally kept simple and functional.