import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { UserModel, UserSnapshot } from "../user/user"
import { UserApi } from "../../services/api/user-api"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: types.optional(UserModel, {}),
    contacts: types.optional(types.array(UserModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveUser: (userSnapshot: UserSnapshot) => {
      self.user = userSnapshot
    },
    saveUserContacts: (userContactsSnapshot: UserSnapshot[]) => {
      self.contacts.replace(userContactsSnapshot)
    },
  }))
  .views((self) => ({
    getContactsByNameAndEmail: (text: string) =>
      self.contacts.filter((contact) => {
        const fullName = `${contact.firstName} ${contact.lastName}`
        return (
          fullName.toLowerCase().includes(text.toLowerCase()) ||
          contact.email.toLowerCase().includes(text)
        )
      }),
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
    fetchUserContacts: flow(function* (id: string) {
      const userApi = new UserApi(self.environment.api)
      const result = yield userApi.getUserContacts(id)

      if (result.kind === "ok") {
        self.saveUserContacts(result.userContacts)
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
