import { inject, injectable } from 'inversify'

import { IContactRepository } from '@business/repositories/contacts/iContactRepository'
import { ContactModel } from '@framework/models/contactModel'
import { IContactEntity } from '@domain/entities/contacts/contactEntity'

@injectable()
export class ContactRepository implements IContactRepository {
  public constructor(@inject(ContactModel) private contactModel: typeof ContactModel) {}

  async create(contactEntity: IContactEntity): Promise<IContactEntity> {
    return this.contactModel.create({
      idcontact: contactEntity.id,
      iduser: contactEntity.iduser,
      name: contactEntity.name,
      address: contactEntity.address,
      birth_date: contactEntity.birthDate,
    })
  }
}
