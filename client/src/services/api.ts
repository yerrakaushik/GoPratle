import {
  ApiResponse,
  PaginatedRequirementsResponse,
  RequirementDocument,
  RequirementFormData,
  StatsOverviewResponse,
} from '../types/requirement';

function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // When running in browser on production host (e.g. *.vercel.app), use relative /api fallback
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    return '/api';
  }
  return 'http://localhost:5000/api';
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${getApiBaseUrl()}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.message || (data.errors ? JSON.stringify(data.errors) : 'Request failed');
      const error = new Error(errorMessage);
      (error as any).status = response.status;
      (error as any).errors = data.errors;
      throw error;
    }

    return data;
  }

  // Create requirement
  async postRequirement(
    payload: Partial<RequirementFormData>
  ): Promise<ApiResponse<RequirementDocument>> {
    return this.request<ApiResponse<RequirementDocument>>('/requirements', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Get all requirements with filters
  async getRequirements(params?: {
    category?: string;
    search?: string;
    eventType?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedRequirementsResponse> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'all') {
      query.append('category', params.category);
    }
    if (params?.search) {
      query.append('search', params.search);
    }
    if (params?.eventType) {
      query.append('eventType', params.eventType);
    }
    if (params?.page) {
      query.append('page', params.page.toString());
    }
    if (params?.limit) {
      query.append('limit', params.limit.toString());
    }

    const qs = query.toString();
    const endpoint = `/requirements${qs ? `?${qs}` : ''}`;
    return this.request<PaginatedRequirementsResponse>(endpoint, {
      method: 'GET',
      cache: 'no-store',
    });
  }

  // Get requirement by ID
  async getRequirementById(id: string): Promise<ApiResponse<RequirementDocument>> {
    return this.request<ApiResponse<RequirementDocument>>(`/requirements/${id}`, {
      method: 'GET',
    });
  }

  // Get category stats
  async getStats(): Promise<StatsOverviewResponse> {
    return this.request<StatsOverviewResponse>('/requirements/stats/overview', {
      method: 'GET',
      cache: 'no-store',
    });
  }

  // Check backend server & DB health
  async checkHealth(): Promise<{
    status: string;
    database: { state: string; isMemoryDB: boolean; host: string; name: string };
  }> {
    return this.request('/health', {
      method: 'GET',
      cache: 'no-store',
    });
  }
}

export const api = new ApiService();
