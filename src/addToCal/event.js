import moment from "moment";

const startDatetime = new Date("2021-03-03T09:00");
const endDatetime = new Date("2021-03-03T11:00");
const duration = startDatetime.getHours() - endDatetime.getHours();
export const event = {
  title: "Super Fun Event",
  description: "Example Event description.",
  location: "Georgia - Sakartvelo",
  duration,
  endDatetime: moment(endDatetime).format("YYYYMMDDTHHmmssZ"),
  startDatetime: moment(startDatetime).format("YYYYMMDDTHHmmssZ")
};
