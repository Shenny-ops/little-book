// 回憶篇章的照片
// 每個篇章有固定的版型 layout：comic（漫畫分格）、polaroid（拍立得）、postcard（明信片）、slow（慢讀）
//
// 每張照片：
//   file：照片路徑（放在 images/ 對應的資料夾裡）
//   caption：照片上的一句話（可留空 ""）
//   bubble："bottom" 讓漫畫對話框放在照片下方（只有 The Chaos 會用到）
//   note：小字註記，例如日期、地點（可留空）
//   title / text：只有 slow（珍貴時刻篇）會用到，是這張照片的標題和回憶文字
//
// 想加照片：把照片放進資料夾，再複製一行 { file: ..., caption: ... } 改檔名就好。

window.CHAPTERS = [
  {
    id: "chaos",
    number: "1",
    label: "CHAPTER ONE",
    title: "The Chaos",
    subtitle: "歡樂混亂篇",
    layout: "comic",
    photos: [
      { file: "images/chaos/01.jpg", caption: "月亮在那邊！" },
      { file: "images/chaos/02.jpg", caption: "起飛！", bubble: "bottom" },
      { file: "images/chaos/03.jpg", caption: "被封鎖的那天，外面送來了麥當勞" },
      { file: "images/chaos/04.jpg", caption: "鼓手上線" },
      { file: "images/chaos/05.jpg", caption: "" },
      { file: "images/chaos/06.jpg", caption: "新朋友" },
      { file: "images/chaos/07.jpg", caption: "" }
    ]
  },
  {
    id: "little-things",
    number: "2",
    label: "CHAPTER TWO",
    title: "The Little Things",
    subtitle: "日常點滴篇",
    layout: "polaroid",
    aside: "一起吃飯、聊天、\n沒什麼特別的晚上——\n其實最特別。",
    photos: [
      { file: "images/little-things/01.jpg", caption: "安慰下午茶" },
      { file: "images/little-things/02.jpg", caption: "吃鍋" },
      { file: "images/little-things/03.jpg", caption: "" },
      { file: "images/little-things/04.jpg", caption: "" },
      { file: "images/little-things/05.jpg", caption: "" },
      { file: "images/little-things/06.jpg", caption: "" },
      { file: "images/little-things/07.jpg", caption: "" },
      { file: "images/little-things/08.jpg", caption: "" },
      { file: "images/little-things/09.jpg", caption: "" },
      { file: "images/little-things/10.jpg", caption: "" },
      { file: "images/little-things/11.jpg", caption: "" },
      { file: "images/little-things/12.jpg", caption: "" }
    ]
  },
  {
    id: "adventures",
    number: "3",
    label: "CHAPTER THREE",
    title: "The Adventures",
    subtitle: "冒險回憶篇",
    layout: "postcard",
    photos: [
      { file: "images/adventures/01.jpg", caption: "基隆", note: "外木山見了" },
      { file: "images/adventures/02.jpg", caption: "", note: "" },
      { file: "images/adventures/03.jpg", caption: "", note: "" },
      { file: "images/adventures/04.jpg", caption: "夜市", note: "" },
      { file: "images/adventures/05.jpg", caption: "", note: "" },
      { file: "images/adventures/06.jpg", caption: "", note: "" },
      { file: "images/adventures/07.jpg", caption: "", note: "" },
      { file: "images/adventures/08.jpg", caption: "", note: "" }
    ]
  },
  {
    id: "moments",
    number: "4",
    label: "CHAPTER FOUR",
    title: "The Moments That Matter",
    subtitle: "珍貴時刻篇",
    layout: "slow",
    photos: [
      { file: "images/moments/01.jpg", note: "", title: "畢業的那一天", text: "替你們開心SKE畢業了！\n—— 王馥微" },
      { file: "images/moments/02.jpg", note: "", title: "並肩同行", text: "感謝這段並肩同行的日子。\n—— 童若峻 庭嘉" },
      { file: "images/moments/07.jpg", note: "", title: "總是敞開的家", text: "你們也非常慷慨好客，經常辦交往招待不同的人。\n—— 庭瑋&怡安" },
      { file: "images/moments/03.jpg", note: "", title: "", text: "不管你們到那裡，都會像和煦的陽光照亮並溫暖身邊的所有人。\n—— Jack & Claire" },
      { file: "images/moments/04.jpg", note: "", title: "", text: "我會很想念你，但我知道我們會繼續做好朋友。\n—— Monica & Michael" },
      { file: "images/moments/05.jpg", note: "", title: "在東區的六年", text: "很有榮幸陪伴你們在新竹東區六年時光。\n—— 黃紫鵑" },
      { file: "images/moments/06.jpg", note: "", title: "下一站：基隆", text: "再次回鍋基隆，製造新回憶。\n—— 江佳興" }
    ]
  }
];
