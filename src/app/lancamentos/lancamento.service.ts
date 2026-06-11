import { Lancamento } from './../core/model';
import { DatePipe } from "@angular/common";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, lastValueFrom } from "rxjs";

export class LancamentoFiltro {

  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina: number = 0;
  itensPorPagina: number = 5;
}


@Injectable()
export class LancamentoService {

    private lancamentoEndpoint = "http://localhost:8080/lancamentos";

    constructor(
      private http: HttpClient,
      private datePipe: DatePipe
    ) {}

    pesquisar(filtro: LancamentoFiltro): Promise<any> {
      const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      let params = new HttpParams();

      params = params.set("page", filtro.pagina);
      params = params.set("size", filtro.itensPorPagina);

      if (filtro.descricao) {
        params = params.set("descricao", filtro.descricao);
      }

      if (filtro.dataVencimentoInicio) {
        params = params.set("dataVencimentoDe", this.datePipe.transform(filtro.dataVencimentoInicio, "yyyy-MM-dd")!);
      }

      if (filtro.dataVencimentoFim) {
        params = params.set("dataVencimentoAte", this.datePipe.transform(filtro.dataVencimentoFim, "yyyy-MM-dd")!);
      }

      return lastValueFrom(this.http.get(`${this.lancamentoEndpoint}?resumo`, { headers, params }))
      .then((response : any) => {
        const lancamentos = response.content;
        const resultado = {
          lancamentos,
          total: response.totalElements
        }

        return resultado;
      })
    }

    adicionar(lancamento: Lancamento): Promise<Lancamento> {
      const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

      return lastValueFrom(this.http.post<Lancamento>(`${this.lancamentoEndpoint}`, lancamento, {headers}));
    }

    excluir(codigo: number): Promise<any> {
      const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      return lastValueFrom(this.http.delete(`${this.lancamentoEndpoint}/${codigo}`, { headers }))
      .then(() => null);
    }
}
