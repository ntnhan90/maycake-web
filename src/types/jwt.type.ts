
export const Role = {
    Admin: 'Admin',
    Franchise: 'Franchise',
    Store: 'Store'
} as const
export type RoleType = (typeof Role)[keyof typeof Role]


export const TokenType = {
  ForgotPasswordToken: 'ForgotPasswordToken',
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken',
} as const
export type TokenTypeValue = (typeof TokenType)[keyof typeof TokenType]
export interface TokenPayload {
  userId: number
  role: RoleType
  tokenType: TokenTypeValue
  exp: number
  iat: number
}