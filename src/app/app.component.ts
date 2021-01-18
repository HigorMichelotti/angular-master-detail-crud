import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SevenCareOp';
  mostrarMenu: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.verificarToken()) this.mostrarMenu = true;
    else this.mostrarMenu = false;

    this.authService.mostrarMenu.subscribe(
      mostrar => this.mostrarMenu = mostrar,
    );
  }
}
