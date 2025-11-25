import { Injectable } from '@angular/core';
import { Produto } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Produtos {
  private readonly API = 'http://localhost:3000/produtos';
  
  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  incluir(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto);
  }

  editar(produto: Produto): Observable<Produto> {
    const url = `${this.API}/${produto.id}`;
    return this.http.put<Produto>(url, produto);
  }

  buscarPorId(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.API}/${id}`);
  }

  excluir(id: string): Observable<Produto> {
    return this.http.delete<Produto>(this.API + `/${id}`);
  }
}