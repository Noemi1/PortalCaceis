import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, NgModule, OnInit } from '@angular/core';
import { faCaretDown, faCaretLeft, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';


@Component({
	selector: 'app-senha-alert',
	templateUrl: './senha-alert.component.html',
	styleUrls: ['./senha-alert.component.css']
})
export class SenhaAlertComponent implements OnInit, AfterViewInit {

	position: Position = Position.Right;
	windowSize: WindowSize = WindowSize.Large;
	icon: IconDefinition = faCaretLeft;

	constructor() { }

	ngOnInit(): void {
		this.getWindowSize()
	}
	ngAfterViewInit(): void {
		$('body').on('focus', '#password, #confirmPassword', function () {
			$(this).siblings('app-senha-alert').find('.popover').addClass('active')
		});
		$('body').on('focusout', '#password, #confirmPassword', function () {
			$(this).siblings('app-senha-alert').find('.popover').removeClass('active')
		});
	}

	showPopover(input: any) {
		$(input).siblings('app-senha-alert').find('.popover').addClass('active')
	}


	hidePopover(input: any) {
		$(input).siblings('app-senha-alert').find('.popover').removeClass('active')
	}

	@HostListener('window:resize')
	getWindowSize() {
		var size = $(window).width() ?? 0;
		if (size > 1000) {
			this.windowSize = WindowSize.Large;
			this.position = Position.Right;
			this.icon = faCaretLeft;
		} else if (size < 1000) {
			this.windowSize = WindowSize.Small;
			this.position = Position.Bottom;
			this.icon = faCaretDown;
		}
	}

}
export enum WindowSize {
	Large,
	Medium,
	Small,
}

export enum Position {
	Top = 'Top',
	Right = 'Right',
	Bottom = 'Bottom',
	Left = 'Left'
}


@NgModule({
	declarations: [
		SenhaAlertComponent
	],
	imports: [
		CommonModule,
	],
	exports: [
		SenhaAlertComponent
	]
})
export class SenhaAlertModule {

}