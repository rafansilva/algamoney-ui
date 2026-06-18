import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(email: string, senha: string) {
    this.authService.login(email, senha)
    .then(() => {
      this.router.navigate(["/lancamentos"]);
    })
    .catch((response: any) => {
      this.errorHandlerService.handle(response);
    });
  }

}
