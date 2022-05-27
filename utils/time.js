const moment = require("moment")

function getInterval(end, start) {
  var ms = moment(end,"YYYY/MM/DD HH:mm:ss").diff(moment(start,"YYYY/MM/DD HH:mm:ss"));
  var d = moment.duration(ms);
  var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
  return s;
}

function dateToDB(date) {
  return moment(date,"YYYY/MM/DD HH:mm:ss").format('YYYY-MM-DD[T]HH:mm:ss[Z]')
}

module.exports = {getInterval, dateToDB}

