import moment from "moment";


export const timestampToDateString = (num) => {
  const date = new Date(num * 1000);
  return moment(date).format('YYYY-MM-DD hh:mm:ss')
}