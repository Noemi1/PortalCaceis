import * as $ from 'jquery';
import { BehaviorSubject } from 'rxjs';

export class Inputsearch {
    inputValue: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
    
    search(){
        console.log(this.inputValue)
        return this.inputValue;
    }
    
    clear() {
        this.inputValue.next(undefined);
    }
}

