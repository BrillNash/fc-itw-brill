# 🛠️ Shift Management Backend

This is the back-end API for the Shift Management System. It is built with **Node.js**, **Express**, and **Google Cloud Datastore (Firestore in Datastore Mode)**. The service provides RESTful endpoints for managing workers, working shifts, and timezone settings, and is designed to be deployed on **Google Cloud Run**.

---

## 📆 Features

- 🧑 Worker CRUD (Create, Read, Update, Delete)
- 🥒 Shift CRUD with:
  - Non-overlapping validation
  - Duration capped to 12 hours
  - Timezone-aware datetime handling
- 🌍 Timezone configuration using valid IANA strings
- 🧪 Request validation using [Zod](https://zod.dev/)
- 🧱 Uses Google Cloud Datastore in Datastore mode
- ☁️ Deployable to Google Cloud Run

---

## 📁 Project Structure

```
backend/
│
├── config/               # Datastore configuration
├── controllers/          # Route handlers
├── errors/               # Custom error classes
├── middlewares/          # Validation and error handling middleware
├── routes/               # Express route modules
├── schemas/              # Zod validation schemas
├── services/             # Business logic and utilities
├── index.ts              # Entry point (Express setup)
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 2. Set Environment Variables

Create a `.env.local` file or export the following variables manually:

```env
GOOGLE_APPLICATION_CREDENTIALS=./path/to/your-service-account.json
PORT=8080
```

### 3. Start the Server

```bash
pnpm dev
# or
npm run dev
```

Server will start at: [http://localhost:8080](http://localhost:8080)

---

## 🥪 API Endpoints

### 🧑 Workers
| Method | Endpoint           | Description             |
|--------|--------------------|-------------------------|
| POST   | `/api/workers`     | Create a new worker     |
| GET    | `/api/workers`     | List all workers        |
| PUT    | `/api/workers/:id` | Update a worker by ID   |
| DELETE | `/api/workers/:id` | Delete a worker by ID   |

### 🥒 Shifts
| Method | Endpoint            | Description             |
|--------|---------------------|-------------------------|
| POST   | `/api/shifts`       | Create a new shift      |
| GET    | `/api/shifts`       | List all shifts         |
| PUT    | `/api/shifts/:id`   | Update a shift by ID    |
| DELETE | `/api/shifts/:id`   | Delete a shift by ID    |

### 🌍 Timezone
| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| GET    | `/api/timezone`    | Get the current timezone  |
| POST   | `/api/timezone`    | Set the preferred timezone|

---

## 🔍 Shift Validation Rules

- Shifts must not exceed **12 hours** in duration
- Shifts **cannot overlap** with other shifts for the same worker
- Start and end times are localized based on the configured timezone
- Shift duration is computed in **floating point hours**

---

## ✨ Deployment to Google Cloud Run

### Build and Deploy

```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/backend

gcloud run deploy fc-itw-brill \
  --image gcr.io/YOUR_PROJECT_ID/shift-api \
  --platform managed \
  --region YOUR_REGION \
  --allow-unauthenticated
```

> Requires that Google Cloud SDK and billing are configured properly.

---

## 🛡️ Powered By

- Node.js + Express
- Zod (schema validation)
- Google Cloud Datastore
- Luxon (for datetime & timezone logic)
- Google Cloud Run

---

## 📄 License

MIT © 2025 Brill Nash

---

## 👤 Author

**Brill Nash**  
https://github.com/BrillNash

