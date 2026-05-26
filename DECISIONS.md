# Overview

This document explains major architectural and product decisions made during implementation, including assumptions, scope limitations, and unresolved ambiguities.

---

# 1. Chose CSV ingestion instead of live enterprise integrations

## Decision

Used CSV uploads for:
- SAP
- utility
- travel

instead of live APIs or direct integrations.

## Why

The assignment timeline was four days, making realistic enterprise API integrations impractical.

CSV exports are also extremely common in real enterprise ESG workflows because:
- sustainability teams often work manually
- SAP exports are frequently downloaded as flat files
- utility teams commonly export portal CSVs
- travel systems often provide CSV reporting exports

This approach still preserved realistic ingestion complexity while remaining feasible within the prototype scope.

---

# 2. Chose separate source-specific parsers

## Decision

Implemented:
- sap_parser.py
- utility_parser.py
- travel_parser.py

instead of a single generic parser.

## Why

Each source exposes significantly different structures and semantics.

Examples:
- SAP includes procurement and fuel fields
- utility data includes billing periods and energy units
- travel data includes transport categories and distances

Separate parsers improved readability, extensibility, and source realism.

---

# 3. Preserved raw imported rows

## Decision

Created a dedicated `RawRecord` model storing original imported payloads.

## Why

Enterprise ESG systems require:
- traceability
- debugging
- audit support
- source transparency

Preserving raw imported data also allows reprocessing later if normalization logic changes.

This was prioritized heavily because auditability is central to ESG reporting systems.

---

# 4. Created separate normalized reporting layer

## Decision

Introduced `EmissionRecord` as a normalized reporting model.

## Why

Source systems expose inconsistent:
- units
- field names
- categories
- date formats

Analysts need a unified structure for review and reporting.

Separating normalized data from raw imported data also improves maintainability and workflow clarity.

---

# 5. Chose lightweight validation rules

## Decision

Implemented lightweight ingestion validations:
- negative values
- suspicious spikes
- unknown units

## Why

The assignment emphasized identifying suspicious rows for analyst review.

The goal was not to build a full enterprise-quality data quality engine, but to demonstrate:
- ingestion awareness
- analyst workflow thinking
- anomaly visibility

More advanced validation rules were intentionally deferred.

---

# 6. Chose SQLite instead of PostgreSQL

## Decision

Used SQLite for local development.

## Why

The assignment did not mandate a specific database.

SQLite significantly simplified:
- local setup
- onboarding
- testing
- portability

The schema was still designed in a way that could migrate easily to PostgreSQL later.

---

# 7. Chose React + Bootstrap

## Decision

Used React with Bootstrap instead of a more complex frontend framework or design system.

## Why

The assignment prioritized:
- workflow clarity
- analyst usability
- engineering judgment

over advanced frontend styling.

Bootstrap allowed rapid development of:
- tables
- badges
- filters
- dashboards

without spending excessive time on UI infrastructure.

---

# 8. Chose synchronous ingestion workflow

## Decision

File uploads are processed synchronously inside the request lifecycle.

## Why

The dataset sizes in the prototype are small.

Adding asynchronous workers (Celery, Redis, queues) would increase infrastructure complexity significantly without improving evaluation outcomes for the assignment.

---

# 9. Chose audit locking workflow

## Decision

Implemented immutable records after audit lock.

## Why

The assignment explicitly referenced:
- analyst signoff
- auditor workflows

Enterprise ESG systems commonly freeze finalized records to preserve reporting integrity.

This was implemented using:
- locked_for_audit

Once locked:
- review actions are blocked
- records become immutable

---

# 10. Chose realistic but intentionally limited scope

## Decision

Focused on:
- ingestion
- normalization
- analyst workflows
- auditability

instead of broader ESG functionality.

## Why

The assignment emphasized:
- engineering judgment
- tradeoffs
- realistic prioritization

The prototype intentionally avoided:
- emissions factor engines
- OCR pipelines
- live SAP integrations
- advanced RBAC
- complex infrastructure

to maintain implementation quality within the timeline.

---

# Questions I Would Ask the PM

If additional product clarification were available, I would ask:

- What expected ingestion volumes should the system support?
- Are uploads analyst-triggered or automated?
- Should validation rules vary per organization?
- What level of emissions factor calculation accuracy is expected?
- What external audit requirements must be supported?
- Should analysts edit normalized rows directly?
- What downstream reporting systems consume this data?