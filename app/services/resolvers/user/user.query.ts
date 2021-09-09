import { gql } from "graphql-request"

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      data {
        avatar
        createdAt
        email
        emailVerified
        firstName
        forgotPasswordLock
        id
        lastName
        name
        phoneNumber
        phoneNumberVerified
        twoFactorVerified
      }
      errors {
        message
        path
      }
      success
    }
  }
`
