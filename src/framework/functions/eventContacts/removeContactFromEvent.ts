import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { middyfy } from '@framework/utility/middy'
import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { container } from '@shared/ioc/container'
import { RemoveContactFromEventOperator } from '@controller/operations/eventContacts/removeContactFromEventOperator'
import { InputRemoveContactFromEvent } from '@controller/serializers/eventContacts/inputRemoveContactFromEvent'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(RemoveContactFromEventOperator)

  const input = new InputRemoveContactFromEvent(event.body as Object)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.ok(result.value)
})

export const handler = middyfy(main)
