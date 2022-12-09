import { inject, injectable } from 'inversify'

import { IContactEntity } from '@domain/entities/contacts/contactEntity'
import { IContactRepository } from '@business/repositories/contacts/iContactRepository'
import { InputDeleteContactDto, InputListContactsDto, InputUpdateContactDto } from '@business/dto/contacts/contactsDto'
import { ContactModel } from '@framework/models/contact'

@injectable()
export class ContactRepository implements IContactRepository {
  public constructor(@inject(ContactModel) private contactModel: typeof ContactModel) {}

  async create(contactEntity: IContactEntity): Promise<IContactEntity> {
    return this.contactModel.create({
      idcontact: contactEntity.idcontact,
      iduser: contactEntity.iduser,
      name: contactEntity.name,
      address: contactEntity.address,
      birth_date: contactEntity.birthDate,
    })
  }

  async list(props: InputListContactsDto): Promise<{
    rows: ContactModel[]
    count: number
  }> {
    return this.contactModel.findAndCountAll({
      ...(props?.limit && { limit: Number(props.limit) }),
      ...(props?.page && { offset: Number(props.page) }),
      where: { iduser: props.iduser },
    })
  }

  async findContactById(id: string): Promise<IContactEntity> {
    return this.contactModel.findOne({
      where: { idcontact: id },
    })
  }

  async update(props: InputUpdateContactDto): Promise<boolean> {
    const response = await this.contactModel.update(
      {
        ...(props.name && { name: props.name }),
        ...(props.address && { address: props.address }),
        ...(props.birthDate && { birth_date: props.birthDate }),
      },
      {
        where: {
          idcontact: props.idcontact,
          iduser: props.iduser,
        },
      }
    )

    if (response[0] === 1) {
      return true
    }

    return false
  }

  async deleteContactById(props: InputDeleteContactDto): Promise<boolean> {
    const where = {
      idcontact: props.idcontact,
      iduser: props.iduser,
    }
    const deleteResult = await this.contactModel.destroy({ where })

    return !!deleteResult
  }
}
