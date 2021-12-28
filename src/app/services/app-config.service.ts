import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { AppConfig } from '../models/app.config';
// import {AppConfig}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  appConfig: BehaviorSubject<AppConfig> = new BehaviorSubject<AppConfig>({ "apiBaseUrl": "" });

  constructor(private http: HttpClient) {}

  loadAppConfig() {
    return this.http
          .get<AppConfig>("/assets/app.config.json")
          .pipe(
              retry(2),
              map(res => {
                console.log('MAP RES --- ', res)
                console.log("client config loadded", this.appConfig.value.apiBaseUrl);
                this.appConfig.next(res);
                return res;
              }) // Retry 3 times, if fails
          )
  }
}
