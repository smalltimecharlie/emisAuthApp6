export interface IAgreements {
    id?: number;
    agreementUrl?: string;
}

export class Agreements implements IAgreements {
    constructor(public id?: number, public agreementUrl?: string) {}
}
