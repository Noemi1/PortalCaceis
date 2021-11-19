import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faFilter } from '@fortawesome/free-solid-svg-icons';
import { OrdemJudicialService } from '../../services/ordem-judicial.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	faChevronLeft = faChevronLeft;
	faFilter = faFilter;

	constructor(
		private ordemJudicialService: OrdemJudicialService
	) { }

	ngOnInit(): void {
	}

}
