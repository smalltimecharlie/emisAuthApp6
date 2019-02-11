/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { OrganisationGroupsComponent } from 'app/entities/organisation-groups/organisation-groups.component';
import { OrganisationGroupsService } from 'app/entities/organisation-groups/organisation-groups.service';
import { OrganisationGroups } from 'app/shared/model/organisation-groups.model';

describe('Component Tests', () => {
    describe('OrganisationGroups Management Component', () => {
        let comp: OrganisationGroupsComponent;
        let fixture: ComponentFixture<OrganisationGroupsComponent>;
        let service: OrganisationGroupsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [OrganisationGroupsComponent],
                providers: []
            })
                .overrideTemplate(OrganisationGroupsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrganisationGroupsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationGroupsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrganisationGroups(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.organisationGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
