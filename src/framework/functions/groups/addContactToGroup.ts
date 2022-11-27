import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { middyfy } from '@framework/utility/middy'
import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { container } from '@shared/ioc/container'
import { AddContactToGroupOperator } from '@controller/operations/groups/addContactToGroupOperator'
import { InputAddContactToGroup } from '@controller/serializers/groups/inputAddContactToGroup'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const operator = container.get(AddContactToGroupOperator)
  const input = new InputAddContactToGroup(event.body as Object)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.ok(result.value)
})

export const handler = middyfy(main)
