import { IUserEntity } from '@domain/entities/users/userEntity'

export const IUserRepositoryToken = Symbol.for('IUserRepository')

export interface IUserRepository {
  create(userEntity: IUserEntity): Promise<IUserEntity>
  findUserById(id: string): Promise<IUserEntity>
}
