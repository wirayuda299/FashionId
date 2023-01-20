export interface IUsers {
  emailVerified: boolean
  email: string
  displayName?: string
  uid: string | undefined
  phoneNumber?: string
  isSubscribe: boolean
}