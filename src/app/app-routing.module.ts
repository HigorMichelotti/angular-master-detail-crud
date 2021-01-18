import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/acesso/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/pages/acesso/acesso.module').then(module => module.AcessoModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('../app/pages/administrativo/produto/produto.module').then(module => module.ProdutoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
