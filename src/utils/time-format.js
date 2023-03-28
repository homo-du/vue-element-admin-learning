//处理对象是毫秒级
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    // "h+": (fmt.includes('A')||fmt.includes('a'))?this.getHours()%12:this.getHours(), //小时
    "h+": () => {
      let hour = this.getHours()
      if (fmt.includes('A') || fmt.includes('a')) {//12小时制
        hour = hour % 12
        hour = hour ? hour : 12
        return hour
      } else {
        return hour
      }
    },
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds(), //毫秒
    "A": this.getHours() < 12 ? 'AM' : 'PM',
    "a": this.getHours() < 12 ? 'am' : 'pm',
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

//输入是秒级
export function unix2hm(time) {
  let fmt_time = new Date(time * 1000).Format("yyyy-MM-dd hh:mm")
  return fmt_time
}

export function date2hmsFloat(date) {
  return date.Format("yyyy-MM-dd hh:mm:ss") + ".000000"
}

export function date2hour(date) {
  return date.Format("yyyy-MM-dd hh")
}

export function timestamp2datetime(timestamp) {
  return new Date(timestamp * 1000).Format("yyyy/MM/dd h:m:s A")
}