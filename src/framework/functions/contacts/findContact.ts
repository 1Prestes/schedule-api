import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { FindContactOperator } from '@controller/operations/contacts/findContactOperator'
import { InputFindContact } from '@controller/serializers/contacts/inputFindContact'
import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const operator = container.get(FindContactOperator)
  const idcontact = event.pathParameters.idcontact

  const input = new InputFindContact({ idcontact } as Object)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.notFound(result.value)
  }

  return result
})

export const handler = middyfy(main)
