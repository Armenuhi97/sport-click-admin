export interface ServerResponse<T> {
    count: number
    next: null
    previous: null
    results: T
}
export interface Country {
    id: number;
    link: string;
    name: string;
    url: string;
    country_liga: Liga[];
}
export interface Liga {
    country: string;
    country_name_key: string;
    date: string;
    id: number;
    liga: string;
    liga_name_key: string;
    link: string;
    logo: string;
    name_country: string;
    url: string;
}