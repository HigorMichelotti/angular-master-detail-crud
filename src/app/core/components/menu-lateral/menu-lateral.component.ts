import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {
  email: string;
  grupo: string;
  nomeOrigemUsuario: string;
  carregandoNotificacoes: boolean;
  quantidadeNotificacaoNaoLida: number;

  constructor(
    // private menuLateralService: MenuLateralService,
    private authService: AuthService,
    // private controleNotificacaoService: ControleNotificacaoService
  ) { }

  ngOnInit() {
    this.CodigoScript();
  }

  // DispararEventoMenuAlterado() {
  //   this.menuLateralService.emitirMenuAlterado.emit();
  // }

  Sair() {
    this.authService.logout();
    // this.authService.mostrarMenu.emit(false);
  }

  // DadosUsuario() {
  //   this.email = this.authService.ObterTokenDecodeUsuario().email;
  //   this.nomeOrigemUsuario = this.authService.ObterTokenDecodeUsuario().nomeOrigemUsuario;
  // }


  CodigoScript() {
    $('#collapse-icon').addClass('fa-angle-double-left');

    $('[data-toggle=sidebar-colapse]').click(function () {
      SidebarCollapse();
    });

    $('.nav-item').click(function () {
      SidebarCollapse();
    });

    function SidebarCollapse() {
      $('.menu-collapsed').toggleClass('d-none');
      $('.sidebar-submenu').toggleClass('d-none');
      $('.submenu-icon').toggleClass('d-none');
      $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');

      var SeparatorTitle = $('.sidebar-separator-title');
      if (SeparatorTitle.hasClass('d-flex')) {
        SeparatorTitle.removeClass('d-flex');
      } else {
        SeparatorTitle.addClass('d-flex');
      }

      var logoPrincipal = $('#logoPrincipal');
      if (logoPrincipal.hasClass('logoPrincipal')) {
        logoPrincipal.removeClass('logoPrincipal');
        logoPrincipal.addClass('logoCollapsed');
      } else {
        logoPrincipal.removeClass('logoCollapsed');
        logoPrincipal.addClass('logoPrincipal');
      }

      $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
    }
    $("a.list-group-item").click(
      function (event) {
        $('a.list-group-item').removeClass('active');
        $(this).addClass('active');
        event.preventDefault()
      }
    );
  }

}
