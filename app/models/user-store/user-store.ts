<<<<<<< HEAD
import { flow, Instance, isAlive, SnapshotOut, types } from "mobx-state-tree"
=======
import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
>>>>>>> 38b5999a9bd343d5601b34d217091748d6885637
import { withEnvironment } from "../extensions/with-environment"
import { User, UserModel, UserSnapshot } from "../user/user"
import { UserApi } from "../../services/api/user-api"
import _ from "underscore"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: types.optional(UserModel, {}),
    contacts: types.optional(types.array(UserModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveUser: (userSnapshot: UserSnapshot) => {
<<<<<<< HEAD
      if (isAlive(self.contacts)) {
        self.user = userSnapshot
      }
    },
    saveUserContacts: (userContactsSnapshot: UserSnapshot[]) => {
      if (isAlive(self.contacts)) {
        self.contacts.replace(userContactsSnapshot)
      }
=======
      self.user = userSnapshot
    },
    saveUserContacts: (userContactsSnapshot: UserSnapshot[]) => {
      self.contacts.replace(userContactsSnapshot)
>>>>>>> 38b5999a9bd343d5601b34d217091748d6885637
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
    getGroupedContactListByNameAndEmail: (text: string) => {
      const contactList = self.contacts.filter((contact) => {
        const fullName = `${contact.firstName} ${contact.lastName}`
        return (
          fullName.toLowerCase().includes(text.toLowerCase()) ||
          contact.email.toLowerCase().includes(text)
        )
      })
      const contactsGroupByAlphabet = _.groupBy(contactList, (item: User) => {
        return item.firstName[0].toUpperCase()
      })
      return Object.keys(contactsGroupByAlphabet).map((alphabet) => {
        return {
          letter: alphabet,
          count: contactsGroupByAlphabet[alphabet].length,
          data: contactsGroupByAlphabet[alphabet],
        }
      })
    },
    get groupContactsByAlphabet(): {
      letter: string
      data: User[]
    }[] {
      const contactsGroupByAlphabet = _.groupBy(self.contacts, (item: User) => {
        return item.firstName[0].toUpperCase()
      })
      const contactList: {
        letter: string
        data: User[]
      }[] = Object.keys(contactsGroupByAlphabet).map((alphabet) => {
        return {
          letter: alphabet,
          count: contactsGroupByAlphabet[alphabet].length,
          data: contactsGroupByAlphabet[alphabet],
        }
      })
      return contactList
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
