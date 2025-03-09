import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://api.openweathermap.org/';

  constructor(private http: HttpClient) {}

  private getRequestOptions(params?: any, headers?: HttpHeaders): { params?: HttpParams, headers?: HttpHeaders } {
    let requestOptions: { params?: HttpParams, headers?: HttpHeaders } = {};

    if (params) {
      let httpParams = new HttpParams();
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
      requestOptions.params = httpParams;
    }

    if (headers) {
      requestOptions.headers = headers;
    }

    return requestOptions;
  }

  get(endpoint: string, params?: any, headers?: HttpHeaders): Observable<any> {
    const requestOptions = this.getRequestOptions(params, headers);
    return this.http.get(`${this.apiUrl}${endpoint}`, requestOptions);
  }

  post(endpoint: string, body: any, params?: any, headers?: HttpHeaders): Observable<any> {
    const requestOptions = this.getRequestOptions(params, headers);
    return this.http.post(`${this.apiUrl}${endpoint}`, body, requestOptions);
  }

  patch(endpoint: string, body: any, params?: any, headers?: HttpHeaders): Observable<any> {
    const requestOptions = this.getRequestOptions(params, headers);
    return this.http.patch(`${this.apiUrl}${endpoint}`, body, requestOptions);
  }
}
