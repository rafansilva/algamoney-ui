import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent implements OnInit {

  @Input() pessoas: Pessoas[];

  constructor() { }

  ngOnInit(): void {
  }

}

export class Pessoas {

  nome: string;
  cidade: string;
  estado: string;
  ativo: boolean;
}
