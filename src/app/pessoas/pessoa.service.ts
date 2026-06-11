import { Pessoa } from './../core/model';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {

  nome?: string;
  pagina: number = 0;
  itensPorPagina: number = 5;
}


@Injectable()
export class PessoaService {

  private pessoaEndpoint: string = "http://localhost:8080/pessoas"

  constructor(private http: HttpClient) {}


  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params = new HttpParams();

    params = params.set("page", filtro.pagina);
    params = params.set("size", filtro.itensPorPagina);

    if(filtro.nome) {
      params = params.set("nome", filtro.nome);
    }

    return lastValueFrom(this.http.get(`${this.pessoaEndpoint}`, {headers, params}))
    .then((response: any) => {
      const pessoas = response.content;
      const total = response.totalElements;

      const result = {
        pessoas,
        total
      }

      return result;
    })
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return lastValueFrom(this.http.put(`${this.pessoaEndpoint}/${codigo}/ativo`, ativo, { headers }))
    .then(() => null);
  }

  excluir(codigo: number) {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return lastValueFrom(this.http.delete(`${this.pessoaEndpoint}/${codigo}`, { headers}))
    .then(() => null);
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return lastValueFrom(this.http.get(`${this.pessoaEndpoint}`, {headers}))
    .then((response: any) => {
      return response.content;
    })
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
      const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

      return lastValueFrom(this.http.post<Pessoa>(`${this.pessoaEndpoint}`, pessoa, { headers }));
  }
}
