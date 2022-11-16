import { IUserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { InputListUserContactsDto, InputUserContactDto } from '@business/dto/userContacts/userContactDto'

export const IUserContactRepositoryToken = Symbol.for('IUserContactRepository')

export interface IUserContactRepository {
  create(userContact: IUserContactEntity): Promise<IUserContactEntity>
  update(userContact: InputUserContactDto): Promise<boolean>
  list({ limit, page }: InputListUserContactsDto): Promise<{ rows: IUserContactEntity[]; count: number }>
  deleteUserContactById(id: string): Promise<boolean>
}
