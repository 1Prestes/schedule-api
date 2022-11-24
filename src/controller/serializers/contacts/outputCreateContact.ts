import { IContactEntity } from '@domain/entities/contacts/contactEntity'

import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputCreateContact = Either<IError, IContactEntity>
