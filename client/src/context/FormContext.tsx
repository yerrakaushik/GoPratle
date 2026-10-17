'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  CategoryType,
  RequirementDocument,
  RequirementFormData,
} from '../types/requirement';
import { api } from '../services/api';

const STORAGE_KEY = 'gopratle_posting_form_state';

const defaultFormData: RequirementFormData = {
  eventName: '',
  eventType: 'Wedding',
  isDateRange: false,
  startDate: '',
  endDate: '',
  location: '',
  venue: '',
  category: 'planner',

  contactName: '',
  contactEmail: '',
  contactPhone: '',

  plannerDetails: {
    planningScope: 'full_planning',
    estimatedGuestCount: 200,
    overallBudget: '₹10,00,000 - ₹15,00,000',
    themeOrVibe: 'Contemporary Royal Elegance',
    servicesNeeded: ['Venue Sourcing', 'Catering & Bar', 'Decor & Florals', 'On-site Coordination'],
    decorPreferences: 'Pastel florals, warm ambient fairy lights, minimalist stage layout',
    additionalNotes: 'Need assistance with guest RSVP coordination.',
  },

  performerDetails: {
    performerType: 'band',
    genreOrStyle: 'Bollywood Rock / Sufi Fusion',
    performanceDuration: '90 minutes',
    expectedPerformanceTime: '8:30 PM - 10:00 PM',
    soundEquipmentProvided: 'organizer_provides_full_pa',
    soundcheckRequired: true,
    soundcheckTime: '4:30 PM',
    performanceFeeBudget: '₹1,20,000',
    repertoireNotes: 'High-energy crowd interaction, 80% Bollywood hits & 20% original tracks.',
  },

  crewDetails: {
    rolesNeeded: ['Sound Engineer', 'Lighting Operator', 'Stagehand / Rigger'],
    headcount: 6,
    shiftCallTime: '10:00 AM - 11:30 PM',
    eventDaysCount: 1,
    experienceLevel: 'intermediate',
    certificationsRequired: 'Live audio mixing board experience (Yamaha/Behringer)',
    mealsProvided: true,
    transportProvided: true,
    dressCode: 'all_black_stage_crew',
    compensationRate: '₹3,500 / person per day',
    additionalInstructions: 'Report to Backstage Stage Manager upon arrival.',
  },
};

