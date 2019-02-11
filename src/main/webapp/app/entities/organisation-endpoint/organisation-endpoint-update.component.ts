import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IOrganisationEndpoint } from 'app/shared/model/organisation-endpoint.model';
import { OrganisationEndpointService } from './organisation-endpoint.service';

@Component({
    selector: 'jhi-organisation-endpoint-update',
    templateUrl: './organisation-endpoint-update.component.html'
})
export class OrganisationEndpointUpdateComponent implements OnInit {
    organisationEndpoint: IOrganisationEndpoint;
    isSaving: boolean;

    constructor(protected organisationEndpointService: OrganisationEndpointService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ organisationEndpoint }) => {
            this.organisationEndpoint = organisationEndpoint;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.organisationEndpoint.id !== undefined) {
            this.subscribeToSaveResponse(this.organisationEndpointService.update(this.organisationEndpoint));
        } else {
            this.subscribeToSaveResponse(this.organisationEndpointService.create(this.organisationEndpoint));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrganisationEndpoint>>) {
        result.subscribe(
            (res: HttpResponse<IOrganisationEndpoint>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
