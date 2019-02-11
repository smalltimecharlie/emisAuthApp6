import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrganisationGroups } from 'app/shared/model/organisation-groups.model';
import { OrganisationGroupsService } from './organisation-groups.service';
import { OrganisationGroupsComponent } from './organisation-groups.component';
import { OrganisationGroupsDetailComponent } from './organisation-groups-detail.component';
import { OrganisationGroupsUpdateComponent } from './organisation-groups-update.component';
import { OrganisationGroupsDeletePopupComponent } from './organisation-groups-delete-dialog.component';
import { IOrganisationGroups } from 'app/shared/model/organisation-groups.model';

@Injectable({ providedIn: 'root' })
export class OrganisationGroupsResolve implements Resolve<IOrganisationGroups> {
    constructor(private service: OrganisationGroupsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrganisationGroups> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<OrganisationGroups>) => response.ok),
                map((organisationGroups: HttpResponse<OrganisationGroups>) => organisationGroups.body)
            );
        }
        return of(new OrganisationGroups());
    }
}

export const organisationGroupsRoute: Routes = [
    {
        path: '',
        component: OrganisationGroupsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.organisationGroups.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: OrganisationGroupsDetailComponent,
        resolve: {
            organisationGroups: OrganisationGroupsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.organisationGroups.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: OrganisationGroupsUpdateComponent,
        resolve: {
            organisationGroups: OrganisationGroupsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.organisationGroups.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: OrganisationGroupsUpdateComponent,
        resolve: {
            organisationGroups: OrganisationGroupsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.organisationGroups.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const organisationGroupsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: OrganisationGroupsDeletePopupComponent,
        resolve: {
            organisationGroups: OrganisationGroupsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.organisationGroups.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
