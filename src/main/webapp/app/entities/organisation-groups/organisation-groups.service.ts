import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrganisationGroups } from 'app/shared/model/organisation-groups.model';

type EntityResponseType = HttpResponse<IOrganisationGroups>;
type EntityArrayResponseType = HttpResponse<IOrganisationGroups[]>;

@Injectable({ providedIn: 'root' })
export class OrganisationGroupsService {
    public resourceUrl = SERVER_API_URL + 'api/organisation-groups';

    constructor(protected http: HttpClient) {}

    create(organisationGroups: IOrganisationGroups): Observable<EntityResponseType> {
        return this.http.post<IOrganisationGroups>(this.resourceUrl, organisationGroups, { observe: 'response' });
    }

    update(organisationGroups: IOrganisationGroups): Observable<EntityResponseType> {
        return this.http.put<IOrganisationGroups>(this.resourceUrl, organisationGroups, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOrganisationGroups>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrganisationGroups[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
