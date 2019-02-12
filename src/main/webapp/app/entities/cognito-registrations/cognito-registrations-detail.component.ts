import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICognitoRegistrations } from 'app/shared/model/cognito-registrations.model';

@Component({
    selector: 'jhi-cognito-registrations-detail',
    templateUrl: './cognito-registrations-detail.component.html'
})
export class CognitoRegistrationsDetailComponent implements OnInit {
    cognitoRegistrations: ICognitoRegistrations;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cognitoRegistrations }) => {
            this.cognitoRegistrations = cognitoRegistrations;
        });
    }

    previousState() {
        window.history.back();
    }
}
