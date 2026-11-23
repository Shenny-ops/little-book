# A Little Book of Memories — 耀隆 & 美辰

送給耀隆和美辰的歡送紀念網站。純 HTML／CSS／JavaScript，不需要安裝任何東西。

## 資料夾說明

```
index.html            網站本體（平常不用改）
css/style.css         樣式（顏色在最上面的 :root）
js/main.js            程式（平常不用改）
data/
  site.js             名字、封面、郵戳、結尾文案
  characters.js       兩位主角的介紹卡
  photos.js           四個回憶篇章的照片清單
  messages.js         39 則留言
  quotes.js           留言區最上方的精選語錄
images/
  characters/         yaolong.jpg、rachel.jpg
  chaos/              The Chaos 的照片（01.jpg ~ 08.jpg）
  little-things/      The Little Things（01.jpg ~ 08.jpg）
  adventures/         The Adventures（01.jpg 是大張主視覺）
  moments/            The Moments That Matter（01.jpg ~ 06.jpg）
  ending/             group.jpg（結尾大合照）
```

## 常見修改

- **換照片**：把照片放進對應資料夾，檔名和 `data/photos.js` 裡寫的一樣就會出現。還沒放的照片會顯示紙張色的佔位框。
- **照片說明**：改 `data/photos.js` 裡的 `caption`（照片上的一句話）。
- **新增留言**：在 `data/messages.js` 最後加一段 `{ "name": "名字", "text": "留言內容" },`。卡片樣式會依字數自動決定。
- **改精選語錄**：改 `data/quotes.js`。`size: "big"` 的那句會放在最中間、字最大。
- 改完直接雙擊 `index.html` 就能在電腦上預覽。

## 照片建議

- 長邊 1600px 以內，每張 300KB 左右，手機上會開得比較快。
- 人物照用直的（3:4）；The Adventures 第一張用橫的（16:9）效果最好。其他比例都可以，網站會自動裁切。

## 放上 GitHub Pages

1. 在 GitHub 建一個新的 repository（名字建議低調一點，例如 `little-book`）。
2. 把這個資料夾裡的所有檔案上傳（Add file → Upload files，整個拖進去）。
3. 到 Settings → Pages，Source 選 `Deploy from a branch`，Branch 選 `main`、資料夾選 `/ (root)`，按 Save。
4. 等一兩分鐘，網址會是 `https://你的帳號.github.io/little-book/`。

網站已加上 `noindex`，不會被 Google 搜尋到，但拿到網址的人都看得到。

## 改完網站，手機卻還是舊的？

`index.html` 裡每個 css、js 檔名後面都有 `?v=20261123c` 這樣的版本號。改完內容後把它換成新的（例如 `?v=20261124a`），瀏覽器就會重新抓最新版本，不會沿用舊的快取。
