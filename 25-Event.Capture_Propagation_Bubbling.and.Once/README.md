# 25 - Event Capture, Propagation, Bubbling and Once

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/25/15/e2LVVDvk_o.jpg)

## 主題

了解 addEventListener 中的事件捕獲、事件冒泡、事件委派等。

## 步驟

### 1. 建立 DOM 模型與監聽

外層建立一個 `box` 裡面包覆三個 div，依序為 `purple` > `pink` > `orange`

```html
<div class="box">
  <div class="one purple">
    <div class="two pink">
      <div class="three orange"></div>
    </div>
  </div>
</div>
```

對頁面上 div 做點擊事件偵聽，並觸發 `logText` 函式。

```js
// logText 函式
function logText(e) {
  console.log(this.classList.value);
}

// 將每個 div 加上 click 事件偵聽
divs.forEach(div => div.addEventListener('click', logText));
```

### 2. 事件偵聽

addEventListener(①, ②, ③) 有三個參數

- ① 事件類型（Event Type）
- ② 回乎函式（Callback Function）
- ③ 捕獲模式（useCapture）
  - 預設為 `false`，事件冒泡（Bubbling），事件傳遞的順序是由目標節點向上傳遞，傳遞至根節點。
  - 當為 `true`，事件捕獲（Capturing），事件傳遞的順序是由根節點向下傳遞，傳遞至目標節點，
- ③ 設定 （Options）
  - `capture`：當為 `true`，事件順序為 `capture`。
  - `once`：當為 `true`，代表事件只觸發一下，之會在無法觸發該元素。
  - `passive`：當為 `true`，省略 `preventDefault()`的方法。

> 參閱 [EventTarget.addEventListener()](https://developer.mozilla.org/zh-TW/docs/Web/API/EventTarget/addEventListener)

### 3. 事件傳遞順序

使用 `addEventListener` 時，當 Event 被觸發時，都是會先從 最外層 DOM -> target DOM 然後再走回 -> 最外層 DOM。

- 事件冒泡 Event Bubbling（綠色路徑）：只回傳 target DOM -> 最外層 DOM 路徑
- 事件捕獲 Event Capturing（紅色路徑）：只回傳 最外層 DOM -> target DOM 路徑

![](https://images2.imgbox.com/a0/36/wLaM3ibg_o.jpg)

#### 事件冒泡（Event Bubbling）

```js
function logText(e) {
  // 印出當前 div 的 class name
  console.log(this.classList.value);
}

// 第三個參數 useCapture：預設為 false。為事件冒泡 (Bubbling)
divs.forEach(div => div.addEventListener('click', logText));

// console 列出順序為 (target DOM -> 最外層 DOM)
//
// three orange
// two pink
// one purple
// box
```

#### 事件捕獲 （Event Capturing）

```js
function logText(e) {
  // 印出當前 div 的 class name
  console.log(this.classList.value);
}

// 第三個參數 useCapture：改為 true。為事件捕獲 (Capturing)
divs.forEach(div => div.addEventListener('click', logText, true));

// console 列出順序為 (最外層 DOM -> target DOM)
//
// box
// one purple
// two pink
// three orange
```

### 4. 停止冒泡行為 e.stopPropagation

有時只是想單純針對單一元素監聽，不想因為事件冒泡的行為，而去觸發到其他元素，這時就可利用 `e.stopPropagation()` 來達成此需求。

```js
// logText 函式
function logText(e) {
  // 印出當前 div 的 class name
  console.log(this.classList.value);

  // 停止冒泡行為！
  e.stopPropagation();
}
```

> 注意：
> 使用 `e.stopPropagation()` 僅針對 **事件冒泡（Event Bubbling）** 設定。
> 若為 **事件捕獲 （Event Capturing）** 的話，則不適用 `e.stopPropagation()`。

### 4. Options

單次觸發，`once` 屬性：當第一次被觸發後，就會移除本身的監聽事件，後續就沒有監聽事件。
可運用在表單 `submit` 後，解除監聽事件，避免重覆送單。

以往寫法，會將第三個參數 `捕獲模式（useCapture）` 設為 `true` 或 `false`。
另一種寫法為物件類型，也就是 Options，可詳細記載 `capture`、`once`、`passive` 等模式。

```js
function logText(e) {
  // 印出當前 div 的 class name
  console.log(this.classList.value);
}

// 以往第三個參數寫法
divs.forEach(div => div.addEventListener('click', logText, true));

// 改成 options 寫法，capture: true => 表示捕獲模式。 once: true => 只觸發一次
divs.forEach(div => div.addEventListener('click', logText, { capture: true, once: true }));
```

### 5. Event delegate （事件委派）

一個簡單的邏輯，當我們有很多個相似的按鈕的時候，自然不可能去一個一個的新增 `eventListener`，這種時候就必須要利用捕獲跟冒泡的機制，事件會冒泡到它的上層元素，所以只要在上層元素處理 `eventListener` 就好，就可以處理它底下所有的 button，就是透過 **按鈕新增（後來動態新增）** 的也可以。

**簡單說就是請上層來處理底下所有的按鈕。就是將事件委派在外層。**

```js
const divsA = document.querySelectorAll('a');

function aHandler() {
  console.log('Binding A Click:', this);
}

divsA.forEach(div => div.addEventListener('click', aHandler, { capture: false, passive: false }));
```

選取畫面上的 `a tag` Button 按鈕，在 `html` 上 **動態增加按鈕數量** 後，新增的無法觸發 `click` 事件。

![](https://images2.imgbox.com/43/5f/8FZpJPzd_o.jpg)

此時將目標對象改為 **最外層** `ul` 上做偵聽，此時同樣上面步驟，動態新增按鈕後再去偵聽觸發。會發現已經可以偵聽到了。

```js
const btnAll = document.querySelector('ul');

function aHandler() {
  console.log('Binding A Click:', this);
}

btnAll.addEventListener('click', btnAllHandler, { capture: false, passive: false });
```

![](https://images2.imgbox.com/c2/e8/SshaTCkc_o.jpg)

> 參閱 [Event.target](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/target)
> 參閱 [Event Delegation — 事件委派介紹 與 觸發委派的回呼函數](https://medium.com/@realdennis/event-delegation-%E4%BA%8B%E4%BB%B6%E5%A7%94%E6%B4%BE%E4%BB%8B%E7%B4%B9-%E8%88%87-%E8%A7%B8%E7%99%BC%E5%A7%94%E6%B4%BE%E7%9A%84%E5%9B%9E%E5%91%BC%E5%87%BD%E6%95%B8-2990921a5ba2)
> 參閱 [為什麼有時你應該優先考慮 event delegate 而不是 event binding](https://ithelp.ithome.com.tw/articles/10120565)
