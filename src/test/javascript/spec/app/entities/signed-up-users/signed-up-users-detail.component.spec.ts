/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { SignedUpUsersDetailComponent } from 'app/entities/signed-up-users/signed-up-users-detail.component';
import { SignedUpUsers } from 'app/shared/model/signed-up-users.model';

describe('Component Tests', () => {
    describe('SignedUpUsers Management Detail Component', () => {
        let comp: SignedUpUsersDetailComponent;
        let fixture: ComponentFixture<SignedUpUsersDetailComponent>;
        const route = ({ data: of({ signedUpUsers: new SignedUpUsers(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [SignedUpUsersDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SignedUpUsersDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SignedUpUsersDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.signedUpUsers).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
