import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUseCase } from 'app/shared/model/use-case.model';
import { AccountService } from 'app/core';
import { UseCaseService } from './use-case.service';

@Component({
    selector: 'jhi-use-case',
    templateUrl: './use-case.component.html'
})
export class UseCaseComponent implements OnInit, OnDestroy {
    useCases: IUseCase[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected useCaseService: UseCaseService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.useCaseService
            .query()
            .pipe(
                filter((res: HttpResponse<IUseCase[]>) => res.ok),
                map((res: HttpResponse<IUseCase[]>) => res.body)
            )
            .subscribe(
                (res: IUseCase[]) => {
                    this.useCases = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUseCases();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUseCase) {
        return item.id;
    }

    registerChangeInUseCases() {
        this.eventSubscriber = this.eventManager.subscribe('useCaseListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
