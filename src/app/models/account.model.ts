import { PerfilAccountResponse } from "../sistemas/corp/models/perfil.model";

export class AccountRequest {
    documento: string = '';
    password: string = '';
}

export class AccountResponse {
    id: number = 0;
    idEncrypted: string = '';
    documento: string = '';
    created: Date = new Date;
    updated: Date = new Date;
    isVerified: boolean = false;
    jwtToken: string = '';
    refreshToken: string = '';
    accessApproved?: boolean;
    sistemas: AccountSistemaResponse[] = [];
    userLogado: UserLogado = new UserLogado;
    perfilAccounts: PerfilAccountResponse[] = [];
}

export class AccountSistemaResponse {
    sistema_Id: number = 0;
    sigla: string = '';

}

export class UserLogado {
    email: string = '';
    nome: string = '';
    documento: string = '';
}
export class ResetPassword {
    password: string = '';
    confirmPassword: string = '';
    token: string = '';
}