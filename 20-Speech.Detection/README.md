# 20 - Speech Detection

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/ef/60/oGtppLtT_o.jpg)

## 主題

利用 SpeechRecognition 來做語音識別，將講話的內容轉換成文字，並顯示於網頁的元素中。

## 步驟

### 1. 啟用 Local Server

此練習需要使用 Local Server，除了安裝編輯器相關套件或是安裝 npm 套件 (browser-sync)，安裝完成後可以透過 `npm start` or `npm run start` 來啟動 Local Server (預設 port:3000)

### 2. contenteditable 屬性

這裡的 HTML 多了一個叫做 `contenteditable` 的屬性，這個屬性可以設成 `true/false` 告訴瀏覽器這個區塊是不是使用者可以編輯的，在 Chrome 只要加上這個屬性之後，原本的 div 就會變成像 `input` 區塊一樣，使用者可以在裡面隨意編輯。

```html
<div class="words" contenteditable="true"></div>
```

> 在原本的教學影片中，只在 `<div>` 裡面加上 `contenteditable` 這個屬性，而沒有指定 `true/false`，這點在 MDN contenteditable 的說明中指出，因為 contenteditable 是可列舉的屬性，因此建議還是要給它值。

> 參閱 [contenteditable](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/contenteditable)

### 3. 建立語音辨識物件 - speechRecognition

```js
/*----------  建立語音辨識物件  ----------*/
// 依據不同瀏覽器將全域環境中的 SpeechRecognition 做設定
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// 建立語音識別 SpeechRecognition 的物件
let recognition = new SpeechRecognition();

// 講話的當下即時辨識，不需等待
recognition.interimResults = true;

// 要辨識的語言 'en-US', 'zh-TW'
recognition.lang = 'en-US';
```

這個 語音辨識 API 提供一些參數可以讓我們設定：

- `lang`：可以到 [Web Speech API Demonstration](https://www.google.com/intl/en/chrome/demos/speech.html) 中透過檢視網頁原始碼看其他支援的語系。
- `interimResults`：設成 `true` 表示在講話的當下會即時辨識，不需要等待。預設為 `false`
- `continuous`：設成 `true` 表示除非使用者停止，否則會一直辨識，不會結束；`false` 的話則是講完一段話停頓時就會停止辨識。

> 參閱 [SpeechRecognition](https://developer.mozilla.org/zh-TW/docs/Web/API/SpeechRecognition)

### 4. 文字區塊

```js
/*----------  文字區塊  ----------*/
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);
```

### 5. 監聽並寫入語音資料

再來是建立當語音識別 result 事件，其事件目的是當取的語音識別的回傳結果，並將回傳結果轉換為真實文字，並將文字內容放入 p 文字元素中。

當文字為設定目標時，可以用取代 `String.prototype.replace()` 來轉換特定文字。此範例是以不雅文字內容做為目標，將髒字轉換為便便圖案 '💩'。

最後是當語音識別 recognition 物件的 `end` 結束事件中加入再開啟語音識別的開始 `recognition.start` 方法，並開啟語音識別方法。

這個 API 提供一些事件讓我們可以監聽：

- `start`：開始進行語音辨識時觸發。
- `end`：結束語音辨識時觸發。
- `result`：會包含語音辨識即時的資訊，在語音辨識的過程中會不斷被觸發。在 `result` 物件中的 `results` 屬性內，又包含辨識結果 `transcript`、信心程度 `confidence` 、是否為最後結果 `isFinal` 等屬性。

```js
/*----------  監聽並寫入語音資料  ----------*/
recognition.addEventListener('result', e => {
  // 回傳資料為 NodeList，需要用 map 來操作，所以要轉 Array 才能使用
  const transcript = Array.from(e.results)
    // 透過 map 取得陣列的第 1 筆資料
    .map(result => result[0])
    // 再取出第 1 筆的 transcript
    .map(result => result.transcript)
    // 用 join 將連結符號消掉
    .join('');

  // 將回傳的文字做過濾 (英文中不雅文字)，過濾包含以下文字，若有髒字則轉為便便圖案
  const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
  // 過濾完後，將回傳內容塞到 p 元素
  p.textContent = poopScript;

  // 如果回傳內容已經結束（一段話的結尾），就再建立一個新的 p 元素來放下一段文字
  // isFinal 是否為最後的辨識結果
  if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }
});

// 監聽如果語音識別結束，則在開啟一次新的識別
recognition.addEventListener('end', recognition.start);
// 開啟語音識別方法
recognition.start();
```
