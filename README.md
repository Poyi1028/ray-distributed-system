# Ray Uber App

Ray Uber App is a React frontend for a distributed ride-hailing demo built around Ray-style worker orchestration.

The project demonstrates how a ride order can move through a distributed system: a user creates a ride request, the system assigns and updates the order status, and an admin dashboard observes the cluster, workers, queue pressure, CPU usage, and autoscaling behavior.

## What This Project Does

- Provides a rider UI for creating and tracking ride orders.
- Provides an admin UI for monitoring orders, workers, cluster metrics, and scaling events.
- Supports mock data for frontend-only demos and real backend APIs for integration.
- Uses WebSocket updates for live order and cluster status changes.

## Screens

- `/` - rider app
- `/admin` - Ray admin dashboard

## Rider App

The rider app simulates a user-facing Uber-like flow:

- Enter pickup and destination locations.
- View estimated wait time and surge status.
- Choose a ride type.
- Create a ride order.
- Track the order through statuses such as pending, matching, driver assigned, on trip, and completed.

## Admin Dashboard

The admin dashboard is used to observe the distributed system:

- Recent and active orders.
- Worker node status.
- CPU usage and pending task demand.
- Autoscaling cooldown state.
- Scaling history and cluster activity.

## API Modes

The frontend can run in two modes:

| Mode | Purpose | Source |
| --- | --- | --- |
| Mock API | Run and demo the UI without a backend | `src/api/mockApi.js` |
| Real API | Connect to the backend API and WebSocket server | `src/api/realApi.js` |

The selected mode is controlled by `REACT_APP_USE_MOCK_API`.

```text
.env.development  REACT_APP_USE_MOCK_API=true
.env.production   REACT_APP_USE_MOCK_API=false
```

## Backend Connection

When using the real API mode, the frontend connects to:

```text
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8000/ws
```

The backend API contract is documented in:

```text
docs/uber-api-v3.md
```

Main backend endpoints used by the app:

- `GET /cluster/eta` - estimated wait time and surge status.
- `POST /orders` - create a ride order.
- `GET /orders` - fetch orders for the admin dashboard.
- `GET /cluster/status` - fetch worker and cluster metrics.
- `GET /cluster/scaling-history` - fetch scaling events.
- `WS /ws` - receive live order and cluster updates.

## Project Structure

```text
Ray-app/
├── docs/
│   └── uber-api-v3.md
├── public/
├── src/
│   ├── api/
│   │   ├── api.js
│   │   ├── mockApi.js
│   │   └── realApi.js
│   ├── App.js
│   ├── RayAdminApp.jsx
│   ├── RideApp.jsx
│   └── ...
├── .env.development
├── .env.production
├── package.json
├── package-lock.json
└── README.md
```

## Requirements

- Node.js
- npm

## Installation

```bash
npm install
```

## Development

Start the local development server:

```bash
npm start
```

Open:

```text
http://localhost:3000
http://localhost:3000/admin
```

Development mode uses mock API data by default, so the frontend can be run without starting the backend.

## Production Build

```bash
npm run build
```

Production output is generated in:

```text
build/
```

Production mode uses the real API implementation unless `REACT_APP_USE_MOCK_API=true` is explicitly set.

## Available Scripts

### `npm start`

Runs the app in development mode.

### `npm test`

Runs the test runner.

### `npm run build`

Builds the app for production.

## Branch Note

Current branch:

```text
refactor/app-structure
```

This branch contains the React frontend and API integration structure for the Ray Uber distributed ride-hailing demo.
