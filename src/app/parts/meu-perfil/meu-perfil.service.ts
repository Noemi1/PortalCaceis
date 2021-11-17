import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Crypto } from 'src/app/utils/cryptojs';
import { ModalOpen } from 'src/app/utils/modal-open';

@Injectable({
	providedIn: 'root'
})
export class MeuPerfilService {

	private meuPerfil: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	constructor(
		private crypto: Crypto,
		private modal: ModalOpen,
	) { }

	get(): BehaviorSubject<boolean> {
		var local_Storage = localStorage.getItem('profile');
		var meuPerfil = this.crypto.decrypt(local_Storage) as boolean;
		this.meuPerfil.next(meuPerfil)
		return this.meuPerfil;
	}

	set(value: boolean) {
		localStorage.setItem('profile', this.crypto.encrypt(value));
		this.meuPerfil.next(value)
	}
}
