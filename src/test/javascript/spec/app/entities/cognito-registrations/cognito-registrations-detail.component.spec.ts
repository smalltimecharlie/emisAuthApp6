/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { CognitoRegistrationsDetailComponent } from 'app/entities/cognito-registrations/cognito-registrations-detail.component';
import { CognitoRegistrations } from 'app/shared/model/cognito-registrations.model';

describe('Component Tests', () => {
    describe('CognitoRegistrations Management Detail Component', () => {
        let comp: CognitoRegistrationsDetailComponent;
        let fixture: ComponentFixture<CognitoRegistrationsDetailComponent>;
        const route = ({ data: of({ cognitoRegistrations: new CognitoRegistrations(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [CognitoRegistrationsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CognitoRegistrationsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CognitoRegistrationsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cognitoRegistrations).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
