import { JwtHelperService } from '@auth0/angular-jwt';
import { lastValueFrom } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenRevokeUrl = environment.apiUrl + "/token/revoke"
  oauthTokenUrl = environment.apiUrl + "/oauth/token";
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
   }

  login(username: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
    .append("Content-type", "application/x-www-form-urlencoded")
    .append("Authorization", "Basic YW5ndWxhcjphbmd1bGFy");

    const body = `username=${username}&password=${senha}&grant_type=password`;

    return lastValueFrom(this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true }))
    .then((response: any) => {
      this.armazenarToken(response.access_token);
    })
    .catch((response: any) => {
      if (response.status === 400) {
        if (response.error.error === "invalid_grant") {
          return Promise.reject("Usuário ou senha inválida!");
        }
      }

      return Promise.reject(response);
    });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
    .append("Content-type", "application/x-www-form-urlencoded")
    .append("Authorization", "Basic YW5ndWxhcjphbmd1bGFy");

    const body = `grant_type=refresh_token`;

    return lastValueFrom(this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true }))
    .then((response: any) => {
      console.log("Obtendo novo token...")
      this.armazenarToken(response.access_token);

      return Promise.resolve(null);
    })
    .catch((response: any) => {
      console.log("Erro ao renovar token. ", response);
      return Promise.resolve(null);
    });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles: any) {
    for(let role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  limparAccessToken() {
    localStorage.removeItem("token");
    this.jwtPayload = null;
  }

  logout() {
    return lastValueFrom(this.http.delete(this.tokenRevokeUrl, { withCredentials: true }))
    .then(() => {
      this.limparAccessToken();
    });
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem("token", token);
  }

  private carregarToken() {
    const token = localStorage.getItem("token");

    if (token) {
      this.armazenarToken(token);
    }
  }
}
