import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IAgreements } from 'app/shared/model/agreements.model';
import { AgreementsService } from './agreements.service';

@Component({
    selector: 'jhi-agreements-update',
    templateUrl: './agreements-update.component.html'
})
export class AgreementsUpdateComponent implements OnInit {
    agreements: IAgreements;
    isSaving: boolean;

    constructor(protected agreementsService: AgreementsService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ agreements }) => {
            this.agreements = agreements;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.agreements.id !== undefined) {
            this.subscribeToSaveResponse(this.agreementsService.update(this.agreements));
        } else {
            this.subscribeToSaveResponse(this.agreementsService.create(this.agreements));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgreements>>) {
        result.subscribe((res: HttpResponse<IAgreements>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
