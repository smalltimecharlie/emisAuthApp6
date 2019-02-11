export interface IOrganisationEndpoint {
    id?: number;
    orgGUID?: string;
    cbd?: string;
    name?: string;
    serverName?: string;
    databaseName?: string;
}

export class OrganisationEndpoint implements IOrganisationEndpoint {
    constructor(
        public id?: number,
        public orgGUID?: string,
        public cbd?: string,
        public name?: string,
        public serverName?: string,
        public databaseName?: string
    ) {}
}
