import { gql } from "graphql-request"

export const GET_CURRENT_USER_WALLET = gql`
  query GetCurrentUserWallet {
    getMyWallet {
      data {
        balance
        createdAt
        defaultCurrency
        id
        userId
      }
      errors {
        message
        path
      }
      success
    }
  }
`
