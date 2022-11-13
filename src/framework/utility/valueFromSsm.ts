import AWS from 'aws-sdk'
import { GetParametersRequest, ParameterList } from 'aws-sdk/clients/ssm'

import { unknownError } from '@business/module/errors/general'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/iError'


const ssm = new AWS.SSM()

const valueFromSsm = (keysSsm: string[]): Promise<Either<IError, ParameterList>> => {
  const dataGetParameter: GetParametersRequest = {
    Names: keysSsm,
  }

  return new Promise(resolve =>
    ssm.getParameters(dataGetParameter, (err, data) => {
      if (err) {
        resolve(left(unknownError))
      }

      resolve(right(data?.Parameters))
    })
  )
}

export { valueFromSsm }
