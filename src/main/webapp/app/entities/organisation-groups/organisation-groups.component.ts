import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrganisationGroups } from 'app/shared/model/organisation-groups.model';
import { AccountService } from 'app/core';
import { OrganisationGroupsService } from './organisation-groups.service';

@Component({
    selector: 'jhi-organisation-groups',
    templateUrl: './organisation-groups.component.html'
})
export class OrganisationGroupsComponent implements OnInit, OnDestroy {
    organisationGroups: IOrganisationGroups[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected organisationGroupsService: OrganisationGroupsService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.organisationGroupsService
            .query()
            .pipe(
                filter((res: HttpResponse<IOrganisationGroups[]>) => res.ok),
                map((res: HttpResponse<IOrganisationGroups[]>) => res.body)
            )
            .subscribe(
                (res: IOrganisationGroups[]) => {
                    this.organisationGroups = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrganisationGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrganisationGroups) {
        return item.id;
    }

    registerChangeInOrganisationGroups() {
        this.eventSubscriber = this.eventManager.subscribe('organisationGroupsListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
