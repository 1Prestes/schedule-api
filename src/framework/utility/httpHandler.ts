import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

import { valueFromSsm } from './valueFromSsm'
import { transformPagination } from './paginate'
import { httpCodes, httpResponse } from '@framework/utility/httpResponse'
import { container } from '@shared/ioc/container'
import { Either, Left, Right } from '@shared/either'
import { IError } from '@shared/iError'

export const httpHandler = (
  handler: (event: APIGatewayProxyEvent, context: Context) => Promise<Either<IError, any> | APIGatewayProxyResult>,
  options?: {
    ssm?: string[]
    statusCode?: { success?: httpCodes; fail?: httpCodes }
  }
) => {
  return async (event: APIGatewayProxyEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false
    try {
      if (options?.ssm && options?.ssm?.length) {
        const keysContainer: string[] = []
        for (const containerKey of options.ssm) {
          if (!container.isBound(containerKey)) {
            keysContainer.push(containerKey)
          }
        }

        if (keysContainer.length) {
          const resultSsm = await valueFromSsm(keysContainer)

          if (resultSsm.isRight()) {
            resultSsm.value.map(itemKey => container.bind(itemKey.Name).toConstantValue(itemKey.Value))
          }
        }
      }

      const result = await handler(event, context)

      if (result instanceof Left) {
        if (options?.statusCode?.fail) {
          return httpResponse.call(options?.statusCode?.fail, result.value)
        }
        return httpResponse.badRequest(result.value)
      }

      if (result instanceof Right) {
        if (options?.statusCode?.success) {
          return httpResponse.call(options?.statusCode?.success, transformPagination(result.value))
        }
        return httpResponse.ok(transformPagination(result.value))
      }

      return result
    } catch (error) {
      if (error && error.shortMessage === 'validationError') {
        return httpResponse.badRequest(error)
      }
      console.log('error', error)
      return httpResponse.internalServerError()
    }
  }
}
