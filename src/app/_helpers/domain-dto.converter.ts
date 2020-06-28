export type Type<T> = new (...args: any[]) => T;

export class DomainDTOConverter {
  static fromDto<T>(domain: Type<T>, dto: any) {
    const instance = Object.create(domain.prototype);
    instance.state = dto;
    return instance as T;
  }

  static toDto<T>(domain: any) {
    return domain.state as T;
  }
}
