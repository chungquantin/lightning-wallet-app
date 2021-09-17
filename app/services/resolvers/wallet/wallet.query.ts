import { gql } from "@apollo/client"

export const GET_CURRENT_USER_WALLET_QUERY = gql`
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
