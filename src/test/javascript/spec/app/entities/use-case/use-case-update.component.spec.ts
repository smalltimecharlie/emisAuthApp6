/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { UseCaseUpdateComponent } from 'app/entities/use-case/use-case-update.component';
import { UseCaseService } from 'app/entities/use-case/use-case.service';
import { UseCase } from 'app/shared/model/use-case.model';

describe('Component Tests', () => {
    describe('UseCase Management Update Component', () => {
        let comp: UseCaseUpdateComponent;
        let fixture: ComponentFixture<UseCaseUpdateComponent>;
        let service: UseCaseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [UseCaseUpdateComponent]
            })
                .overrideTemplate(UseCaseUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UseCaseUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UseCaseService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UseCase(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.useCase = entity;
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
                    const entity = new UseCase();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.useCase = entity;
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
