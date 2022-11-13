import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { InputFindUser } from '@controller/serializers/users/inputFindUser'
import { FindUserOperator } from '@controller/operations/users/findUserOperator'
import { httpCodes, httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const operator = container.get(FindUserOperator)
  const id = event.pathParameters.id

  const input = new InputFindUser({ id } as Object)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.notFound(httpCodes.notFound)
  }

  return result
})

export const handler = middyfy(main)
