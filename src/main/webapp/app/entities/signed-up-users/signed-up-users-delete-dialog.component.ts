import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISignedUpUsers } from 'app/shared/model/signed-up-users.model';
import { SignedUpUsersService } from './signed-up-users.service';

@Component({
    selector: 'jhi-signed-up-users-delete-dialog',
    templateUrl: './signed-up-users-delete-dialog.component.html'
})
export class SignedUpUsersDeleteDialogComponent {
    signedUpUsers: ISignedUpUsers;

    constructor(
        protected signedUpUsersService: SignedUpUsersService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.signedUpUsersService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'signedUpUsersListModification',
                content: 'Deleted an signedUpUsers'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-signed-up-users-delete-popup',
    template: ''
})
export class SignedUpUsersDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ signedUpUsers }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SignedUpUsersDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.signedUpUsers = signedUpUsers;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/signed-up-users', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/signed-up-users', { outlets: { popup: null } }]);
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
