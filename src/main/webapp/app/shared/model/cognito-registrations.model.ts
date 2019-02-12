import { Moment } from 'moment';

export interface ICognitoRegistrations {
    id?: number;
    userPoolId?: string;
    username?: string;
    email?: string;
    loggedDate?: Moment;
    cognitoEvent?: string;
}

export class CognitoRegistrations implements ICognitoRegistrations {
    constructor(
        public id?: number,
        public userPoolId?: string,
        public username?: string,
        public email?: string,
        public loggedDate?: Moment,
        public cognitoEvent?: string
    ) {}
}
