import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class ApiService {
  private apiUrl = "http://localhost/rest-api.php/users";
  private http = inject(HttpClient);

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createUser(user: { name: string; email: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  replaceUser(id: number, user: { name: string; email: string; status: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  patchUser(id: number, partialData: { status: string }): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, partialData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
