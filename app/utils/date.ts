import moment from "moment"
export const formatUnixDate = (unix) => moment.unix(unix).format("DD MMM, YYYY")

export const getUnixNow = () => moment().unix()
export const getUnixMinLater = (time: number) => moment(time).add(5, "minutes").unix()
