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
