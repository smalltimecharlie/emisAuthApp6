/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { OrganisationGroupsUpdateComponent } from 'app/entities/organisation-groups/organisation-groups-update.component';
import { OrganisationGroupsService } from 'app/entities/organisation-groups/organisation-groups.service';
import { OrganisationGroups } from 'app/shared/model/organisation-groups.model';

describe('Component Tests', () => {
    describe('OrganisationGroups Management Update Component', () => {
        let comp: OrganisationGroupsUpdateComponent;
        let fixture: ComponentFixture<OrganisationGroupsUpdateComponent>;
        let service: OrganisationGroupsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [OrganisationGroupsUpdateComponent]
            })
                .overrideTemplate(OrganisationGroupsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrganisationGroupsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationGroupsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrganisationGroups(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.organisationGroups = entity;
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
                    const entity = new OrganisationGroups();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.organisationGroups = entity;
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
