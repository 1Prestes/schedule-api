import { IOutputListUserContacts } from '@business/dto/userContacts/userContactDto'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputListUserContacts = Either<IError, IOutputListUserContacts>
