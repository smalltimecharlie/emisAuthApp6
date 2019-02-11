/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SignedUpUsersService } from 'app/entities/signed-up-users/signed-up-users.service';
import { ISignedUpUsers, SignedUpUsers } from 'app/shared/model/signed-up-users.model';

describe('Service Tests', () => {
    describe('SignedUpUsers Service', () => {
        let injector: TestBed;
        let service: SignedUpUsersService;
        let httpMock: HttpTestingController;
        let elemDefault: ISignedUpUsers;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(SignedUpUsersService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new SignedUpUsers(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        updated: currentDate.format(DATE_TIME_FORMAT),
                        created: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a SignedUpUsers', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        updated: currentDate.format(DATE_TIME_FORMAT),
                        created: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        updated: currentDate,
                        created: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new SignedUpUsers(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a SignedUpUsers', async () => {
                const returnedFromService = Object.assign(
                    {
                        username: 'BBBBBB',
                        enabled: 'BBBBBB',
                        accountStatus: 'BBBBBB',
                        emailVerified: true,
                        phoneNumber: 'BBBBBB',
                        email: 'BBBBBB',
                        updated: currentDate.format(DATE_TIME_FORMAT),
                        created: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        updated: currentDate,
                        created: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of SignedUpUsers', async () => {
                const returnedFromService = Object.assign(
                    {
                        username: 'BBBBBB',
                        enabled: 'BBBBBB',
                        accountStatus: 'BBBBBB',
                        emailVerified: true,
                        phoneNumber: 'BBBBBB',
                        email: 'BBBBBB',
                        updated: currentDate.format(DATE_TIME_FORMAT),
                        created: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        updated: currentDate,
                        created: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a SignedUpUsers', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
