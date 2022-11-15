import { injectable, inject } from 'inversify'

import { IUserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { IUserContactRepository } from '@business/repositories/userContacts/iUserContactRepository'
import { UserContactModel } from '@framework/models/userContactModel'

@injectable()
export class UserContactRepository implements IUserContactRepository {
  public constructor(@inject(UserContactModel) private userContactModel: typeof UserContactModel) {}

  async create(userContactEntity: IUserContactEntity): Promise<IUserContactEntity> {
    return this.userContactModel.create({
      iduser_contact: userContactEntity.id,
      idcontact: userContactEntity.idcontact,
      email: userContactEntity.email,
      phone: userContactEntity.phone,
      main_email: userContactEntity.mainEmail,
      main_phone: userContactEntity.mainPhone,
      user_iduser: userContactEntity.iduser,
    })
  }
}
