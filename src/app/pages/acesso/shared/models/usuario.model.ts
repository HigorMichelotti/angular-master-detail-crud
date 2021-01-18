import { ModelBase } from "src/app/shared/models/model-base";

export class Usuario extends ModelBase {
    constructor(
        public username?: string,
        public password?: string,
    ) {
        super();
    }

    static fromJson(dadosJson: Usuario): Usuario {
        const usuario = Object.assign(new Usuario(), dadosJson);
        return usuario;
    }
}