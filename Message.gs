/**
 * 次の担当を通知するメッセージを作成する
 * 
 * return String
 */
function composeMessageForTask(mentions, teamObject, documentUrl, formUrl) {
  var message = mentions + "\n" +
  "次週の担当は" + teamObject.name + "のみなさんです。" + "\n" +
  "台本URL：" + documentUrl + "\n" +
  "おたよりURL：" + formUrl + "\n" +
  "よろしくお願いします。";

  return message;
}

/**
 * 放送を告知するメッセージを作成する
 * 
 * return String
 */
function composeMessageForAnnouncement(body) {
  var message = "@ here\n" +
  "本日の は『" + body.getTables()[DOCUMENT.TITLE.value].getText() + "』！\n" +
  "\n" +
  "「" + body.getTables()[DOCUMENT.OVERVIEW.value].getText() + "」\n" +
  "\n" +
  "ゲストは「" + body.getTables()[DOCUMENT.GUEST.value].getText() + "」、MCは「" + body.getTables()[DOCUMENT.PROGRAM_MC.value].getText() + "」で放送予定\n" +
  "このあと12:30 〜 ON AIR！\n" +
  "ご視聴は以下のリンクから\n" +
  ""; 

  return message;
}

/**
 * 放送終了後(13時)にイベント情報を何でも掲示板に告知する
 * 
 * return String
 */
function composeMessageForEventInfo(body) {

  const eventInfo = body.getTables()[DOCUMENT.SCHEDULE.value].getCell([SCHEDULE_TABLE.EVENT_INFO.rowIndex],[SCHEDULE_TABLE.EVENT_INFO.cellIndex]).getText();
  
  const message =
  "本日もお聴きくださりありがとうございました！\n" +
  "エンディングで紹介したイベント告知は以下のとおりです。\n" +
  "\n" +
  eventInfo + "\n" +
  "\n" +
  "それでは午後も頑張っていきましょう！！"

  return message;
}