import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent implements OnInit {

  @Input() lancamentos: Lancamento[];

  constructor() { }

  ngOnInit(): void {
  }

}

export class Lancamento {

  tipo: string;
  descricao: string;
  dataVencimento: Date | null;
  dataPagamento: Date | null;
  valor: number;
  pessoa: string;
}
