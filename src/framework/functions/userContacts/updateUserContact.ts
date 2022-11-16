import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { UpdateUserContactOperator } from '@controller/operations/userContacts/updateUserContactOperator'
import { InputUpdateUserContact } from '@controller/serializers/userContacts/inputUpdateUserContact'
import { httpHandler } from '@framework/utility/httpHandler'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(UpdateUserContactOperator)

  const input = new InputUpdateUserContact(event?.body as Object)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.notFound(result.value)
  }

  return httpResponse.ok(result.value)
})

export const handler = middyfy(main)
