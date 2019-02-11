import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IAgreementOrganisation } from 'app/shared/model/agreement-organisation.model';
import { AgreementOrganisationService } from './agreement-organisation.service';
import { IOrganisationEndpoint } from 'app/shared/model/organisation-endpoint.model';
import { OrganisationEndpointService } from 'app/entities/organisation-endpoint';

@Component({
    selector: 'jhi-agreement-organisation-update',
    templateUrl: './agreement-organisation-update.component.html'
})
export class AgreementOrganisationUpdateComponent implements OnInit {
    agreementOrganisation: IAgreementOrganisation;
    isSaving: boolean;

    organisationendpoints: IOrganisationEndpoint[];
    cretadDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected agreementOrganisationService: AgreementOrganisationService,
        protected organisationEndpointService: OrganisationEndpointService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ agreementOrganisation }) => {
            this.agreementOrganisation = agreementOrganisation;
            this.cretadDate =
                this.agreementOrganisation.cretadDate != null ? this.agreementOrganisation.cretadDate.format(DATE_TIME_FORMAT) : null;
        });
        this.organisationEndpointService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IOrganisationEndpoint[]>) => mayBeOk.ok),
                map((response: HttpResponse<IOrganisationEndpoint[]>) => response.body)
            )
            .subscribe(
                (res: IOrganisationEndpoint[]) => (this.organisationendpoints = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.agreementOrganisation.cretadDate = this.cretadDate != null ? moment(this.cretadDate, DATE_TIME_FORMAT) : null;
        if (this.agreementOrganisation.id !== undefined) {
            this.subscribeToSaveResponse(this.agreementOrganisationService.update(this.agreementOrganisation));
        } else {
            this.subscribeToSaveResponse(this.agreementOrganisationService.create(this.agreementOrganisation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgreementOrganisation>>) {
        result.subscribe(
            (res: HttpResponse<IAgreementOrganisation>) => this.onSaveSuccess(),
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackOrganisationEndpointById(index: number, item: IOrganisationEndpoint) {
        return item.id;
    }
}
