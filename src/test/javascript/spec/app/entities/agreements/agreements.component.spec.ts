/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { AgreementsComponent } from 'app/entities/agreements/agreements.component';
import { AgreementsService } from 'app/entities/agreements/agreements.service';
import { Agreements } from 'app/shared/model/agreements.model';

describe('Component Tests', () => {
    describe('Agreements Management Component', () => {
        let comp: AgreementsComponent;
        let fixture: ComponentFixture<AgreementsComponent>;
        let service: AgreementsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [AgreementsComponent],
                providers: []
            })
                .overrideTemplate(AgreementsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgreementsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgreementsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Agreements(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.agreements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
