import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Agreements } from 'app/shared/model/agreements.model';
import { AgreementsService } from './agreements.service';
import { AgreementsComponent } from './agreements.component';
import { AgreementsDetailComponent } from './agreements-detail.component';
import { AgreementsUpdateComponent } from './agreements-update.component';
import { AgreementsDeletePopupComponent } from './agreements-delete-dialog.component';
import { IAgreements } from 'app/shared/model/agreements.model';

@Injectable({ providedIn: 'root' })
export class AgreementsResolve implements Resolve<IAgreements> {
    constructor(private service: AgreementsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAgreements> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Agreements>) => response.ok),
                map((agreements: HttpResponse<Agreements>) => agreements.body)
            );
        }
        return of(new Agreements());
    }
}

export const agreementsRoute: Routes = [
    {
        path: '',
        component: AgreementsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.agreements.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AgreementsDetailComponent,
        resolve: {
            agreements: AgreementsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.agreements.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AgreementsUpdateComponent,
        resolve: {
            agreements: AgreementsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.agreements.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AgreementsUpdateComponent,
        resolve: {
            agreements: AgreementsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.agreements.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agreementsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AgreementsDeletePopupComponent,
        resolve: {
            agreements: AgreementsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.agreements.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
