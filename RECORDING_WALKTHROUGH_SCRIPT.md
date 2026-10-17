# 5-7 Minute Video Walkthrough Script
## Assignment: Event Requirement Posting Flow (Next.js + Node.js/Express + MongoDB)

> **Instructions for the Speaker**: Use this script while recording your screen. Follow the timestamps and visual cues to demonstrate the working app, key code files, API requests/responses, and MongoDB data persistence.

---

### ⏱️ Timeline Overview

| Section | Duration | Focus Area |
| :--- | :--- | :--- |
| **1. Intro & Problem Understanding** | 0:00 - 1:00 | Assignment requirements, problem breakdown, architectural approach |
| **2. Key Decisions & Assumptions** | 1:00 - 2:00 | Tech stack, monorepo, dynamic step adaptation, isolated subdocuments |
| **3. Working Application Demo** | 2:00 - 4:15 | Steps 1 to 4 in browser, category switching, validation, submission success |
| **4. Backend Architecture & MongoDB Flow** | 4:15 - 5:30 | Express routes, Zod validator, Mongoose schema, API payload & live query |
| **5. Testing, Edge Cases & Future Roadmap** | 5:30 - 6:45 | Jest test suite, multi-tier DB fallback, limitations, and what to improve |

---

### Detailed Script & Talking Points

#### Part 1: Introduction & Problem Understanding (0:00 – 1:00)
- **Visual Cue**: Show the app homepage at `http://localhost:3000` with the GoPratle logo and Step 1 form.
- **Talking Points**:
  - *"Hello everyone! Today, I’m walking you through my implementation of the Event Requirement Posting Flow for GoPratle."*
  - *"The goal was to build a clean, end-to-end multi-step flow using Next.js on the frontend and Node.js, Express, and MongoDB on the backend."*
  - *"The user journey is structured into 4 steps:*
    - *Step 1 captures the core event basics: name, event type, date or multi-day date range, location, venue, and a category selector for Event Planner, Performer, or Crew.*
    - *Steps 2 & 3 dynamically adapt based on that selection, showing relevant technical specifications for each role.*
    - *Step 4 provides a complete review and sends the data to our Express backend, saving it into MongoDB with clean categorization."*

---

#### Part 2: Key Decisions & Assumptions (1:00 – 2:00)
- **Visual Cue**: Briefly bring up VS Code showing the repository root with `client/` and `server/`.
- **Talking Points**:
  - *"Let me quickly touch upon key technical decisions and assumptions:"*
  1. **Monorepo Architecture**: *"I structured the project as a clean monorepo with `client/` running Next.js App Router with TypeScript and Tailwind CSS, and `server/` running Express and Mongoose. A root `package.json` allows launching both concurrently with `npm run dev`."*
  2. **Category Isolation in MongoDB**: *"Instead of dumping flat or loosely typed fields into a single object, we use dedicated Mongoose subdocuments (`plannerDetails`, `performerDetails`, and `crewDetails`). Whenever a requirement is submitted, only the active category's subdocument is stored, keeping our MongoDB collection normalized and preventing field pollution."*
  3. **Resilient Dual-Tier Database**: *"For seamless evaluation, our backend connects to MongoDB Atlas via `.env`, but if no connection string is provided or local MongoDB isn't running, it automatically boots an in-memory MongoDB instance. This guarantees zero-friction local testing."*
  4. **State Persistence**: *"Form state is synchronized with `localStorage` so a user doesn't lose their input if they accidentally refresh or navigate back and forth."*

---

#### Part 3: Working Application Demo (2:00 – 4:15)
- **Visual Cue**: Back to the browser at `http://localhost:3000`.

