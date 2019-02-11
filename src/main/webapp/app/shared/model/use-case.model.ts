import { Moment } from 'moment';

export interface IUseCase {
    id?: number;
    useCaseName?: string;
    startDate?: Moment;
    endDate?: Moment;
    active?: boolean;
}

export class UseCase implements IUseCase {
    constructor(
        public id?: number,
        public useCaseName?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public active?: boolean
    ) {
        this.active = this.active || false;
    }
}
