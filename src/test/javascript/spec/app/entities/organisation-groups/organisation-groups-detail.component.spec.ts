/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { OrganisationGroupsDetailComponent } from 'app/entities/organisation-groups/organisation-groups-detail.component';
import { OrganisationGroups } from 'app/shared/model/organisation-groups.model';

describe('Component Tests', () => {
    describe('OrganisationGroups Management Detail Component', () => {
        let comp: OrganisationGroupsDetailComponent;
        let fixture: ComponentFixture<OrganisationGroupsDetailComponent>;
        const route = ({ data: of({ organisationGroups: new OrganisationGroups(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [OrganisationGroupsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrganisationGroupsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrganisationGroupsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.organisationGroups).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
