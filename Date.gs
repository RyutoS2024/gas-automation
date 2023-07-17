/**
 * 日付を yyyy/MM/dd に整形する
 * 
 * return Date
 */
function format(date) {
  var sevenDaysLater = updateSevenDays(date);

  return Utilities.formatDate(sevenDaysLater, "JST","yyyy/MM/dd");
}

/**
 * 日付を1週間後に更新する
 * 
 * return Date
 */
function updateSevenDays(date) {
  date.setDate(date.getDate() + 7);
  return date;
}

/**
 * 〇〇年の形で取得する
 * 
 * return String
 */
function getFormatYear(date) {
  var year = date.substring(0, date.indexOf('/'));
  return year + "年";
}

/**
 * 〇〇月の形で取得する
 * 
 * return String
 */
function getFormatMonth(date) {
  var month = date.substring(5, 7);
  return month + "月";
}

/**
 * 〇〇月/〇〇日の形で取得する
 * 
 * return String
 */
function getFormatDays(date) {
  var days = date.substring(date.indexOf('/') + 1);
  return days;
}
