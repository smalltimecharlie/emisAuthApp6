/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { UsersInOrganisationsDetailComponent } from 'app/entities/users-in-organisations/users-in-organisations-detail.component';
import { UsersInOrganisations } from 'app/shared/model/users-in-organisations.model';

describe('Component Tests', () => {
    describe('UsersInOrganisations Management Detail Component', () => {
        let comp: UsersInOrganisationsDetailComponent;
        let fixture: ComponentFixture<UsersInOrganisationsDetailComponent>;
        const route = ({ data: of({ usersInOrganisations: new UsersInOrganisations(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [UsersInOrganisationsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UsersInOrganisationsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UsersInOrganisationsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.usersInOrganisations).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
