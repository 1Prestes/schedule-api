import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { middyfy } from '@framework/utility/middy'
import { InputAddContactToEvent } from '@controller/serializers/eventContacts/inputAddContactToEvent'
import { AddContactToEventOperator } from '@controller/operations/eventContacts/addContactToEventOperator'
import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(AddContactToEventOperator)

  const input = new InputAddContactToEvent(event.body as Object)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return result
})

export const handler = middyfy(main)
