import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Consent } from 'app/shared/model/consent.model';
import { ConsentService } from './consent.service';
import { ConsentComponent } from './consent.component';
import { ConsentDetailComponent } from './consent-detail.component';
import { ConsentUpdateComponent } from './consent-update.component';
import { ConsentDeletePopupComponent } from './consent-delete-dialog.component';
import { IConsent } from 'app/shared/model/consent.model';

@Injectable({ providedIn: 'root' })
export class ConsentResolve implements Resolve<IConsent> {
    constructor(private service: ConsentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IConsent> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Consent>) => response.ok),
                map((consent: HttpResponse<Consent>) => consent.body)
            );
        }
        return of(new Consent());
    }
}

export const consentRoute: Routes = [
    {
        path: '',
        component: ConsentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.consent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ConsentDetailComponent,
        resolve: {
            consent: ConsentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.consent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ConsentUpdateComponent,
        resolve: {
            consent: ConsentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.consent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ConsentUpdateComponent,
        resolve: {
            consent: ConsentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.consent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const consentPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ConsentDeletePopupComponent,
        resolve: {
            consent: ConsentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.consent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
