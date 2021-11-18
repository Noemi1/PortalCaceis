import { Injectable } from "@angular/core";

@Injectable()
export class Format {
    first_lower(palavra: string) {
        return palavra.substring(0, 1).toLowerCase() + palavra.substring(1);
    };

    first_upper(palavra: string) {
        return palavra.substring(0, 1).toUpperCase() + palavra.substring(1).toLowerCase();
    };

    trim(value: any) {
        return value.model.trim();
    }

}