/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { CognitoRegistrationsUpdateComponent } from 'app/entities/cognito-registrations/cognito-registrations-update.component';
import { CognitoRegistrationsService } from 'app/entities/cognito-registrations/cognito-registrations.service';
import { CognitoRegistrations } from 'app/shared/model/cognito-registrations.model';

describe('Component Tests', () => {
    describe('CognitoRegistrations Management Update Component', () => {
        let comp: CognitoRegistrationsUpdateComponent;
        let fixture: ComponentFixture<CognitoRegistrationsUpdateComponent>;
        let service: CognitoRegistrationsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [CognitoRegistrationsUpdateComponent]
            })
                .overrideTemplate(CognitoRegistrationsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CognitoRegistrationsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CognitoRegistrationsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CognitoRegistrations(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cognitoRegistrations = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CognitoRegistrations();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cognitoRegistrations = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
