import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ICognitoRegistrations } from 'app/shared/model/cognito-registrations.model';
import { CognitoRegistrationsService } from './cognito-registrations.service';

@Component({
    selector: 'jhi-cognito-registrations-update',
    templateUrl: './cognito-registrations-update.component.html'
})
export class CognitoRegistrationsUpdateComponent implements OnInit {
    cognitoRegistrations: ICognitoRegistrations;
    isSaving: boolean;
    loggedDate: string;

    constructor(protected cognitoRegistrationsService: CognitoRegistrationsService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cognitoRegistrations }) => {
            this.cognitoRegistrations = cognitoRegistrations;
            this.loggedDate =
                this.cognitoRegistrations.loggedDate != null ? this.cognitoRegistrations.loggedDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.cognitoRegistrations.loggedDate = this.loggedDate != null ? moment(this.loggedDate, DATE_TIME_FORMAT) : null;
        if (this.cognitoRegistrations.id !== undefined) {
            this.subscribeToSaveResponse(this.cognitoRegistrationsService.update(this.cognitoRegistrations));
        } else {
            this.subscribeToSaveResponse(this.cognitoRegistrationsService.create(this.cognitoRegistrations));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICognitoRegistrations>>) {
        result.subscribe(
            (res: HttpResponse<ICognitoRegistrations>) => this.onSaveSuccess(),
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
