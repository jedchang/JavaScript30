# 29 - Countdown Timer

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/4a/73/RyMnpp7e_o.jpg)

## 主題

製作出可以自定義時間的倒數計時器。

## 步驟

### 1. 取得頁面元素

```js
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]'); // 屬性選取器
// const buttons = document.querySelectorAll('.timer__button');
```

這邊按鈕部分可以使用選取所有類別名稱為 `timer__button` 或是使用 `屬性選取器`。
通過屬性選取元素，可用於自定義屬性，需要寫 `[]` 號，包含屬性名。

> 參閱 [pHTMLElement.dataset](https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLElement/dataset)

### 2. 設定計時器

要倒數計時，首先要設定好碼錶。所以要讓「要倒數多久」做為參數傳入計時器。 HTML 裡面那些倒數計時設定鈕的 `data-time` 屬性中記錄著這些數字，當我們按按鈕時，就會觸發事件將時間傳進計時器。

自訂時間倒數也是，把寫進 `<input>` 裡面的值轉換為秒數，傳進 `timer()` 計時器內。要存取表單的 DOM 來增加監聽器。

因為計時器需要開開關關，所以需要一個計時器命名 `let countdown`

> 這邊就不能用 `const` 宣告，因為 countdown 會 **一直賦於不同的值**

計算時間邏輯如下:

1. 現在時間: 取得有幾種方式

   - `Date.now()` 較新用法
   - `new Date().getTime()` 傳統用法
   - `new Date().valueOf()`
   - `+new Date()` 會變成 `0 + new Date()` 也就是數字運算做轉型

2. 結束時間: 現在時間 + 指定時間 (我們傳入的指定 seconds)
3. 剩餘時間: 結束時間 - 現在時間

