import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrganisationGroups } from 'app/shared/model/organisation-groups.model';
import { OrganisationGroupsService } from './organisation-groups.service';

@Component({
    selector: 'jhi-organisation-groups-delete-dialog',
    templateUrl: './organisation-groups-delete-dialog.component.html'
})
export class OrganisationGroupsDeleteDialogComponent {
    organisationGroups: IOrganisationGroups;

    constructor(
        protected organisationGroupsService: OrganisationGroupsService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.organisationGroupsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'organisationGroupsListModification',
                content: 'Deleted an organisationGroups'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-organisation-groups-delete-popup',
    template: ''
})
export class OrganisationGroupsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ organisationGroups }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrganisationGroupsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.organisationGroups = organisationGroups;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/organisation-groups', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/organisation-groups', { outlets: { popup: null } }]);
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
