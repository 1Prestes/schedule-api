import { IUserEntity } from '@domain/entities/users/userEntity'
import { InputListUsersDto } from '@business/dto/users/userDto'

export const IUserRepositoryToken = Symbol.for('IUserRepository')

export interface IUserRepository {
  create(userEntity: IUserEntity): Promise<IUserEntity>
  findUserById(id: string): Promise<IUserEntity>
  list({ limit, page }: InputListUsersDto): Promise<{ rows: IUserEntity[]; count: number }>
}
