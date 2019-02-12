import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICognitoRegistrations } from 'app/shared/model/cognito-registrations.model';
import { CognitoRegistrationsService } from './cognito-registrations.service';

@Component({
    selector: 'jhi-cognito-registrations-delete-dialog',
    templateUrl: './cognito-registrations-delete-dialog.component.html'
})
export class CognitoRegistrationsDeleteDialogComponent {
    cognitoRegistrations: ICognitoRegistrations;

    constructor(
        protected cognitoRegistrationsService: CognitoRegistrationsService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cognitoRegistrationsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cognitoRegistrationsListModification',
                content: 'Deleted an cognitoRegistrations'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cognito-registrations-delete-popup',
    template: ''
})
export class CognitoRegistrationsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cognitoRegistrations }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CognitoRegistrationsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.cognitoRegistrations = cognitoRegistrations;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/cognito-registrations', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/cognito-registrations', { outlets: { popup: null } }]);
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
