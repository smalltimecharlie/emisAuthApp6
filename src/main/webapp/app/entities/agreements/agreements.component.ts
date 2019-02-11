import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAgreements } from 'app/shared/model/agreements.model';
import { AccountService } from 'app/core';
import { AgreementsService } from './agreements.service';

@Component({
    selector: 'jhi-agreements',
    templateUrl: './agreements.component.html'
})
export class AgreementsComponent implements OnInit, OnDestroy {
    agreements: IAgreements[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected agreementsService: AgreementsService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.agreementsService
            .query()
            .pipe(
                filter((res: HttpResponse<IAgreements[]>) => res.ok),
                map((res: HttpResponse<IAgreements[]>) => res.body)
            )
            .subscribe(
                (res: IAgreements[]) => {
                    this.agreements = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAgreements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAgreements) {
        return item.id;
    }

    registerChangeInAgreements() {
        this.eventSubscriber = this.eventManager.subscribe('agreementsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
