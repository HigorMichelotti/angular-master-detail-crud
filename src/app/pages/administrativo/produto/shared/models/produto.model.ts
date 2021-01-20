import { ModelBase } from "src/app/shared/models/model-base";


export class Produto extends ModelBase {
    constructor(
        public nome?: string,
        public valor?: number,
        public imagem?: string
    ) {
        super();
    }

    static fromJson(dadosJson: any): Produto {
        return Object.assign(new Produto(), dadosJson);
    }
}