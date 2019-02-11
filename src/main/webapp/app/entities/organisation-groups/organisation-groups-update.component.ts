import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IOrganisationGroups } from 'app/shared/model/organisation-groups.model';
import { OrganisationGroupsService } from './organisation-groups.service';

@Component({
    selector: 'jhi-organisation-groups-update',
    templateUrl: './organisation-groups-update.component.html'
})
export class OrganisationGroupsUpdateComponent implements OnInit {
    organisationGroups: IOrganisationGroups;
    isSaving: boolean;

    constructor(protected organisationGroupsService: OrganisationGroupsService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ organisationGroups }) => {
            this.organisationGroups = organisationGroups;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.organisationGroups.id !== undefined) {
            this.subscribeToSaveResponse(this.organisationGroupsService.update(this.organisationGroups));
        } else {
            this.subscribeToSaveResponse(this.organisationGroupsService.create(this.organisationGroups));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrganisationGroups>>) {
        result.subscribe((res: HttpResponse<IOrganisationGroups>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
