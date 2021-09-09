import { gql } from "graphql-request"

export interface LoginDto {
  email: string
  password: string
}
export const LOGIN = gql`
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
export const REGISTER = gql`
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
