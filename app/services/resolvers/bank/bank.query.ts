import gql from "graphql-tag"

export const EXCHANGE_PUBLIC_TOKEN = gql`
  query ($exchangePublicTokenData: ExchangeTokenDto!) {
    exchangePublicToken(data: $exchangePublicTokenData) {
      data
      errors {
        message
        path
      }
      success
    }
  }
`
export const GET_MY_BANK_ACCOUNTS_QUERY = gql`
  query GetMyBankAccounts {
    getMyBankAccounts {
      data {
        id
        accountId
        addedAt
        balance {
          id
          availableBalance
          currentBalance
          isoCurrencyCode
          limitBalance
          unofficialCurrencyCode
        }
        institutionId
        institutionName
        name
        officialName
        subType
        type
        ach {
          account
          id
          routingNumber
          wire_routing
        }
      }
      errors {
        message
        path
      }
      success
    }
  }
`
