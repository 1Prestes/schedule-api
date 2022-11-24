import { IContactEntity } from '@domain/entities/contacts/contactEntity'

export const IContactRepositoryToken = Symbol.for('IContactRepository')

export interface IContactRepository {
  create(contactEntity: IContactEntity): Promise<IContactEntity>
}
