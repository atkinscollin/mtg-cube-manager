import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AccountService {

    private apiPath: string = environment.url + 'api/Account/';

    constructor(private http: HttpClient) { }

    register(email: string, password: string, confirmPassword: string) {
        let body = { "UserName": email, "Email": email, "Password": password, "ConfirmPassword": confirmPassword };
        let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(this.apiPath + 'Register', body, { headers: headers });
    }

}
