import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISignedUpUsers } from 'app/shared/model/signed-up-users.model';
import { AccountService } from 'app/core';
import { SignedUpUsersService } from './signed-up-users.service';

@Component({
    selector: 'jhi-signed-up-users',
    templateUrl: './signed-up-users.component.html'
})
export class SignedUpUsersComponent implements OnInit, OnDestroy {
    signedUpUsers: ISignedUpUsers[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected signedUpUsersService: SignedUpUsersService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.signedUpUsersService
            .query()
            .pipe(
                filter((res: HttpResponse<ISignedUpUsers[]>) => res.ok),
                map((res: HttpResponse<ISignedUpUsers[]>) => res.body)
            )
            .subscribe(
                (res: ISignedUpUsers[]) => {
                    this.signedUpUsers = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSignedUpUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISignedUpUsers) {
        return item.id;
    }

    registerChangeInSignedUpUsers() {
        this.eventSubscriber = this.eventManager.subscribe('signedUpUsersListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
