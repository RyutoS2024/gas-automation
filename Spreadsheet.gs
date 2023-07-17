const ROW_NUM = 1;
const TEAM_COUNT = 2;

/**
 * 「GAS_スケジュール表」を取得する
 * 
 * return Spreadsheet
 */
function getActiveSheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * sheetName に対応したのシートを取得する
 * 
 * return Sheet
 */
function getSheet(spreadsheet, sheetName) {
  return spreadsheet.getSheetByName(sheetName);
}

/**
 * 番組記録シートの名前を取得する
 * 
 * return String
 */
function getProgramName(spreadsheet) {
  return spreadsheet.getSheets()[0].getSheetName();
}

/**
 * Aチームシートの名前を取得する
 * 
 * return String
 */
function getATeamName(spreadsheet) {
  return spreadsheet.getSheets()[1].getSheetName();
}

/**
 * Bチームシートの名前を取得する
 * 
 * return String
 */
function getBTeamName(spreadsheet) {
  return spreadsheet.getSheets()[2].getSheetName();
}

/**
 * シートの最終列を取得する
 * 
 * return Integer
 */
function getLastColumn(sheet) {
  return sheet.getLastColumn();
}

/**
 * シートの最終行を取得する
 * 
 * return Integer
 */
function getLastRow(sheet) {
  return sheet.getLastRow();
}

/**
 * 番組記録シートを取得する
 * 
 * return sheet
 */
function getProgramSheet() {
  // 「GAS_スケジュール表」を取得する
  var activeSpreadsheet = getActiveSheet();
  // 番組記録という名前を取得する
  var programName = getProgramName(activeSpreadsheet);
  
  // 番組記録シート
  return getSheet(activeSpreadsheet, programName);
}

/**
 * 番組記録シートから最新のドキュメントURLを取得する
 * 
 * return String
 */
function getLatestDocumentUrl() {
  var programSheet = getProgramSheet();

  // 番組記録シートの最終行
  var lastRow = getLastRow(programSheet);
  // 番組記録シートの最終列
  var lastColumn = getLastColumn(programSheet);

  return programSheet.getRange(lastRow, lastColumn).getValue();
}

/**
 * チーム名とメンバー情報を取得する
 * メンバー情報：名前とそれに対応したslackId
 * 
 * return Object
 */
function getTeamNameAndMembersInfo(teamSheet, lastRow, lastColumn) {
  var team = new Object();
  team.name = teamSheet.getName();
  team.members = new Object();

  var membersList = getMembersNameAndSlackId(teamSheet, 2, 1, lastRow - 1, lastColumn);
  membersList.forEach(function(memberList) {
    team.members[memberList[0]] = memberList[1];
  })
    
  return team;
}

/**
 * チームメンバーの名前と slackId を取得する
 * TODO 番組記録シートが1列しかないときはエラーが起きて通知されない
 * 
 * return Range
 */
function getMembersNameAndSlackId(sheet, row, column, numRows, numColums) {
  return sheet.getRange(row, column, numRows, numColums).getValues();
}

/**
 * 番組記録シートに今日の日付と担当チーム名、台本URL、おたよりURLを登録する
 * 
 * return void
 */
function insertProgramInfo(programSheet, date, teamName, documentUrl, formUrl, lastRow, lastColumn) {
  var programLists = new Array(ROW_NUM);
  for(var rowNum = 0; rowNum < ROW_NUM; rowNum++ ) {
    programLists[rowNum] = new Array(lastColumn).fill(null);
  }
  programLists[0].forEach(function(element, index, programList) {
    if (index === PROGRAM.DATE.value) {
      programList[index] = date;
    }

    if (index === PROGRAM.TEAM_NAME.value) {
      programList[index] = teamName;
    }

    if (index === PROGRAM.DOCUMENT_URL.value) {
      programList[index] = documentUrl;
    }

    if (index === PROGRAM.FORM_URL.value) {
      programList[index] = formUrl;
    }
  });
  programSheet.getRange(lastRow + 1, 1, 1, lastColumn).setValues(programLists);
}

/**
 * 企画タイトルとゲストをシートの最新行に入力する
 * 
 * return void
 */
function insertTitleAndGuest(sheet, body) {
  var titleAndGuestList = [[body.getTables()[DOCUMENT.TITLE.value].getText(), body.getTables()[DOCUMENT.GUEST.value].getText()]];
  var lastRow = getLastRow(sheet);
  sheet.getRange(lastRow, PROGRAM.TITLE.value + 1, ROW_NUM, titleAndGuestList[0].length).setValues(titleAndGuestList);
}

/**
 * 行数が奇数の場合チームAとする
 * 
 * return boolean
 */
function isTeamA(rowCount) {
  return rowCount % TEAM_COUNT === 1;
}

/**
 * 行数が偶数の場合チームBとする
 * 
 * return boolean
 */
function isTeamB(rowCount) {
  return rowCount % TEAM_COUNT === 0;
}