![](https://images2.imgbox.com/1b/cd/lobEuRrg_o.jpg)

```js
// 計時器
const timer = function(seconds) {
  // 新的計時器被啟動時，先把原本的 setInterval 清除
  clearInterval(countdown);
  // 取得現在時間
  const now = Date.now();
  // 因為秒數是毫秒所以要 *1000
  const timestamp = now + seconds * 1000;
  displayTimeLeft(seconds); // 顯示畫面剩餘時間
  displayEndTime(timestamp); // 顯示畫面結束時間

  // 計時器執行在 countdown 裡面方便接著清除使用
  countdown = setInterval(() => {
    // 取得要跑的總時長
    const secondsLeft = Math.round((timestamp - Date.now()) / 1000);
    // 如果時間已經小於 0，結束這個 Interval 停止計時
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // 更新時間
    displayTimeLeft(secondsLeft);
  }, 1000);
};
```

透過 `setInterval` 每秒去取得剩餘時間。

> 注意：「剩下時間 = 到期時間 - 現在時間」，此時的現在時間我們不是去呼叫 now，而是重新再取一次時間 Date.now() 因為時間是一直前進的。

若有時間差情狀發生，畫面會跳號時，則會設定為 `16` 毫秒更新 （1000 / 60 = 16），所謂的 60 FPS （每秒更新 60 次）

```js
countdown = setInterval(() => {
  // 略...
  displayTimeLeft(secondsLeft);
}, 16);
```

#### 顯示畫面剩餘時間

在 `setInterval` 計算出剩餘時間後，再將直傳入 `displayTimeLeft` 來渲染到畫面上

```js
// 顯示畫面剩餘時間
const displayTimeLeft = function(seconds) {
  // 透過 Math.floor 來取得分鐘數最大整數 (傳入秒數 / 60)
  const minutes = Math.floor(seconds / 60);
  // 用 ％ 來取得傳入秒數除 60 的餘數（扣除分鐘數後的秒數）
  const remainderSeconds = seconds % 60;
  // console.log({ minutes, remainderSeconds });
  // 顯示秒數的部分若小於 0 ，數字前補 0
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  // 顯示對應時間
  document.title = display;
  timerDisplay.textContent = display;
};
```

`${remainderSeconds < 10 ? '0' : ''}` 這邊是讓秒數有兩位數

#### 顯示畫面結束時間

因為結束時間只需呼叫一次，所以不要放到 `setInterval` 中

```js
// 顯示畫面結束時間
const displayEndTime = function(timestamp) {
  // 用傳入的 timestamp 將總秒數轉換為時間格式
  const end = new Date(timestamp);
  // 取得小時
  const hour = end.getHours();
  // 轉換 12 小時制 (超過 12 小時就減 12，沒有就是現在小時)
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  // 取得分鐘
  const minutes = end.getMinutes();
  // 顯示分鐘，若分鐘數小於 10，則前面補 0
  endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
};
```

這邊將文字印到畫面上有幾種作法：

- `textContent`: 較新，支援度從 IE9 開始。
- `innerHtml`: 有潛在的安全風險問題，斟酌使用。建議用 `textContent` 替代。
- `innerText`: 較舊，支援度從 IE6 開始。但 VS Code 竟然沒有提示?

顯示分鐘這邊使用三元運算式的判斷方式是當時或分小於 10 的時候在數字前面加上 string `'0'`，若大於 10 則加上空 string `''`

> 參閱 [Math.floor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)

> 參閱 [Date.now()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
> 參閱 [Date.prototype.getHours()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours)
> 參閱 [Date.prototype.getMinutes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes)
> 參閱 [Date.prototype.getSeconds()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds)

> 參閱 [Node.textContent](https://developer.mozilla.org/zh-TW/docs/Web/API/Node/textContent)
> 參閱 [Node.innerText](https://developer.mozilla.org/zh-TW/docs/Web/API/Node/innerText)
> 參閱 [element.innerHTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML)

### 3. 監聽 固定時間倒數按鈕

先來進行頁面上預設的固定時間倒數按鈕，分別有 `20sec`、`300sec`、`900sec`、`1200sec`、`3600sec`

```js
// 開始倒數計時
const startTimer = function() {
  // 取得 data-time 的數值
  const seconds = this.dataset.time;
  console.log(seconds);
};

// 每一個時間按鈕加上監聽事件
buttons.forEach(button => button.addEventListener('click', startTimer));
```

![](https://images2.imgbox.com/4e/cb/5Cy5jwdG_o.jpg)

這邊要注意按鈕按下取得的是文字類型，需要轉換為數字類型。轉換方法有幾種:

- `const seconds = parseInt(this.dataset.time)`: 使用 parseInt() 函式能將輸入的字串轉成整數。
- `const seconds = this.dataset.time * 1`: 乘上數字 1 轉型。

```js
// 開始倒數計時
const startTimer = function() {
  // 取得 data-time 的數值
  const seconds = parseInt(this.dataset.time);
  // 將取得的值傳入到計時器中
  timer(seconds);
};
```

> 參閱 [parseInt()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

### 4. 自訂時間倒數

這邊因為 Form 表單上有取 `name="customForm"`，所以直接選取。

```js
// 監聽 自訂時間 input 輸入欄位
document.customForm.addEventListener('submit', function(e) {
  // 因為 form 表單，submit 後避免跳頁使用 preventDefault() 來阻止預設事件
  e.preventDefault();
  // 取得 input 欄位的值，並轉為數字
  const mins = parseInt(this.minutes.value);

  // 判斷有值才執行
  if (mins) {
    // 輸入欄位是要輸入分鐘，所以秒數*60
    console.log(mins * 60);
    // 清空表單欄位
    this.reset();
  }
});
```

![](https://images2.imgbox.com/d2/b7/SWLYyCAp_o.jpg)

這邊輸入框 input 所取得的是文字，需要 `parseInt()` 轉數字。並且將取得的值傳入計時器中 `startTimer(mins * 60)`。

```js
// 監聽 自訂時間 input 輸入欄位
document.customForm.addEventListener('submit', function(e) {
  // 因為 form 表單，submit 後避免跳頁使用 preventDefault() 來阻止預設事件
  e.preventDefault();
  // 取得 input 欄位的值，並轉為數字
  const mins = parseInt(this.minutes.value);

  // 判斷有值才執行
  if (mins) {
    // 輸入欄位是要輸入分鐘，所以秒數*60
    timer(mins * 60);
    // 清空表單欄位
    this.reset();
  }
});
```

> 參閱 [form.reset](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement/reset)

## 語法 & 備註

### 時間格式轉換

1. 取得時間

```js
const now = new Date();
//不給值就是取出電腦當下時間，給 timestamp 值就是取出指定時間。
```

2. 取得 timestamp（時間戳記）

```js
const now = Date.now();
//OR
const now = new Date().getTime();
```

3. 範例

```js
var d = new Date('Wed Jun 20 19:20:44 +0000 2012');
d.getTime(); //returns 1340220044000
//OR
Date.parse('Wed Jun 20 19:20:44 +0000 2012'); //returns 1340220044000
```

### Math.round() 回傳四捨五入的數值

```js
Math.round(20.49); //  20
Math.round(20.5); //  21
Math.round(42); //  42
Math.round(-20.5); // -20
Math.round(-20.51); // -21
```
