import { Pessoa } from './../core/model';
import { HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';


export class PessoaFiltro {

  nome?: string;
  pagina: number = 0;
  itensPorPagina: number = 5;
}


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private pessoaEndpoint: string = environment.apiUrl + "/pessoas";

  constructor(private http: HttpClient) {}


  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set("page", filtro.pagina);
    params = params.set("size", filtro.itensPorPagina);

    if(filtro.nome) {
      params = params.set("nome", filtro.nome);
    }

    return lastValueFrom(this.http.get(`${this.pessoaEndpoint}`, { params }))
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
    return lastValueFrom(this.http.put(`${this.pessoaEndpoint}/${codigo}/ativo`, ativo))
    .then(() => null);
  }

  excluir(codigo: number) {
    return lastValueFrom(this.http.delete(`${this.pessoaEndpoint}/${codigo}`))
    .then(() => null);
  }

  listarTodas(): Promise<any> {
    return lastValueFrom(this.http.get(`${this.pessoaEndpoint}`))
    .then((response: any) => {
      return response.content;
    })
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return lastValueFrom(this.http.post<Pessoa>(`${this.pessoaEndpoint}`, pessoa))
    .then((response: any) => {
      return response;
    });
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return lastValueFrom(this.http.put<Pessoa>(`${this.pessoaEndpoint}/${pessoa.codigo}`, pessoa))
    .then((response: any) => {
      return response;
    });
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return lastValueFrom(this.http.get<Pessoa>(`${this.pessoaEndpoint}/${codigo}`))
    .then((response: any) => {
      return response;
    });
  }
}
