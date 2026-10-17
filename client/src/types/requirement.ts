export type CategoryType = 'planner' | 'performer' | 'crew';

export type PlanningScopeType =
  | 'full_planning'
  | 'partial_planning'
  | 'day_of_coordination'
  | 'consultation_only';

export type PerformerActType =
  | 'band'
  | 'solo_vocalist'
  | 'dj'
  | 'comedian'
  | 'dancer'
  | 'magician'
  | 'mc_host'
  | 'instrumentalist'
  | 'other';

export type SoundEquipmentType =
  | 'organizer_provides_full_pa'
  | 'performer_must_bring_gear'
  | 'venue_inhouse_basic'
  | 'needs_discussion';

export type CrewExperienceLevel = 'entry_level' | 'intermediate' | 'expert_certified';

export type DressCodeType =
  | 'all_black_stage_crew'
  | 'smart_casual'
  | 'formal_suit'
  | 'hi_vis_safety'
  | 'no_preference';

export interface PlannerDetails {
  planningScope: PlanningScopeType;
  estimatedGuestCount: number;
  overallBudget: string;
  themeOrVibe: string;
  servicesNeeded: string[];
  decorPreferences: string;
  additionalNotes: string;
}

export interface PerformerDetails {
  performerType: PerformerActType;
  genreOrStyle: string;
  performanceDuration: string;
  expectedPerformanceTime: string;
  soundEquipmentProvided: SoundEquipmentType;
  soundcheckRequired: boolean;
  soundcheckTime: string;
  performanceFeeBudget: string;
  repertoireNotes: string;
}

export interface CrewDetails {
  rolesNeeded: string[];
  headcount: number;
  shiftCallTime: string;
  eventDaysCount: number;
  experienceLevel: CrewExperienceLevel;
  certificationsRequired: string;
  mealsProvided: boolean;
  transportProvided: boolean;
  dressCode: DressCodeType;
  compensationRate: string;
  additionalInstructions: string;
}

export interface RequirementFormData {
  // Step 1: Event Basics
  eventName: string;
  eventType: string;
  isDateRange: boolean;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  category: CategoryType;

  // Contact Info
  contactName: string;
  contactEmail: string;
  contactPhone: string;

  // Step 2 & 3: Category-specific
  plannerDetails: PlannerDetails;
  performerDetails: PerformerDetails;
  crewDetails: CrewDetails;
}

export interface RequirementDocument extends RequirementFormData {
  _id: string;
  id?: string;
  status: 'open' | 'in_review' | 'fulfilled' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: Array<{ field?: string; message: string }> | string[];
}

export interface PaginatedRequirementsResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: RequirementDocument[];
}

export interface StatsOverviewResponse {
  success: boolean;
  data: {
    total: number;
    categories: {
      planner: number;
      performer: number;
      crew: number;
    };
  };
}
