/**
 * 放送回用 Enum
 */
var PROGRAM = Object.freeze({
  DATE : {
      value : 0,
      string : 'date'
  },
  TITLE : {
      value : 1,
      string : 'title'
  },
  GUEST : {
      value : 2,
      string : 'guest'
  },
  TEAM_NAME : {
    value : 3,
    string : 'teamName'
  },
  FORM_URL : {
    value : 4,
    string : 'formUrl'
  },
  DOCUMENT_URL : {
    value : 5,
    string : 'documentUrl'
  }
});

/**
 * ドキュメント用 Enum
 */
var DOCUMENT = Object.freeze({
  TITLE : {
    value : 0,
    string : 'title'
  },
  OVERVIEW : {
    value : 1,
    string : 'overview'
  },
  GUEST : {
    value : 2,
    string : 'guest'
  },
  PROGRAM_MC : {
    value : 3,
    string : 'programMC'
  },
  SCHEDULE : {
    value : 4,
    string : 'schedule'
  }
});

/**
 * ドキュメント 番組進行テーブル用 Enum
 */
var SCHEDULE_TABLE = Object.freeze({
  EVENT_INFO : {
    rowIndex : 4,
    cellIndex : 1
  }
})