/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { SignedUpUsersComponent } from 'app/entities/signed-up-users/signed-up-users.component';
import { SignedUpUsersService } from 'app/entities/signed-up-users/signed-up-users.service';
import { SignedUpUsers } from 'app/shared/model/signed-up-users.model';

describe('Component Tests', () => {
    describe('SignedUpUsers Management Component', () => {
        let comp: SignedUpUsersComponent;
        let fixture: ComponentFixture<SignedUpUsersComponent>;
        let service: SignedUpUsersService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [SignedUpUsersComponent],
                providers: []
            })
                .overrideTemplate(SignedUpUsersComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SignedUpUsersComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SignedUpUsersService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SignedUpUsers(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.signedUpUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
