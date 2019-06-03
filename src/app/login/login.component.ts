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

    login() {
        this.tokenService.getToken(this.User.Email, this.User.Password)
            .then(authToken => {
                this.router.navigate(['/']);
            })
            .catch(err => console.log('invalid login'));
    }

}
