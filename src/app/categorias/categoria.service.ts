import { lastValueFrom } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categoriasEndpoint: string = "http://localhost:8080/categorias"

  constructor(private http: HttpClient) { }

  listarTodos(): Promise<any> {
    const headers = new HttpHeaders({Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='});

    return lastValueFrom(this.http.get(`${this.categoriasEndpoint}`, { headers }))
    .then((response: any) => {
      return response;
    })
  }
}
