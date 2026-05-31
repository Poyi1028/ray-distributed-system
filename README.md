
# Ray Uber App

React frontend for a Ray distributed uber-ride-hailing system.

This version is intended to work with the synchronized backend repository. The frontend and backend API contract are tracked together for this branch so the UI implementation can be reviewed alongside the current API design.

## Overview

Ray Uber App contains two frontend views:

- Rider app for creating and tracking ride requests
- Ray admin dashboard for monitoring simulated orders, workers, cluster nodes, and autoscaling status

Routes:

- `/` opens the rider app
- `/admin` opens the Ray admin dashboard

## Current Version Scope

This branch includes:

- React frontend implementation
- Rider-facing ride request flow
- Admin-facing Ray cluster monitoring UI
- API documentation for the synchronized backend version

The backend implementation is maintained separately and should be checked together with this frontend branch when reviewing this version.

## Project Structure

```text
Ray-app/
├── docs/
│   └── uber-api-v3.md
├── public/
├── src/
│   ├── App.js
│   ├── RideApp.jsx
│   ├── RayAdminApp.jsx
│   └── ...
├── package.json
├── package-lock.json
└── README.md
```

## API Document

The API document for this version is included in:

```text
docs/uber-api-v3.md
```

This document should be read together with the synchronized backend repository, because the frontend behavior depends on the backend API contract.

## Requirements

- Node.js
- npm

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm start
```

Open the rider app:

```text
http://localhost:3000
```

Open the admin dashboard:

```text
http://localhost:3000/admin
```

## Build

Create a production build:

```bash
npm run build
```

The production files will be generated in:

```text
build/
```

## Available Scripts

### `npm start`

Runs the app in development mode.

### `npm test`

Runs the test runner.

### `npm run build`

Builds the app for production.

## Branch Note

This work is currently kept on a feature branch and is not intended to be pushed directly to `main`.

Current branch:

```text
frontend/ray-uber-app
```

## Notes

This repository currently focuses on the frontend UI and the API documentation needed for the synchronized frontend-backend version. Future integration work can merge or reference this branch from the backend repository when the implementation is ready.
```