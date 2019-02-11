/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { UseCaseComponent } from 'app/entities/use-case/use-case.component';
import { UseCaseService } from 'app/entities/use-case/use-case.service';
import { UseCase } from 'app/shared/model/use-case.model';

describe('Component Tests', () => {
    describe('UseCase Management Component', () => {
        let comp: UseCaseComponent;
        let fixture: ComponentFixture<UseCaseComponent>;
        let service: UseCaseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [UseCaseComponent],
                providers: []
            })
                .overrideTemplate(UseCaseComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UseCaseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UseCaseService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UseCase(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.useCases[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
