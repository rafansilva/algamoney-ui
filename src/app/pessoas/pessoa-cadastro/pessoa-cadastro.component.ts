import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PessoaService } from './../pessoa.service';
import { NgForm } from '@angular/forms';
import { Pessoa } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void { }

  salvar(pessoaForm: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.messageService.add({severity:'success', detail: "Pessoa cadastrada com sucesso!"});

      pessoaForm.reset();
      this.pessoa = new Pessoa();
    })
    .catch(error => this.errorHandlerService.handle(error));
  }
}
