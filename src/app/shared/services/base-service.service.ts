

import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { ModelBase } from '../models/model-base';

export abstract class ServiceBase<T extends ModelBase> {

    protected http: HttpClient;

    constructor(
        protected caminhoApi: string,
        protected injector: Injector,
        protected jsonDadosToResourceFn: (jsonData: any) => T
    ) {
        this.http = injector.get(HttpClient)
    }

    async obterTodos(): Promise<Array<T>> {
        return await this.http.get<T[]>(`${environment.BASE_URL + this.caminhoApi}`).toPromise()
            .then(this.jsonDadosToResources.bind(this))
            .catch(this.handleError)
    }

    async obterPorId(id: string): Promise<T> {
        return await this.http.get<T>(`${environment.BASE_URL + this.caminhoApi}/${id}`).toPromise()
            .then(this.jsonDadosToResource.bind(this))
            .catch(this.handleError)
    }

    async salvar(resource: T): Promise<T> {
        return await this.http.post<T>(`${environment.BASE_URL + this.caminhoApi}`, resource).toPromise();
    }

    async atualizar(resource: T): Promise<T> {
        return await this.http.put<T>(`${environment.BASE_URL + this.caminhoApi}`, resource).toPromise();
    }

    async excluir(id: string): Promise<T> {
        return await this.http.delete<T>(`${environment.BASE_URL + this.caminhoApi}/${id}`).toPromise()
            .then(() => null)
            .catch(this.handleError)
    }

    // Métodos protected
    protected jsonDadosToResources(jsonDados: Array<any>): Array<T> {
        const resources: Array<T> = [];
        if (!jsonDados) return resources;
        jsonDados.forEach(element => resources.push(this.jsonDadosToResourceFn(element)));
        return resources
    }

    protected jsonDadosToResource(jsonDados: any): T {
        if (!jsonDados) return jsonDados;
        return this.jsonDadosToResourceFn(jsonDados);
    }

    protected handleError(error: any): any {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        if (error.status === 400 || error.status === 404) {
            console.log("RESPONSE API => ", error.error.errors)
            throw error.error.errors;

        }
        throw error;
        // (error);
    }
}