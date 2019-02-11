/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { OrganisationGroupsDeleteDialogComponent } from 'app/entities/organisation-groups/organisation-groups-delete-dialog.component';
import { OrganisationGroupsService } from 'app/entities/organisation-groups/organisation-groups.service';

describe('Component Tests', () => {
    describe('OrganisationGroups Management Delete Component', () => {
        let comp: OrganisationGroupsDeleteDialogComponent;
        let fixture: ComponentFixture<OrganisationGroupsDeleteDialogComponent>;
        let service: OrganisationGroupsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [OrganisationGroupsDeleteDialogComponent]
            })
                .overrideTemplate(OrganisationGroupsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrganisationGroupsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationGroupsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
