import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversorMoedasService {

  private apiUrl = 'http://localhost:8080/api/convert';

  constructor(private http: HttpClient) { }

  converterMoeda(from: string, to: string, amount: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?from=${from}&to=${to}&amount=${amount}`);
  }
}
