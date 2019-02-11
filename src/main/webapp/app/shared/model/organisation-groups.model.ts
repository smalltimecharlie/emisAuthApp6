export interface IOrganisationGroups {
    id?: number;
    organisationGroup?: string;
    organisationId?: string;
}

export class OrganisationGroups implements IOrganisationGroups {
    constructor(public id?: number, public organisationGroup?: string, public organisationId?: string) {}
}
