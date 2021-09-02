//import { ApiResponse } from "apisauce"
import { ApiResponse } from "apisauce"
import { User } from "../../models/user/user"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { GetUserContactsResult, GetUserResult } from "./api.types"

//const API_PAGE_SIZE = 50

export class UserApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  /**
   * Gets a list of users.
   */
  async getUserContacts(id: string): Promise<GetUserContactsResult> {
    // transform the data into the format we are expecting
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(`/users`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const convertUser = (raw) => {
        return {
          id: raw.id.toString(),
          firstName: raw.name.split(" ")[0],
          lastName: raw.name.split(" ")[1],
          avatar: "https://ca.slack-edge.com/TQV251864-U0252H8HRB4-1f6097ffd12c-512",
          balance: 10000,
          defaultCurrency: "USD",
          email: raw.email,
          phoneNumber: "0932095882",
          emailVerified: false,
          phoneNumberVerified: false,
          twoFactorVerified: false,
        }
      }

      const rawUsers = response.data
      if (rawUsers) {
        const resultUsers: User[] = rawUsers.map(convertUser)
        return { kind: "ok", userContacts: resultUsers }
      }
      return { kind: "ok", userContacts: [] }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<GetUserResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(`/users/${id}`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      console.log(response)

      // transform the data into the format we are expecting
      const resultUser: User = {
        id: response.data.id.toString(),
        firstName: response.data.name,
        lastName: response.data.username,
        avatar: "https://ca.slack-edge.com/TQV251864-U0252H8HRB4-1f6097ffd12c-512",
        balance: 12000,
        defaultCurrency: "USD",
        email: "cqtin0903@gmail.com",
        phoneNumber: "0932095882",
        emailVerified: false,
        phoneNumberVerified: false,
        twoFactorVerified: false,
      }

      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
