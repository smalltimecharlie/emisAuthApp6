import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UsersInOrganisations } from 'app/shared/model/users-in-organisations.model';
import { UsersInOrganisationsService } from './users-in-organisations.service';
import { UsersInOrganisationsComponent } from './users-in-organisations.component';
import { UsersInOrganisationsDetailComponent } from './users-in-organisations-detail.component';
import { UsersInOrganisationsUpdateComponent } from './users-in-organisations-update.component';
import { UsersInOrganisationsDeletePopupComponent } from './users-in-organisations-delete-dialog.component';
import { IUsersInOrganisations } from 'app/shared/model/users-in-organisations.model';

@Injectable({ providedIn: 'root' })
export class UsersInOrganisationsResolve implements Resolve<IUsersInOrganisations> {
    constructor(private service: UsersInOrganisationsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUsersInOrganisations> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<UsersInOrganisations>) => response.ok),
                map((usersInOrganisations: HttpResponse<UsersInOrganisations>) => usersInOrganisations.body)
            );
        }
        return of(new UsersInOrganisations());
    }
}

export const usersInOrganisationsRoute: Routes = [
    {
        path: '',
        component: UsersInOrganisationsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.usersInOrganisations.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UsersInOrganisationsDetailComponent,
        resolve: {
            usersInOrganisations: UsersInOrganisationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.usersInOrganisations.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UsersInOrganisationsUpdateComponent,
        resolve: {
            usersInOrganisations: UsersInOrganisationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.usersInOrganisations.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UsersInOrganisationsUpdateComponent,
        resolve: {
            usersInOrganisations: UsersInOrganisationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.usersInOrganisations.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usersInOrganisationsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: UsersInOrganisationsDeletePopupComponent,
        resolve: {
            usersInOrganisations: UsersInOrganisationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.usersInOrganisations.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
