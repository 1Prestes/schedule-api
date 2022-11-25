import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { FindEventOperator } from '@controller/operations/events/findEventOperator'
import { InputFindEvent } from '@controller/serializers/events/inputFindEvent'
import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const operator = container.get(FindEventOperator)
  const idevent = event.pathParameters?.idevent
  const iduser = event.pathParameters?.iduser
  const input = new InputFindEvent({ idevent, iduser })
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.notFound(result.value)
  }

  return result
})

export const handler = middyfy(main)
