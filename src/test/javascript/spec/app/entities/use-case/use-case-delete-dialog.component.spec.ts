/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { UseCaseDeleteDialogComponent } from 'app/entities/use-case/use-case-delete-dialog.component';
import { UseCaseService } from 'app/entities/use-case/use-case.service';

describe('Component Tests', () => {
    describe('UseCase Management Delete Component', () => {
        let comp: UseCaseDeleteDialogComponent;
        let fixture: ComponentFixture<UseCaseDeleteDialogComponent>;
        let service: UseCaseService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [UseCaseDeleteDialogComponent]
            })
                .overrideTemplate(UseCaseDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UseCaseDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UseCaseService);
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
