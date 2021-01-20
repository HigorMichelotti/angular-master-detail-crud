import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list.component';
import { ArquivoUtils } from 'src/app/shared/helpers/arquivo-utils';
import { EmitirAlerta } from 'src/app/shared/helpers/sweer-alertas';
import { UploadArquivoService } from 'src/app/shared/services/upload-arquivo.service';
import Swal from 'sweetalert2';
import { Produto } from '../shared/models/produto.model';
import { ProdutoService } from '../shared/services/produto.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ListaProdutosComponent extends BaseListComponent<Produto> implements OnInit {

  arquivoSelecionado: File;
  excluiuArquivo: boolean
  imagemAntigo: string;

  constructor(
    protected injector: Injector,
    protected produtoService: ProdutoService,
    protected uploadArquivoService: UploadArquivoService
  ) {
    super(injector, produtoService, Produto.fromJson);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setarAtributosFormulario();
  }

  atribuirParaEditar(produto: Produto) {
    this.imagemAntigo = produto.imagem;
    super.atribuirParaEditar(produto);
  }

  protected setarAtributosFormulario(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      valor: [null, Validators.required],
      imagem: [null, Validators.required]
    })
  }

  async carregarImagem() {
    const { value: file } = await Swal.fire({
      title: 'Selecione uma imagem',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Selecione uma imagem'
      }
    })
    if (file) {
      if (!await ArquivoUtils.verificaTamanhoImagemKB(file, 100)) return;
      const reader = new FileReader()
      reader.onload = (e: any) => {
        Swal.fire({
          title: 'Deseja salvar esta imagem',
          imageUrl: e.target.result,
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: 'The uploaded picture',
          showCancelButton: true,
        }).then((result) => {
          if (result.value) {
            this.formulario.patchValue({ imagem: e.target.result })
          }
        })
      }
      reader.readAsDataURL(file);
      this.arquivoSelecionado = file
    }
  }


  async salvar() {
    this.carregando = true;
    let produto: Produto = this.formulario.value;
    produto.valor = Number(this.formulario.value.valor)

    if (this.arquivoSelecionado != null && this.arquivoSelecionado != undefined) {
      this.arquivoSelecionado = ArquivoUtils.gerarArquivoNomeHash(this.arquivoSelecionado);
      produto.imagem = this.arquivoSelecionado.name
    }

    this.produtoService.salvar(produto)
      .then(data => {
        if (!data) return EmitirAlerta.alertaToastError("Algo deu errado, tente novamente");

        // if (this.arquivoSelecionado != null && this.arquivoSelecionado != undefined)
        //   this.uploadArquivoService.salvarArquivo(this.arquivoSelecionado);
        super.obterTodos();
        super.acaoQuandoForSuccesso();
        this.carregando = false;
        super.fecharModal(this.modalCadastroEdicao);
      }, error => {
        super.acaoQuandoForError();
        this.carregando = false;
      });
  }

  async atualizar() {
    this.carregando = true;
    let produto: Produto = this.formulario.value;
    produto.valor = Number(this.formulario.value.valor)

    if (this.arquivoSelecionado != null && this.arquivoSelecionado != undefined) {
      this.arquivoSelecionado = ArquivoUtils.gerarArquivoNomeHash(this.arquivoSelecionado);
      produto.imagem = this.arquivoSelecionado.name
      this.excluiuArquivo = false;
    } else {
      produto.imagem = ArquivoUtils.pegarNomeArquivoArquivo(produto.imagem)
    }

    if (this.excluiuArquivo) {
      this.uploadArquivoService.excluirArquivo(this.imagemAntigo);
      produto.imagem = null
    }

    this.produtoService.atualizar(produto)
      .then(data => {
        // if (this.arquivoSelecionado != null && this.arquivoSelecionado != undefined)
        //   this.uploadArquivoService.atualizarArquivo(this.imagemAntigo, this.arquivoSelecionado)

        super.obterTodos();
        super.acaoQuandoForSuccesso();
        this.carregando = false;
        super.fecharModal(this.modalCadastroEdicao);
      }, error => {
        super.acaoQuandoForError();
        this.carregando = false;
      });
  }

  excluirProduto(produto: Produto) {
    Swal.fire({
      title: 'Excluir',
      text: "Realmente deseja excluir?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        super.excluir(produto);
      }
    })

  }

  removerImagem() {
    Swal.fire({
      title: 'Excluir',
      text: "Realmente deseja excluir?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.arquivoSelecionado = null;
        this.excluiuArquivo = true;
        this.formulario.patchValue({ imagem: "" })
      }
    })
  }


}
