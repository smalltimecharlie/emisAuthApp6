import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrganisationGroups } from 'app/shared/model/organisation-groups.model';

@Component({
    selector: 'jhi-organisation-groups-detail',
    templateUrl: './organisation-groups-detail.component.html'
})
export class OrganisationGroupsDetailComponent implements OnInit {
    organisationGroups: IOrganisationGroups;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ organisationGroups }) => {
            this.organisationGroups = organisationGroups;
        });
    }

    previousState() {
        window.history.back();
    }
}
