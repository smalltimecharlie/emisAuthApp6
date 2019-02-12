import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICognitoRegistrations } from 'app/shared/model/cognito-registrations.model';
import { AccountService } from 'app/core';
import { CognitoRegistrationsService } from './cognito-registrations.service';

@Component({
    selector: 'jhi-cognito-registrations',
    templateUrl: './cognito-registrations.component.html'
})
export class CognitoRegistrationsComponent implements OnInit, OnDestroy {
    cognitoRegistrations: ICognitoRegistrations[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected cognitoRegistrationsService: CognitoRegistrationsService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.cognitoRegistrationsService
            .query()
            .pipe(
                filter((res: HttpResponse<ICognitoRegistrations[]>) => res.ok),
                map((res: HttpResponse<ICognitoRegistrations[]>) => res.body)
            )
            .subscribe(
                (res: ICognitoRegistrations[]) => {
                    this.cognitoRegistrations = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCognitoRegistrations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICognitoRegistrations) {
        return item.id;
    }

    registerChangeInCognitoRegistrations() {
        this.eventSubscriber = this.eventManager.subscribe('cognitoRegistrationsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
