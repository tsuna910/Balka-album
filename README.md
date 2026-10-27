# バルカ・アルバム（デモ版）

プレゼン用の仮の旅行アルバムです。HTML・CSS・JavaScriptだけの静的サイトで、ビルドは不要です。

## 手元で見る

`index.html` をダブルクリックしてブラウザで開きます。「Xで共有」「URLをコピー」もエラーにはなりませんが、Xのカード（画像つき表示）は公開URLでないと出ません。

## 公開URLに置き換える場所

公開後、`https://（公開URL）/` を実際のURL（例：`https://ユーザー名.github.io/リポジトリ名/`）に置き換えます。

| ファイル | 行 | 置き換える内容 |
| --- | --- | --- |
| index.html | `og:url` | `https://（公開URL）/` |
| index.html | `og:image` | `https://（公開URL）/og-image.jpg` |
| index.html | `twitter:image` | `https://（公開URL）/og-image.jpg` |
| qr.png | — | `make_qr.py` に公開URLを渡して作り直す |

app.js は表示中のURLを自動で使うので、置き換えは不要です。

## 公開手順（GitHub Pages）

1. GitHubにログインし、右上の「+」→「New repository」で新しいリポジトリを作る（Public）。
2. 「uploading an existing file」から、このフォルダの中身をすべてドラッグして「Commit changes」。`images/` フォルダごと入れる。
3. リポジトリの Settings → Pages で、Source を「Deploy from a branch」、Branch を `main` / `(root)` にして Save。
4. 1〜2分後、Pages の画面に公開URL（`https://ユーザー名.github.io/リポジトリ名/`）が出る。
5. 上の表のとおり `index.html` の3か所を公開URLに書き換えて、もう一度アップロードする。
6. QRコードを作る（Pythonが必要）。

   ```bash
   pip install "qrcode[pil]"
   python make_qr.py https://ユーザー名.github.io/リポジトリ名/
   ```

   できた `qr.png` をスライドに貼る。

## 動作確認

1. スマホ（iPhoneのSafari、AndroidのChrome）で公開URLを開き、3秒以内に表示されるか見る。
2. 横スクロールが出ないこと、すべての文言が出ていることを確認する。
3. 「URLをコピー」を押して、ボタンが2秒間「コピーしました」に変わるか見る。
4. 「Xで共有」を押して、投稿文とURLが入った投稿画面が開くか見る。
5. 1回テスト投稿して、画像つきのカードが出るか見る。出ないときは、URLの末尾に `?v=2` を付けて試す（Xはカードを一度読むと保存するため）。
6. スライドを映した画面のQRを実際のスマホで読んで、アルバムが開くか確かめる。

## 写真の差し替え

`images/` の画像は仮です。同じファイル名のJPG（横長3:2、長辺1600px以内、500KB以下）で上書きすれば、コードを直さずに反映されます。`og-image.jpg` は1200×630pxです。

使ってよい写真は、自分で撮ったもの、AIで生成したもの、利用の許諾があるものだけです。VIVANTの映像や画像は使いません。

画像ファイルが無くても、グラデーションの背景が表示されてレイアウトは崩れません。
