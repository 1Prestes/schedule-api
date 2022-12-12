import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'
import { DeleteGroupOperator } from '@controller/operations/groups/deleteGroupOperator'
import { InputDeleteGroup } from '@controller/serializers/groups/inputDeleteGroup'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const operator = container.get(DeleteGroupOperator)
  const idgroup = event.pathParameters.idgroup
  const iduser = event.pathParameters.iduser

  const input = new InputDeleteGroup({ idgroup, iduser })
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.notFound(result.value)
  }

  return httpResponse.ok(result.value)
})

export const handler = middyfy(main)