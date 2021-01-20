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

  logout() {
    localStorage.clear();
    this.rota.navigate(["login"]);
    this.mostrarMenu.emit(false);
  }

  verificarToken(): boolean {
    if (localStorage.getItem('usuario')) return true
    else return false;
  }


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
