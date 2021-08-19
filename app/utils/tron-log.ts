import { Tron } from "../services/reactotron/tron"

export default (shown: boolean) =>
  shown
    ? console.log
    : (...args) => {
        Tron.display({
          name: "CONSOLE.LOG",
          important: true,
          value: args,
          preview: args.length ? JSON.stringify(args) : args[0],
        })
      }
