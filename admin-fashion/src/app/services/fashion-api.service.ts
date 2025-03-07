import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, map, retry } from 'rxjs';
import { Fashion } from '../fashion';

@Injectable({
  providedIn: 'root'
})
export class FashionAPIService {
  private apiUrl = 'http://localhost:4000/fashions'; // Đường dẫn API backend

  constructor(private _http: HttpClient) { }

  // Lấy danh sách Fashion
  getFashions(): Observable<Fashion[]> {
    return this._http.get<Fashion[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // 🔹 Thêm hàm lấy 1 Fashion theo ID 
  getFashion(id: string): Observable<Fashion> {
    const url = `${this.apiUrl}/${id}`; // API lấy Fashion theo ID
    return this._http.get<Fashion>(url).pipe(
      catchError(this.handleError)
    );
  }

// thêm fashion
postFashion(aFashion: Fashion): Observable<Fashion> {
  const headers = new HttpHeaders().set("Content-Type", "application/json");

  console.log("Dữ liệu gửi lên API:", aFashion); // ✅ Debug log

  return this._http.post<Fashion>(this.apiUrl, aFashion, { headers }).pipe(
    catchError(this.handleError)
  );
}

  // ✅ Xoá Fashion (THÊM HÀM NÀY ĐỂ FIX LỖI)
  deleteFashion(id: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("Lỗi API:", error);
        return throwError(() => new Error(error.error?.message || "Không thể xoá Fashion!"));
      })
    );
  }
  


  private handleError(error: HttpErrorResponse) {
    console.error("Lỗi API:", error);
    return throwError(() => new Error(error.error?.message || "Không thể tải dữ liệu từ API"));
  }

  updateFashion(id: string, fashion: Fashion): Observable<any> {
    console.log("Gửi request PUT đến:", `http://localhost:4000/api/fashions/${id}`);
    console.log("Dữ liệu gửi lên:", fashion);

    return this._http.put<any>(`http://localhost:4000/api/fashions/${id}`, fashion, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
        catchError(this.handleError)
    );
}
  
}


  
  

