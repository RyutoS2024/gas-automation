# 社内有志活動自動化アプリ

社内活動の事務作業を自動化するプログラム

## 使用技術
- Google Document
- Google Spreadsheet
- Google Form
- GAS
- Salek

## 機能
- ドキュメント作成
- スケジュール管理
- フォーム作成
- slack通知

これらをプログラムで自動化する

## ドキュメント作成（Document）

作成されるドキュメントフォーマット

<img width="1395" alt="スクリーンショット 2023-07-17 14 56 17" src="https://github.com/RyutoShirakawa/gas-automation/assets/87289018/9d1b18a4-56a9-4e92-bcb3-3ed1bb4cfa3e">

各欄の説明

- サムネイル：slack通知とともに表示する画像
  - サムネイルがないと通知がエラーになる
- ①企画タイトル：タイトル名はslack通知とともに表示される
- ②番組概要：概要はslack通知とともに表示される
- ③ゲスト：ゲスト名はslack通知とともに表示される
- ④番組MC：MC名はslack通知とともに表示される  

## スケジュール管理（Spreadsheet）

番組を記録するシートフォーマット

<img width="1426" alt="スクリーンショット 2023-07-17 15 05 58" src="https://github.com/RyutoShirakawa/gas-automation/assets/87289018/688c610c-6f1d-49af-bc55-e14bcef416bd">

### 番組記録シート
各カラムの説明
反映されるタイミングはスケジューラーで設定する

- 日付：社内活動の実施日が水曜日のため水曜日の日付が自動で入力される
- 企画タイトル：ドキュメントの企画タイトル欄に入力された文字が反映される
- ゲスト：ドキュメントのゲスト欄に入力された文字が反映される
- 対応チーム：週ごとに対応チームが交代する
- おたよりURL：Formオブジェクトで作成したURLが反映される
- 台本URL：Documentオブジェクトで作成したURLが反映される

### Aチーム・Bチームシート
A列に氏名とB列にslackIdを入力している

## フォーム作成（Form）

<img width="845" alt="スクリーンショット 2023-07-17 15 18 19" src="https://github.com/RyutoShirakawa/gas-automation/assets/87289018/f3d0bdca-ccc5-44e2-a395-8bfe5ba19e01">

## slack通知
slackのスラッシュコマンド機能を使いコマンドでslackへ通知する

コマンドを実行すると、spreadsheetの台本URL列の最終行のドキュメントURLから「サムネイル」「番組概要」「ゲスト」「番組MC」の情報を取ってきてslackに通知する。
ドキュメントURLはGASトリガーで自動で更新される。
また、ドキュメントにサムネイル画像が添付されていない場合はコマンドが実行できない。
コマンドを実行する前はサムネイル画像が添付されているか確認すること
