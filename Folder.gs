// 「ドキュメントアップ用フォルダの id
DOCUMENT_FOLDER_ID = "-"

// 「サムネイルアップ用フォルダ」の id 
SHUMBNAIL_FOLDER_ID = "-";

/**
 * id から EVERDIO フォルダを取得する
 * 
 * return Folder
 */
function getEveradioFolder() {
  return DriveApp.getFolderById(DOCUMENT_FOLDER_ID);
}

/**
 * ファイル(台本、おたよりフォーム)をアップロードする
 * 年月に応じてディレクトリを分ける
 * 
 * return void
 */
function uploadFileDividedByDates(year, month, file) {
  var everadioFolder = getEveradioFolder();
  var folders = everadioFolder.searchFolders(`title contains '${year}'`);
  if (folders.hasNext()) {
    var thisYearFolder = folders.next();
    var monthFolders = thisYearFolder.searchFolders(`title contains '${month}'`);
    // 今月のフォルダを探す
    if (monthFolders.hasNext()) {
      var thisMonthFolder = monthFolders.next();
      thisMonthFolder.addFile(file);
    } else {
      // なければ新しく今月のフォルダを作成しその中にドキュメントを追加する
      var nextMonthFolder = thisYearFolder.createFolder(month);
      nextMonthFolder.addFile(file);
    }
  } else {
    // なければ新しく今年のフォルダを作成しその中にドキュメントを追加する
    var nextYearFolder = everadioFolder.createFolder(year);
    var thisMonthFolder = nextYearFolder.createFolder(month);
    thisMonthFolder.addFile(file);
  }
}


/**
 * id からサムネイルアップ用フォルダを取得する
 * 
 * return Folder
 */
function getShumbnailFolder() {
  return DriveApp.getFolderById(SHUMBNAIL_FOLDER_ID);
}