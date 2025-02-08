export interface dishParms {
    skip: number;
    limit: number;
    orderBy: string;
    sortBy: string;
    diet?: string;
    state?: string;
    region?: string;
    flavor?: string;
    searchText?: string;
}

export interface IObject {
    [key: string]: any;
}