// In-memory data store for Vercel Next.js edge/serverless execution
export interface RequirementItem {
  _id: string;
  eventName: string;
  eventType: string;
  isDateRange: boolean;
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  category: 'planner' | 'performer' | 'crew';
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  status: 'draft' | 'published' | 'closed';
  plannerDetails?: Record<string, any>;
  performerDetails?: Record<string, any>;
  crewDetails?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Global variable to persist in-memory across hot function invocations
declare global {
  // eslint-disable-next-line no-var
  var __GOPRATLE_STORE__: RequirementItem[] | undefined;
}

const initialSeed: RequirementItem[] = [
  {
    _id: '67b31e9c20a104f215000001',
    eventName: 'Royal Heritage Palace Wedding & Sangeet',
    eventType: 'Wedding',
    isDateRange: true,
    startDate: '2026-11-20',
    endDate: '2026-11-23',
    location: 'Udaipur, Rajasthan',
    venue: 'Taj Lake Palace & Jagmandir Island',
    category: 'planner',
    contactName: 'Rohit & Natasha Singhania',
    contactEmail: 'rohit.singhania@weddingcelebrate.com',
    contactPhone: '+91 98200 12345',
    status: 'published',
    plannerDetails: {
      planningScope: 'full_planning',
      estimatedGuestCount: 450,
      overallBudget: '₹45,00,000 - ₹60,00,000',
      themeOrVibe: 'Royal Rajputana Heritage meets Modern Crystal Luxury',
      servicesNeeded: [
        'Venue Sourcing',
        'Decor & Florals',
        'Catering & Bar',
        'Audio/Visual Setup',
        'On-site Coordination',
        'Guest Logistics & Hospitality'
      ],
      decorPreferences: 'Mogra & lotus flower installations, floating candles, mirror work mandap',
      additionalNotes: 'Need 24/7 dedicated guest concierge and airport transfer coordination.'
    },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: '67b31e9c20a104f215000002',
    eventName: 'Neon Horizons Electronic & Rock Night',
    eventType: 'Concert',
    isDateRange: false,
    startDate: '2026-12-05',
    location: 'Mumbai, Maharashtra',
    venue: 'Jio World Garden, BKC',
    category: 'performer',
    contactName: 'Vikramaditya Roy',
    contactEmail: 'vikram@neonhorizons.live',
    contactPhone: '+91 98111 54321',
    status: 'published',
    performerDetails: {
      performerType: 'band',
      genreOrStyle: 'Electropop / Progressive Hindi Rock',
      performanceDuration: '90 minutes prime-time headline set',
      expectedPerformanceTime: '9:00 PM - 10:30 PM',
      soundEquipmentProvided: 'organizer_provides_full_pa',
      soundcheckRequired: true,
      soundcheckTime: '4:00 PM',
      performanceFeeBudget: '₹2,50,000 + Hospitality',
      repertoireNotes: 'High-energy rock anthems with live synth breakdowns. 1 encore track planned.'
    },
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    _id: '67b31e9c20a104f215000003',
    eventName: 'National FinTech Expo 2026',
    eventType: 'Exhibition',
    isDateRange: true,
    startDate: '2026-12-15',
    endDate: '2026-12-17',
    location: 'Bengaluru, Karnataka',
    venue: 'Bangalore International Exhibition Centre (BIEC)',
    category: 'crew',
    contactName: 'Priya Nambiar (Operations Head)',
    contactEmail: 'priya.n@fintechexpo.in',
    contactPhone: '+91 99000 88776',
    status: 'published',
    crewDetails: {
      rolesNeeded: [
        'Sound Engineer',
        'Lighting Operator',
        'Videographer / Camera Operator',
        'Stagehand / Rigger',
        'Hospitality & Usher'
      ],
      headcount: 12,
      shiftCallTime: '07:30 AM - 08:30 PM (Daily)',
      eventDaysCount: 3,
      experienceLevel: 'intermediate',
      certificationsRequired: 'Live console operations, AV cabling standards & safety protocol',
      mealsProvided: true,
      transportProvided: true,
      dressCode: 'all_black_stage_crew',
      compensationRate: '₹3,800 per technician / day',
      additionalInstructions: 'Report to Production Hub in Hall 2 for badge pickup and briefing.'
    },
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  }
];

export function getStore(): RequirementItem[] {
  if (!global.__GOPRATLE_STORE__) {
    global.__GOPRATLE_STORE__ = [...initialSeed];
  }
  return global.__GOPRATLE_STORE__;
}

export function addRequirement(data: Partial<RequirementItem>): RequirementItem {
  const store = getStore();
  const idHex = Array.from({ length: 24 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');

  const now = new Date().toISOString();
  const newDoc: RequirementItem = {
    _id: idHex,
    eventName: data.eventName || '',
    eventType: data.eventType || 'Other',
    isDateRange: Boolean(data.isDateRange),
    startDate: data.startDate || new Date().toISOString().split('T')[0],
    endDate: data.isDateRange ? data.endDate : undefined,
    location: data.location || '',
    venue: data.venue || '',
    category: data.category || 'planner',
    contactName: data.contactName || '',
    contactEmail: data.contactEmail || '',
    contactPhone: data.contactPhone || '',
    status: 'published',
    plannerDetails: data.category === 'planner' ? data.plannerDetails : undefined,
    performerDetails: data.category === 'performer' ? data.performerDetails : undefined,
    crewDetails: data.category === 'crew' ? data.crewDetails : undefined,
    createdAt: now,
    updatedAt: now,
  };

  store.unshift(newDoc);
  return newDoc;
}
