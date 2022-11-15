import { IUserContactEntity } from '@domain/entities/userContacts/userContactEntity'

export const IUserContactRepositoryToken = Symbol.for('IUserContactRepository')

export interface IUserContactRepository {
  create(userContact: IUserContactEntity): Promise<IUserContactEntity>
}
