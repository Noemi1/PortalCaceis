export class Alert {
    id: string = '';
    type: AlertType = AlertType.Success;
    title?: string;
    message: string = '';
    autoClose: boolean = false;
    background: boolean = true;
    keepAfterRouteChange?: boolean = false;
    fade: boolean = false;
    button?: string;
    buttonCallback:Function = () => {}
    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning,
    Dark,
    RegisterResponse,
}