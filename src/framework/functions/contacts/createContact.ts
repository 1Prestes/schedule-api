import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { middyfy } from '@framework/utility/middy'
import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { container } from '@shared/ioc/container'
import { CreateContactOperator } from '@controller/operations/contacts/createContactOperator'
import { InputCreateContact } from '@controller/serializers/contacts/inputCreateContact'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const { birthDate } = event?.body as any
  const payload = {
    ...(event.body as Object),
    birthDate: new Date(birthDate),
  }
  const operator = container.get(CreateContactOperator)
  const input = new InputCreateContact(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return result
})

export const handler = middyfy(main)
