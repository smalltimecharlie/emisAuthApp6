import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISignedUpUsers } from 'app/shared/model/signed-up-users.model';

type EntityResponseType = HttpResponse<ISignedUpUsers>;
type EntityArrayResponseType = HttpResponse<ISignedUpUsers[]>;

@Injectable({ providedIn: 'root' })
export class SignedUpUsersService {
    public resourceUrl = SERVER_API_URL + 'api/signed-up-users';

    constructor(protected http: HttpClient) {}

    create(signedUpUsers: ISignedUpUsers): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(signedUpUsers);
        return this.http
            .post<ISignedUpUsers>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(signedUpUsers: ISignedUpUsers): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(signedUpUsers);
        return this.http
            .put<ISignedUpUsers>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISignedUpUsers>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISignedUpUsers[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(signedUpUsers: ISignedUpUsers): ISignedUpUsers {
        const copy: ISignedUpUsers = Object.assign({}, signedUpUsers, {
            updated: signedUpUsers.updated != null && signedUpUsers.updated.isValid() ? signedUpUsers.updated.toJSON() : null,
            created: signedUpUsers.created != null && signedUpUsers.created.isValid() ? signedUpUsers.created.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.updated = res.body.updated != null ? moment(res.body.updated) : null;
            res.body.created = res.body.created != null ? moment(res.body.created) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((signedUpUsers: ISignedUpUsers) => {
                signedUpUsers.updated = signedUpUsers.updated != null ? moment(signedUpUsers.updated) : null;
                signedUpUsers.created = signedUpUsers.created != null ? moment(signedUpUsers.created) : null;
            });
        }
        return res;
    }
}
