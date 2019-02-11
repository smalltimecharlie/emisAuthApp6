import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsersInOrganisations } from 'app/shared/model/users-in-organisations.model';

@Component({
    selector: 'jhi-users-in-organisations-detail',
    templateUrl: './users-in-organisations-detail.component.html'
})
export class UsersInOrganisationsDetailComponent implements OnInit {
    usersInOrganisations: IUsersInOrganisations;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usersInOrganisations }) => {
            this.usersInOrganisations = usersInOrganisations;
        });
    }

    previousState() {
        window.history.back();
    }
}
