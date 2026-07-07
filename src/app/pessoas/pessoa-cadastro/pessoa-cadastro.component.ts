import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PessoaService } from './../pessoa.service';
import { NgForm, FormControl } from '@angular/forms';
import { Pessoa, Contato } from './../../core/model';
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
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Nova Pessoa");
    const codigo: number = this.activatedRoute.snapshot.params["codigo"];

    if (codigo) {
      this.carregaPessoa(codigo);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  carregaPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
    .then(response => {
      this.pessoa = response;
      this.atualizarTituloEdicao();
    })
  }

  salvar(pessoaForm: NgForm) {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa();
    }
  }

  adicionarPessoa() {
    this.pessoaService.adicionar(this.pessoa)
    .then((pessoaAdicionado: any) => {
      this.messageService.add({severity:'success', detail: "Pessoa cadastrada com sucesso!"});

      this.router.navigate(["/pessoas", pessoaAdicionado.codigo ])
    })
    .catch(error => this.errorHandlerService.handle(error));
  }

  atualizarPessoa() {
    this.pessoaService.atualizar(this.pessoa)
    .then((pessoaAlterada: any) => {
      this.pessoa = pessoaAlterada;

      this.messageService.add({severity:'success', detail: "Pessoa alterada com sucesso!"});
      this.atualizarTituloEdicao();
    })
    .catch(error => this.errorHandlerService.handle(error));
  }

  novo(pessoaForm: NgForm) {
    pessoaForm.reset()

    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);

    this.router.navigate(["/pessoas/nova"])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição da pessoa: ${this.pessoa.nome}`);
  }

}
