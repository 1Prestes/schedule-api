import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { ListContactsOperator } from '@controller/operations/contacts/listContactsOperator'
import { InputListContacts } from '@controller/serializers/contacts/inputListContacts'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(ListContactsOperator)

  const input = new InputListContacts(event?.queryStringParameters as Object)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.internalServerError()
  }

  return result
})

export const handler = middyfy(main)
