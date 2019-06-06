import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CubeCard } from '../models/cube-card';

@Injectable()
export class CubeCardService {

    private apiPath: string = environment.url + 'api/cubecards';

    constructor(private httpClient: HttpClient) { }

    getCubeCardById(cubeCardId: number) {
        return this.httpClient.get<CubeCard>(this.apiPath + '?cubeCardId=' + cubeCardId);
    }

    getCubeCardsByCubeId(cubeId: number) {
        return this.httpClient.get<CubeCard[]>(this.apiPath + '?cubeId=' + cubeId);
    }

    createCubeCard(cubeCard: CubeCard) {
        return this.httpClient.post<CubeCard>(this.apiPath, cubeCard);
    }

}
