/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { CognitoRegistrationsComponent } from 'app/entities/cognito-registrations/cognito-registrations.component';
import { CognitoRegistrationsService } from 'app/entities/cognito-registrations/cognito-registrations.service';
import { CognitoRegistrations } from 'app/shared/model/cognito-registrations.model';

describe('Component Tests', () => {
    describe('CognitoRegistrations Management Component', () => {
        let comp: CognitoRegistrationsComponent;
        let fixture: ComponentFixture<CognitoRegistrationsComponent>;
        let service: CognitoRegistrationsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [CognitoRegistrationsComponent],
                providers: []
            })
                .overrideTemplate(CognitoRegistrationsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CognitoRegistrationsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CognitoRegistrationsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CognitoRegistrations(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cognitoRegistrations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
