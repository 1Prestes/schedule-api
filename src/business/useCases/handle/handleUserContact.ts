import { InputUserContactDto } from '@business/dto/userContacts/userContactDto'
import {
  AtLeastOnContactMustBeInformed,
  ManyOwners,
  PrimaryEmailNotInformed,
  PrimaryPhoneNotInformed,
  UserContactUnassociated,
} from '@business/module/errors/userContacts/userContacts'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/iError'

export class HandleUserContact {
  public hasOwner(payload: InputUserContactDto): Either<IError, boolean> {
    const { idcontact, iduser } = payload

    if (!idcontact && !iduser) {
      return left(UserContactUnassociated)
    }

    if (idcontact && iduser) {
      return left(ManyOwners)
    }

    return right(true)
  }

  public hasPrimaryContact(payload: InputUserContactDto): Either<IError, boolean> {
    if (payload.mainEmail && !payload.email) {
      return left(PrimaryEmailNotInformed)
    }

    if (payload.mainPhone && !payload.phone) {
      return left(PrimaryPhoneNotInformed)
    }

    return right(true)
  }

  public hasContact(payload: InputUserContactDto): Either<IError, boolean> {
    if (!payload.email && !payload.phone) {
      return left(AtLeastOnContactMustBeInformed)
    }

    return right(true)
  }
}
