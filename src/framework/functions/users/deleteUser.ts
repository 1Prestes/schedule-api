import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { DeleteUserOperator } from '@controller/operations/users/deleteUserOperator'
import { InputDeleteUser } from '@controller/serializers/users/inputDeleteUser'
import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const operator = container.get(DeleteUserOperator)
  const iduser = event.pathParameters.iduser

  const input = new InputDeleteUser({ iduser })
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.notFound(result.value)
  }

  return result
})

export const handler = middyfy(main)
