/**
 * formを作成する
 * 
 * return form
 */ 
function createForm(date) {
  const formTitle = '【おたより】' + date + '';
  const form = FormApp.create(formTitle);
  return form;
}

/**
 * フォームをファイル化する
 * Google Drive にフォームのままではアップできないため一度ファイルにする必要がある
 * 
 * return File
 */
function convertFormToFile(form) {
  return DriveApp.getFileById(form.getId());
}

/**
 * フォームの差出人情報収集設定を行う
 * 
 * return void
 */
function setCollectSenderInfo(form) {
  form.setRequireLogin(true);
  form.setCollectEmail(true);
}

/**
 * フォームのアウトラインを組み立てる
 * 
 * return void
 */
function buildFormOutline(form) {
  // 概要を追加する
  addOverview(form);

  // ラジオネーム欄を追加する
  addRadioName(form);

  // ゲストへの質問を追加する
  addQuestionToGuest(form);

  // その他番組やゲストへの意見・感想を追加する
  addOtherIdea(form);

  // Goodjob掲示板への投稿確認を追加する
  addIsGoodjobBbs(form);
}

/**
 * フォームの概要を追加する
 * 
 * return void
 */
function addOverview(form) {
  const formDescription = '今週のゲストは〇〇さん(所属部署・チーム)です！\n\n'
    + '- 質問例1\n'
    + '- 質問例2\n'
    + '- 質問例3\n\n'
    + 'など、〇〇さんにお聞きしたいことをドシドシお送りください！\n\n'
    + '皆さんからのおたより、お待ちしております！'
  form.setDescription(formDescription);
}

/**
 * フォームに「ラジオネーム」欄を追加する
 * 
 * return void
 */
function addRadioName(form) {
  form.addTextItem().setTitle('ラジオネーム').setRequired(true); 
}

/**
 * フォームに「ゲストへの質問」を追加する
 * 
 * return void
 */
function addQuestionToGuest(form) {
  form.addParagraphTextItem().setTitle('ゲスト〇〇さんへの質問')
}

/**
 * フォームに「その他番組やゲストへの意見・感想」を追加する
 * 
 * return void
 */
function addOtherIdea(form) {
  form.addParagraphTextItem().setTitle('その他番組やゲストへの意見・感想')
}

/**
 * フォームに「Goodjob投稿確認」を追加する
 * 
 * return void
 */
function addIsGoodjobBbs(form) {
  form.addMultipleChoiceItem().setRequired(true)
    .setTitle('おたよりが採用された場合は運営チームからGoodjob!をお送りします。#goodjob掲示板への投稿を希望しますか？')
    .setChoiceValues(['Goodjob掲示板への投稿を希望する(より多くのGoodjob!をもらえますが、匿名性が薄れます)',
     'Goodjob掲示板への投稿を希望しない(運営陣が個別にGoodjob!をお送りします)']);  
}

/**
 * フォームの URL を取得する
 * 
 * return String
 */
function getFormUrl(form) {
  return "https://docs.google.com/forms/d/"+ form.getId() +"/edit";
}