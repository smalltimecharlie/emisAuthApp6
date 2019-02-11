/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { UsersInOrganisationsComponent } from 'app/entities/users-in-organisations/users-in-organisations.component';
import { UsersInOrganisationsService } from 'app/entities/users-in-organisations/users-in-organisations.service';
import { UsersInOrganisations } from 'app/shared/model/users-in-organisations.model';

describe('Component Tests', () => {
    describe('UsersInOrganisations Management Component', () => {
        let comp: UsersInOrganisationsComponent;
        let fixture: ComponentFixture<UsersInOrganisationsComponent>;
        let service: UsersInOrganisationsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [UsersInOrganisationsComponent],
                providers: []
            })
                .overrideTemplate(UsersInOrganisationsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UsersInOrganisationsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsersInOrganisationsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UsersInOrganisations(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.usersInOrganisations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
