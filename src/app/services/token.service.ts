import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthToken } from '../models/auth-token';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenService {

    private apiPath: string = environment.url + 'token';

    constructor(private http: Http) { }

    checkToken(): boolean {
        let authToken = localStorage.getItem('authToken');
        return !!authToken;
    }

    getToken(email: string, password: string) {
        let body = 'grant_type=password&username=' + email + '&password=' + password;
        let headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this.http.post(this.apiPath, body, { headers: headers })
            .map(authToken => {
                localStorage.setItem('authToken', (authToken.json() as AuthToken).access_token);
                authToken.json();
            });
    }

}
