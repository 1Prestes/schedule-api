import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'
import { InputListEvents } from '@controller/serializers/events/inputListEvents'
import { ListEventsOperator } from '@controller/operations/events/listEventsOperator'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(ListEventsOperator)

  const iduser = event?.pathParameters?.id

  const input = new InputListEvents({ ...event?.queryStringParameters, iduser })
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.internalServerError()
  }

  return result
})

export const handler = middyfy(main)
