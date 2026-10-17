import {
  ApiResponse,
  PaginatedRequirementsResponse,
  RequirementDocument,
  RequirementFormData,
  StatsOverviewResponse,
} from '../types/requirement';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
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
