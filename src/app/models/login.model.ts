export class LoginRequest {
    documento: string = '';
    password: string = '';
    account_Ping_Id?: number;
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
    refreshToken: string = '';
    account_Ping_Request?: number;
    ping_Id?: number;
    PF?: boolean;
}