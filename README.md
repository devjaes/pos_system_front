# SRI-Compliant POS — Frontend (2023)

> Point-of-sale web client for small Ecuadorian retailers, with inventory management and SRI-validated electronic invoicing.

## Overview

Point-of-sale workflow for small retailers: catalog browsing, cart, checkout, and on-sale emission of SRI-validated XML electronic invoices. Replaces spreadsheet inventory and end-of-month manual tax filings with a single transactional flow.

SRI (Servicio de Rentas Internas) is the Ecuadorian tax authority; every sale must produce a schema-valid XML invoice.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 13 (Pages-era setup, `src/app`) |
| Language | TypeScript |
| Styles | Tailwind CSS 3, Sass |
| State | Redux Toolkit, React Context |
| UI | PrimeReact, Headless UI, Heroicons |
| Forms | react-hook-form |
| PDF | @react-pdf/renderer |
| HTTP | axios |
| Backend (separate repo) | Spring Boot + PostgreSQL |

## Repo scope

This repo is the **frontend** only. The backend (Spring Boot + PostgreSQL, emitting SRI-validated XML and archiving documents on AWS S3) lives in a separate private repo.

## Local setup

Requires Node.js 18+ and a running backend reachable from the frontend (configured via `config/serverConfig.ts` / environment).

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # next lint
```

App runs on `http://localhost:3000`.

## Status

Earlier project (2023). Built for Ecuadorian SMB retailers. Kept public for career timeline; not actively maintained.

## Demo

[YouTube demo](https://www.youtube.com/watch?v=BqeJK45yrGA)

## Portfolio

[Project entry on devjaes.dev →](https://devjaes.dev/work/pos-system)
