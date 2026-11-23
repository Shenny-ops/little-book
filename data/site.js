// 網站文字設定：名字、封面、結尾文案都在這裡改。
// 換行請用 \n

window.SITE = {
  title: "A Little Book of Memories",

  // 兩位主角的名字（封面、信紙、結尾會用到）
  names: "耀隆 & 美辰",
  namesEn: "Daniel & Rachel",
  initials: "D·R",

  // 封面
  openingLine: "",   // 信封上方的一句話，留空就不顯示
  postmark: { city: "新竹", cityEn: "HSINCHU", date: "2027.11" },

  // 信紙滑出後的內容（{count} 會自動換成留言數量）
  letter: "這是新竹東區的大家\n一起寫給你們的一本小書。\n\n裡面有照片、有回憶，\n還有大家想對你們說的話。",

  // 結尾
  ending: {
    lead: "這不是故事的結束，\n而是新的篇章開始。",
    body: "無論未來你們走到哪裡，\n這裡永遠有一群人，\n會記得你們、想念你們，\n也永遠為你們加油。",
    note: "基隆不遠，我們會去看你們的。",
    final: "To Be Continued...",
    photo: { file: "images/ending/group.jpg", caption: "新竹東區的大家" }
  }
};
