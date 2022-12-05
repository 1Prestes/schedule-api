const { verify } = require('jsonwebtoken')

const validateToken = async token => {
  const verified = verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('validateToken => ', err)
      throw new Error('Unauthorized')
    }

    return decoded
  })

  return verified
}

const generatePolicy = (sub, allow, context = {}) => {
  return {
    principalId: sub || 'user-token',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: allow ? 'Allow' : 'Deny',
          Resource: '*',
        },
      ],
    },
    context: context,
  }
}

module.exports.handler = async (event, context, callback) => {
  const token = event?.authorizationToken
  console.log('context :>> ', context)
  console.log('event :>> ', event)

  if (!token) {
    callback(null, generatePolicy(null, false))
    return
  }

  const [, onlyToken] = token.split(' ')

  try {
    const verified = await validateToken(onlyToken)

    const policy = generatePolicy(verified.iduser, true, verified)
    callback(null, policy)
  } catch (error) {
    console.log('error => ', error)
    callback(error)
  }
}
