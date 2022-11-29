import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { UpdateUserOperator } from '@controller/operations/users/updateUserOperator'
import { InputUpdateUser } from '@controller/serializers/users/inputUpdateUser'
import { middyfy } from '@framework/utility/middy'
import { httpHandler } from '@framework/utility/httpHandler'
import { httpResponse } from '@framework/utility/httpResponse'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(UpdateUserOperator)
  const { birthDate } = event?.body as any

  const payload = {
    ...(event.body as Object),
    birthDate: new Date(birthDate),
  }

  const input = new InputUpdateUser(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return result
})

export const handler = middyfy(main)
