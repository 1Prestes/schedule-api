import { IOutputListContacts } from '@business/dto/contacts/contactsDto'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputListContacts = Either<IError, IOutputListContacts>
