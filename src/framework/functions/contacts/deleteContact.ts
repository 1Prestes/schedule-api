import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { DeleteContactOperator } from '@controller/operations/contacts/deleteContactOperator'
import { InputDeleteContact } from '@controller/serializers/contacts/inputDeleteContact'
import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const operator = container.get(DeleteContactOperator)
  const idcontact = event.pathParameters.idcontact
  const iduser = event.pathParameters.iduser

  const input = new InputDeleteContact({ idcontact, iduser })
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.notFound(result.value)
  }

  return result
})

export const handler = middyfy(main)
