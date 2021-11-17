export class AccountRequest {
    documento: string = '';
    password: string = '';
}

export class AccountResponse {
    id: number = 0;
    documento: string = '';
    created: Date = new Date;
    updated: Date = new Date;
    isVerified: boolean = false;
    jwtToken: string = '';
    refreshToken: string = '';
    sistemas: AccountSistemaResponse[] = [];
    userLogado?: UserLogado;
}

export class AccountSistemaResponse {
    sistema_Id: number = 0;
    sigla: string = '';

}

export class UserLogado {
    email: string = '';
    nome: string = '';
}