# Overview

This document explains the real-world source formats researched for the prototype, what assumptions were made, what the sample datasets represent, and what limitations would exist in a production deployment.

The platform supports three source types:

- SAP fuel and procurement exports
- utility electricity exports
- corporate travel exports

The implementation intentionally focused on realistic but manageable ingestion formats within the assignment timeline.

---

# 1. SAP Fuel and Procurement Data

## Research

Researched common SAP export workflows including:
- SAP GUI flat-file exports
- CSV exports
- procurement reporting exports

Typical enterprise SAP exports often contain:
- localized headers
- plant codes
- procurement metadata
- inconsistent units
- non-standard date formats

Examples researched included:
- German-language SAP exports
- fuel procurement tables
- operational cost-center exports

---

## Chosen Format

CSV flat-file export.

Example columns:
- Werk
- Menge
- Einheit
- Brennstofftyp
- Lieferant
- Kostenstelle
- Buchungsdatum

---

## Why This Format Was Chosen

CSV exports are extremely common in enterprise sustainability workflows because:
- sustainability teams frequently export operational reports manually
- SAP integration projects are expensive and slow
- ESG teams often rely on flat-file ingestion pipelines

This format preserved realistic ingestion complexity while remaining feasible within the assignment timeline.

---

## Realistic Behaviors Simulated

The SAP dataset intentionally includes:
- German column names
- inconsistent units
- procurement metadata
- suspicious spikes
- invalid values
- unknown units

Examples:
- negative fuel values
- unusually large fuel purchases
- unsupported units such as Gallon

---

## Sample Dataset Design

The sample dataset was designed to simulate:
- enterprise fuel purchases
- operational procurement exports
- mixed business units
- inconsistent operational reporting

The data includes:
- fuel quantity
- units
- vendors
- plant identifiers
- currencies
- procurement costs

---

## Production Limitations

A real deployment would additionally require:
- plant code mapping tables
- SAP authentication
- incremental ingestion
- duplicate detection
- support for multiple export schemas
- localized parsing logic

---

# 2. Utility Electricity Data

## Research

Researched common utility reporting workflows including:
- utility portal CSV exports
- facility electricity reporting
- billing-period exports

Typical utility datasets contain:
- billing periods
- meter identifiers
- tariff structures
- peak demand values
- mixed energy units

---

## Chosen Format

CSV export from utility portal.

Example columns:
- Meter ID
- Billing Start
- Billing End
- Usage
- Unit
- Tariff Type

---

## Why This Format Was Chosen

CSV exports are widely used by:
- facilities teams
- energy managers
- sustainability reporting teams

This approach avoided unnecessary OCR complexity while remaining highly realistic.

---

## Realistic Behaviors Simulated

The utility dataset intentionally includes:
- mixed units
- billing periods
- negative values
- suspicious spikes
- invalid units

Examples:
- MWh normalization
- unknown units
- extremely large electricity usage values

---

## Sample Dataset Design

The dataset simulates:
- multiple facilities
- commercial and industrial tariffs
- monthly reporting periods
- meter-level reporting

---

## Production Limitations

A real deployment would likely require:
- OCR for PDF bills
- utility API integrations
- meter mapping
- timezone handling
- tariff normalization
- duplicate invoice detection

---

# 3. Corporate Travel Data

## Research

Researched travel platform reporting formats from:
- SAP Concur
- Navan
- business travel management platforms

Typical travel datasets include:
- flights
- hotels
- rail
- taxi usage
- booking metadata

Travel systems frequently expose:
- airport codes
- travel classes
- booking channels
- inconsistent distance information

---

## Chosen Format

CSV travel reporting export.

Example columns:
- Traveler
- Travel Type
- Origin
- Destination
- Distance
- Travel Date
- Booking Platform

---

## Why This Format Was Chosen

CSV exports are common for:
- expense reporting
- sustainability reporting
- corporate travel reconciliation

Using exports instead of live APIs significantly simplified:
- authentication
- OAuth flows
- sandbox access
- integration complexity

while preserving realistic data structure complexity.

---

## Realistic Behaviors Simulated

The travel dataset intentionally includes:
- flights
- hotels
- rail
- taxis
- suspicious travel distances
- negative values

Examples:
- long-haul flights
- taxi anomalies
- hotel rows without travel distance semantics

---

## Sample Dataset Design

The sample data simulates:
- international travel
- multimodal transport
- multiple booking platforms
- different travel categories

The dataset intentionally references:
- Concur
- Navan
- Uber Business

to reflect realistic enterprise tooling.

---

## Production Limitations

A real deployment would likely require:
- airport distance lookup services
- emissions factor mapping
- travel-class weighting
- duplicate booking detection
- timezone normalization
- API synchronization

---

# Overall Ingestion Philosophy

The prototype intentionally prioritized:
- realistic data ingestion
- normalization architecture
- auditability
- analyst workflows

over:
- perfect integrations
- infrastructure complexity
- production-scale processing

The implementation focuses on demonstrating how a centralized ESG platform can normalize inconsistent enterprise operational data into a unified analyst review workflow.