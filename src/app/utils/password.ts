import { Injectable } from "@angular/core";
import { NgModel } from "@angular/forms";
import * as $ from 'jquery';
@Injectable({
	providedIn: 'root'
})
export class Password {
    togglePassword() {
        $('body').off('change', '#togglePassword');
        $('body').on('change', '#togglePassword', function () {
            if ($(this).prop('checked')) {
                $('#textSenha').html('Esconder');
                $('#password').attr('type', 'text');
                $('#confirmPassword').attr('type', 'text');
            } else {
                $('#textSenha').html('Exibir');
                $('#password').attr('type', 'password');
                $('#confirmPassword').attr('type', 'password');
            }
        });
    }

	validate(senha?: NgModel, text: string = ''): boolean | string {
		if (senha) {
			text = senha.value ?? ''
		}
		if (text.length < 8) {
			return 'A senha deve conter pelo menos 8 dígitos';
		}
		if (text.length > 16) {
			return 'A senha deve conter no máximo 16 dígitos';
		}
		if (!/[a-z]/.test(text))
			return 'A senha deve conter letras minúsculas';

		if (!/[A-Z]/.test(text))
			return 'A senha deve conter letras maiúsculas';

		if (!/[0-9]/.test(text))
			return 'A senha deve conter números';

		return true;
	}
}