import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import app from '../src/app.js';
import { connectDB, disconnectDB } from '../src/config/db.js';
import Requirement from '../src/models/Requirement.js';

beforeAll(async () => {
  await connectDB();
  await Requirement.deleteMany({});
}, 60000);

afterAll(async () => {
  await Requirement.deleteMany({});
  await disconnectDB();
});

describe('GoPratle Requirement Posting API Test Suite', () => {
  describe('Health Check Endpoint', () => {
    it('should return healthy status and database info', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body.database).toBeDefined();
    });
  });

  describe('POST /api/requirements - Validation & Creation', () => {
    it('should reject request when Step 1 required fields are missing', async () => {
      const res = await request(app).post('/api/requirements').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
    });

    it('should successfully create an Event Planner requirement', async () => {
      const payload = {
        eventName: 'Grand Annual Tech Gala 2026',
        eventType: 'Corporate Event',
        isDateRange: false,
        startDate: '2026-11-20',
        location: 'Bengaluru, Karnataka',
        venue: 'The Leela Palace Ballroom',
        category: 'planner',
        contactName: 'Ananya Sharma',
        contactEmail: 'ananya@techgala.io',
        contactPhone: '+91 98765 43210',
        plannerDetails: {
          planningScope: 'full_planning',
          estimatedGuestCount: 350,
          overallBudget: '₹15,00,000 - ₹20,00,000',
          themeOrVibe: 'Futuristic Cyber Luxury',
          servicesNeeded: ['Venue Sourcing', 'Decor & Florals', 'Catering & Bar', 'On-site Coordination'],
          decorPreferences: 'Metallic silver, deep neon indigo accents, LED backdrops',
          additionalNotes: 'Need VIP protocol handling for keynote speakers.',
        },
      };

      const res = await request(app).post('/api/requirements').send(payload);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.category).toBe('planner');
      expect(res.body.data.eventName).toBe(payload.eventName);
      expect(res.body.data.plannerDetails).toBeDefined();
      expect(res.body.data.plannerDetails.planningScope).toBe('full_planning');
      expect(res.body.data.performerDetails).toBeUndefined();
      expect(res.body.data.crewDetails).toBeUndefined();
    });

    it('should successfully create a Performer requirement', async () => {
      const payload = {
        eventName: 'Sunset Indie Music Fest',
        eventType: 'Music Festival',
        isDateRange: true,
        startDate: '2026-12-05',
        endDate: '2026-12-06',
        location: 'Goa',
        venue: 'Vagator Beach Arena',
        category: 'performer',
        contactName: 'Kabir Verma',
        contactEmail: 'kabir@sunsetfest.in',
        performerDetails: {
          performerType: 'band',
          genreOrStyle: 'Indie Rock / Alternative Hindi Fusion',
          performanceDuration: '75 minutes headline set',
          expectedPerformanceTime: '8:30 PM - 9:45 PM',
          soundEquipmentProvided: 'organizer_provides_full_pa',
          soundcheckRequired: true,
          soundcheckTime: '4:00 PM',
          performanceFeeBudget: '₹1,50,000',
          repertoireNotes: 'Must play originals plus 2-3 popular crowd covers.',
        },
      };

      const res = await request(app).post('/api/requirements').send(payload);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.category).toBe('performer');
      expect(res.body.data.performerDetails.performerType).toBe('band');
    });

    it('should successfully create a Crew requirement', async () => {
      const payload = {
        eventName: 'Global Developer Summit 2026',
        eventType: 'Conference',
        isDateRange: false,
        startDate: '2026-10-30',
        location: 'Hyderabad, Telangana',
        venue: 'HICC Novotel',
        category: 'crew',
        crewDetails: {
          rolesNeeded: ['Sound Engineer', 'Lighting Operator', 'Stagehand / Rigger'],
          headcount: 8,
          shiftCallTime: '07:00 AM - 08:00 PM',
          eventDaysCount: 2,
          experienceLevel: 'expert_certified',
          certificationsRequired: 'Dante Level 2 audio certification preferred',
          mealsProvided: true,
          transportProvided: true,
          dressCode: 'all_black_stage_crew',
          compensationRate: '₹4,500 per person/day',
          additionalInstructions: 'Check-in with Production Lead at Gate 3.',
        },
      };

      const res = await request(app).post('/api/requirements').send(payload);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.category).toBe('crew');
      expect(res.body.data.crewDetails.headcount).toBe(8);
      expect(res.body.data.crewDetails.rolesNeeded).toHaveLength(3);
    });

    it('should reject when endDate is earlier than startDate in date range', async () => {
      const invalidPayload = {
        eventName: 'Invalid Date Festival',
        eventType: 'Concert',
        isDateRange: true,
        startDate: '2026-12-10',
        endDate: '2026-12-05',
        location: 'Mumbai',
        category: 'performer',
        performerDetails: {
          performerType: 'dj',
          genreOrStyle: 'EDM',
          performanceDuration: '60 minutes',
          performanceFeeBudget: '₹50,000',
        },
      };

      const res = await request(app).post('/api/requirements').send(invalidPayload);
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/requirements - Query, Filter & Stats', () => {
    it('should retrieve list of requirements and filter by category', async () => {
      const res = await request(app).get('/api/requirements?category=planner');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      res.body.data.forEach((item) => {
        expect(item.category).toBe('planner');
      });
    });

    it('should retrieve category overview stats', async () => {
      const res = await request(app).get('/api/requirements/stats/overview');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.total).toBeGreaterThanOrEqual(3);
      expect(res.body.data.categories.planner).toBeGreaterThanOrEqual(1);
      expect(res.body.data.categories.performer).toBeGreaterThanOrEqual(1);
      expect(res.body.data.categories.crew).toBeGreaterThanOrEqual(1);
    });
  });
});
