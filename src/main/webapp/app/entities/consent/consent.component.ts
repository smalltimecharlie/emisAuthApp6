import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IConsent } from 'app/shared/model/consent.model';
import { AccountService } from 'app/core';
import { ConsentService } from './consent.service';

@Component({
    selector: 'jhi-consent',
    templateUrl: './consent.component.html'
})
export class ConsentComponent implements OnInit, OnDestroy {
    consents: IConsent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected consentService: ConsentService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.consentService
            .query()
            .pipe(
                filter((res: HttpResponse<IConsent[]>) => res.ok),
                map((res: HttpResponse<IConsent[]>) => res.body)
            )
            .subscribe(
                (res: IConsent[]) => {
                    this.consents = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInConsents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IConsent) {
        return item.id;
    }

    registerChangeInConsents() {
        this.eventSubscriber = this.eventManager.subscribe('consentListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
