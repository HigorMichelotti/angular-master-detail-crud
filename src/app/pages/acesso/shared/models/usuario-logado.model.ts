import { ModelBase } from "src/app/shared/models/model-base";
export class UsuariosLogado extends ModelBase {
    constructor(
        public success?: boolean,
        public error?: string
    ) {
        super();
    }

    static fromJson(dadosJson: any): UsuariosLogado {
        const usuario = Object.assign(new UsuariosLogado(), dadosJson);
        return usuario;
    }

}