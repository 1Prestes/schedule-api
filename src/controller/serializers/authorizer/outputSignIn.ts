import { OutputUserSignIn } from '@business/dto/authorizer/authorizerDto'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputSignIn = Either<IError, OutputUserSignIn>
