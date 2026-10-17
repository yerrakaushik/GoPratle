# GoPratle — Event Requirement Posting Flow

A full-stack, adaptive event requirement posting engine built with **Next.js (React 19, TypeScript, Tailwind CSS)** on the frontend and **Node.js, Express, and MongoDB (Mongoose, Zod)** on the backend.

---

## 🌟 Key Highlights

- **Dynamic 4-Step Wizard**:
  - **Step 1 — Event Basics**: Event name, type selector, single-day vs. date range picker, location (city/state), optional venue, and category selector (**Event Planner**, **Performer**, or **Technical Crew**).
  - **Steps 2 & 3 — Category-Adaptive Fields**: Dynamically re-renders form inputs, constraints, and validation schemas based on the selected category:
    - **Event Planner**: Planning scope (full, partial, day-of), guest counts, total production budgets, theme/vibe, and specific service checkboxes (decor, catering, venue sourcing, run-of-show).
    - **Performer / Artist**: Act type (band, solo vocalist, DJ, comedian, dancer, MC), performance duration, genre/style, soundcheck call time, sound/PA provisions, artist fee budget, and repertoire notes.
    - **Technical Crew**: Technical roles (sound engineer, lighting operator, stagehand/rigger, videographer), total headcount, shift call times, experience levels, certifications, meal/transport provisions, dress code, and compensation rates.
  - **Step 4 — Review & Submission**: Summary cards with category-specific breakdown, real-time MongoDB payload inspector, robust validation feedback, and transmission to the backend.
- **Clean MongoDB Data Isolation**:
  - Category data is stored under dedicated subdocuments (`plannerDetails`, `performerDetails`, `crewDetails`).
  - Switching categories automatically strips inactive subdocuments during sanitation to eliminate schema bloat and prevent data cross-contamination.
- **Dual-Tier Resilient Backend**:
  - Connects to **MongoDB Atlas** or local MongoDB via `MONGODB_URI`.
  - Automatically falls back to an embedded **MongoDB Memory Server** for immediate, zero-config local evaluation and testing without requiring Docker or a local `mongod` service!
- **Browse Postings Feed & Inspector (`/postings`)**:
  - View all stored requirements live from MongoDB.
  - Category filter tabs (**All**, **Event Planner**, **Performer**, **Crew**), search bar, aggregate stats metrics, and a full BSON/JSON document inspection modal.

---

## 🏗️ Architecture & Project Structure

```text
GoPratle/
├── package.json              # Root runner (concurrently running client & server)
├── .gitignore                # Production git ignore configuration
├── client/                   # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx      # Main 4-step wizard page
│   │   │   ├── postings/     # Live requirements feed & dashboard
│   │   │   ├── globals.css   # Tailwind CSS setup
│   │   │   └── layout.tsx    # Root HTML layout with Geist font
│   │   ├── components/
│   │   │   ├── Navbar.tsx    # Responsive header with live API status pill
│   │   │   ├── StepIndicator.tsx # Visual wizard stepper with category-reactive labels
│   │   │   ├── steps/
│   │   │   │   ├── Step1EventBasics.tsx        # Event details & Category selector
│   │   │   │   ├── Step2CategorySpecific.tsx   # Adaptive scope & specs
│   │   │   │   ├── Step3CategorySpecific.tsx   # Adaptive deliverables & budget
│   │   │   │   ├── Step4ReviewSubmit.tsx       # Summary review & JSON inspector
│   │   │   │   └── SubmissionSuccess.tsx       # Post-submission confirmation
│   │   │   └── postings/
│   │   │       └── RequirementModal.tsx        # Detail viewer modal with raw JSON
│   │   ├── context/
│   │   │   └── FormContext.tsx # Multi-step state, localStorage sync, validation & autofill
│   │   ├── services/
│   │   │   └── api.ts        # Typed API service client
│   │   └── types/
│   │       └── requirement.ts # TypeScript interfaces & schemas
│   └── package.json
└── server/                   # Node.js + Express Backend
    ├── src/
    │   ├── config/
    │   │   └── db.js         # Multi-tier resilient MongoDB connection manager
    │   ├── models/
    │   │   └── Requirement.js# Mongoose schema with category subdocuments
    │   ├── validators/
    │   │   └── requirementValidator.js # Zod validation schemas
    │   ├── controllers/
    │   │   └── requirementController.js # Requirement CRUD & category stats
    │   ├── routes/
    │   │   └── requirementRoutes.js     # API endpoints
    │   ├── app.js            # Express app configuration & middleware
    │   └── server.js         # Port listener & graceful shutdown
    ├── tests/
    │   └── requirement.test.js # Jest + Supertest integration tests
    ├── .env.example          # Environment variable template
    └── package.json
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.x or v20+ recommended, tested on Node v24)
- **npm** (v9+)
- *(Optional)* MongoDB connection string or local MongoDB instance (An in-memory MongoDB server runs automatically if none is provided).

### 1. Clone & Install Dependencies

```bash
git clone <your-repo-url>
cd GoPratle

