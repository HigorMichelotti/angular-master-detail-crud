import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EmitirAlerta } from 'src/app/shared/helpers/sweer-alertas';
import { UsuariosLogado } from '../shared/models/usuario-logado.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formulario: FormGroup;
  public carregando: boolean;

  constructor(
    protected rota: Router,
    protected activeRota: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected authService: AuthService) { }

  ngOnInit() {
    this.setarAtributosFormulario()
  }

  public fazerLogin() {
    this.carregando = true;
    console.log(this.formulario.value);
    // var usuario = new UsuariosLogado(true)
    // this.acaoQuandoForSucesso(usuario);
    this.authService.fazerLogin(this.formulario.value).subscribe(
      data => this.acaoQuandoForSucesso(data),
      error => {
        this.carregando = false;
        this.acaoQuandoForError(error)
      }
    )
  }

  protected setarAtributosFormulario() {
    this.formulario = this.formBuilder.group({
      username: ['11234567890', [Validators.required]],
      password: ['09876543211', [Validators.required]],
    })
  }

  protected acaoQuandoForSucesso(dados: UsuariosLogado) {
    this.carregando = false;
    if (!dados.success) return EmitirAlerta.alertaToastError(dados.error)
    this.authService.mostrarMenu.emit(true);
    localStorage.setItem("usuario", JSON.stringify(dados));
    this.rota.navigate(['produtos']);
  }

  protected acaoQuandoForError(mensagem?: string): UsuariosLogado {
    this.carregando = false;
    if ( mensagem != null) return EmitirAlerta.alertaToastError(mensagem, 'top-right');
    return EmitirAlerta.alertaToastError("Ocorreu um erro ao processar a sua solicitação!")
  }
}
