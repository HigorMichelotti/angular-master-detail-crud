import Swal from 'sweetalert2';

declare var require: any
var gerarHash = require('md5');

export class ArquivoUtils {

    public static pegarExtensaoArquivo(arquivo: File): string {
        return arquivo.name.substring(arquivo.name.lastIndexOf('.') + 1, arquivo.name.length) || arquivo.name;
    }

    public static pegarNomeArquivoArquivo(arquivo: string): string {
        if (arquivo == null || arquivo == undefined ) return
        return arquivo.substring(arquivo.lastIndexOf('/') + 1, arquivo.length) || arquivo;
    }

    public static gerarArquivoNomeHash(arquivo: File) {
        return new File([arquivo], `${gerarHash(`${arquivo.name}${Date.now()}`)}.${this.pegarExtensaoArquivo(arquivo)}`, { type: arquivo.type });
    }

    public static async verificaTamanhoImagemKB(file: any, tamanhoMaxPermitido: number) {
        const fileSize = (Math.round(file.size * tamanhoMaxPermitido / 1024) / tamanhoMaxPermitido);
        if (fileSize > tamanhoMaxPermitido) {
            await Swal.fire({
                icon: 'error',
                title: 'Imagem muito grande',
                text: `O tamanho da imagem não pode ultrapassar ${tamanhoMaxPermitido}KB.`,
                footer: `<p class='text-danger'>A imagem escolhida possui: ${fileSize}KB</p>`
            });
            return false;
        }
        return true;
    }
}