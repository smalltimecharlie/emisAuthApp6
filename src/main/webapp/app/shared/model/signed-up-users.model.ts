import { Moment } from 'moment';

export interface ISignedUpUsers {
    id?: number;
    username?: string;
    enabled?: string;
    accountStatus?: string;
    emailVerified?: boolean;
    phoneNumber?: string;
    email?: string;
    updated?: Moment;
    created?: Moment;
}

export class SignedUpUsers implements ISignedUpUsers {
    constructor(
        public id?: number,
        public username?: string,
        public enabled?: string,
        public accountStatus?: string,
        public emailVerified?: boolean,
        public phoneNumber?: string,
        public email?: string,
        public updated?: Moment,
        public created?: Moment
    ) {
        this.emailVerified = this.emailVerified || false;
    }
}
