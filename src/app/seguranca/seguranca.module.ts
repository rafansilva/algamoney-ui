import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { FormsModule } from '@angular/forms';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './auth.guard';
import { environment } from './../../environments/environment';
import { MoneyHttpInterceptor } from './money-http-interceptor';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from "primeng/inputtext";

import { LoginFormComponent } from './login-form/login-form.component';


export function tokenGetter(): string {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenAllowedDomains,
        disallowedRoutes: ["http://localhost:8080/oauth/token"]
      }
    }),

    SegurancaRoutingModule,
    InputTextModule,
    ButtonModule,
],
providers: [
  JwtHelperService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MoneyHttpInterceptor,
    multi: true
  },

  AuthGuard
]
})
export class SegurancaModule { }
