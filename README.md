# テスト自動化の練習サイトの実装デモ
[Hotel Planisphere](https://hotel-example-site.takeyaqa.dev/)

## 環境
- node v22.17.0
- playwright v1.54.2

## プロジェクト構成
<pre>
.
├── pages/      # ページオブジェクト
│   ├── header.page.ts  # ヘッダー共通
│   ├── home.page.ts    # トップページ
│   ├── login.page.ts   # ログインページ
│   ├── mypage.page.ts  # マイページ
│   └── signup.page.ts  # 会員登録ページ
├── SRC/
│   └── dev.txt     # GitHub Actionsトリガー用（開発中のファイルを想定）
└── tests/
    ├── config/     # 設定ファイル
    │   └── specConfig.ts   # ベースURL
    ├── spec/       # テストケース
    │   ├── home.spec.ts
    │   ├── login.spec.ts
    │   ├── mypage.spec.ts
    │   └── signup.spec.ts
    └── utils/      # ユーティリティ
        ├── pageUtils.ts    # ページ操作共通
        └── screenshotUtils.ts  # スクリーンショット操作共通
</pre>

## テストケース

### home.spec.ts
- サイトタイトルの確認
- タブ表示の確認
- ページ見出しの確認

### login.spec.js
- ログイン画面への遷移の確認
- ログイン画面表示の確認
- ログインできることの確認

### mypage.spec.ts
- マイページ画面への遷移の確認
- マイページ画面のラベル表示の確認
- マイページ画面の登録情報表示の確認
- マイページ画面のアイコン設定ボタンの確認
- マイページ画面の退会するボタンの確認（キャンセル）
- マイページ画面の退会するボタンの確認（退会実行）

### signup.spec.ts
- 会員登録画面への遷移の確認
- 会員登録画面表示の確認
- 会員登録できることの確認

## Actions対象
- SRC/ に対するPull Request