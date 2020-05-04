export const encode = (input: string): string => Buffer.from(input).toString('base64')

export const decode = (input: string): string => Buffer.from(input, 'base64').toString()

export default {
  encode,
  decode,
}
