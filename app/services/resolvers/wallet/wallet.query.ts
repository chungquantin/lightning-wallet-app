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

export const GET_MY_WALLET_TRANSACTIONS_QUERY = gql`
  query GetMyWalletTransactions {
    getMyWalletTransactions {
      data {
        amount
        createdAt
        currency
        description
        fromWalletId
        method
        networkFee
        status
        toWalletId
        transactionFee
        id
        btcAmount
        btcExchangeRate
      }
      errors {
        message
        path
      }
      success
    }
  }
`
