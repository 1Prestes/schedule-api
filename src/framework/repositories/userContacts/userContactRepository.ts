import { injectable, inject } from 'inversify'

import { IUserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { IUserContactRepository } from '@business/repositories/userContacts/iUserContactRepository'
import {
  InputListUserContactsDto,
  InputUserContactDto,
  WhereListUserContactsProps,
} from '@business/dto/userContacts/userContactDto'
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
        console.log('UserContactRepository::create::error => ', error)
        return error?.errors?.[0]?.type || error
      })

    return userContactResult
  }

  async update(userContact: InputUserContactDto): Promise<boolean> {
    const { email, phone, mainEmail, mainPhone } = userContact
    const response = await this.userContactModel.update(
      {
        ...(email && { email: email }),
        ...(phone && { phone: phone }),
        main_email: mainEmail,
        main_phone: mainPhone,
      },
      {
        where: {
          iduser_contact: userContact.id,
        },
      }
    )

    if (response[0] === 1) {
      return true
    }

    return false
  }

  async list(props: InputListUserContactsDto): Promise<{
    rows: UserContactModel[]
    count: number
  }> {
    const where = {
      ...(props.isOwner ? { user_iduser: props.id } : { idcontact: props.id }),
      ...(WhereListUserContactsProps[props.where] && { [WhereListUserContactsProps[props.where]]: props.like }),
    }

    return this.userContactModel.findAndCountAll({
      ...(props?.limit && { limit: Number(props.limit) }),
      ...(props?.page && { offset: Number(props.page) }),
      where,
    })
  }
}
