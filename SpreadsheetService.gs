/**
 * 番組情報を登録したあとにチーム情報を取得する
 * チーム情報：チーム名, 担当メンバーとslackId
 * 
 * return Object
 */
function getTeamInfoAfterInserting(date, documentUrl, formUrl) {
  // 「GAS_スケジュール表」を取得する
  var activeSpreadsheet = getActiveSheet();
  
  var programSheet = getProgramSheet();
  // 番組記録シートの最終行
  var lastRow = getLastRow(programSheet);
  // 番組記録シートの最終列
  var lastColumn = getLastColumn(programSheet);

  // 担当がAチームの場合
  if (isTeamA(lastRow)) {
    // Aチームの名前を取得する
    var teamNameA = getATeamName(activeSpreadsheet);
    // 番組記録シートに「今日の日付」と「Aチーム名」、「ドキュメントURL」を登録する
    insertProgramInfo(programSheet, date, teamNameA, documentUrl, formUrl, lastRow, lastColumn);
    // Aチームシート
    var sheetA = getSheet(activeSpreadsheet, teamNameA);
    // Aチーム名と所属するメンバー情報（名前とslackId）を取得する
    return getTeamNameAndMembersInfo(sheetA, lastRow, lastColumn);
  }

  // 担当がBチームの場合
  if (isTeamB(lastRow)) {
    // Bチームの名前を取得する
    var teamNameB = getBTeamName(activeSpreadsheet);
    // 番組記録シートに「今日の日付」と「Bチーム名」、「ドキュメントURL」を登録する
    insertProgramInfo(programSheet, date, teamNameB, documentUrl, formUrl, lastRow, lastColumn);
    // Bチームシート
    var sheetB = getSheet(activeSpreadsheet, teamNameB);
    // Bチーム名と所属するメンバー情報（名前とslackId）を取得する
    return getTeamNameAndMembersInfo(sheetB, lastRow, lastColumn);
  }

  return null;
}


