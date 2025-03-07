import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fashion {
  _id: string;
  fashion_subject: string;
  fashion_detail: string;
  fashion_image: string;
  style: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class FashionService {
  private apiUrl = 'http://localhost:4000/fashions';

  constructor(private http: HttpClient) {}

  // Lấy danh sách Fashion
  getFashions(): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(this.apiUrl);
  }

  // Lấy Fashion theo ID
  getFashionById(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`${this.apiUrl}/${id}`);
  }

  // Lọc Fashion theo Style
  getFashionsByStyle(style: string): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(`${this.apiUrl}/style/${style}`);
  }
}
