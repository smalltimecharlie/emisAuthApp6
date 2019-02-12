/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { CognitoRegistrationsDeleteDialogComponent } from 'app/entities/cognito-registrations/cognito-registrations-delete-dialog.component';
import { CognitoRegistrationsService } from 'app/entities/cognito-registrations/cognito-registrations.service';

describe('Component Tests', () => {
    describe('CognitoRegistrations Management Delete Component', () => {
        let comp: CognitoRegistrationsDeleteDialogComponent;
        let fixture: ComponentFixture<CognitoRegistrationsDeleteDialogComponent>;
        let service: CognitoRegistrationsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [CognitoRegistrationsDeleteDialogComponent]
            })
                .overrideTemplate(CognitoRegistrationsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CognitoRegistrationsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CognitoRegistrationsService);
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
