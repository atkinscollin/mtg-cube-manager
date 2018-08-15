import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AccountService {

    private apiPath: string = environment.url + 'api/Account/';

    constructor(private http: Http) { }

    register(email: string, password: string, confirmPassword: string) {
        let body = { "UserName": email, "Email": email, "Password": password, "ConfirmPassword": confirmPassword };
        let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.apiPath + 'Register', body, { headers: headers });
    }

}
