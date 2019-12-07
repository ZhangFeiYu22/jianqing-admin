// 时间戳转换日期时间
export function toTime() {
  let date = new Date();
  let Y = date.getFullYear();
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
}

export function toDate(time) {
  let date = new Date(time * 1000);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
  return `${year}-${month}-${day}`;
}

// 过滤状态
export function filterStatus(value) {
  return value == 0 ? value = "正常" : value = "停用"
}

// 过滤性别
export function filterSex(value) {
  return value == 0 ? value = "男" : value = "女"
}
// 过滤意向度
export function filterIntentionality(value) {
  switch (value) {
    case "1":
      return "高";
    case "2":
      return "中";
    case "3":
      return "低";
    default:
      break;
  }
}

// 过滤跟踪状态 跟进状态(1:跟进中 2：已成交 3：待跟进 4：已到访 5：已失效)
export function filterCourseStatus(value) {
  switch (value) {
    case "1":
      return "跟进中";
    case "2":
      return "已成交";
    case "3":
      return "待跟进";
    case "4":
      return "已到访";
    case "5":
      return "已失效";
    default:
      break;
  }
}
// 过滤 类型
export function filterType(value) {
  switch (value) {
    case 0:
      return "班课";
    case 1:
      return "一对一";
    case '0':
      return "班课";
    case '1':
      return "一对一";
    case "班课":
      return 0;
    case "一对一":
      return 1;
    default:
      break;
  }
}
// 过滤 通知类型
export function filterNoticeType(value) {
  switch (value) {
    case 0:
      return "公告";
    case 1:
      return "员工通知";
    case 2:
      return "学生通知";
    case 3:
      return "教务通知";
    case 4:
      return "财务通知";
    case "公告":
      return 0;
    case "员工通知":
      return 1;
    case "学生通知":
      return 2;
    case "教务通知":
      return 3;
    case "财务通知":
      return 4;
    default:
      break;
  }
}

// 过滤教材状态(杂费状态)
export function filterBookStatus(value) {
  return value == 0 ? value = "正常" : value = "下架"
}

// 过滤课程类型
export function filterLessonStatus(value) {
  switch (value) {
    case 1:
      return "班课";
    case 0:
      return "一对一";
    default:
      break;
  }
}

// 过滤 订单状态
export function filterOrderStatus(value) {
  switch (value) {
    case 1:
      return "待付款";
    case 2:
      return "已付款";
    case 3:
      return "已接单/待接单";
    case 4:
      return "已发货";
    case 5:
      return "已完成";
    case 6:
      return "申请退货";
    case 7:
      return "退款中";
    case 8:
      return "不同意退货";
    case 9:
      return "退款到账";
    default:
      break;
  }
}
