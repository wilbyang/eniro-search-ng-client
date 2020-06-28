import {IAddress, ICompany, IHits, IPhone, ISearchResult} from './index.dto';
import {DomainDTOConverter} from '../_helpers/domain-dto.converter';

/**
 * domain class for Address
 */
export class Phone {
  private state: IPhone;
  get number(): string {
    return this.state.number;
  }

  get text(): string {
    return this.state.text;
  }
}

/**
 * domain class for Address
 */
export class Address {
  private state: IAddress;

  get postalCode(): string {
    return this.state.postalCode;
  }

  get streetName(): string {
    return this.state.streetName;
  }

  get streetNumber(): string {
    return this.state.streetNumber;
  }

  get postalArea(): string {
    return this.state.postalArea;
  }
  get full(): string {
    return `${this.streetName}, ${this.streetNumber} ${this.postalArea} ${this.postalCode}`;
  }
}

/**
 * domain class for Company
 */
export class Company {
  private state: ICompany;
  get eniroId(): string {
    return this.state.eniroId;
  }
  get name(): string {
    return this.state.name;
  }
  get profilePageLink(): string {
    return this.state.profilePageLink;
  }
  get addresses(): Address[]{
    return this.state.addresses.map((dto) => {
      return DomainDTOConverter.fromDto<Address>(Address, dto);
    });
  }

  get phones(): Phone[] {
    return this.state.phones.map((dto) => {
      return DomainDTOConverter.fromDto<Phone>(Phone, dto);
    });
  }

}

/**
 * domain class for SearchResult
 */
export class Hits {
  private state: IHits;
  get companies(): number {
    return this.state.companies;
  }
}

/**
 * domain class for SearchResult
 */
export class SearchResult {
  private state: ISearchResult;
  get searchLevel(): string {
    return this.state.searchLevel;
  }
  get companies(): Company[]{
    return this.state.companies.map((dto) => {
      return DomainDTOConverter.fromDto<Company>(Company, dto);
    });
  }
  get hits(): IHits {
    return this.state.hits;
  }

}

