// src/app/services/company.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = '/companies';

  constructor(private api: ApiService) {}

  searchCompanies(query: string): Observable<any[]> {
    return this.api.get<any[]>(this.baseUrl, { params: { q: query } });
  }

  getAllWithExperienceCount(): Observable<any[]> {
    return this.api.get<any[]>(`${this.baseUrl}/by-count`);
  }

  createCompany(name: string): Observable<any> {
    return this.api.post<any>(this.baseUrl, { name });
  }
}
