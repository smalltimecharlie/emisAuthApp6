import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUseCase } from 'app/shared/model/use-case.model';
import { UseCaseService } from './use-case.service';

@Component({
    selector: 'jhi-use-case-delete-dialog',
    templateUrl: './use-case-delete-dialog.component.html'
})
export class UseCaseDeleteDialogComponent {
    useCase: IUseCase;

    constructor(protected useCaseService: UseCaseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.useCaseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'useCaseListModification',
                content: 'Deleted an useCase'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-use-case-delete-popup',
    template: ''
})
export class UseCaseDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ useCase }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UseCaseDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.useCase = useCase;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/use-case', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/use-case', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
