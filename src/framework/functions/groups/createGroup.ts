import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { middyfy } from '@framework/utility/middy'
import { CreateGroupOperator } from '@controller/operations/groups/createGroupOperator'
import { InputCreateGroup } from '@controller/serializers/groups/inputCreateGroup'
import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const operator = container.get(CreateGroupOperator)
  const input = new InputCreateGroup(event.body as Object)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result.value)
})

export const handler = middyfy(main)
