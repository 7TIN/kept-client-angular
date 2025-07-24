import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// @Injectable({ providedIn: 'root' })
// export class ApiService {
//   private baseUrl = environment.API_BASE_URL;
//   // …
// }

const eventBus = new EventTarget();

function isPublicRequest(url?: string, method?: string): boolean {
  if (!url || !method) return false;

  const upperMethod = method.toUpperCase();

  if (upperMethod === 'GET') {
    return url.startsWith('/experiences') || url.startsWith('/companies');
  }

  return false;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.API_BASE_URL;

  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: { params?: Record<string, any>, headers?: HttpHeaders }): Observable<T> {
    const fullUrl = this.baseUrl + url;
    const token = localStorage.getItem('token');
    const isPublic = isPublicRequest(url, 'GET');

    const headers = new HttpHeaders({
      ...(options?.headers || {}),
      ...(token && !isPublic ? { Authorization: `Bearer ${token}` } : {})
    });

    const params = new HttpParams({ fromObject: options?.params || {} });

    return this.http.get<T>(fullUrl, { headers, params }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  post<T>(url: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
    const fullUrl = this.baseUrl + url;
    const token = localStorage.getItem('token');
    const isPublic = isPublicRequest(url, 'POST');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
      ...(token && !isPublic ? { Authorization: `Bearer ${token}` } : {})
    });

    return this.http.post<T>(fullUrl, body, { headers }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('token');
      eventBus.dispatchEvent(new CustomEvent('unauthorized'));
    }
    return throwError(() => error);
  }

  getEventBus(): EventTarget {
    return eventBus;
  }
}
