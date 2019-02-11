import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUseCase } from 'app/shared/model/use-case.model';

@Component({
    selector: 'jhi-use-case-detail',
    templateUrl: './use-case-detail.component.html'
})
export class UseCaseDetailComponent implements OnInit {
    useCase: IUseCase;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ useCase }) => {
            this.useCase = useCase;
        });
    }

    previousState() {
        window.history.back();
    }
}
