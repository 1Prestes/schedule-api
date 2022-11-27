import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { UpdateGroupOperator } from '@controller/operations/groups/updateGroupOperator'
import { InputUpdateGroup } from '@controller/serializers/groups/inputUpdateGroup'
import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const operator = container.get(UpdateGroupOperator)
  const input = new InputUpdateGroup(event.body as Object)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.notFound(result.value)
  }

  return httpResponse.ok(result.value)
})

export const handler = middyfy(main)
