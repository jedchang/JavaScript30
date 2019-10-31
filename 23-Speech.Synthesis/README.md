# 23 - Speech Synthesis

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/b5/f7/jPMgh3FN_o.jpg)

## 主題

使用 SpeechSynthesisUtterance 及 speechSynthesis，將文字轉語音。

## 步驟

### 1. 取得頁面元素、Web Speech API

首先要有兩個 Web Speech API 的組件，第一個為 `SpeechSynthesis` (語音合成)，主要控制合成語音的功能，包含播放、暫停等。

第二個為 `SpeechSynthesisUtterance` (語音合成話語)，主要控制合成語音的請求，在要求中包含語音的內容和資訊。

接下來建立語音的請求 `new SpeechSynthesisUtterance()`，並輸入語音合成的發音內容。

```js
// 建立語音的請求 new SpeechSynthesisUtterance()
const msg = new SpeechSynthesisUtterance();
// 語系清單空陣列
let voices = [];
// 語系下拉選單
const voicesDropdown = document.querySelector('[name="voice"]');
// 一併選取滑動、輸入框
const options = document.querySelectorAll('[type="range"], [name="text"]');

// 播放、停止按鈕
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// 設定發音的文字內容
msg.text = document.querySelector('[name="text"]').value;
```

### 2. 設定語音播放語系選單

監聽 `SpeechSynthesis` (語音合成) 的 `voiceschanged` 事件，取得語系相關資料。
當 `SpeechSynthesisVoice` 清單改變時，就會觸發此事件。

```js
// 語系選單
function populateVoices() {
  voices = this.getVoices();

  // 將語系放進下拉選單
  // 使用 filter 篩選出包含 zh、en 的語系
  // 篩選後的 array 透過 map 把資料組成 html
  // 用 join 來合併且消除原本陣列的逗點
  voicesDropdown.innerHTML = voices
    .filter(voice => {
      return voice.lang.includes('zh') || voice.lang.includes('en');
    })
    .map(voice => {
      return `<option value=${voice.name}>${voice.name} (${voice.lang})</option>`;
    })
    .join('');
}

// 監聽語音清單變更後語系
speechSynthesis.addEventListener('voiceschanged', populateVoices);
```

### 3. 設定發音語系、播放與功能設定

設定發音語系 `setVoice()`，當選項元素改變時，先判斷是否等於元素內容。然後執行函式 `toggle()` 播放聲音切換。

當使用者從選單選到語音時，要將該語音加至 `msg.voice`，如此到時候閱讀時才會用此語音讀出聲音。要從一個 array 中找到特定項目很適合用 `find()` 這個方法。

```js
// 播放聲音切換。參數這邊定一個判斷值
function toggle(starOver = true) {
  speechSynthesis.cancel();
  if (starOver) {
    speechSynthesis.speak(msg);
  }
}

// 設定發音語系
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

// 監聽語系清單 選擇後切換語系
voicesDropdown.addEventListener('change', setVoice);

// 播放
speakButton.addEventListener('click', toggle);
// 停止。toggle 內的參數為 false
stopButton.addEventListener('click', () => toggle(false));
```

### 4. 設定速率、音調、文字區塊是否變更

`name` 屬性可以看到分別是 `rate、pitch、text`，剛好跟 `SpeechSynthesisUtterance()` 中的屬性名稱符合。

可以透過 DOM 元素的命名方式，將 name 命名與 `SpeechSynthesisUtterance()` 物件屬性取一樣名稱，可以更精簡程式碼。

```js
// 設定速率跟音調
function setOption() {
  // 傳入的變數名稱與 SpeechSynthesisUtterance 本身的物件相同
  // 所以可以透過這種方式來直接用
  msg[this.name] = this.value;
  toggle();
}

// 監聽速率跟音調
options.forEach(option => option.addEventListener('change', setOption));
```

## 語法 & 備註

### SpeechSynthesis

`SpeechSynthesis` 是控制語音的功能，被用來取得在設備使用合成語音的資訊。

- **SpeechSynthesis.getVoices()**：`getVoices()` 方法是取得在設備能夠使用的合成語音的名單。
- **SpeechSynthesis.speak()**：`speak()` 方法是發生合成語音。
- **SpeechSynthesis.cancel()**：`cancel()` 方法是取消發出合成語音。

> 參閱 [SpeechSynthesis](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis)
> 參閱 [SpeechSynthesis.getVoices()](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechSynthesis/getVoices)
> 參閱 [SpeechSynthesis.speak()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak)
> 參閱 [SpeechSynthesis.cancel()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/cancel)

### SpeechSynthesisUtterance

`SpeechSynthesisUtterance` 代表語音合成語音的請求，內容包含語音的內容和資訊。

- **SpeechSynthesisUtterance.text**：`text` 屬性為設定或取得合成語音的述說文字內容。
- **SpeechSynthesisUtterance.voice**：`voice` 屬性為合成語音的發聲。
- **SpeechSynthesisUtterance.pitch**：`pitch` 屬性為合成語音的音調。
- **SpeechSynthesisUtterance.rate**：`rate` 屬性為合成語音的說話速率。

> 參閱 [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)
> 參閱 [SpeechSynthesisUtterance.text](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/text)
> 參閱 [SpeechSynthesisUtterance.voice](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/voice)
> 參閱 [SpeechSynthesisUtterance.pitch](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/pitch)
> 參閱 [SpeechSynthesisUtterance.rate](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/rate)

### voiceschanged

`voiceschanged` 事件是當 `SpeechSynthesis.getVoices()` 改變時被觸發。

> 參閱 [SpeechSynthesis: voiceschanged event](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event)
