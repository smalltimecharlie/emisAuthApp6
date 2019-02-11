/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ConsentService } from 'app/entities/consent/consent.service';
import { IConsent, Consent, ConsentType } from 'app/shared/model/consent.model';

describe('Service Tests', () => {
    describe('Consent Service', () => {
        let injector: TestBed;
        let service: ConsentService;
        let httpMock: HttpTestingController;
        let elemDefault: IConsent;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ConsentService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Consent(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                currentDate,
                'AAAAAAA',
                currentDate,
                currentDate,
                false,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                ConsentType.Patient
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        endDate: currentDate.format(DATE_TIME_FORMAT),
                        signedDate: currentDate.format(DATE_TIME_FORMAT),
                        startDate: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a Consent', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        endDate: currentDate.format(DATE_TIME_FORMAT),
                        signedDate: currentDate.format(DATE_TIME_FORMAT),
                        startDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        endDate: currentDate,
                        signedDate: currentDate,
                        startDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Consent(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Consent', async () => {
                const returnedFromService = Object.assign(
                    {
                        parentConsentId: 'BBBBBB',
                        entityKey: 'BBBBBB',
                        entityKeyType: 'BBBBBB',
                        fieldValue: 'BBBBBB',
                        endDate: currentDate.format(DATE_TIME_FORMAT),
                        fieldName: 'BBBBBB',
                        signedDate: currentDate.format(DATE_TIME_FORMAT),
                        startDate: currentDate.format(DATE_TIME_FORMAT),
                        active: true,
                        authorisorName: 'BBBBBB',
                        authorisorEmailAddress: 'BBBBBB',
                        metadataKey: 'BBBBBB',
                        metadataValue: 'BBBBBB',
                        consentType: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        endDate: currentDate,
                        signedDate: currentDate,
                        startDate: currentDate
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

            it('should return a list of Consent', async () => {
                const returnedFromService = Object.assign(
                    {
                        parentConsentId: 'BBBBBB',
                        entityKey: 'BBBBBB',
                        entityKeyType: 'BBBBBB',
                        fieldValue: 'BBBBBB',
                        endDate: currentDate.format(DATE_TIME_FORMAT),
                        fieldName: 'BBBBBB',
                        signedDate: currentDate.format(DATE_TIME_FORMAT),
                        startDate: currentDate.format(DATE_TIME_FORMAT),
                        active: true,
                        authorisorName: 'BBBBBB',
                        authorisorEmailAddress: 'BBBBBB',
                        metadataKey: 'BBBBBB',
                        metadataValue: 'BBBBBB',
                        consentType: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        endDate: currentDate,
                        signedDate: currentDate,
                        startDate: currentDate
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

            it('should delete a Consent', async () => {
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
