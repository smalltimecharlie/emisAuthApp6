/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { UsersInOrganisationsUpdateComponent } from 'app/entities/users-in-organisations/users-in-organisations-update.component';
import { UsersInOrganisationsService } from 'app/entities/users-in-organisations/users-in-organisations.service';
import { UsersInOrganisations } from 'app/shared/model/users-in-organisations.model';

describe('Component Tests', () => {
    describe('UsersInOrganisations Management Update Component', () => {
        let comp: UsersInOrganisationsUpdateComponent;
        let fixture: ComponentFixture<UsersInOrganisationsUpdateComponent>;
        let service: UsersInOrganisationsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [UsersInOrganisationsUpdateComponent]
            })
                .overrideTemplate(UsersInOrganisationsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UsersInOrganisationsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsersInOrganisationsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UsersInOrganisations(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.usersInOrganisations = entity;
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
                    const entity = new UsersInOrganisations();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.usersInOrganisations = entity;
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
