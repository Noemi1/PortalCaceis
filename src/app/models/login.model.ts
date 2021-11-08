export class LoginRequest {
    documento: string = '';
    password: string = '';
}

export class LoginResponse {
    id: number = 0;
    documento: string = '';
    nome: string = '';
    role: string = '';
    created: Date = new Date;
    updated: Date = new Date;
    isVerified: boolean = false;
    jwtToken: string = '';
    account_Ping_Request?: number;
    refreshToken: string = '';
    ping_Id?: number;
    PF: boolean = true;
}