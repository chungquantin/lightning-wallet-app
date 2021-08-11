import { TransactionModel } from "./Transaction"

test("can be created", () => {
  const instance = TransactionModel.create({
    id: "1",
    amount: 100,
    currency: "USD",
    description: "Hello World",
    type: "IN",
    from: "cqtin0903@gmail.com",
    to: "tin@neutronpay.com",
    status: "pending",
  })

  expect(instance).toBeTruthy()
})
