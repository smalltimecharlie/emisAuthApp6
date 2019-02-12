import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICognitoRegistrations } from 'app/shared/model/cognito-registrations.model';

type EntityResponseType = HttpResponse<ICognitoRegistrations>;
type EntityArrayResponseType = HttpResponse<ICognitoRegistrations[]>;

@Injectable({ providedIn: 'root' })
export class CognitoRegistrationsService {
    public resourceUrl = SERVER_API_URL + 'api/cognito-registrations';

    constructor(protected http: HttpClient) {}

    create(cognitoRegistrations: ICognitoRegistrations): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cognitoRegistrations);
        return this.http
            .post<ICognitoRegistrations>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(cognitoRegistrations: ICognitoRegistrations): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cognitoRegistrations);
        return this.http
            .put<ICognitoRegistrations>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICognitoRegistrations>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICognitoRegistrations[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(cognitoRegistrations: ICognitoRegistrations): ICognitoRegistrations {
        const copy: ICognitoRegistrations = Object.assign({}, cognitoRegistrations, {
            loggedDate:
                cognitoRegistrations.loggedDate != null && cognitoRegistrations.loggedDate.isValid()
                    ? cognitoRegistrations.loggedDate.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.loggedDate = res.body.loggedDate != null ? moment(res.body.loggedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((cognitoRegistrations: ICognitoRegistrations) => {
                cognitoRegistrations.loggedDate = cognitoRegistrations.loggedDate != null ? moment(cognitoRegistrations.loggedDate) : null;
            });
        }
        return res;
    }
}