- **Demonstration Steps**:
  1. **Step 1 — Event Basics & Category Selector**:
     - *"Here in Step 1, we capture Event Name, Event Type dropdown, Location, and optional Venue."*
     - *"Notice the Multi-day / Date Range checkbox: toggling it enables start and end dates with validation preventing end dates earlier than start dates."*
     - *"Next is the category selector cards: Event Planner, Performer/Artist, and Technical Crew."*
     - *(Click 'Auto-fill Sample Data')*: *"To make testing smooth, I've added an 'Auto-fill Sample Data' helper that populates realistic values."*
     - *(Click 'Continue to Step 2')*.

  2. **Step 2 — Dynamic Adaptation**:
     - *"Notice how the step indicator and form re-configured: because we selected 'Event Planner', Step 2 presents 'Planning Scope & Guest Logistics'. We have Planning Scope cards (Full Planning, Partial, Day-of), an estimated guest count with quick preset buttons, and overall event budget."*
     - *(Click 'Continue to Step 3')*.

  3. **Step 3 — Deliverables & Budget**:
     - *"In Step 3, the fields adapt to 'Services & Decor Expectations'. We have checkboxes for Venue Sourcing, Catering, Decor, AV setup, and custom text areas for decor preferences and special requests."*
     - *(Click 'Review & Submit (Step 4)')*.

  4. **Step 4 — Review, Inspection & MongoDB Submission**:
     - *"Step 4 presents a categorized summary of all details. Users can click 'Edit' to jump directly back to any step."*
     - *(Click 'Inspect MongoDB Payload')*: *"We can open the live JSON inspector to see the exact payload being dispatched to `POST /api/requirements`."*
     - *(Click 'Save & Post Requirement')*: *"When I click Save, we see the loading state, the request reaches Express, and we get an instant confirmation screen with our generated MongoDB Document ID."*

  5. **Live Postings Feed (`/postings`)**:
     - *(Click 'View All Postings in Feed')*: *"Now we navigate to `/postings`. Here we see our newly posted requirement fetched live from MongoDB! We can filter by category (Planners, Performers, Crew), search by keyword, and click on any card to view the complete BSON record in a modal."*

---

#### Part 4: Backend Implementation & MongoDB Flow (4:15 – 5:30)
- **Visual Cue**: Switch to VS Code and show:
  1. `server/src/models/Requirement.js`
  2. `server/src/validators/requirementValidator.js`
  3. `server/src/controllers/requirementController.js`
- **Talking Points**:
  - *"Let's look at the backend implementation:"*
  - **Mongoose Schema (`Requirement.js`)**: *"We define `RequirementSchema` with root fields (`eventName`, `eventType`, `startDate`, `location`, `category`) and three nested subschemas: `PlannerDetailsSchema`, `PerformerDetailsSchema`, and `CrewDetailsSchema`. Required validators conditionally trigger based on the category enum."*
  - **Zod Validator (`requirementValidator.js`)**: *"Before touching the database, the incoming payload is parsed through Zod. We use `.superRefine()` to enforce category presence and date range logic, returning structured field errors if validation fails."*
  - **Controller Sanitization (`requirementController.js`)**: *"In `createRequirement`, we sanitize the object to ensure only the selected category details are committed to MongoDB. We also provide filtering, text search, pagination, and aggregation stats via `GET /api/requirements` and `GET /api/requirements/stats/overview`."*

---

#### Part 5: Testing, Edge Cases, Limitations & Improvements (5:30 – 6:45)
- **Visual Cue**: Run `npm test` in the terminal to show all 8 tests passing.
- **Talking Points**:
  - *"For testing, we have a Jest + Supertest integration suite covering health checks, schema validation, category branching, date range edge cases, and query filters. All 8 tests pass cleanly."*
  - **Edge Cases Handled**:
    - *Switching categories mid-flow cleans up stale fields.*
    - *End dates cannot be earlier than start dates.*
    - *Client and server validation keep error messages consistent and helpful.*
  - **Limitations & Future Improvements**:
    - *Currently, postings are public; adding authentication via Clerk or NextAuth would associate requirements with verified organizer accounts.*
    - *Adding S3/Cloudinary upload support would allow performers to upload audio samples and stage riders directly.*
    - *Adding real-time websockets would notify planners and crew as soon as new matching requirements are posted.*
  - *"Thank you for watching!"*
