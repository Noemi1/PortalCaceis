import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Crypto } from 'src/app/utils/cryptojs';
import { ModalOpen } from 'src/app/utils/modal-open';

@Injectable({
	providedIn: 'root'
})
export class UpdatePasswordService {

	private resetPassword: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	constructor(
		private crypto: Crypto,
		private modal: ModalOpen,
	) { }

	get(): BehaviorSubject<boolean> {
		var local_Storage = localStorage.getItem('reset-password');
		var resetPassword = this.crypto.decrypt(local_Storage) as boolean;
		this.resetPassword.next(resetPassword)
		return this.resetPassword;
	}

	set(value: boolean) {
		localStorage.setItem('reset-password', this.crypto.encrypt(value));
		this.resetPassword.next(value)
	}
}
