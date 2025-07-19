// src/app/services/company.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'http://localhost:8080/api/companies';

  constructor(private http: HttpClient) { }

  // Corresponds to the search functionality in your React CompanyCombobox
  searchCompanies(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`, { params: { q: query } });
  }

  getAllWithExperienceCount(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/by-count`);
  }

  createCompany(name: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { name });
  }
}