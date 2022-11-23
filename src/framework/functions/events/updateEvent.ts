import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { UpdateEventOperator } from '@controller/operations/events/updateEventOperator'
import { InputUpdateEvent } from '@controller/serializers/events/inputUpdateEvent'
import { httpHandler } from '@framework/utility/httpHandler'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(UpdateEventOperator)
  const { idevent, iduser } = event?.pathParameters

  const payload = {
    ...(event.body as Object),
    idevent,
    iduser,
  }

  const input = new InputUpdateEvent(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.internalServerError()
  }

  return result
})

export const handler = middyfy(main)
