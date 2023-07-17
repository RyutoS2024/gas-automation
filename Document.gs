/**
 * ドキュメントを作成する
 * 
 * return Document
 */
function createDocument(date) {
  var document = DocumentApp.create(date + '_台本');
  return document;
}

/**
 * ドキュメントをファイル化する
 * Google Drive にドキュメントのままではアップできないため一度ファイルにする必要がある
 * 
 * return File
 */
function convertDocumentToFile(document) {
  return DriveApp.getFileById(document.getId());
}

/**
 * ドキュメントのアウトラインを組み立てる
 * 
 * return void
 */
function buildOutline(document) {
  var body = document.getBody();
  body.insertParagraph(0,'サムネイル（下に添付ください）').setHeading(DocumentApp.ParagraphHeading.HEADING1);

  // slack通知用の表を追加する
  addTableForSlack(body);

  // 番組表を追加する
  addTableForProgram(body);

  // 担当表を追加する
  addTableForRole(body);

  // 告知用メッセージの例を追加する
  addExampleMessageForAnnouncement(body);
}

/**
 * ドキュメントの URL を取得する
 * 
 * return String
 */
function getDocumentUrl(document) {
  return "https://docs.google.com/document/d/" + document.getId() + "/edit";
}

/**
 * Slack 通知用の表を追加する
 * 通知用の情報：①企画タイトル, ②番組概要, ③ゲスト, ④番組MC
 * 
 * return void
 */
function addTableForSlack(body) {
  body.appendParagraph('①企画タイトル').setHeading(DocumentApp.ParagraphHeading.HEADING1).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendTable([['']]);

  body.appendParagraph('②番組概要').setHeading(DocumentApp.ParagraphHeading.HEADING1).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendTable([['']]);

  body.appendParagraph('③ゲスト').setHeading(DocumentApp.ParagraphHeading.HEADING1).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendTable([['']]);

  body.appendParagraph('④番組MC').setHeading(DocumentApp.ParagraphHeading.HEADING1).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendTable([['']]);
}

/**
 * 番組表を追加する
 * 番組情報：オープニングソング, オープニングトーク, メインコーナー, エンディングソング, エンディングトーク, イベント告知
 * 
 * return void
 */
function addTableForProgram(body) {
  body.appendParagraph('番組進行').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  var timeTable = body.appendTable([
    ['', ''],
    ['', ''],
    ['', ''],
    ['', ''],
    ['', '']
  ]);
  // セルの幅を設定する
  timeTable.getCell(0, 0).setWidth(140);

  // 1行1列目
  timeTable.getCell(0, 0).insertParagraph(0, 'オープニングソング');

  // 2行1列目
  timeTable.getCell(1, 0).insertParagraph(0, '12:30~12:35');
  timeTable.getCell(1, 0).insertParagraph(1, 'オープニングトーク');

  // 3行1列目
  timeTable.getCell(2, 0).insertParagraph(0, '12:35~12:50');
  timeTable.getCell(2, 0).insertParagraph(1, 'メインコーナー');

  // 4行1列目
  timeTable.getCell(3, 0).insertParagraph(0, 'エンディングソング');

  // 5行1列目
  timeTable.getCell(4, 0).insertParagraph(0, 'エンディングトーク');
  timeTable.getCell(4, 0).insertParagraph(1, 'イベント告知');
}

/**
 * 担当表を追加する
 * 
 * return void
 */
function addTableForRole(body) {
  body.appendParagraph('制作担当分け').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  var roleTable = body.appendTable([
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
  ]);
  // セルの幅を設定する
  roleTable.getCell(0, 0).setWidth(110);

  // 1行目
  roleTable.getCell(0, 0).insertParagraph(0, '台本作成');
  roleTable.getCell(0, 2).insertParagraph(0, 'おたより');

  // 2行目
  roleTable.getCell(1, 0).insertParagraph(0, '');
  roleTable.getCell(1, 2).insertParagraph(0, 'サムネイル');

  // 3行目
  roleTable.getCell(2, 0).insertParagraph(0, '音響');
  roleTable.getCell(2, 2).insertParagraph(0, 'ゲストアポ');

  // 4行目
  roleTable.getCell(3, 0).insertParagraph(0, 'イベント情報');
  roleTable.getCell(3, 2).insertParagraph(0, 'その他①');

  // 5行目
  roleTable.getCell(4, 0).insertParagraph(0, 'その他②');
  roleTable.getCell(4, 2).insertParagraph(0, 'その他③');
}

/**
 * 例として告知メッセージを追加する
 * 
 * return void
 */
function addExampleMessageForAnnouncement(body) {
  body.appendParagraph('告知メッセージについて').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('こんな感じで通知されます。').setHeading(DocumentApp.ParagraphHeading.HEADING2);

  var message = "本日の は「①企画タイトル」！" + "\n" +
    "「②番組概要（紹介）」" + "\n" +
    "ゲストは「③ゲスト」、 MCは「④番組MC」で放送予定" + "\n" +
    "このあと12:30 〜 ON AIR！" + "\n" +
    "ご視聴は以下のリンクから" + "\n" +
    "zoom URL";

  body.appendParagraph(message);
}

/**
 * URL からドキュメントを取得する
 * 
 * Document
 */
function getDocument(documentUrl) {
  return DocumentApp.openByUrl(documentUrl);
}

/**
 * 最初の画像を本文から取得する
 * 
 * InlineImage[]
 */
function getFirstImage(body) {
  //TODO 画像がない場合の null チェックが必要
  return body.getImages()[0];
}

/**
 * 画像をBlob形式に変更する
 * 
 * Blob
 */
function convertImageToBlob(image) {
  Logger.log(image)
  // if (image == null) {
  //   Logger.log("画像がありません")
  // };
  //最初の1つしかBlob形式化しない
  blob = image.getBlob();
  // 名前の設定が必要なためここでは「サムネイル」とする
  blob.setName("サムネイル");
  return blob;
}

