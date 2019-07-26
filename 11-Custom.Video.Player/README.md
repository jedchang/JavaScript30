# 11 - Custom Video Player

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/7e/57/EPwC4Cvl_o.jpg)

## 主題

使用 HTML5 中的 video 屬性來控制播放器功能，包含：播放/暫停、快進/快退、音量控制、速率控制等。

## 步驟

### 1. 取得所有 video DOM 元素

```js
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
```

其中 skipButtons 使用 `[]` 來執行物件屬性選取，篩選 `dataset` 自定義資料屬性。

> 參閱 [<video>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)
> 參閱 [HTMLMediaElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement)
> 參閱 [HTMLElement.dataset](https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLElement/dataset)

### 2. 播放、暫停按鈕和切換圖示

```js
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  // 寫法2
  // video.paused ? video.play() : video.pause();
  // 寫法3：等同於用 if 判斷，上面更為精簡
  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
}

// 偵聽畫面點擊、按鈕點擊觸發事件
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
```

比較特別的是使用了 `video[method]()` 的寫法，來直接操作 video 的屬性。

使用三元運算子來決定要操控 `video` 的哪個方法，如果屬性是 video.paused （影片是否正在暫停），就執行函式 "play" 就是呼叫 `video.play()`，不然就 "pause" 就是呼叫 `video.pause()`。

此方法比起 if 判斷式更為精簡。

```js
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

// play、pause 事件會在播放或暫停開始時被觸發，觸發後改變按鈕樣式
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
```

偵聽 `play`（播放事件）與 `pause`（暫停事件），觸發切換按鈕函式。

> 參閱 [HTMLMediaElement: play event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event)
> 參閱 [HTMLMediaElement: pause event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event)

### 3. 音量、速率操作

```html
<input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1" />

<input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1" />
```

利用 HTML 中 input 定義的 `name` 屬性名稱來取值。

```js
function handleRangeUpdate() {
  video[this.name] = this.value;

  // 寫法2：等同於用判斷式取值
  // if (this.name === 'volume') {
  //   video.volume = this.value;
  // } else if (this.name === 'playbackRate') {
  //   video.playbackRate = this.value;
  // }
}

// 針對2個 input 做音量、播放速率做 change、mousemove 事件偵聽
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
```

一樣利用物件中括號 `[]` 取物件屬性，也就是 HTML 中 name 的名稱，用來傳遞參數賦於值。
video 中的兩個屬性：

- volume：音量
- playbackRate：播放速度

此方法比起 if 判斷式，先判斷屬性名為何後，再進行相對應函式來的更為精簡。

偵聽事件部分，因為 range 是透過 `querySelectorAll` 來取得，用 `forEach` 將所有的 range 各別加上 `addEventListener` 事件偵聽，除了偵聽 `change` 改變外，還需要偵聽 `mousemove` 滑鼠移動。

> 參閱 [HTMLMediaElement.volume](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/volume)
> 參閱 [HTMLMediaElement.playbackRate](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/playbackRate)

### 4. 快進、快退按鈕操作

```html
<button data-skip="-10" class="player__button">« 10s</button>
<button data-skip="25" class="player__button">25s »</button>
```

一樣也在 HTML 中的 input 定義好 `dataset` 自定義名稱 `data-skip` 並定義對應秒數了，只須取出使用。

```js
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// 針對 2 個按鈕 (快進、快退) 做 click 事件偵聽，執行 skip 函式
skipButtons.forEach(button => button.addEventListener('click', skip));
```

這裡用到了 video 中的另一個屬性：

- currentTime：現在當前播放時間

因為 `dataset` 取到的值是字串，利用 parseFloat 需轉換成數字型態，且返回浮點數。

skipButtons 一樣是透過 `querySelectorAll` 來取得，用 `forEach` 將所有的 button 各別加上 `addEventListener` 事件偵聽，偵聽 `click` 事件並觸發 skip 函式。

> 參閱 [parseInt 和 parseFloat 函數](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Obsolete_Pages/Obsolete_Pages/Obsolete_Pages/%E9%A0%90%E5%85%88%E5%AE%9A%E7%BE%A9%E7%9A%84%E5%87%BD%E6%95%B8/parseInt_%E5%92%8C_parseFloat_%E5%87%BD%E6%95%B8)
> 參閱 [HTMLMediaElement.currentTime](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/currentTime)

### 5. 進度條顯示

```js
function handleProgress() {
  // 進度百分比 = (現在播放時間 / 總共時間) * 100
  const percent = (video.currentTime / video.duration) * 100;
  // 變更 flex-basis 屬性：初始大小、預設寬度
  progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);
```

使用 video 的兩個屬性

- currenTime：現在當前播放時間
- duration：總共時間

來進行計算進度條的百分比 （% 數），然後透過 CSS 中 flex－Basis（初始大小、預設寬度）來變更 HTML 上的樣式。

當 `currentTime` 屬性更新時會觸發 `timeupdate` 事件，然後執行 handleProgress 函式。

> 參閱 [flex-basis](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)
> 參閱 [HTMLMediaElement.duration](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/duration)
> 參閱 [HTMLMediaElement: timeupdate](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/timeupdate_event)

### 6. 進度條拖曳操作

```js
function scrub(e) {
  // 計算當前秒數 = (e.offsetX 滑鼠座標 / 進度條總長度) * 總時間
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
```

scrub 函式中利用 `e.offsetX`（滑鼠座標位置）及 `progress.offsetWidth` （進度條總長度）與影片總時間來計算當前秒數。

為了要讓 function 能同時判斷兩種狀態（true or false），所以宣告一個 mousedown 狀態切換來做判斷依據。

偵聽部分，在影片上做點擊切換進度或著是按著拖曳片段，觸發動作會有：

- click （點擊）
- mousemove（滑鼠移動、拖曳時，若為 true 狀態就呼叫 scrub 的 method。）
- mousedown（滑鼠按下，改變狀態為 true）
- mouseup（滑鼠放開，改變狀態 false）
