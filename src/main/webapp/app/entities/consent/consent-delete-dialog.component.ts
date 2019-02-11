import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConsent } from 'app/shared/model/consent.model';
import { ConsentService } from './consent.service';

@Component({
    selector: 'jhi-consent-delete-dialog',
    templateUrl: './consent-delete-dialog.component.html'
})
export class ConsentDeleteDialogComponent {
    consent: IConsent;

    constructor(protected consentService: ConsentService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.consentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'consentListModification',
                content: 'Deleted an consent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-consent-delete-popup',
    template: ''
})
export class ConsentDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ consent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ConsentDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.consent = consent;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/consent', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/consent', { outlets: { popup: null } }]);
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
