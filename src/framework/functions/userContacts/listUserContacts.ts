import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'
import { InputListUserContacts } from '@controller/serializers/userContacts/inputListUserContacts'
import { ListUserContactsOperator } from '@controller/operations/userContacts/listUserContactsOperator'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(ListUserContactsOperator)

  const input = new InputListUserContacts({
    ...event?.queryStringParameters,
    isOwner: !!event?.queryStringParameters?.isOwner,
  })
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.internalServerError(result.value)
  }

  return httpResponse.ok(result)
})

export const handler = middyfy(main)
