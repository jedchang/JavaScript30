# 26 - Stripe Follow Along Nav

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/a6/b2/VeIIfbXE_o.jpg)

## 主題

滑鼠切換到導覽列不同選項時，顯示該選項下拉清單的動態效果。

## 步驟

### 1. HTML 架構及 CSS 效果

```html
<!-- nav -->
<nav class="top">
  <!-- 下拉選單背景，用 JS 控制 大小、定位顯示 -->
  <div class="dropdownBackground">
    <span class="arrow"></span>
  </div>
  <!-- 導覽列主體 -->
  <ul class="cool">
    <li>
      <a href="#">About Me</a>
      <div class="dropdown dropdown1">
        <!-- 下拉選單內容 -->
        <!-- 略... -->
      </div>
    </li>
    <li>
      <a href="#">Courses</a>
      <ul class="dropdown courses">
        <!-- 下拉選單內容 -->
        <!-- 略... -->
      </ul>
    </li>
    <li>
      <a href="#">Other Links</a>
      <ul class="dropdown dropdown3">
        <!-- 下拉選單內容 -->
        <!-- 略... -->
      </ul>
    </li>
  </ul>
</nav>
```

在類別 `dropdown` 中的每一個元素為不顯示 `display: none`。
首先為了方便開發看到畫面，所以先將 `dropdownBackground` CSS 中的 `opacity:0` 先暫時關閉，讓底圖顯示出來。

這邊加入 CSS 類別有兩階段：

- 第一階段加入 `trigger-enter`：當滑鼠指到 `li` 元素時，加入 CSS 類別`trigger-enter`，也就是讓 `dropdown` 的 `display` 轉為 `block` 顯示。
- 第二階段加入 `trigger-enter-active`：加入 `trigger-enter-active` 類別，而`trigger-enter-active` 類別是將不透明度 `opacity` 從 0 到 1。

```css
/* 第一階段 下拉選單以區塊方式呈現 */
.trigger-enter .dropdown {
  display: block;
}

/* 第二階段 透明度顯示 */
.trigger-enter-active .dropdown {
  opacity: 1;
}

/* 下拉選單背景 */
.dropdownBackground {
  width: 100px;
  height: 100px;
  position: absolute;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1), 0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s, opacity 0.1s, transform 0.2s;
  transform-origin: 50% 0;
  display: flex;
  justify-content: center;
  /* opacity:0; 先暫時關閉 */
}

/* 下拉選單背景 透明度顯示 */
.dropdownBackground.open {
  opacity: 1;
}
```

### 2. 選單事件偵聽

主要的效果切換，就是在滑鼠的移入、移出這二個動作。

滑鼠移入、移出的事件區別：

- `mouseover、mouseout`：滑鼠移動到自身時候會觸發事件，同時移動到其子元素身上也會觸發事件。
- `mouseenter、mouseleave`：滑鼠移動到自身是會觸發事件，但是移動到其子元素身上不會觸發事件。

```js
const triggers = document.querySelectorAll('.cool > li'); // 選單
const background = document.querySelector('.dropdownBackground'); // 選單背景
const nav = document.querySelector('.top'); // Navbar

// 滑鼠移入事件
function enterHandler() {
  console.log('in');
}

// 滑鼠移出事件
function leaveHandler() {
  console.log('out');
}

// 為每個選單上做滑鼠移入、移出的事件偵聽
triggers.forEach(trigger => {
  trigger.addEventListener('mouseenter', enterHandler);
  trigger.addEventListener('mouseleave', leaveHandler);
});
```

### 3. 滑鼠移入、移出動態效果

首先我們希望下拉選單 dropdown 的內容在滑鼠移入後可以出現。

需使用 `display: none` 又希望更改成 `display: block` 時能加入 `transition` 的動畫效果，**但是 `transition` 並不支援 `display` 的顯現與隱藏**，這時就需要用一點小方法了。

由於不能直接在 `display` 下使用 `transition（會沒有效果）`，所以要利用 CSS 的 `opacity` 以及 `setTimeout` 來完成（opacity 可以是其他屬性，像是 max-width、visibility 等...）。

依順序理解如下：

- 先將 `display: none -> display: block`
- 設定 `setTimeout`，並在 callback 中更改 `opacity: 1` 與配合設定的 `transition` 讓元素出現。