# Install root, server, and client dependencies in one command
npm run install:all
```

### 2. Configure Environment Variables (Optional)

In `server/.env` (a pre-configured default is already provided):
```env
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3000

# Leave empty for automatic zero-config in-memory MongoDB
# Or provide your MongoDB Atlas URI:
# MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/gopratle?retryWrites=true&w=majority
MONGODB_URI=
```

In `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run Development Servers Concurrently

From the root directory:
```bash
npm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🧪 Testing Backend API

The backend includes a comprehensive integration test suite covering health checks, schema validation, category isolation, date ranges, filtering, and aggregation.

```bash
# Run tests from the root
npm run test:server

# Or directly within server directory
cd server && npm test
```

---

## 📡 API Reference

### Health Check
- **`GET /api/health`**
  - Returns backend server status, uptime, and database connection state (`connected`, `isMemoryDB: true/false`).

### Create Requirement
- **`POST /api/requirements`**
  - **Body (Planner example)**:
    ```json
    {
      "eventName": "Elysium Grand Wedding & Sangeet",
      "eventType": "Wedding",
      "isDateRange": true,
      "startDate": "2026-11-16",
      "endDate": "2026-11-18",
      "location": "Udaipur, Rajasthan",
      "venue": "Taj Lake Palace",
      "category": "planner",
      "contactName": "Rohit Singhania",
      "contactEmail": "rohit@example.com",
      "contactPhone": "+91 98200 12345",
      "plannerDetails": {
        "planningScope": "full_planning",
        "estimatedGuestCount": 350,
        "overallBudget": "₹45,00,000 - ₹60,00,000",
        "themeOrVibe": "Royal Rajputana Heritage",
        "servicesNeeded": ["Venue Sourcing", "Decor & Florals", "Catering & Bar"],
        "decorPreferences": "Pastel florals and floating candles",
        "additionalNotes": "Airport VIP transfer coordination required."
      }
    }
    ```
  - **Response (`201 Created`)**:
    ```json
    {
      "success": true,
      "message": "Requirement successfully posted under category 'planner'",
      "data": {
        "_id": "6ad31220160e455d8e71e839",
        "eventName": "Elysium Grand Wedding & Sangeet",
        "category": "planner",
        "status": "open",
        "createdAt": "2026-10-17T06:14:15.000Z",
        ...
      }
    }
    ```

### List Requirements
- **`GET /api/requirements`**
  - **Query Parameters**:
    - `category`: `planner` | `performer` | `crew`
    - `search`: Filter by event name, city, venue, or event type
    - `page`, `limit`: Pagination parameters

### Get Requirement by ID
- **`GET /api/requirements/:id`**

### Category Overview Statistics
- **`GET /api/requirements/stats/overview`**
  - Returns total count and breakdowns per category (`planner`, `performer`, `crew`).

---

## 🛡️ Edge Cases & Design Decisions

| Scenario / Edge Case | Handled Behavior |
| :--- | :--- |
| **Category Switching Mid-Form** | When a user switches between Planner, Performer, and Crew, the backend validator and controller strip any inactive subdocuments. In MongoDB, only the active category's subdocument is stored. |
| **Multi-Day Date Range Validation** | If the user toggles a date range, the client and backend enforce that `endDate` is provided and is greater than or equal to `startDate`. |
| **Accidental Refresh / Back Navigation** | Form data is automatically debounced and synced to browser `localStorage`, ensuring user inputs are preserved across page reloads. |
| **Zero-Config Database Fallback** | If MongoDB Atlas is unreachable or local `mongod` is not installed, the server automatically starts an embedded in-memory MongoDB instance to ensure immediate functionality. |
| **Granular Validation Errors** | Missing fields in Steps 1, 2, or 3 are highlighted inline on the relevant inputs before proceeding, with server-side Zod errors returned as structured JSON arrays. |

---

## 🔮 Future Improvements

1. **User Authentication & Role-Based Access Control**:
   - Integration with Clerk or NextAuth.js to authenticate event hosts and link posted requirements to organizer profiles.
2. **Real-Time Bids & Inquiries**:
   - WebSocket / Socket.io notifications allowing performers and crew to submit proposals directly on posted requirements.
3. **File & Rider Attachments**:
   - Direct S3 / Cloudinary upload support for technical stage riders, venue layout blueprints, and moodboard images.
4. **Export & Sharing**:
   - One-click PDF generation for requirement briefs and instant WhatsApp/Email share links.

---

## 🌐 Deployment Instructions

### Deploy Frontend (Vercel)
1. Push this repository to GitHub.
2. In the Vercel Dashboard, import the repository and set the **Root Directory** to `client`.
3. Add the environment variable:
   `NEXT_PUBLIC_API_URL=https://<your-backend-domain>/api`
4. Click **Deploy**.

### Deploy Backend (Render / Railway)
1. Create a Web Service pointing to the `server` directory.
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Add environment variables:
   - `PORT=5000`
   - `MONGODB_URI=<your-mongodb-atlas-connection-string>`
   - `CLIENT_ORIGIN=https://<your-vercel-app>.vercel.app`
