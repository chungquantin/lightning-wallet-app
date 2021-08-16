import moment from "moment"
export const formatUnixDate = (unix) => moment.unix(unix).format("DD MMM, YYYY")
export const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
export const getUnixNow = () => moment().unix()
export const getUnixMinLater = (time: number) =>
  moment()
    .add(time, time === 1 ? "minute" : "minutes")
    .unix()
export const getUnixMinAgo = (time: number) =>
  moment()
    .subtract(time, time === 1 ? "minute" : "minutes")
    .unix()

export const getUnixMonthLater = (time: number) =>
  moment()
    .add(time, time === 1 ? "month" : "months")
    .unix()
export const getUnixMonthAgo = (time: number) =>
  moment()
    .subtract(time, time === 1 ? "month" : "months")
    .unix()

export const getMonthFromUnix = (time: number) => moment.unix(time).month()
export const getDayFromUnix = (time: number) => moment.unix(time).day()
export const getYearFromUnix = (time: number) => moment.unix(time).year()
