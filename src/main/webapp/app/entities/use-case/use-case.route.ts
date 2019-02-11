import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UseCase } from 'app/shared/model/use-case.model';
import { UseCaseService } from './use-case.service';
import { UseCaseComponent } from './use-case.component';
import { UseCaseDetailComponent } from './use-case-detail.component';
import { UseCaseUpdateComponent } from './use-case-update.component';
import { UseCaseDeletePopupComponent } from './use-case-delete-dialog.component';
import { IUseCase } from 'app/shared/model/use-case.model';

@Injectable({ providedIn: 'root' })
export class UseCaseResolve implements Resolve<IUseCase> {
    constructor(private service: UseCaseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUseCase> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<UseCase>) => response.ok),
                map((useCase: HttpResponse<UseCase>) => useCase.body)
            );
        }
        return of(new UseCase());
    }
}

export const useCaseRoute: Routes = [
    {
        path: '',
        component: UseCaseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.useCase.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UseCaseDetailComponent,
        resolve: {
            useCase: UseCaseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.useCase.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UseCaseUpdateComponent,
        resolve: {
            useCase: UseCaseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.useCase.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UseCaseUpdateComponent,
        resolve: {
            useCase: UseCaseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.useCase.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const useCasePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: UseCaseDeletePopupComponent,
        resolve: {
            useCase: UseCaseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emisAuthApp6App.useCase.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
