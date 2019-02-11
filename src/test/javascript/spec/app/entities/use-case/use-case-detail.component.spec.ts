/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { UseCaseDetailComponent } from 'app/entities/use-case/use-case-detail.component';
import { UseCase } from 'app/shared/model/use-case.model';

describe('Component Tests', () => {
    describe('UseCase Management Detail Component', () => {
        let comp: UseCaseDetailComponent;
        let fixture: ComponentFixture<UseCaseDetailComponent>;
        const route = ({ data: of({ useCase: new UseCase(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [UseCaseDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UseCaseDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UseCaseDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.useCase).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
