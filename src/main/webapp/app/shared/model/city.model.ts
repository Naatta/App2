export interface ICity {
    id?: number;
    name?: string;
    postCode?: number;
}

export class City implements ICity {
    constructor(public id?: number, public name?: string, public postCode?: number) {}
}
