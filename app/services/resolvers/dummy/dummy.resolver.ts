import request from "graphql-request"

export class DummyApi {
  async networkErrorRequest() {
    try {
      console.log("NetworkErrorRequest")
      const res = await request("http://localhost:5060", "")
      return res
    } catch (error) {
      console.tron.error(error.message, "networkErrorRequest")
      throw error
    }
  }
}
