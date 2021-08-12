import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { UserModel, UserSnapshot } from "../user/user"
import { UserApi } from "../../services/api/user-api"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: types.optional(UserModel, {}),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveUser: (userSnapshot: UserSnapshot) => {
      self.user = userSnapshot
    },
  }))
  .actions((self) => ({
    fetchUser: flow(function* (id: string) {
      const userApi = new UserApi(self.environment.api)
      const result = yield userApi.getUser(id)

      if (result.kind === "ok") {
        self.saveUser(result.user)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
