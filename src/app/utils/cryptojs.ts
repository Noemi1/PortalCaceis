import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class Crypto {
	encryptSecretKey: string = 'mySecretKey';
	
	encrypt(data: any) {
		try {
			return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	decrypt(data: any) {
		try {
			const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
			if (bytes.toString()) {
				return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			}
			return data;
		} catch (e) {
			console.log(e);
			return null;
		}
	}
}