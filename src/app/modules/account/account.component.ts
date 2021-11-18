import { Component, OnInit } from '@angular/core';
import { MeuPerfilComponent } from 'src/app/parts/meu-perfil/meu-perfil.component';
import { MeuPerfilService } from 'src/app/parts/meu-perfil/meu-perfil.service';
import { UpdatePasswordService } from 'src/app/parts/update-password/update-password.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

	constructor(
		private meuPerfil: MeuPerfilService,
		private updatePassword: UpdatePasswordService
	) { }

	ngOnInit(): void {
		this.updatePassword.set(false);
		this.meuPerfil.set(false);
	}

}
