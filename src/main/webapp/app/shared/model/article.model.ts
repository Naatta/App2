export interface IArticle {
    id?: number;
    name?: string;
    amount?: number;
    articleNumber?: string;
    price?: number;
}

export class Article implements IArticle {
    constructor(public id?: number, public name?: string, public amount?: number, public articleNumber?: string, public price?: number) {}
}
