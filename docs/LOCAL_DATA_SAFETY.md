# Local data safety

PWAはブラウザ内の localStorage に編集データを保持します。

そのため、GitHub上の正本DBと、ブラウザ内のローカル編集データは別物です。

## 用語

- 正本DB: `data/database.json`
- ローカル編集: ブラウザ内 localStorage
- JSON保存: ローカル編集をPCにダウンロードする操作

## 必要な画面機能

- 正本DBを再読込
- ローカル編集を破棄
- 現在表示中のデータが正本DB由来かローカル編集由来かを表示
- JSON保存時に、GitHubへ直接反映されないことを明示

## 固定事項

v5.9.6_LOCK のPDFレイアウトは変更しない。
