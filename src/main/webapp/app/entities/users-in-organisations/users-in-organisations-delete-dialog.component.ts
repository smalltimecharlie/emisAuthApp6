import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUsersInOrganisations } from 'app/shared/model/users-in-organisations.model';
import { UsersInOrganisationsService } from './users-in-organisations.service';

@Component({
    selector: 'jhi-users-in-organisations-delete-dialog',
    templateUrl: './users-in-organisations-delete-dialog.component.html'
})
export class UsersInOrganisationsDeleteDialogComponent {
    usersInOrganisations: IUsersInOrganisations;

    constructor(
        protected usersInOrganisationsService: UsersInOrganisationsService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.usersInOrganisationsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'usersInOrganisationsListModification',
                content: 'Deleted an usersInOrganisations'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-users-in-organisations-delete-popup',
    template: ''
})
export class UsersInOrganisationsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usersInOrganisations }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UsersInOrganisationsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.usersInOrganisations = usersInOrganisations;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/users-in-organisations', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/users-in-organisations', { outlets: { popup: null } }]);
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
