
import { Injectable } from '@angular/core';
import { AuthToken } from '../models/auth-token';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class TokenService {

    private apiPath: string = environment.url + 'token';

    constructor(private http: HttpClient) { }

    checkToken(): boolean {
        const authToken = localStorage.getItem('authToken');
        return !!authToken;
    }

    getToken(email: string, password: string) {
        const body = 'grant_type=password&username=' + email + '&password=' + password;
        const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this.http.post(this.apiPath, body, { headers: headers }).toPromise()
            .then((authToken: AuthToken) => {
                localStorage.setItem('authToken', authToken.access_token);
                return authToken;
            })
            .catch(err => {
                console.log('Error getting token.', err);
                return null;
            });
    }

}
