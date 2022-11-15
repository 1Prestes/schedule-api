import { injectable, inject } from 'inversify'

import { IUserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { IUserContactRepository } from '@business/repositories/userContacts/iUserContactRepository'
import { UserContactModel } from '@framework/models/userContacts/userContact'

@injectable()
export class UserContactRepository implements IUserContactRepository {
  public constructor(@inject(UserContactModel) private userContactModel: typeof UserContactModel) {}

  async create(userContactEntity: IUserContactEntity): Promise<IUserContactEntity> {
    console.log('UserContactRepository::create::userContactEntity => ', userContactEntity)
    return this.userContactModel.create({
      iduser_contact: userContactEntity.id,
      email: userContactEntity.email,
      phone: userContactEntity.phone,
      default: userContactEntity.default,
      user_iduser: userContactEntity.user_iduser,
    })
  }
}
