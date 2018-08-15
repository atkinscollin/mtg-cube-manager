import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { SnackBarUtil } from '../util/snackbar.util';
import { Router } from '@angular/router';
import { Validator } from '@angular/forms/src/directives/validators';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [AccountService, SnackBarUtil]
})
export class RegisterComponent implements OnInit {

    private User: User = new User();

    private emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email
    ]);
    private passwordFormControl = new FormControl('', [
        Validators.minLength(10),
        Validators.required
    ]);
    private confirmPasswordFormControl = new FormControl('', [
        Validators.required
    ]);

    constructor(private accountService: AccountService, private snackbarutil: SnackBarUtil, private router: Router) { }

    ngOnInit() { }

    private register() {
        this.accountService.register(this.User.Email, this.User.Password, this.User.ConfirmPassword)
            .subscribe(() => {
                this.snackbarutil.open('Registration successful');
                this.router.navigate(['/']);
            }, err => {
                this.snackbarutil.open('Registration failed');
            });
    }

    private passwordConfirmed() {
        if (this.User.Password == this.User.ConfirmPassword) {
            this.confirmPasswordFormControl.setErrors(null);
            return true;
        } else {
            this.confirmPasswordFormControl.setErrors(['confirmation']);
            return false;
        }
    }

}