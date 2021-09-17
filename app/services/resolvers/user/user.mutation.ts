import { gql } from "@apollo/client"

export interface LoginDto {
  email: string
  password: string
}
export const LOGIN_MUTATION = gql`
  mutation ($loginData: LoginDto!) {
    login(data: $loginData) {
      data {
        accessToken
        refreshToken
      }
      errors {
        message
        path
      }
      success
    }
  }
`

export interface RegisterDto {
  avatar: string
  email: string
  firstName: string
  lastName: string
  password: string
  phoneNumber: string
}
export const REGISTER_MUTATION = gql`
  mutation ($registerData: RegisterDto!) {
    register(data: $registerData) {
      data {
        id
      }
      errors {
        message
        path
      }
      success
    }
  }
`
