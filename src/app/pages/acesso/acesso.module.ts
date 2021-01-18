import { NgModule } from '@angular/core';

import { AcessoRoutingModule } from './acesso-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    AcessoRoutingModule
  ]
})
export class AcessoModule { }
