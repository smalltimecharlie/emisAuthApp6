import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUsersInOrganisations } from 'app/shared/model/users-in-organisations.model';

type EntityResponseType = HttpResponse<IUsersInOrganisations>;
type EntityArrayResponseType = HttpResponse<IUsersInOrganisations[]>;

@Injectable({ providedIn: 'root' })
export class UsersInOrganisationsService {
    public resourceUrl = SERVER_API_URL + 'api/users-in-organisations';

    constructor(protected http: HttpClient) {}

    create(usersInOrganisations: IUsersInOrganisations): Observable<EntityResponseType> {
        return this.http.post<IUsersInOrganisations>(this.resourceUrl, usersInOrganisations, { observe: 'response' });
    }

    update(usersInOrganisations: IUsersInOrganisations): Observable<EntityResponseType> {
        return this.http.put<IUsersInOrganisations>(this.resourceUrl, usersInOrganisations, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUsersInOrganisations>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUsersInOrganisations[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
