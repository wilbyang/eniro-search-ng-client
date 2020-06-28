export interface IPhone {
  number: string;
  text: string;
}

export interface IAddress {
  postalCode: string;
  streetName: string;
  streetNumber: string;
  postalArea: string;
}

export interface ICompany {
  eniroId: string;
  name: string;
  phones: IPhone[];
  profilePageLink: string;
  addresses: IAddress[];
}

export interface IHits {
  companies: number;
}

export interface ISearchResult {
  companies: ICompany[];
  searchLevel: string;
  hits: IHits;
}
