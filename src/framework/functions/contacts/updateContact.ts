import 'reflect-metadata'
import 'source-map-support/register'
import '@framework/ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { UpdateContactOperator } from '@controller/operations/contacts/updateContactOperator'
import { InputUpdateContact } from '@controller/serializers/contacts/inputUpdateContact'
import { httpResponse } from '@framework/utility/httpResponse'
import { httpHandler } from '@framework/utility/httpHandler'
import { middyfy } from '@framework/utility/middy'
import { container } from '@shared/ioc/container'

const main = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(UpdateContactOperator)
  const { birthDate } = event?.body as any

  const payload = {
    ...(event.body as Object),
    ...(birthDate && { birthDate: new Date(birthDate) }),
  }

  const input = new InputUpdateContact(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.internalServerError()
  }

  return result
})

export const handler = middyfy(main)
