import { IContactEntity } from '@domain/entities/contacts/contactEntity'
import { InputListContactsDto } from '@business/dto/contacts/contactsDto'

export const IContactRepositoryToken = Symbol.for('IContactRepository')

export interface IContactRepository {
  create(contactEntity: IContactEntity): Promise<IContactEntity>
  list({ limit, page, iduser }: InputListContactsDto): Promise<{ rows: IContactEntity[]; count: number }>
}
