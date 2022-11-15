import { injectable, inject } from 'inversify'

import { IUserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { IUserContactRepository } from '@business/repositories/userContacts/iUserContactRepository'
import { UserContactModel } from '@framework/models/userContactModel'

@injectable()
export class UserContactRepository implements IUserContactRepository {
  public constructor(@inject(UserContactModel) private userContactModel: typeof UserContactModel) {}

  async create(userContact: IUserContactEntity): Promise<IUserContactEntity> {
    const userContactResult = await this.userContactModel
      .create({
        iduser_contact: userContact.id,
        idcontact: userContact.idcontact,
        email: userContact.email,
        phone: userContact.phone,
        main_email: userContact.mainEmail,
        main_phone: userContact.mainPhone,
        user_iduser: userContact.iduser,
      })
      .then(response => response)
      .catch(error => {
        return error?.errors[0]?.type
      })

    return userContactResult
  }
}
