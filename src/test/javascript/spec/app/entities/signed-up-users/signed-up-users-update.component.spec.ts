/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EmisAuthApp6TestModule } from '../../../test.module';
import { SignedUpUsersUpdateComponent } from 'app/entities/signed-up-users/signed-up-users-update.component';
import { SignedUpUsersService } from 'app/entities/signed-up-users/signed-up-users.service';
import { SignedUpUsers } from 'app/shared/model/signed-up-users.model';

describe('Component Tests', () => {
    describe('SignedUpUsers Management Update Component', () => {
        let comp: SignedUpUsersUpdateComponent;
        let fixture: ComponentFixture<SignedUpUsersUpdateComponent>;
        let service: SignedUpUsersService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EmisAuthApp6TestModule],
                declarations: [SignedUpUsersUpdateComponent]
            })
                .overrideTemplate(SignedUpUsersUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SignedUpUsersUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SignedUpUsersService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SignedUpUsers(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.signedUpUsers = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SignedUpUsers();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.signedUpUsers = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
