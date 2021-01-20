import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list.component';
import { ArquivoUtils } from 'src/app/shared/helpers/arquivo-utils';
import { EmitirAlerta } from 'src/app/shared/helpers/sweer-alertas';
import { UploadArquivoService } from 'src/app/shared/services/upload-arquivo.service';
import { environment } from 'src/environments/environment';
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
    this.excluiuArquivo = false;

    this.imagemAntigo = produto.imagem;
    super.atribuirParaEditar(produto);

    if (this.formulario.value.imagem != null) {
      this.formulario.patchValue({ imagem: environment.CAMINHO_IMAGEM + this.formulario.value.imagem })
    }
  }

  protected setarAtributosFormulario(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      valor: [null, Validators.required],
      imagem: [null, Validators.required]
    })
  }

  async carregarImagem(files: any) {
    const file: File = files[0];
    const reader: FileReader = new FileReader();
    if (!file) return;
    reader.onload = async (e: any) => {
      if (!await ArquivoUtils.verificaTamanhoImagemKB(file, 200)) return;
      this.formulario.get("imagem").setValue(e.target.result);
      this.arquivoSelecionado = file;
    }
    reader.readAsDataURL(file);
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

        if (this.arquivoSelecionado != null && this.arquivoSelecionado != undefined)
          this.uploadArquivoService.salvarArquivo(this.arquivoSelecionado);
        super.obterTodos();
        super.acaoQuandoForSuccesso();
        this.carregando = false;
        super.fecharModal(this.modalCadastroEdicao);
      }, error => {
        super.acaoQuandoForError();
        this.carregando = false;
        super.fecharModal(this.modalCadastroEdicao);
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
        if (this.arquivoSelecionado != null && this.arquivoSelecionado != undefined)
          this.uploadArquivoService.atualizarArquivo(this.imagemAntigo, this.arquivoSelecionado)

        super.obterTodos();
        super.acaoQuandoForSuccesso();
        this.carregando = false;
        super.fecharModal(this.modalCadastroEdicao);
      }, error => {
        super.acaoQuandoForError();
        this.carregando = false;
        super.fecharModal(this.modalCadastroEdicao);
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
    this.arquivoSelecionado = null;
    this.excluiuArquivo = true;
    this.formulario.patchValue({ imagem: "" })
  }


}
