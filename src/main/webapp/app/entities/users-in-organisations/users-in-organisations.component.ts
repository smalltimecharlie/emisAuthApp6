import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUsersInOrganisations } from 'app/shared/model/users-in-organisations.model';
import { AccountService } from 'app/core';
import { UsersInOrganisationsService } from './users-in-organisations.service';

@Component({
    selector: 'jhi-users-in-organisations',
    templateUrl: './users-in-organisations.component.html'
})
export class UsersInOrganisationsComponent implements OnInit, OnDestroy {
    usersInOrganisations: IUsersInOrganisations[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected usersInOrganisationsService: UsersInOrganisationsService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.usersInOrganisationsService
            .query()
            .pipe(
                filter((res: HttpResponse<IUsersInOrganisations[]>) => res.ok),
                map((res: HttpResponse<IUsersInOrganisations[]>) => res.body)
            )
            .subscribe(
                (res: IUsersInOrganisations[]) => {
                    this.usersInOrganisations = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUsersInOrganisations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUsersInOrganisations) {
        return item.id;
    }

    registerChangeInUsersInOrganisations() {
        this.eventSubscriber = this.eventManager.subscribe('usersInOrganisationsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
