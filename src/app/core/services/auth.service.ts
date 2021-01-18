import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UsuariosLogado } from 'src/app/pages/acesso/shared/models/usuario-logado.model';
import { Usuario } from 'src/app/pages/acesso/shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mostrarMenu = new EventEmitter<boolean>();

  private caminhoApi = "login"

  constructor(
    private rota: Router,
    private http: HttpClient) { }


  fazerLogin(dados: Usuario): Observable<UsuariosLogado> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + `${dados.username + ':' + dados.password}`
      })
    };
    
    return this.http.post(`${environment.BASE_AUTHENTICATION_URL}${this.caminhoApi}`, dados, httpOptions).pipe(
      map((data: any) => UsuariosLogado.fromJson(data)),
      catchError(this.handleError)
    )
  }

  async logout() {
    localStorage.clear();
    this.rota.navigate(["/"]);
    this.mostrarMenu.emit(false);
  }

  verificarToken(): boolean {
    if (localStorage.getItem('usuario')) return true
    else return false;
  }


  //   verificarUsuario(dados: Usuario): Observable<any> {
  //     return this.http.post(`${environment.BASE_URL}${this.caminhoApi}verificar-usuario`, dados).pipe(
  //       map((data: any) => data),
  //       catchError(this.handleError)
  //     )
  //   }

  //   alterarSenha(dados: AlterarSenha): Observable<AlterarSenha> {
  //     return this.http.post<any>(`${environment.BASE_URL}${this.caminhoApi}alterar-senha`, dados)
  //       .pipe(
  //         map((data: any) => {
  //           return data;
  //         }),
  //         catchError(this.handleError)
  //       )
  //   }

  //   async resetarSenha(dados: AlterarSenha) {
  //     return this.http.post<any>(`${environment.BASE_URL}${this.caminhoApi}resetar-senha`, dados).toPromise()
  //   }

  obterDadosUsuario(): UsuariosLogado {
    let usuarioLogado: UsuariosLogado;

    if (localStorage.getItem("usuario"))
      usuarioLogado = JSON.parse(localStorage.getItem("usuario"))

    return usuarioLogado
  }

  protected handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);

    switch (error.status) {
      case 401: error = "Usuário ou senha incorretos!"; break;
      default: error = "Falha na comunicação com o servidor. Por favor, tente mais tarde";
    }

    return throwError(error);
  }

}
