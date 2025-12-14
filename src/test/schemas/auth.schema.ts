export const authTokenSchema = {
  type: 'object',
  properties: {
    token: { type: 'string' }
  },
  required: ['token'],
  additionalProperties: false
};
