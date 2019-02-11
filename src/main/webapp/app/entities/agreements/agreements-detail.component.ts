import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAgreements } from 'app/shared/model/agreements.model';

@Component({
    selector: 'jhi-agreements-detail',
    templateUrl: './agreements-detail.component.html'
})
export class AgreementsDetailComponent implements OnInit {
    agreements: IAgreements;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agreements }) => {
            this.agreements = agreements;
        });
    }

    previousState() {
        window.history.back();
    }
}
