import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/services/base-service.service';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends ServiceBase<Produto> {

  constructor(
    protected injector: Injector,
    protected clienteService: ProdutoService) {
    super(`produto`, injector, Produto.fromJson);
  }
}
