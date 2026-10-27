"""アルバムの公開URLから qr.png（1000×1000px、白地に黒）を作るスクリプト。

使い方:
    pip install "qrcode[pil]"
    python make_qr.py https://ユーザー名.github.io/リポジトリ名/
"""
import sys

import qrcode
from PIL import Image

SIZE = 1000  # 出力サイズ（px）
BORDER = 4   # 周囲の白い余白（マス数）


def main():
    if len(sys.argv) != 2:
        print("使い方: python make_qr.py <アルバムの公開URL>")
        sys.exit(1)

    url = sys.argv[1].strip()
    if not url.startswith("https://"):
        print("URLは https:// から始まる公開URLを指定してください。")
        sys.exit(1)

    qr = qrcode.QRCode(
        error_correction=qrcode.constants.ERROR_CORRECT_M,  # 誤り訂正レベルM
        box_size=10,
        border=BORDER,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    # NEAREST で拡大・縮小して、マスの境目をくっきり保つ
    img = img.resize((SIZE, SIZE), Image.NEAREST)
    img.save("qr.png")
    print(f"qr.png を作成しました（{SIZE}×{SIZE}px）: {url}")


if __name__ == "__main__":
    main()
