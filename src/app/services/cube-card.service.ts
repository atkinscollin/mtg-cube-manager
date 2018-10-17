import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CubeCard } from '../models/cube-card';

@Injectable()
export class CubeCardService {

    private apiPath: string = environment.url + 'api/CubeCards';

    constructor(private httpClient: HttpClient) { }

    getCubeCardById(cubeCardId: number) {
        return this.httpClient.get<CubeCard>(this.apiPath + "?cubeCardId=" + cubeCardId)
            .toPromise()
            .then((cubeCard: CubeCard) => {
                return cubeCard;
            })
            .catch(err => {
                console.log("Error retrieving card.", err);
                return new CubeCard();
            });
    }

    getCubeCardsByCubeId(cubeId: number) {
        return this.httpClient.get<CubeCard[]>(this.apiPath + "?cubeId=" + cubeId)
            .toPromise()
            .then((cubeCards: CubeCard[]) => {
                return cubeCards;
            })
            .catch(err => {
                console.log("Error retrieving cards.", err);
                return new Array<CubeCard>();
            });
    }

    createCubeCard(cubeCard: CubeCard) {
        var token = localStorage.getItem('authToken');
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };

        return this.httpClient.post<CubeCard>(this.apiPath, cubeCard, httpOptions)
            .toPromise()
            .then((resultCubeCard: CubeCard) => {
                return resultCubeCard;
            })
            .catch(err => {
                console.log("Error posting cube card.", err);
                return null;
            });
    }

}
