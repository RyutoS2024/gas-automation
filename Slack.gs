const CHANNEL_POST_URL = ""; // #everadio運営
const BOARD_POST_URL = "";  // #掲示板
const POST_ANNOUNCEMENT = ""; // #everadio-dev

/**
 * ドキュメントとフォームを添付してチャンネルへ通知する
 * 
 * return void
 */
function notifyWithDocumentsAndForms() {

  // 今日の日付を取得する
  var today = new Date();
  var date = format(today);

  // 月/日の形に整形する
  var days = getFormatDays(date);

  // 〇〇年の形に整形する
  var year = getFormatYear(date);

  // 〇〇月の形に整形する
  var month = getFormatMonth(date);

  // ドキュメントを作成する
  var document = createDocument(days);
  buildOutline(document);

  // Drive にアップする
  var file = convertDocumentToFile(document);
  uploadFileDividedByDates(year, month, file);

  // ドキュメントの URL を取得する
  var documentUrl = getDocumentUrl(document);

  // おたよりフォームを作成する
  var form = createForm(days);
  setCollectSenderInfo(form);
  buildFormOutline(form);

  // Drive にアップする
  var formFile = convertDocumentToFile(form);
  uploadFileDividedByDates(year, month, formFile);

  // おたよりフォームの URL を取得する
  var formUrl = getFormUrl(form);

  // チームオブジェクトを取得する
  var teamObject = getTeamInfoAfterInserting(today, documentUrl, formUrl);

  var botName = '';
  var mentions = getMentions(teamObject);
  var message = composeMessageForTask(mentions, teamObject, documentUrl, formUrl);

  postToEveradioChannel(botName, message, CHANNEL_POST_URL);
}

/**
 * slack commands でチャンネルに通知する
 * 
 * return void
 */
function doPost() {
  notifyWithAnnouncement();
}


/**
 * 画像と宣伝文を付けてチャンネルへ通知する
 * 
 * return void
 */
function notifyWithAnnouncement() {
  // スプレッドシートになるURLからドキュメントを取得する
  var documentUrl = getLatestDocumentUrl();
  var documentBody = getDocument(documentUrl).getBody();
  var image = getFirstImage(documentBody);
  //Logger.log(image)
  var blob = convertImageToBlob(image);

  var folderForShumbnail = getShumbnailFolder();
  // File の権限は「リンクを知っているなら誰でも閲覧できる」とする
  var file = createFileFromBlob(folderForShumbnail, blob).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  var fileUrl = getDownloadUrl(file);

  var botName = '';
  var message = composeMessageForAnnouncement(documentBody);

  // 番組記録シートにタイトルとゲスト名を記入する
  var programSheet = getProgramSheet();
  insertTitleAndGuest(programSheet, documentBody)

  postToEverythigChannel(botName, message, fileUrl, POST_ANNOUNCEMENT);
}

/**
 * イベント情報を掲示板チャンネルへ通知する
 * 
 * return void
 */
function notifyWithEventInfo() {
  // スプレッドシートになるURLからドキュメントを取得する
  const documentUrl = getLatestDocumentUrl();
  const documentBody = getDocument(documentUrl).getBody();

  const botName = '';
  const message = composeMessageForEventInfo(documentBody);
  const fileUrl ='';

  postToEverythigChannel(botName, message, fileUrl, BOARD_POST_URL);
}

/**
 * 運営チャンネルへ投稿する
 * 
 * return void
 */
function postToEveradioChannel(botName, message, postUrl) {
  var payload = {
    'username': botName,
    'text': message
  }

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };

  UrlFetchApp.fetch(postUrl, options);
}

/**
 * 掲示板チャンネルへ投稿する
 * 
 * return void
 */
function postToEverythigChannel(botName, message, fileUrl, postUrl) {
  var payload = {
    "username": botName,
    "text": message,
    "attachments": [{
        "fields": [
            {
              // タイトルは付けないでおく
              "title": null
            }],
        "image_url": fileUrl
    }]
  };

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };

  UrlFetchApp.fetch(postUrl, options);
}


/**
 * チームのメンバー情報からslackIdを取得する
 * 
 * return String
 */
function getMentions(teamObjects) {
  var mentions = ""
  // 名前に対応した slackId を取得する
  for (var name in teamObjects.members) {
    mentions += teamObjects.members[name] + " ";
  }
  return mentions;
}