```js
// 滑鼠移入事件
function enterHandler() {
  this.classList.add('trigger-enter');
  setTimeout(() => {
    this.classList.add('trigger-enter-active');
  }, 150);
}

// 滑鼠移出事件
function leaveHandler() {
  // console.log('out');
  this.classList.remove('trigger-enter', 'trigger-enter-active');
}
```

![](https://images2.imgbox.com/7c/ea/7sZk6pXw_o.jpg)

透過 JS 先在導覽列選項新增 class `trigger-enter`，此時 `trigger-enter` 會更改 dropdown 的 CSS 為 `display: block`，並在 150 毫秒後新增另一個 class `trigger-enter-active` 將透明度改為 1，如此動畫效果就出來了！（當然還是要配合 transition）

### 4. 取得下拉選單的白色背景座標

首先將 `dropdownBackground` 的元素加入類別 `open`，先讓白色背景圖出現。

再來取得下拉選單的白色背景座標，就是使用之前 Day22 所使用過的 `element.getBoundingClientRect()` 以取得 `dropdown` 座標位置跟寬高等資訊。

```js
// 滑鼠移入事件
function enterHandler() {
  this.classList.add('trigger-enter');
  background.classList.add('open');

  // 取得目前滑入元素底下的 dropdown
  const dropdown = this.querySelector('.dropdown');
  // 取得 dropdown 的寬高、座標位置等
  const dropdownCoords = dropdown.getBoundingClientRect();

  // 設定將要給白色背景使用的定位與大小資訊
  const coords = {
    width: dropdownCoords.width,
    height: dropdownCoords.height,
    top: dropdownCoords.top,
    left: dropdownCoords.left
  };

  // 將設定值套用到畫面上
  background.style.width = `${coords.width}px`;
  background.style.height = `${coords.height}px`;
  background.style.top = `${coords.top}px`;
  background.style.left = `${coords.left}px`;
}
```

![](https://images2.imgbox.com/05/c6/dQYQHJID_o.jpg)

> 參閱 [Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

### 5. 白色背景位置太下面?

可以看到白色背景的座標位置似乎與選單有一段距離，`element.getBoundingClientRect()` 的寬、高沒有問題，而 `top`、`bottom`、`left`、`right` 是與 viewport（使用者裝置視窗）上下左右的距離。以 `top` 來說距離是從瀏覽器上緣到導覽列選項頂端的距離。

但是當套用到 `background` 時，`top` 的起點是 `nav` 上緣而不是瀏覽器上緣，這也是為什麼 `background` 的位置會這麼下面了。

![](https://images2.imgbox.com/9d/98/0klzzBX1_o.jpg)

**解法是要扣掉 `nav` 頂端到瀏覽器上緣的距離，才是 `background` 應該有的 `top` 值**

```js
// 取得 nav 的寬高、座標位置
const navCoords = nav.getBoundingClientRect();

const coords = {
  width: dropdownCoords.width,
  height: dropdownCoords.height,
  top: dropdownCoords.top - navCoords.top, // 扣掉 nav 到頂端的距離
  left: dropdownCoords.left - navCoords.left // 扣掉 nav 到左側的距離
};
```

### 6. 細節修正

基本上功能算是完成了，但如果看仔細點會發現當你快速在三個導覽列選項移動時，`trigger-enter-active` 這個 class 並不會因滑鼠移出而移除。

這是因為 **移動速度過快** ，在 `setTimeout` 150 毫秒加入 class 前就試著刪除 class，也因此會殘留。

**解法是在 `setTimeout` 的 callback 中加入判斷式，當 class 有 `trigger-enter` 時才執行 `setTimeout`**

```js
this.classList.add('trigger-enter');
background.classList.add('open');

setTimeout(() => {
  // 當移入時，先檢查是否有 trigger-enter 這個 class
  // 若有的話在 150 毫秒後新增 trigger-enter-active 這個class
  if (this.classList.contains('trigger-enter')) {
    this.classList.add('trigger-enter-active');
  }
}, 150);
```

或是可以更精簡的寫成下面方式，當 `&&` 左方為 `true` 時才會執行右方動作。

```js
setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
```