interface FormContextType {
  currentStep: number;
  formData: RequirementFormData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  submitError: string | null;
  submittedData: RequirementDocument | null;
  lastSavedAt: string | null;
  readinessPercentage: number;
  updateEventBasics: (field: string, value: any) => void;
  updatePlannerDetails: (field: string, value: any) => void;
  updatePerformerDetails: (field: string, value: any) => void;
  updateCrewDetails: (field: string, value: any) => void;
  setCategory: (category: CategoryType) => void;
  goToNextStep: () => boolean;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
  fillSampleData: (category?: CategoryType) => void;
  submitForm: () => Promise<RequirementDocument | null>;
  clearSubmitState: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<RequirementFormData>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<RequirementDocument | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  // Load saved state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.eventName !== undefined) {
          setFormData((prev) => ({ ...prev, ...parsed }));
          setLastSavedAt('Loaded from draft');
        }
      }
    } catch (e) {
      console.warn('Failed to restore form state from localStorage', e);
    }
  }, []);

  // Sync to localStorage with timestamp
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      const now = new Date();
      setLastSavedAt(
        `${now.getHours().toString().padStart(2, '0')}:${now
          .getMinutes()
          .toString()
          .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      );
    } catch (e) {
      console.warn('Failed to persist form state', e);
    }
  }, [formData]);

  // Dynamic Readiness Percentage Calculation
  const readinessPercentage = useMemo(() => {
    let score = 0;
    const totalPoints = 8;

    // Step 1 points
    if (formData.eventName.trim().length >= 3) score += 1;
    if (formData.eventType) score += 1;
    if (formData.startDate) score += 1;
    if (formData.location.trim().length >= 2) score += 1;

    // Step 2 points
    if (formData.category === 'planner') {
      if (formData.plannerDetails.planningScope) score += 1;
      if (formData.plannerDetails.overallBudget.trim()) score += 1;
    } else if (formData.category === 'performer') {
      if (formData.performerDetails.performerType) score += 1;
      if (formData.performerDetails.genreOrStyle.trim()) score += 1;
    } else if (formData.category === 'crew') {
      if (formData.crewDetails.rolesNeeded?.length > 0) score += 1;
      if (formData.crewDetails.shiftCallTime.trim()) score += 1;
    }

    // Step 3 points
    if (formData.category === 'planner') {
      if (formData.plannerDetails.servicesNeeded?.length > 0) score += 1;
      if (formData.plannerDetails.estimatedGuestCount > 0) score += 1;
    } else if (formData.category === 'performer') {
      if (formData.performerDetails.performanceFeeBudget.trim()) score += 1;
      if (formData.performerDetails.performanceDuration.trim()) score += 1;
    } else if (formData.category === 'crew') {
      if (formData.crewDetails.compensationRate.trim()) score += 1;
      if (formData.crewDetails.headcount > 0) score += 1;
    }

    return Math.round((score / totalPoints) * 100);
  }, [formData]);

  const updateEventBasics = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const updatePlannerDetails = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      plannerDetails: { ...prev.plannerDetails, [field]: value },
    }));
    if (errors[`plannerDetails.${field}`]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[`plannerDetails.${field}`];
        return updated;
      });
    }
  };

  const updatePerformerDetails = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      performerDetails: { ...prev.performerDetails, [field]: value },
    }));
    if (errors[`performerDetails.${field}`]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[`performerDetails.${field}`];
        return updated;
      });
    }
  };

  const updateCrewDetails = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      crewDetails: { ...prev.crewDetails, [field]: value },
    }));
    if (errors[`crewDetails.${field}`]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[`crewDetails.${field}`];
        return updated;
      });
    }
  };

  const setCategory = (category: CategoryType) => {
    setFormData((prev) => ({ ...prev, category }));
    if (errors.category) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.category;
        return updated;
      });
    }
  };

  // Step Validation Logic
  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.eventName || formData.eventName.trim().length < 3) {
        newErrors.eventName = 'Event name is required (at least 3 characters)';
      }
      if (!formData.eventType || formData.eventType.trim() === '') {
        newErrors.eventType = 'Please select or enter an event type';
      }
      if (!formData.startDate) {
        newErrors.startDate = 'Event start date is required';
      }
      if (formData.isDateRange) {
        if (!formData.endDate) {
          newErrors.endDate = 'Event end date is required for a date range';
        } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
          newErrors.endDate = 'End date cannot be earlier than start date';
        }
      }
      if (!formData.location || formData.location.trim().length < 2) {
        newErrors.location = 'Event location (city/address) is required';
      }
      if (!formData.category) {
        newErrors.category = 'Please choose a requirement category';
      }
    } else if (stepNumber === 2) {
      if (formData.category === 'planner') {
        if (!formData.plannerDetails.planningScope) {
          newErrors['plannerDetails.planningScope'] = 'Please select a planning scope';
        }
        if (
          !formData.plannerDetails.estimatedGuestCount ||
          formData.plannerDetails.estimatedGuestCount < 1
        ) {
          newErrors['plannerDetails.estimatedGuestCount'] = 'Guest count must be at least 1';
        }
        if (!formData.plannerDetails.overallBudget.trim()) {
          newErrors['plannerDetails.overallBudget'] = 'Estimated budget is required';
        }
      } else if (formData.category === 'performer') {
        if (!formData.performerDetails.performerType) {
          newErrors['performerDetails.performerType'] = 'Please select a performer act type';
        }
        if (!formData.performerDetails.genreOrStyle.trim()) {
          newErrors['performerDetails.genreOrStyle'] = 'Genre or performance style is required';
        }
        if (!formData.performerDetails.performanceDuration.trim()) {
          newErrors['performerDetails.performanceDuration'] = 'Performance duration is required';
        }
      } else if (formData.category === 'crew') {
        if (
          !formData.crewDetails.rolesNeeded ||
          formData.crewDetails.rolesNeeded.length === 0
        ) {
          newErrors['crewDetails.rolesNeeded'] = 'Select at least one crew role required';
        }
        if (!formData.crewDetails.headcount || formData.crewDetails.headcount < 1) {
          newErrors['crewDetails.headcount'] = 'Total headcount must be at least 1';
        }
        if (!formData.crewDetails.shiftCallTime.trim()) {
          newErrors['crewDetails.shiftCallTime'] = 'Shift call time is required';
        }
      }
    } else if (stepNumber === 3) {
      if (formData.category === 'planner') {
        if (
          !formData.plannerDetails.servicesNeeded ||
          formData.plannerDetails.servicesNeeded.length === 0
        ) {
          newErrors['plannerDetails.servicesNeeded'] = 'Select at least one required planning service';
        }
      } else if (formData.category === 'performer') {
        if (!formData.performerDetails.performanceFeeBudget.trim()) {
          newErrors['performerDetails.performanceFeeBudget'] = 'Fee budget or remuneration is required';
        }
      } else if (formData.category === 'crew') {
        if (!formData.crewDetails.compensationRate.trim()) {
          newErrors['crewDetails.compensationRate'] = 'Compensation rate is required';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = useCallback((): boolean => {
    const isValid = validateStep(currentStep);
    if (isValid && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return true;
    }
    return false;
  }, [currentStep, formData]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 4) {
      if (step > currentStep) {
        const isValid = validateStep(currentStep);
        if (!isValid) return;
      }
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setErrors({});
    setCurrentStep(1);
    setSubmittedData(null);
    setSubmitError(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const fillSampleData = (targetCategory?: CategoryType) => {
    const categoryToUse = targetCategory || formData.category;
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 30);
    const futureDateEnd = new Date(today);
    futureDateEnd.setDate(today.getDate() + 32);

    const pad = (n: number) => n.toString().padStart(2, '0');
    const startStr = `${futureDate.getFullYear()}-${pad(futureDate.getMonth() + 1)}-${pad(futureDate.getDate())}`;
    const endStr = `${futureDateEnd.getFullYear()}-${pad(futureDateEnd.getMonth() + 1)}-${pad(futureDateEnd.getDate())}`;

    if (categoryToUse === 'planner') {
      setFormData({
        eventName: 'Elysium Grand Wedding & Sangeet',
        eventType: 'Wedding',
        isDateRange: true,
        startDate: startStr,
        endDate: endStr,
        location: 'Udaipur, Rajasthan',
        venue: 'Taj Lake Palace & Jagmandir Island',
        category: 'planner',
        contactName: 'Rohit & Natasha Singhania',
        contactEmail: 'rohit.natasha@weddingcelebrate.com',
        contactPhone: '+91 98200 12345',
        plannerDetails: {
          planningScope: 'full_planning',
          estimatedGuestCount: 350,
          overallBudget: '₹45,00,000 - ₹60,00,000',
          themeOrVibe: 'Royal Rajputana Heritage meets Modern Crystal Luxury',
          servicesNeeded: [
            'Venue Sourcing',
            'Decor & Florals',
            'Catering & Bar',
            'Audio/Visual Setup',
            'On-site Coordination',
          ],
          decorPreferences: 'Mogra & lotus flower installations, floating candles, mirror work mandap',
          additionalNotes: 'Need 24/7 dedicated guest concierge and airport transfer coordination.',
        },
        performerDetails: defaultFormData.performerDetails,
        crewDetails: defaultFormData.crewDetails,
      });
    } else if (categoryToUse === 'performer') {
      setFormData({
        eventName: 'Neon Horizons Electronic & Rock Night',
        eventType: 'Concert',
        isDateRange: false,
        startDate: startStr,
        endDate: '',
        location: 'Mumbai, Maharashtra',
        venue: 'Jio World Garden, BKC',
        category: 'performer',
        contactName: 'Vikramaditya Roy (Festival Director)',
        contactEmail: 'vikram@neonhorizons.live',
        contactPhone: '+91 98111 54321',
        plannerDetails: defaultFormData.plannerDetails,
        performerDetails: {
          performerType: 'band',
          genreOrStyle: 'Electropop / Progressive Hindi Rock',
          performanceDuration: '90 minutes prime-time headline set',
          expectedPerformanceTime: '9:00 PM - 10:30 PM',
          soundEquipmentProvided: 'organizer_provides_full_pa',
          soundcheckRequired: true,
          soundcheckTime: '4:00 PM',
          performanceFeeBudget: '₹2,50,000 + Hospitality',
          repertoireNotes: 'High-energy rock anthems with live synth breakdowns. 1 encore track planned.',
        },
        crewDetails: defaultFormData.crewDetails,
      });
    } else if (categoryToUse === 'crew') {
      setFormData({
        eventName: 'National FinTech Expo 2026',
        eventType: 'Exhibition',
        isDateRange: true,
        startDate: startStr,
        endDate: endStr,
        location: 'Bengaluru, Karnataka',
        venue: 'Bangalore International Exhibition Centre (BIEC)',
        category: 'crew',
        contactName: 'Priya Nambiar (Operations Head)',
        contactEmail: 'priya.n@fintechexpo.in',
        contactPhone: '+91 99000 88776',
        plannerDetails: defaultFormData.plannerDetails,
        performerDetails: defaultFormData.performerDetails,
        crewDetails: {
          rolesNeeded: [
            'Sound Engineer',
            'Lighting Operator',
            'Videographer / Camera Operator',
            'Stagehand / Rigger',
            'Hospitality & Usher',
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
          additionalInstructions: 'Report to Production Hub in Hall 2 for badge pickup and briefing.',
        },
      });
    }
    setErrors({});
  };

  const submitForm = useCallback(async (): Promise<RequirementDocument | null> => {
    const isValid = validateStep(currentStep);
    if (!isValid) return null;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload: Partial<RequirementFormData> = {
        eventName: formData.eventName,
        eventType: formData.eventType,
        isDateRange: formData.isDateRange,
        startDate: formData.startDate,
        endDate: formData.isDateRange ? formData.endDate : undefined,
        location: formData.location,
        venue: formData.venue,
        category: formData.category,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
      };

      if (formData.category === 'planner') {
        payload.plannerDetails = formData.plannerDetails;
      } else if (formData.category === 'performer') {
        payload.performerDetails = formData.performerDetails;
      } else if (formData.category === 'crew') {
        payload.crewDetails = formData.crewDetails;
      }

      const res = await api.postRequirement(payload);
      if (res.success && res.data) {
        setSubmittedData(res.data);
        localStorage.removeItem(STORAGE_KEY);
        return res.data;
      } else {
        throw new Error(res.message || 'Submission failed');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setSubmitError(err.message || 'Failed to submit requirement to backend');
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [currentStep, formData]);

  const clearSubmitState = () => {
    setSubmittedData(null);
    setSubmitError(null);
  };

  // Keyboard shortcut listener (Cmd/Ctrl + Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if in a textarea where enter makes newline
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (currentStep === 4) {
          submitForm();
        } else {
          goToNextStep();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, goToNextStep, submitForm]);

  return (
    <FormContext.Provider
      value={{
        currentStep,
        formData,
        errors,
        isSubmitting,
        submitError,
        submittedData,
        lastSavedAt,
        readinessPercentage,
        updateEventBasics,
        updatePlannerDetails,
        updatePerformerDetails,
        updateCrewDetails,
        setCategory,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        resetForm,
        fillSampleData,
        submitForm,
        clearSubmitState,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useRequirementForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useRequirementForm must be used within a FormProvider');
  }
  return context;
};
