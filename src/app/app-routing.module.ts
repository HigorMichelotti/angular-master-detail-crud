import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/acesso/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../app/pages/acesso/acesso.module').then(module => module.AcessoModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('../app/pages/administrativo/produto/produto.module').then(module => module.ProdutoModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('../app/pages/administrativo/produto/produto.module').then(module => module.ProdutoModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
