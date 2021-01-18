import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { ProdutoRoutingModule } from './produto-routing.module';


@NgModule({
  declarations: [ListaProdutosComponent],
  imports: [
    SharedModule,
    ProdutoRoutingModule,
  ]
})
export class ProdutoModule { }