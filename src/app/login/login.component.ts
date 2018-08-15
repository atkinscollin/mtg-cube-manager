import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [TokenService]
})

export class LoginComponent implements OnInit {

    private User: User = new User();

    constructor(private tokenService: TokenService, private router: Router) { }

    ngOnInit() { }

    private login() {
        this.tokenService.getToken(this.User.Email, this.User.Password)
            .subscribe(authToken => {
                this.router.navigate(['/']);
            }, err => console.log('invalid login'));
    }

}
