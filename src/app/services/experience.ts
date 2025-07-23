// src/app/services/experience.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private baseUrl = 'http://localhost:8080/api/experiences';

  constructor(private http: HttpClient) { }

  // Gets the paginated list of experiences
  getRecentExperiences(page: number, size: number, filters: any): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filters.q) params = params.set('q', filters.q);
    if (filters.position) params = params.set('position', filters.position);
    if (filters.type) params = params.set('type', filters.type);
    if (filters.company) params = params.set('company', filters.company);

    return this.http.get<any>(`${this.baseUrl}/recent`, { params }).pipe(
      catchError(error => {
        console.error('Failed to fetch experiences:', error);
        return throwError(() => new Error('failed to load the experiences'));
      })
    );
  }

  // Adds a new experience
  addExperience(experienceData: any): Observable<any> {
    return this.http.post(this.baseUrl, experienceData);
  }
}