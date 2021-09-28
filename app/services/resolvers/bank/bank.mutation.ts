import gql from "graphql-tag"

export const CREATE_LINK_TOKEN = gql`
  mutation CreateLinkToken {
    createLinkToken {
      data {
        expiration
        link_token
        request_id
      }
      success
      errors {
        message
        path
      }
    }
  }
`

export const CONNECT_BANK_ACCOUNT_MUTATION = gql`
  mutation ConnectBankAccount($connectBankAccountData: ConnectBankAccountDto!) {
    connectBankAccount(data: $connectBankAccountData) {
      data
      errors {
        message
        path
      }
      success
    }
  }
`
