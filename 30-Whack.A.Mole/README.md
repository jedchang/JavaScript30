# 30 - Whack A Mole

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/c4/48/pPrTTOKl_o.jpg)

## 主題

製作一個打地鼠遊戲。

## 步驟

### 1. HTML/CSS 結構

```html
<div class="hole hole1">
  <div class="mole"></div>
</div>
```

- `hole` 地鼠的洞
- `mole` 地鼠

```css
.hole {
  flex: 1 0 33.33%;
  overflow: hidden;
  position: relative;
}
.mole {
  background: url('gophers.png') bottom center no-repeat;
  background-size: 80%;
  position: absolute;
  top: 100%;
  width: 100%;
  height: 100%;
  transition: all 0.4s;
}
.hole.up .mole {
  top: 0%;
}
```

- 透過 `top:100%` 以及父層的 `overflow:hidden` 讓地鼠隱藏。
- 當 `.hole` 加了 `.up` 之後， `.mole` 就會跑上來。

### 2. 取得頁面元素並設定預設變數

```js
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

/*----------  預設變數設定  ----------*/
let lastHole; // 最後一次出現的地鼠洞
let timeUp = false; // 判斷遊戲時間是否結束
let score = 0; // 分數
```

有開始遊戲就有結束的時候，所以我們定義 `timeUp` 判斷時間是否結束，還有分數 `score` 一開始為 0 分。
而地鼠的出現有先後之分，為了避免地鼠同地點重複出現我們要去判斷 **現在這隻** 和 **剛剛那隻** 有沒有一樣，所以定義一個 `lastHole` 之後會用到。

函式:

- 按下按鈕時: `startGame()`
- 地鼠出現隨機的洞: `randomHole()`
- 地鼠出現停留時間: `randomTime()`
- 地鼠出現: `peep()`
- 打擊: `bonk()`

### 3. 地鼠出現隨機的洞

```js
/*----------  地鼠出現隨機的洞  ----------*/
// 將 DOM 的 holes 數量傳入
function randomHole(holes) {
  // 取得地鼠洞數量區間內隨機的一個洞
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  // 避免隨機出現相同的洞，若是與最後一次相同，則重新取得
  if (hole === lastHole) {
    console.log('這是重複的洞');
    return randomHole(holes);
  }

  // 記錄最後一個出現的地鼠洞
  lastHole = hole;
  return hole;
}

console.log(randomHole(holes));
```

我們有 6 個洞，序列 **0 ~ 5**，所以我們取隨機數 0 ~ 5。
所以就取到這個隨機位置 `const hole = holes[idx]`

還回傳給 `peep()` 函式前，做個判斷，避免同一位置出現地鼠，這時 `lastHole` 就派上用場了，讓 `lastHole` 暫時等於現在取得的這個值，而下次執行時就會判斷是否重複，如果重複就再做一次 `randomHole()`，以此類推。

### 4. 地鼠出現停留時間

**隨機範圍公式: (最大值 - 最小值) + 最小值**

例如: 取得 500~1000 範圍

```js
const num = Math.random() * (1000 - 500) + 500;
console.log(num);
```

可以自訂地鼠要出現停留多久，這邊我設定為 0.5 ~ 1 秒之間 （500 毫秒 ~ 1000 毫秒）

```js
/*----------  地鼠出現停留時間  ----------*/
function randomTime(max, min) {
  // 傳入最小值、最大值，回傳一個區間範圍亂數
  return Math.floor(Math.random() * (max - min) + min);
}
```

### 5. 地鼠出現

出現與消失的方法簡單透過 `classList.add` 和 `classList.remove` 即可完成。
這邊的關鍵在於哪個位置的地鼠，和出現多久（多久後要 `remove class`），所以我們交給 `randomHole()` 和 `randomTime()` 幫我們取得隨機位置和時間。

```js
/*----------  地鼠出現  ----------*/
function peep() {
  // 取得地鼠出現停留時間，這邊傳入 500 ~ 1000 毫秒，也就是 0.5 ~ 1 秒
  const time = randomTime(500, 1000);
  // 取得地鼠出現隨機的洞
  const hole = randomHole(holes);
  // 新增 class (地鼠出現)
  hole.classList.add('up');

  // 出現停留時間到的時候移除 class，且若遊戲時間未結束就繼續做
  setTimeout(() => {
    // 移除 class (地鼠消失)
    hole.classList.remove('up');
    // 判斷是否結束遊戲
    if (!timeUp) peep();
  }, time);
}
```

### 6. 敲打地鼠

```js
function bonk(e) {
  // isTrusted 防止腳本操作
  if (!e.isTrusted) return;

  // 加一分
  score++;
  // 打到就移除 class(地鼠消失)
  this.parentNode.classList.remove('up');
  // 更新畫面分數
  scoreBoard.textContent = score;
}
```

這些地鼠被點擊到會讓你的分數增加，並且被打到的地鼠就讓它縮回地洞。
但是如果我寫程式碼狂點地鼠不就好了？ 為了防止腳本為了，這時候可以用滑鼠點擊事件的 `isTrusted` 屬性來阻止假點擊， `isTrusted` 可以分辨這個點擊是否為玩家操控，或是自動觸發的。

`e.isTrusted`:

- 若事件物件是由「使用者操作」而產生，`isTrusted` 值為 `true`。
- 若事件物件是由程式碼所建立、修改，或是透過 `EventTarget.dispatchEvent()` 來觸發，則 `isTrusted` 值為 `false`。

> 參閱 [Event.isTrusted](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/isTrusted)
> 參閱 [ParentNode](https://developer.mozilla.org/zh-TW/docs/Web/API/ParentNode)

### 7. 增加其他細節

增加滑鼠移到開始遊戲按鈕上的手指型，和敲打地鼠時的手指型。
時間結束時跳出 alert 訊息告知時間到了。

```css
/* 增加滑鼠指型 */
.hole.up .mole:hover {
  cursor: pointer;
}

/* 增加滑鼠指型 */
button:hover {
  cursor: pointer;
}
```

```html
<!-- 開始按鈕 -->
<button onClick="startGame()">Start!</button>
```

```js
/*----------  開始遊戲  ----------*/
function startGame() {
  timeUp = false;
  scoreBoard.textContent = 0;
  score = 0;
  peep();
  setTimeout(() => {
    timeUp = true;
    // 跳出時間終了訊息
    alert('Time is up!!');
  }, 10000);
}
```
