import { injectable, inject } from 'inversify'

import { IUserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { IUserContactRepository } from '@business/repositories/userContacts/iUserContactRepository'
import {
  InputListUserContactsDto,
  InputUserContactDto,
  WhereListUserContactsProps,
} from '@business/dto/userContacts/userContactDto'
import { UserContactsModel } from '@framework/models/userContacts'

@injectable()
export class UserContactRepository implements IUserContactRepository {
  public constructor(@inject(UserContactsModel) private userContactModel: typeof UserContactsModel) {}

  async create(userContact: IUserContactEntity): Promise<IUserContactEntity> {
    const userContactResult = await this.userContactModel
      .create({
        iduser_contact: userContact.id,
        idcontact: userContact.idcontact,
        email: userContact.email,
        phone: userContact.phone,
        primary_email: userContact.primaryEmail,
        primary_phone: userContact.primaryPhone,
        iduser: userContact.iduser,
      })
      .then(response => response)
      .catch(error => {
        console.log('UserContactRepository::create::error => ', error)
        return error?.errors?.[0]?.type || error
      })

    return userContactResult
  }

  async update(userContact: InputUserContactDto): Promise<boolean> {
    const { email, phone, primaryEmail, primaryPhone } = userContact
    const response = await this.userContactModel.update(
      {
        ...(email && { email: email }),
        ...(phone && { phone: phone }),
        primary_email: primaryEmail,
        primary_phone: primaryPhone,
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
    rows: UserContactsModel[]
    count: number
  }> {
    const where = {
      ...(props.isOwner ? { iduser: props.id } : { idcontact: props.id }),
      ...(WhereListUserContactsProps[props.where] && { [WhereListUserContactsProps[props.where]]: props.like }),
    }
    console.log('teste ', where)
    return this.userContactModel.findAndCountAll({
      ...(props?.limit && { limit: Number(props.limit) }),
      ...(props?.page && { offset: Number(props.page) }),
      where,
    })
  }

  async deleteUserContactById(id: string): Promise<boolean> {
    const where = {
      iduser_contact: id,
    }
    const deleteResult = await this.userContactModel.destroy({ where })

    return !!deleteResult
  }
}
