import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

enum EmailStatus {
	Verifying,
    Failed
}

@Component({
	selector: 'app-verify-email',
	templateUrl: './verify-email.component.html',
	styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

	EmailStatus = EmailStatus;
	emailStatus = EmailStatus.Verifying;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private accountService: AccountService,
		private toastrService: ToastrService
	) { }

	ngOnInit() {

		// this.accountService.verifyEmail(token)
		// 	.pipe(first())
		// 	.subscribe({
		// 		next: () => {
		// 			this.toastrService.success('Verificação concluída. Acesse com o login');
		// 			this.router.navigate(['../login'], { relativeTo: this.route });
		// 		},
		// 		error: () => {
		// 			this.emailStatus = EmailStatus.Failed;
		// 		}
		// 	});
	}
}
