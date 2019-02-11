import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IConsent } from 'app/shared/model/consent.model';
import { ConsentService } from './consent.service';
import { IAgreements } from 'app/shared/model/agreements.model';
import { AgreementsService } from 'app/entities/agreements';
import { ISignedUpUsers } from 'app/shared/model/signed-up-users.model';
import { SignedUpUsersService } from 'app/entities/signed-up-users';
import { IUseCase } from 'app/shared/model/use-case.model';
import { UseCaseService } from 'app/entities/use-case';

@Component({
    selector: 'jhi-consent-update',
    templateUrl: './consent-update.component.html'
})
export class ConsentUpdateComponent implements OnInit {
    consent: IConsent;
    isSaving: boolean;

    agreements: IAgreements[];

    signedupusers: ISignedUpUsers[];

    usecases: IUseCase[];
    endDate: string;
    signedDate: string;
    startDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected consentService: ConsentService,
        protected agreementsService: AgreementsService,
        protected signedUpUsersService: SignedUpUsersService,
        protected useCaseService: UseCaseService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ consent }) => {
            this.consent = consent;
            this.endDate = this.consent.endDate != null ? this.consent.endDate.format(DATE_TIME_FORMAT) : null;
            this.signedDate = this.consent.signedDate != null ? this.consent.signedDate.format(DATE_TIME_FORMAT) : null;
            this.startDate = this.consent.startDate != null ? this.consent.startDate.format(DATE_TIME_FORMAT) : null;
        });
        this.agreementsService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IAgreements[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAgreements[]>) => response.body)
            )
            .subscribe((res: IAgreements[]) => (this.agreements = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.signedUpUsersService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISignedUpUsers[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISignedUpUsers[]>) => response.body)
            )
            .subscribe((res: ISignedUpUsers[]) => (this.signedupusers = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.useCaseService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUseCase[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUseCase[]>) => response.body)
            )
            .subscribe((res: IUseCase[]) => (this.usecases = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.consent.endDate = this.endDate != null ? moment(this.endDate, DATE_TIME_FORMAT) : null;
        this.consent.signedDate = this.signedDate != null ? moment(this.signedDate, DATE_TIME_FORMAT) : null;
        this.consent.startDate = this.startDate != null ? moment(this.startDate, DATE_TIME_FORMAT) : null;
        if (this.consent.id !== undefined) {
            this.subscribeToSaveResponse(this.consentService.update(this.consent));
        } else {
            this.subscribeToSaveResponse(this.consentService.create(this.consent));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsent>>) {
        result.subscribe((res: HttpResponse<IConsent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAgreementsById(index: number, item: IAgreements) {
        return item.id;
    }

    trackSignedUpUsersById(index: number, item: ISignedUpUsers) {
        return item.id;
    }

    trackUseCaseById(index: number, item: IUseCase) {
        return item.id;
    }
}
