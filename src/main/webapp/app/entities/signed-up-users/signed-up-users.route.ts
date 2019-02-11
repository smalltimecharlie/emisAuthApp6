import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SignedUpUsers } from 'app/shared/model/signed-up-users.model';
import { SignedUpUsersService } from './signed-up-users.service';
import { SignedUpUsersComponent } from './signed-up-users.component';
import { SignedUpUsersDetailComponent } from './signed-up-users-detail.component';
import { SignedUpUsersUpdateComponent } from './signed-up-users-update.component';
import { SignedUpUsersDeletePopupComponent } from './signed-up-users-delete-dialog.component';
import { ISignedUpUsers } from 'app/shared/model/signed-up-users.model';

@Injectable({ providedIn: 'root' })
export class SignedUpUsersResolve implements Resolve<ISignedUpUsers> {
    constructor(private service: SignedUpUsersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISignedUpUsers> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SignedUpUsers>) => response.ok),
                map((signedUpUsers: HttpResponse<SignedUpUsers>) => signedUpUsers.body)
            );
        }
        return of(new SignedUpUsers());
    }
}

export const signedUpUsersRoute: Routes = [
    {
        path: '',
        component: SignedUpUsersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.signedUpUsers.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SignedUpUsersDetailComponent,
        resolve: {
            signedUpUsers: SignedUpUsersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.signedUpUsers.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SignedUpUsersUpdateComponent,
        resolve: {
            signedUpUsers: SignedUpUsersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.signedUpUsers.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SignedUpUsersUpdateComponent,
        resolve: {
            signedUpUsers: SignedUpUsersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.signedUpUsers.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const signedUpUsersPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SignedUpUsersDeletePopupComponent,
        resolve: {
            signedUpUsers: SignedUpUsersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.signedUpUsers.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
