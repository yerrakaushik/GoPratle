import { z } from 'zod';

const plannerDetailsSchema = z.object({
  planningScope: z.enum([
    'full_planning',
    'partial_planning',
    'day_of_coordination',
    'consultation_only',
  ], {
    required_error: 'Planning scope is required',
  }),
  estimatedGuestCount: z.coerce
    .number({ invalid_type_error: 'Guest count must be a number' })
    .int('Guest count must be an integer')
    .min(1, 'Guest count must be at least 1'),
  overallBudget: z.string().min(1, 'Budget range or amount is required'),
  themeOrVibe: z.string().optional().default(''),
  servicesNeeded: z.array(z.string()).optional().default([]),
  decorPreferences: z.string().optional().default(''),
  additionalNotes: z.string().optional().default(''),
});

const performerDetailsSchema = z.object({
  performerType: z.enum([
    'band',
    'solo_vocalist',
    'dj',
    'comedian',
    'dancer',
    'magician',
    'mc_host',
    'instrumentalist',
    'other',
  ], {
    required_error: 'Performer type is required',
  }),
  genreOrStyle: z.string().min(1, 'Genre or style is required'),
  performanceDuration: z.string().min(1, 'Performance duration is required'),
  expectedPerformanceTime: z.string().optional().default(''),
  soundEquipmentProvided: z.enum([
    'organizer_provides_full_pa',
    'performer_must_bring_gear',
    'venue_inhouse_basic',
    'needs_discussion',
  ]).default('needs_discussion'),
  soundcheckRequired: z.boolean().optional().default(true),
  soundcheckTime: z.string().optional().default(''),
  performanceFeeBudget: z.string().min(1, 'Performance fee / budget is required'),
  repertoireNotes: z.string().optional().default(''),
});

const crewDetailsSchema = z.object({
  rolesNeeded: z.array(z.string()).min(1, 'At least one crew role must be selected'),
  headcount: z.coerce
    .number({ invalid_type_error: 'Headcount must be a number' })
    .int('Headcount must be an integer')
    .min(1, 'Headcount must be at least 1'),
  shiftCallTime: z.string().min(1, 'Shift call time is required'),
  eventDaysCount: z.coerce.number().int().min(1).optional().default(1),
  experienceLevel: z.enum(['entry_level', 'intermediate', 'expert_certified']).default('intermediate'),
  certificationsRequired: z.string().optional().default(''),
  mealsProvided: z.boolean().optional().default(false),
  transportProvided: z.boolean().optional().default(false),
  dressCode: z.enum([
    'all_black_stage_crew',
    'smart_casual',
    'formal_suit',
    'hi_vis_safety',
    'no_preference',
  ]).default('all_black_stage_crew'),
  compensationRate: z.string().min(1, 'Compensation rate is required'),
  additionalInstructions: z.string().optional().default(''),
});

export const createRequirementSchema = z
  .object({
    eventName: z
      .string({ required_error: 'Event name is required' })
      .trim()
      .min(3, 'Event name must be at least 3 characters')
      .max(120, 'Event name cannot exceed 120 characters'),
    eventType: z
      .string({ required_error: 'Event type is required' })
      .trim()
      .min(2, 'Please select or enter an event type'),
    isDateRange: z.boolean().optional().default(false),
    startDate: z.coerce.date({ required_error: 'Start date is required' }),
    endDate: z.coerce.date().optional().nullable(),
    location: z
      .string({ required_error: 'Location is required' })
      .trim()
      .min(2, 'Location is required'),
    venue: z.string().trim().optional().default(''),
    category: z.enum(['planner', 'performer', 'crew'], {
      required_error: 'Category must be selected (planner, performer, or crew)',
    }),

    // Category specific
    plannerDetails: plannerDetailsSchema.optional(),
    performerDetails: performerDetailsSchema.optional(),
    crewDetails: crewDetailsSchema.optional(),

    // Contact
    contactName: z.string().trim().optional().default(''),
    contactEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
    contactPhone: z.string().trim().optional().default(''),
  })
  .superRefine((data, ctx) => {
    // Validate date range
    if (data.isDateRange) {
      if (!data.endDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End date is required when date range is selected',
          path: ['endDate'],
        });
      } else if (new Date(data.endDate) < new Date(data.startDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End date cannot be earlier than start date',
          path: ['endDate'],
        });
      }
    }

    // Validate category specific details presence
    if (data.category === 'planner' && !data.plannerDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Planner details (Steps 2 & 3) are required for event planner category',
        path: ['plannerDetails'],
      });
    }

    if (data.category === 'performer' && !data.performerDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Performer details (Steps 2 & 3) are required for performer category',
        path: ['performerDetails'],
      });
    }

    if (data.category === 'crew' && !data.crewDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Crew details (Steps 2 & 3) are required for crew category',
        path: ['crewDetails'],
      });
    }
  });

export const validateRequirement = (data) => {
  return createRequirementSchema.safeParse(data);
};
