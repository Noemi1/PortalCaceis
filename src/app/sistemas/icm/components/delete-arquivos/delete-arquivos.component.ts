import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-delete-arquivos',
	templateUrl: './delete-arquivos.component.html',
	styleUrls: ['./delete-arquivos.component.css']
})
export class DeleteArquivosComponent implements OnInit {
	modalOpen = false;
	constructor() { }

	ngOnInit(): void {
		setTimeout(() => {
			this.modalOpen = true;
		}, 200);
	}

}
