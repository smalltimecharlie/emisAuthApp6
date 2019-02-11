/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { ConsentUpdateComponent } from 'app/entities/consent/consent-update.component';
import { ConsentService } from 'app/entities/consent/consent.service';
import { Consent } from 'app/shared/model/consent.model';

describe('Component Tests', () => {
    describe('Consent Management Update Component', () => {
        let comp: ConsentUpdateComponent;
        let fixture: ComponentFixture<ConsentUpdateComponent>;
        let service: ConsentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [ConsentUpdateComponent]
            })
                .overrideTemplate(ConsentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConsentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Consent(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.consent = entity;
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
                    const entity = new Consent();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.consent = entity;
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
