import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAgreements } from 'app/shared/model/agreements.model';

type EntityResponseType = HttpResponse<IAgreements>;
type EntityArrayResponseType = HttpResponse<IAgreements[]>;

@Injectable({ providedIn: 'root' })
export class AgreementsService {
    public resourceUrl = SERVER_API_URL + 'api/agreements';

    constructor(protected http: HttpClient) {}

    create(agreements: IAgreements): Observable<EntityResponseType> {
        return this.http.post<IAgreements>(this.resourceUrl, agreements, { observe: 'response' });
    }

    update(agreements: IAgreements): Observable<EntityResponseType> {
        return this.http.put<IAgreements>(this.resourceUrl, agreements, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAgreements>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAgreements[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
