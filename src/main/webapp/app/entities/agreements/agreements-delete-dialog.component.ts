import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgreements } from 'app/shared/model/agreements.model';
import { AgreementsService } from './agreements.service';

@Component({
    selector: 'jhi-agreements-delete-dialog',
    templateUrl: './agreements-delete-dialog.component.html'
})
export class AgreementsDeleteDialogComponent {
    agreements: IAgreements;

    constructor(
        protected agreementsService: AgreementsService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.agreementsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'agreementsListModification',
                content: 'Deleted an agreements'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-agreements-delete-popup',
    template: ''
})
export class AgreementsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agreements }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AgreementsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.agreements = agreements;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/agreements', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/agreements', { outlets: { popup: null } }]);
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
