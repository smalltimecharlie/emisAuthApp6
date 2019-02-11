import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISignedUpUsers } from 'app/shared/model/signed-up-users.model';

@Component({
    selector: 'jhi-signed-up-users-detail',
    templateUrl: './signed-up-users-detail.component.html'
})
export class SignedUpUsersDetailComponent implements OnInit {
    signedUpUsers: ISignedUpUsers;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ signedUpUsers }) => {
            this.signedUpUsers = signedUpUsers;
        });
    }

    previousState() {
        window.history.back();
    }
}
