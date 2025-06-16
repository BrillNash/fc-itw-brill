# 🕒 Shift Management Web Application

A full-stack web application for managing and scheduling worker shifts with timezone support. Built with **Vue.js** (front-end) and **Node.js + Express** (back-end), and deployed to **Google Cloud Platform** using **Cloud Run**, **Firebase Hosting**, and **Cloud Firestore in Datastore mode** for persistence.

---

## 📦 Features

### ✅ Back-End
- REST API built with Node.js and Express
- Timezone setting using IANA timezone strings
- Worker CRUD (Create, Read, Update, Delete)
- Shift CRUD with validations:
  - Shifts must not overlap per worker
  - Shifts must not exceed 12 hours
  - Timezone-aware start and end datetime handling
- Stores data in **Cloud Firestore (Datastore mode)**
- Timezone updates automatically re-localize all saved shifts

### 🎨 Front-End
- Built with Vue 3 and Tailwind CSS
- Responsive UI for desktop and mobile
- View, add, edit, and delete workers and shifts
- Display shift durations in floating-point hours
- Localized datetime display according to preferred timezone

---

## 🌐 Tech Stack

| Layer        | Technology                           |
|--------------|------------------------------------- |
| Front-End     | Vue 3, Vite, Tailwind CSS           |
| Back-End      | Node.js, Express                    |
| Database      | Firestore (Datastore Mode)          |
| Deployment    | Firebase Hosting, Cloud Run (Docker)|
| Other Tools   | Google Cloud SDK                    |

---

## 🚀 Deployment

### Firebase Hosting (Front-End)

```bash
cd frontend
npm install
npm run build
firebase deploy
