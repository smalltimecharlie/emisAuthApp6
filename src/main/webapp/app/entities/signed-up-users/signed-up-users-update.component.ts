import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ISignedUpUsers } from 'app/shared/model/signed-up-users.model';
import { SignedUpUsersService } from './signed-up-users.service';

@Component({
    selector: 'jhi-signed-up-users-update',
    templateUrl: './signed-up-users-update.component.html'
})
export class SignedUpUsersUpdateComponent implements OnInit {
    signedUpUsers: ISignedUpUsers;
    isSaving: boolean;
    updated: string;
    created: string;

    constructor(protected signedUpUsersService: SignedUpUsersService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ signedUpUsers }) => {
            this.signedUpUsers = signedUpUsers;
            this.updated = this.signedUpUsers.updated != null ? this.signedUpUsers.updated.format(DATE_TIME_FORMAT) : null;
            this.created = this.signedUpUsers.created != null ? this.signedUpUsers.created.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.signedUpUsers.updated = this.updated != null ? moment(this.updated, DATE_TIME_FORMAT) : null;
        this.signedUpUsers.created = this.created != null ? moment(this.created, DATE_TIME_FORMAT) : null;
        if (this.signedUpUsers.id !== undefined) {
            this.subscribeToSaveResponse(this.signedUpUsersService.update(this.signedUpUsers));
        } else {
            this.subscribeToSaveResponse(this.signedUpUsersService.create(this.signedUpUsers));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISignedUpUsers>>) {
        result.subscribe((res: HttpResponse<ISignedUpUsers>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
