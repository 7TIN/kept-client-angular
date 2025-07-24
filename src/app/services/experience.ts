import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Observable } from 'rxjs';

// --- Interfaces remain the same ---
export interface Experience {
  id: number;
  title: string;
  position: string;
  experienceType: string;
  summary: string;
  interviewDate: string;
  companyName: string;
  questions: {
    id: string;
    question: string;
    type: string;
    section: string;
  }[];

}

export interface PageData {
  content: Experience[];
  number: number;
  totalPages: number;
}

export interface Filters {
  q?: string;
  position?: string;
  type?: string;
  company?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  constructor(private api: ApiService) {}

  // The service now simply returns an Observable of the PageData
  getExperiences(page = 0, size = 5, filters?: Filters): Observable<PageData> {
    const params: Record<string, any> = {
      page: page.toString(),
      size: size.toString(),
    };

    if (filters?.q) params['q'] = filters.q;
    if (filters?.position) params['position'] = filters.position;
    if (filters?.type) params['type'] = filters.type;
    if (filters?.company) params['company'] = filters.company;

    return this.api.get<PageData>('/experiences/recent', { params });
  }

  addExperience(experienceData: any): Observable<any> {
    return this.api.post("/experiences", experienceData);
  }
}