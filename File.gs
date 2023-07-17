/**
 * Blob 形式から File を作成する
 * File は指定したフォルダに置かれる
 * 
 * return File
 */
function createFileFromBlob(folder, blob) {
  return folder.createFile(blob)
}

/**
 * ファイルからダウンロード URL を取得する
 * 
 * return String
 */
function getDownloadUrl(file) {
  return file.getDownloadUrl();
}