/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { UsersInOrganisationsDeleteDialogComponent } from 'app/entities/users-in-organisations/users-in-organisations-delete-dialog.component';
import { UsersInOrganisationsService } from 'app/entities/users-in-organisations/users-in-organisations.service';

describe('Component Tests', () => {
    describe('UsersInOrganisations Management Delete Component', () => {
        let comp: UsersInOrganisationsDeleteDialogComponent;
        let fixture: ComponentFixture<UsersInOrganisationsDeleteDialogComponent>;
        let service: UsersInOrganisationsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [UsersInOrganisationsDeleteDialogComponent]
            })
                .overrideTemplate(UsersInOrganisationsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UsersInOrganisationsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsersInOrganisationsService);
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
