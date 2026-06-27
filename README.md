# PL Commentary Bank

パワーリフティング大会のYouTube解説資料を、選手ごとの出場歴データから作成するためのPWAです。

## 目的

- 正本データ：`data/database.json`
- 編集画面：ブラウザで動くPWA
- 確認・印刷用：A4横PDF / CSV / 将来のExcel出力

## 固定レイアウト

A4横PDFの雛形は `v5.9.6_LOCK` として固定します。

- ヘッダーは `A.Lot 1  氏名 フリガナ` 形式
- フリガナは氏名のすぐ右隣
- 左カラムは「読み上げ一言」「前々回→前回」「推移コメント」
- 出場歴は大会日・大会正式名称優先
- 記録/確認元は巻末に集約
- レイアウト変更は事前確認なしに行わない

## 起動

```bash
npm run start
```

ブラウザで `http://localhost:4173` を開きます。

## 検証

```bash
npm run validate
```

## 運用

1. PWA上で選手を選ぶ
2. 選手情報・出場歴を編集する
3. JSON保存で正本データを保存する
4. `data/database.json` に反映する
5. PDF印刷でA4横資料を出力する

Codexに依頼する場合は `docs/CODEX_PROMPT.md` を基準にしてください。
