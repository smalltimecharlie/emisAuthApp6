import { Moment } from 'moment';
import { IOrganisationEndpoint } from 'app/shared/model/organisation-endpoint.model';

export interface IAgreementOrganisation {
    id?: number;
    agreementId?: string;
    agreementType?: string;
    requestingOrgGuid?: string;
    sharingOrgGuid?: string;
    organisationId?: string;
    agreementStatus?: string;
    cretadDate?: Moment;
    organisationEndpoint?: IOrganisationEndpoint;
}

export class AgreementOrganisation implements IAgreementOrganisation {
    constructor(
        public id?: number,
        public agreementId?: string,
        public agreementType?: string,
        public requestingOrgGuid?: string,
        public sharingOrgGuid?: string,
        public organisationId?: string,
        public agreementStatus?: string,
        public cretadDate?: Moment,
        public organisationEndpoint?: IOrganisationEndpoint
    ) {}
}
