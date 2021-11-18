import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class Menu {
    openSubject = new BehaviorSubject<boolean | undefined>(undefined)
    pinSubject = new BehaviorSubject<boolean | undefined>(undefined)

    getOpen(): BehaviorSubject<boolean | undefined> {
        let value = this.openSubject.value ?? (localStorage.getItem('menuOpen') == 'true' ? true : false);
        if(this.openSubject.value != undefined) {
            return this.openSubject;
        } else {
            this.openSubject.next(value)
        }
        return this.openSubject;
    }

    setOpen(value: boolean) {
        this.openSubject.next(value);
        localStorage.setItem('menuOpen', value.toString())
    }

    getPin(){
        let value = this.pinSubject.value ?? localStorage.getItem('menuPin') === 'true' ? true : false;
        if(this.pinSubject.value != undefined) {
            return this.pinSubject;
        } else {
            this.pinSubject.next(value)
        }
        return this.pinSubject;
    }
    setPin(value: boolean){
        this.pinSubject.next(value);
        localStorage.setItem('menuPin', value.toString())
    }

}