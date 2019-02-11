import { Moment } from 'moment';
import { IAgreements } from 'app/shared/model/agreements.model';
import { ISignedUpUsers } from 'app/shared/model/signed-up-users.model';
import { IUseCase } from 'app/shared/model/use-case.model';

export const enum ConsentType {
    Patient = 'Patient',
    GP = 'GP'
}

export interface IConsent {
    id?: number;
    parentConsentId?: string;
    entityKey?: string;
    entityKeyType?: string;
    fieldValue?: string;
    endDate?: Moment;
    fieldName?: string;
    signedDate?: Moment;
    startDate?: Moment;
    active?: boolean;
    authorisorName?: string;
    authorisorEmailAddress?: string;
    metadataKey?: string;
    metadataValue?: string;
    consentType?: ConsentType;
    agreement?: IAgreements;
    user?: ISignedUpUsers;
    useCase?: IUseCase;
}

export class Consent implements IConsent {
    constructor(
        public id?: number,
        public parentConsentId?: string,
        public entityKey?: string,
        public entityKeyType?: string,
        public fieldValue?: string,
        public endDate?: Moment,
        public fieldName?: string,
        public signedDate?: Moment,
        public startDate?: Moment,
        public active?: boolean,
        public authorisorName?: string,
        public authorisorEmailAddress?: string,
        public metadataKey?: string,
        public metadataValue?: string,
        public consentType?: ConsentType,
        public agreement?: IAgreements,
        public user?: ISignedUpUsers,
        public useCase?: IUseCase
    ) {
        this.active = this.active || false;
    }
}
