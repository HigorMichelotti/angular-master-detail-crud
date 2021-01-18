import { OnInit, ViewChild, Injector } from '@angular/core';
// import { ServiceBase } from 'src/app/shared/services/servico-base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { ModelBase } from '../../models/model-base';
import { EmitirAlerta } from '../../helpers/sweer-alertas';
import { ServiceBase } from '../../services/base-service.service';


export abstract class BaseListComponent<T extends ModelBase> implements OnInit {

  @ViewChild('modalCadastroEdicao', { static: false }) modalCadastroEdicao: any;

  public acaoAtual: any
  public tituloModal: any;
  public textoBotaoModal: any;
  public carregando: boolean;
  public tituloPagina: string;
  public editandoForm: boolean;

  public serverErrorMessages: Array<string> = null;

  public baseComponentPath: string;

  public formulario: FormGroup;
  public resources: Array<T>;
  public gridApi: any;
  public context: any;
  public traducaoDataGrid: any;
  public definicaoPadraoColunas: any;

  public frameworkComponents: any;
  public components: any;

  protected router: Router;
  protected route: ActivatedRoute;
  protected formBuilder: FormBuilder;

  constructor(
    // protected nomeComponente: string,
    protected injector: Injector,
    private resourceService: ServiceBase<T>,
    protected jsonDadosToResourceFn: (jsonDados) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);

    this.baseComponentPath = this.route.snapshot.parent.url[0].path;

    // this.tituloPagina = this.nomeComponente;
  }

  ngOnInit() {
    this.obterTodos();
    // this.configuracoesAgGrid();
    // this.ajustarAgGrid();
  }

  async obterTodos() {
    await this.resourceService.obterTodos().then(
      resources => this.resources = resources,
      error => EmitirAlerta.alertaToastError("Erro ao carregar lista")
    )
  }

//   inicializarDataTable(params) {
//     this.gridApi = params.api
//     this.gridApi.sizeColumnsToFit();
//   }

//   ajustarAgGrid() {
//     this.menuService.emitirMenuAlterado.subscribe(
//       (menuAlterado: any) => this.gridApi.sizeColumnsToFit()
//     );
//   }

  async submitFormulario() {
    switch (this.acaoAtual) {
      case 'cadastro': await this.salvar(); break;
      case 'edicao': await this.atualizar(); break;
    }
  }


//   protected configuracoesAgGrid() {
//     this.context = {
//       componentParent: this
//     };

//     this.definicaoPadraoColunas = {
//       sortable: true,
//       resizable: true,
//       filter: true
//     };

//     this.traducaoDataGrid = AgGridHelper.traduzirPTBR()

//     this.frameworkComponents = {
//       childMessageRenderer: BotoesComponent,
//     };

//     this.components = {}
//   }

  protected async salvar() {
    console.log('salvar');
    console.log(this.formulario.value)
    this.carregando = true;
    const formulario: T = this.jsonDadosToResourceFn(this.formulario.value);

    console.log(formulario)

    await this.resourceService.salvar(formulario).then(
      (resource: any) => {
        if (!resource.status) return this.acaoQuandoForError();
        this.acaoQuandoForSuccesso()
      },
      error => this.acaoQuandoForError()
    )
  }

  protected async atualizar() {
    console.log('atualizar');
    console.log(this.formulario.value)
    this.carregando = true;
    const formulario: T = this.jsonDadosToResourceFn(this.formulario.value);
    await this.resourceService.atualizar(formulario).then(
      (resource: any) => {
        if (!resource.status) return this.acaoQuandoForError();
        this.acaoQuandoForSuccesso()
      },
      error => this.acaoQuandoForError()
    )
  }

  protected async excluir(dados: T) {
    await this.resourceService.excluir(dados.id).then(
      () => {
        this.resources = this.resources.filter(element => element != dados)
        EmitirAlerta.alertaToastSuccess("Solicitação processada com sucesso!")
      },
      () => this.acaoQuandoForError()
    )
  }

  protected setarTipoDaModal(acaoAtual: string) {
    switch (acaoAtual) {
      case 'cadastro':
        this.editandoForm = false;
        this.acaoAtual = 'cadastro';
        this.tituloModal = this.tituloModalCadastrar();
        this.textoBotaoModal = this.textoBotaoModalCadastrar();

        break;
      case 'edicao':
        this.editandoForm = true;
        this.acaoAtual = 'edicao';
        this.tituloModal = this.tituloModalEditar();
        this.textoBotaoModal = this.textoBotaoModalEditar();
        break;
    }
  }

  protected tituloModalCadastrar(): string {
    return "Cadastrar";
  }

  protected tituloModalEditar(): string {
    return "Editar";
  }

  protected textoBotaoModalCadastrar(): string {
    return "Salvar";
  }

  protected textoBotaoModalEditar(): string {
    return "Alterar";
  }

  public atribuirParaEditar(dados: T): void {
    this.setarTipoDaModal('edicao');
    this.formulario.reset();
    this.formulario.patchValue(dados);
    this.abrirModal(this.modalCadastroEdicao)
  }

  public atribuirParaVisualizar(dados: T): void {
    this.formulario.patchValue(dados);
    this.abrirModal(this.modalCadastroEdicao)
  }

  public atribuirParaSalvar(): void {
    this.setarTipoDaModal('cadastro');
    this.formulario.reset();
    this.abrirModal(this.modalCadastroEdicao)
  }

  protected abrirModal(nomeModal: any) {
    return nomeModal.show();
  }

  protected fecharModal(nomeModal: any) {
    return nomeModal.hide();
  }

  protected acaoQuandoForSuccesso(mensagem?: string): T {
    if (!isNullOrUndefined(mensagem)) return EmitirAlerta.alertaToastSuccess(mensagem);
    this.carregando = false;
    return EmitirAlerta.alertaToastSuccess("Solicitação processada com sucesso!")
  }

  protected acaoQuandoForError(mensagem?: string): T {
    if (!isNullOrUndefined(mensagem)) return EmitirAlerta.alertaToastError(mensagem);
    this.carregando = false;
    return EmitirAlerta.alertaToastError("Ocorreu um erro ao processar a sua solicitação!")
  }

  protected abstract setarAtributosFormulario(): void;

}
