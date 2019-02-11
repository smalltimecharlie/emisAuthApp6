import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IUsersInOrganisations } from 'app/shared/model/users-in-organisations.model';
import { UsersInOrganisationsService } from './users-in-organisations.service';

@Component({
    selector: 'jhi-users-in-organisations-update',
    templateUrl: './users-in-organisations-update.component.html'
})
export class UsersInOrganisationsUpdateComponent implements OnInit {
    usersInOrganisations: IUsersInOrganisations;
    isSaving: boolean;

    constructor(protected usersInOrganisationsService: UsersInOrganisationsService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ usersInOrganisations }) => {
            this.usersInOrganisations = usersInOrganisations;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.usersInOrganisations.id !== undefined) {
            this.subscribeToSaveResponse(this.usersInOrganisationsService.update(this.usersInOrganisations));
        } else {
            this.subscribeToSaveResponse(this.usersInOrganisationsService.create(this.usersInOrganisations));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsersInOrganisations>>) {
        result.subscribe(
            (res: HttpResponse<IUsersInOrganisations>) => this.onSaveSuccess(),
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
