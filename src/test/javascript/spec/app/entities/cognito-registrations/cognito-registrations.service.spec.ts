/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CognitoRegistrationsService } from 'app/entities/cognito-registrations/cognito-registrations.service';
import { ICognitoRegistrations, CognitoRegistrations } from 'app/shared/model/cognito-registrations.model';

describe('Service Tests', () => {
    describe('CognitoRegistrations Service', () => {
        let injector: TestBed;
        let service: CognitoRegistrationsService;
        let httpMock: HttpTestingController;
        let elemDefault: ICognitoRegistrations;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(CognitoRegistrationsService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new CognitoRegistrations(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        loggedDate: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a CognitoRegistrations', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        loggedDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        loggedDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new CognitoRegistrations(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a CognitoRegistrations', async () => {
                const returnedFromService = Object.assign(
                    {
                        userPoolId: 'BBBBBB',
                        username: 'BBBBBB',
                        email: 'BBBBBB',
                        loggedDate: currentDate.format(DATE_TIME_FORMAT),
                        cognitoEvent: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        loggedDate: currentDate
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

            it('should return a list of CognitoRegistrations', async () => {
                const returnedFromService = Object.assign(
                    {
                        userPoolId: 'BBBBBB',
                        username: 'BBBBBB',
                        email: 'BBBBBB',
                        loggedDate: currentDate.format(DATE_TIME_FORMAT),
                        cognitoEvent: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        loggedDate: currentDate
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

            it('should delete a CognitoRegistrations', async () => {
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
