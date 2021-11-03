import { BehaviorSubject } from "rxjs";

export class Theme {
  
    themeStorage = localStorage.getItem('theme') ?? '';
    theme = new BehaviorSubject<theme>(theme.red);

    getTheme(){
        if(this.themeStorage != '') {
            try {
                this.setTheme(this.themeStorage as unknown as theme);
            }
            catch(err) {
                this.setTheme(theme.red);
            }
        }
        return this.theme;
    }
    setTheme(theme: theme){
        localStorage.setItem('theme', theme.toString())
        this.theme.next(theme);
    }
}

export enum theme {
    grey,
    red,
    dark
}