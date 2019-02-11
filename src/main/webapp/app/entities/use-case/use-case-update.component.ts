import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IUseCase } from 'app/shared/model/use-case.model';
import { UseCaseService } from './use-case.service';

@Component({
    selector: 'jhi-use-case-update',
    templateUrl: './use-case-update.component.html'
})
export class UseCaseUpdateComponent implements OnInit {
    useCase: IUseCase;
    isSaving: boolean;
    startDate: string;
    endDate: string;

    constructor(protected useCaseService: UseCaseService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ useCase }) => {
            this.useCase = useCase;
            this.startDate = this.useCase.startDate != null ? this.useCase.startDate.format(DATE_TIME_FORMAT) : null;
            this.endDate = this.useCase.endDate != null ? this.useCase.endDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.useCase.startDate = this.startDate != null ? moment(this.startDate, DATE_TIME_FORMAT) : null;
        this.useCase.endDate = this.endDate != null ? moment(this.endDate, DATE_TIME_FORMAT) : null;
        if (this.useCase.id !== undefined) {
            this.subscribeToSaveResponse(this.useCaseService.update(this.useCase));
        } else {
            this.subscribeToSaveResponse(this.useCaseService.create(this.useCase));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUseCase>>) {
        result.subscribe((res: HttpResponse<IUseCase>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
