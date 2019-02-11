/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { AgreementsUpdateComponent } from 'app/entities/agreements/agreements-update.component';
import { AgreementsService } from 'app/entities/agreements/agreements.service';
import { Agreements } from 'app/shared/model/agreements.model';

describe('Component Tests', () => {
    describe('Agreements Management Update Component', () => {
        let comp: AgreementsUpdateComponent;
        let fixture: ComponentFixture<AgreementsUpdateComponent>;
        let service: AgreementsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [AgreementsUpdateComponent]
            })
                .overrideTemplate(AgreementsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgreementsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgreementsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Agreements(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agreements = entity;
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
                    const entity = new Agreements();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agreements = entity;
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
