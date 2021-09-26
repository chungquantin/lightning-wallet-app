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
