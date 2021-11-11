export class AcessoResponse {
    id: number = 0;
    path: string = '';
    descricao: string = '';
    httpMethod: string = '';
    idEncrypted: string = '';
    controllerPath_Id: number = 0;
    checked: boolean;
    excluido: boolean = false;

    constructor(checked: boolean) {
        this.checked = checked;
    }
}
export class AcessosRequest {
    perfilAcesso_Id: number = 0;
    perfil_Id: number = 0;
    controllerPath_Id: number = 0;
    status: string = '';
}
export class AcessoUpdateResponse {
    id: number = 0;
    path: string = '';
    descricao: string = '';
    httpMethod: string = '';
    idEncrypted: string = '';
    checked: boolean = true;

}