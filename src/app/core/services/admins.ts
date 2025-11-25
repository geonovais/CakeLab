import { Injectable } from '@angular/core';
import { Admin } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Admins {
  private readonly API = 'http://localhost:3000/admins';
  constructor(private http: HttpClient) {}
  listar(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.API);
  }

  buscarPorId(id: string): Observable<Admin> {
      return this.http.get<Admin>(`${this.API}/${id}`);
    }

  editar(admin: Admin): Observable<Admin> {
      const url = `${this.API}/${admin.id}`;
      return this.http.put<Admin>(url, admin);
    }

  excluir(id: string): Observable<Admin> {
      return this.http.delete<Admin>(this.API + `/${id}`);
    }

    incluir(admin: Admin): Observable<Admin> {
        return this.http.post<Admin>(this.API, admin);
      }
}
