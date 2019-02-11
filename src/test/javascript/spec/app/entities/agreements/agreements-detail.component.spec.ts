/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { AgreementsDetailComponent } from 'app/entities/agreements/agreements-detail.component';
import { Agreements } from 'app/shared/model/agreements.model';

describe('Component Tests', () => {
    describe('Agreements Management Detail Component', () => {
        let comp: AgreementsDetailComponent;
        let fixture: ComponentFixture<AgreementsDetailComponent>;
        const route = ({ data: of({ agreements: new Agreements(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [AgreementsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AgreementsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgreementsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.agreements).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
