import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { CreateUserContactOperator } from '@controller/operations/userContacts/createUserContactOperator'
import { InputCreateUserContact } from '@controller/serializers/userContacts/inputUserContact'
import { httpHandler } from '@framework/utility/httpHandler'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(CreateUserContactOperator)

  const input = new InputCreateUserContact(event?.body as Object)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.internalServerError()
  }

  return result
})

export const handler = middyfy(main)
