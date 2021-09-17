import { gql } from "@apollo/client"

export const GET_CURRENT_USER_QUERY = gql`
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

export const GET_CURRENT_USER_CONTACTS = gql`
  query GetCurrentUserContacts {
    getMyContacts {
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
