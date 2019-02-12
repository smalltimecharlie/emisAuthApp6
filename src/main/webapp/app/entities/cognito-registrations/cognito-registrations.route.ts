import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CognitoRegistrations } from 'app/shared/model/cognito-registrations.model';
import { CognitoRegistrationsService } from './cognito-registrations.service';
import { CognitoRegistrationsComponent } from './cognito-registrations.component';
import { CognitoRegistrationsDetailComponent } from './cognito-registrations-detail.component';
import { CognitoRegistrationsUpdateComponent } from './cognito-registrations-update.component';
import { CognitoRegistrationsDeletePopupComponent } from './cognito-registrations-delete-dialog.component';
import { ICognitoRegistrations } from 'app/shared/model/cognito-registrations.model';

@Injectable({ providedIn: 'root' })
export class CognitoRegistrationsResolve implements Resolve<ICognitoRegistrations> {
    constructor(private service: CognitoRegistrationsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICognitoRegistrations> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CognitoRegistrations>) => response.ok),
                map((cognitoRegistrations: HttpResponse<CognitoRegistrations>) => cognitoRegistrations.body)
            );
        }
        return of(new CognitoRegistrations());
    }
}

export const cognitoRegistrationsRoute: Routes = [
    {
        path: '',
        component: CognitoRegistrationsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.cognitoRegistrations.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CognitoRegistrationsDetailComponent,
        resolve: {
            cognitoRegistrations: CognitoRegistrationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.cognitoRegistrations.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CognitoRegistrationsUpdateComponent,
        resolve: {
            cognitoRegistrations: CognitoRegistrationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.cognitoRegistrations.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CognitoRegistrationsUpdateComponent,
        resolve: {
            cognitoRegistrations: CognitoRegistrationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.cognitoRegistrations.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cognitoRegistrationsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CognitoRegistrationsDeletePopupComponent,
        resolve: {
            cognitoRegistrations: CognitoRegistrationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.cognitoRegistrations.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
