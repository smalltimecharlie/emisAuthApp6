/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { SignedUpUsersDeleteDialogComponent } from 'app/entities/signed-up-users/signed-up-users-delete-dialog.component';
import { SignedUpUsersService } from 'app/entities/signed-up-users/signed-up-users.service';

describe('Component Tests', () => {
    describe('SignedUpUsers Management Delete Component', () => {
        let comp: SignedUpUsersDeleteDialogComponent;
        let fixture: ComponentFixture<SignedUpUsersDeleteDialogComponent>;
        let service: SignedUpUsersService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [SignedUpUsersDeleteDialogComponent]
            })
                .overrideTemplate(SignedUpUsersDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SignedUpUsersDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SignedUpUsersService);
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
