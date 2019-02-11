export interface IUsersInOrganisations {
    id?: number;
    organisation?: string;
    username?: string;
}

export class UsersInOrganisations implements IUsersInOrganisations {
    constructor(public id?: number, public organisation?: string, public username?: string) {}
}
