import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmitirAlerta } from '../helpers/sweer-alertas';

@Injectable({
  providedIn: 'root'
})
export class UploadArquivoService {

  constructor(private http: HttpClient) { }

  async salvarArquivo(arquivo: File) {
    let formData = new FormData();
    formData.append("Arquivo", arquivo);
    return await this.http.post<any>(`${environment.BASE_URL}/api/upload-arquivos/`, formData).toPromise()
    .then(data => {
      if (!data) return EmitirAlerta.alertaToastError("Algo deu errado, tente novamente");
    }, error => {
        EmitirAlerta.alertaToastError("Não foi possível salvar arquivo.");
    });
  }

  async atualizarArquivo(caminhoAntigo: string, arquivo: File) {
    let formData = new FormData();
    formData.append("Arquivo", arquivo);
    formData.append("CaminhoImagem", caminhoAntigo);
    return await this.http.put<any>(`${environment.BASE_URL}/api/upload-arquivos`, formData).toPromise()
    .then(data => {
      if (!data) return EmitirAlerta.alertaToastError("Algo deu errado, tente novamente");
    }, error => {
        EmitirAlerta.alertaToastError("Não foi possível atualizar arquivo.");
    });
  }

  async excluirArquivo(caminhoAntigo: string) {
    return await this.http.delete<any>(`${environment.BASE_URL}/api/upload-arquivos?caminhoImagem=${caminhoAntigo}`).toPromise()
    .then(data => {
      if (!data) return EmitirAlerta.alertaToastError("Algo deu errado, tente novamente");
    }, error => {
      EmitirAlerta.alertaToastError("Não foi possível excluir o arquivo.");
    });
  }

 


}
