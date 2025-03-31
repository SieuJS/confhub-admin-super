export type ConferenceRequest = {
    search ?: string;
    status? : string ; 
    source? : string[];
    researchFields? : string[];
    ranks? : string[];
    page? : number ;
    perPage? : number ;
}