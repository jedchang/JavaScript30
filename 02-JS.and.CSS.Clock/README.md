# 02 - JS and CSS Clock

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg) ![image](https://img.shields.io/badge/CSS-exercise-1572B6.svg)

![](https://images2.imgbox.com/5c/c1/g6PDwr6A_o.jpg)

## 主題

即時顯示當前時間，並使用 JS 與 CSS 搭配製作一個實時的時鐘效果。

## 步驟

### 調整 CSS 樣式中的時針、分針、秒針

1. 調整時鐘的 CSS 樣式，與作者方式不同，直接改變 DOM 樣式，使針的範圍變大，方便定位。好處是不用去做調整旋轉的軸心位置等。

### 取得當前時間，並每秒更新一次

1. 取得目前時間，並每秒更新一次
   - 時間計算：`new Date()` 取得目前 時、分、秒。
   - 計時器：`setInterval()` 設定間隔，持續執行。此範例為每秒更新一次。(1 秒為 1000 毫秒)

### 計算出各自的角度

1. 秒針：(360 / 60) \* seconds
2. 分針：(360 / 60) \* seconds
3. 時針：(360 / 12) \* seconds

### 修改各自的角度

1. 用 JS 透過 `element.style` 修改時針、分針、秒針的角度。

## 語法 & 備註

### Date()

取得時間的函數。必須使用 `new Date()`。

- `date.getSeconds()`：取得當前秒數
- `date.getMinutes()`：取得當前分鐘
- `date.getHours()`：取得當前小時

```js
function setClock() {
  // 取得目前時間
  let date = new Date();
  let secondDeg = date.getSeconds() * 6;
  let minDeg = date.getMinutes() * 6 + (date.getSeconds() * 6) / 60;
  let hourDeg = date.getHours() * 30 + (date.getMinutes() * 30) / 60;

  // ES6 反引號寫法 (IE不支援)
  second.style.transform = `rotate(${secondDeg}deg)`;
  min.style.transform = `rotate(${minDeg}deg)`;
  hour.style.transform = `rotate(${hourDeg}deg)`;

  // ES5 傳統寫法
  second.style.transform = 'rotate(' + secondDeg + 'deg)';
  min.style.transform = 'rotate(' + minDeg + 'deg)';
  hour.style.transform = 'rotate(' + hourDeg + 'deg)';
}
```

- `let secondDeg = date.getSeconds() * 6`：分針、秒針：一圈 360 度，秒針和分針都是 60 秒/分，故分成 60 格，每格 6 度。
- `let minDeg = date.getMinutes() * 6 + (date.getSeconds() * 6) / 60`：因為分針不會剛好指向整數，會隨著秒針逐步前進，所以分隨著一圈 60 分中逐漸移動，加上秒鐘要 \*6 度 / 60 秒。
- `let hourDeg = date.getHours() * 30 + (date.getMinutes() * 30) / 60`：時針：一圈 360 度，總共 12 小時，故分成 12 格，每格 30 度。但是小時不會剛好指向整數，會隨著分鐘逐步前進，所以小時隨著一圈 60 分中逐漸移動，加上分鐘要 \*30 度 / 60 分。(一圈 360 度，總共 12 小時，故分成 12 格，每格 30 度)。

> 參閱 [Date](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date)

### setInterval()

計時器共分有 `setInterval()`、`setTimeout()`、`requestAnimationFrame()`

- setInterval()：**設定間隔時間，自動重複執行** function，可使用 clearInterval 停止，前提是必須給予計時器一個變數名稱。
- setTimeout()：**設定等待時間，執行 function 一次**，如需重複執行，必須在 function 內再次呼叫 setTimeout，可使用 clearTimeout 停止，前提是必須給予計時器一個變數名稱。
- requestAnimationFrame()：瀏覽器可以優化，讓動畫更平滑順暢。該暫停的動畫不會繼續使用 CPU。總結就是**優化動畫效率與資源**。
