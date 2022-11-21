import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { DeleteEventOperator } from '@controller/operations/events/deleteEventOperator'
import { InputDeleteEvent } from '@controller/serializers/events/inputDeleteEvent'
import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const operator = container.get(DeleteEventOperator)
  const { idevent, iduser } = event?.pathParameters

  const input = new InputDeleteEvent({ idevent, iduser })
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.notFound(result.value)
  }

  return result
})

export const handler = middyfy(main)
