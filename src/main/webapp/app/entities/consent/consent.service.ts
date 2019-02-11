import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConsent } from 'app/shared/model/consent.model';

type EntityResponseType = HttpResponse<IConsent>;
type EntityArrayResponseType = HttpResponse<IConsent[]>;

@Injectable({ providedIn: 'root' })
export class ConsentService {
    public resourceUrl = SERVER_API_URL + 'api/consents';

    constructor(protected http: HttpClient) {}

    create(consent: IConsent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(consent);
        return this.http
            .post<IConsent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(consent: IConsent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(consent);
        return this.http
            .put<IConsent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IConsent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IConsent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(consent: IConsent): IConsent {
        const copy: IConsent = Object.assign({}, consent, {
            endDate: consent.endDate != null && consent.endDate.isValid() ? consent.endDate.toJSON() : null,
            signedDate: consent.signedDate != null && consent.signedDate.isValid() ? consent.signedDate.toJSON() : null,
            startDate: consent.startDate != null && consent.startDate.isValid() ? consent.startDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
            res.body.signedDate = res.body.signedDate != null ? moment(res.body.signedDate) : null;
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((consent: IConsent) => {
                consent.endDate = consent.endDate != null ? moment(consent.endDate) : null;
                consent.signedDate = consent.signedDate != null ? moment(consent.signedDate) : null;
                consent.startDate = consent.startDate != null ? moment(consent.startDate) : null;
            });
        }
        return res;
    }
}
