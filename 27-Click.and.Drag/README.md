# 27 - Click and Drag

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/95/60/Euj9z8PJ_o.jpg)

## 主題

製作滑鼠點擊後可以拖曳並移動的水平捲軸。

## 步驟

### 1. 步驟分析

首先要先分析需要什麼監聽事件以及要做什麼事

- 按下滑鼠時： `div.items` 加入 `class active`，會套用淡化與放大的效果。
- 鬆開滑鼠或移出：`div.items` 移除 `class active`，取消效果。
- 按下滑鼠 + 移動：拖曳 `div.items` 的 X 軸。
-

### 2. 取得頁面元素與設定初始變數

```js
const slider = document.querySelector('.items');
let isDown = false; // 滑鼠點擊狀態
let startX; // 滑鼠最初點擊位置
let scrollLeft; // 捲軸現在位置
```

#### 設定 isDown flag

`flag` 意思是旗幟，也就是用於標示是否已按下滑鼠。
因為我們需要判斷滑鼠是否按下，所以需要定義一個變數， `isDown = false` 按下後變成 `true`

另外還有 **滑鼠所在的 X 位置（startX）和捲軸位置（scrollLeft）**

### 3. 監聽滑鼠事件

建立四個事件分別為:

- `mousedown`：是當在元素上的指標設備被**點擊**時觸發。
- `mouseleave`：是當滑鼠**移開**被事件監聽的元素時觸發。
- `mouseup`：是當滑鼠在被事件監聽的元素**放開**點擊時觸發。
- `mousemove`：是當滑鼠在被事件監聽的元素上**移動**時觸發。

```js
/*----------  滑鼠 按鍵點擊  ----------*/
slider.addEventListener('mousedown', () => {});

/*----------  滑鼠 滑出範圍  ----------*/
slider.addEventListener('mouseleave', () => {});

/*----------  滑鼠 按鍵放開  ----------*/
slider.addEventListener('mouseup', () => {});

/*----------  滑鼠 拖曳移動  ----------*/
slider.addEventListener('mousemove', () => {});
```

> 參閱 [Element: mousedown event](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mousedown_event)
> 參閱 [Element: mouseleave event](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseleave_event)
> 參閱 [Element: mouseup event](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseup_event)
> 參閱 [Element: mouseover event](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseover_event)

### 4. 針對不同滑鼠事件撰寫

主要處理的重點在 `mousedown（滑鼠點擊）` 和 `mousemove（滑鼠移動）` 這二個事件。

#### mousedown

##### event 參數

`function()` 中代入的參數 `e`，代表 `event`，透過這個方法可以得到當事件發生時，發生事件的元素上的各種資訊。

滑鼠按下時我們要套用一個已經寫好的 `.active` css 樣式，並且帶入參數 `e` 去取得頁面座標 `e.pageX`

```css
.items.active {
  background: rgba(255, 255, 255, 0.3);
  cursor: grabbing;
  cursor: -webkit-grabbing;
  transform: scale(1);
}
```

```js
/*----------  滑鼠 按鍵點擊  ----------*/
slider.addEventListener('mousedown', e => {
  // 給予按下的 flag
  isDown = true;
  slider.classList.add('active');
  console.log(e);

  // 紀錄 點擊初始位置
  // e.pageX => 整個頁面的 x軸距離
  // slider.offsetLeft => 目前 DOM 位於父元素的 X 座標
  startX = e.pageX - slider.offsetLeft;
  // console.log(startX);

  // 紀錄目前捲軸的左距
  scrollLeftNow = slider.scrollLeft;
});
```

其中 `startX` 這個變數的計算，為什麼不可直接使用 `e.pageX` 呢？ 為何還要扣掉 `slider.offsetLeft`？
原因是滑動捲軸是出現在 `<div class="items">` 身上，而非在整個頁面，所以當然只能計算在 `<div class="items">` 區塊裡，已移動了多少距離。

`pageX、pageY` 是算整個頁面座標位置，滑鼠點中間和點其他位置座標是不一樣的。
`offsetX、offsetY` 是算這個範圍的內容，區塊內的座標。

![](https://images2.imgbox.com/68/e5/Qh2g3gE5_o.jpg)

作者是透過的 `startX = e.pageX - slider.offsetLeft` 方式來取得滑鼠在元素中的位置，但該數值也可是`e.clientX` 的值，原因為點擊元素時，元素的寬度跟可視畫面寬度一樣大小，因此可以透過 `e.clientX` 來抓取。

為什麼要取得現在位置? 因為我們待會需要計算滑鼠移動了多少距離

#### mouseleave、mouseup

先處理簡單的 `mouseleave` 和 `mouseup`，滑鼠移開後要讓 flag `isDown` 狀態 變成 `false`，並取消 `active` 樣式

```js
/*----------  滑鼠 滑出範圍  ----------*/
slider.addEventListener('mouseleave', () => {
  // 取消 flag 狀態與移除樣式
  isDown = false;
  slider.classList.remove('active');
});

/*----------  滑鼠 按鍵放開  ----------*/
slider.addEventListener('mouseup', () => {
  // 取消 flag 狀態與移除樣式
  isDown = false;
  slider.classList.remove('active');
});
```

#### mousemove

計算滑鼠移動多少距離
![](https://images2.imgbox.com/6b/8d/ScxzWonP_o.jpg)

```js
/*----------  滑鼠 拖曳移動  ----------*/
slider.addEventListener('mousemove', e => {
  // 非點擊狀態時，不作用
  if (!isDown) return;

  // 取消預設行為 (點擊且拖移的動作，預設行為是 選取範圍)
  e.preventDefault();

  // 目前位置 = 整個頁面 x 軸距離 - 目前 items 的左邊距離
  const x = e.pageX - slider.offsetLeft;
  // 移動距離 = 目前位置 - 點擊初始位置
  const walk = (x - startX) * 3; // 乘3倍的概念，感覺像增加滑鼠的敏感度

  // 拖曳與移動方向是反向的
  // 設定水平捲軸的偏移量
  slider.scrollLeft = scrollLeftNow - walk;
});
```

移動事件中要判斷 flag `isDown` 狀態，判斷滑鼠是否為按下，否則就結束。

再來取得滑鼠在元素中的位置 `e.pageX - slider.offsetLeft` 並將目前取得的滑鼠位置與 `mousedown` 事件取得的滑鼠位置相減，計算出水平位移。

因為拖曳與移動方向是反向的。所以當滑鼠向左移會取得負值，向右移會取得正值，將取得數值與 `mousedown` 事件取得的元素左邊位移數值相減，取的目前位移多少。

屬性 `scrollLeft` 可以讀取或設定元素滾動到元素左邊的距離。正是用來設定（或顯示） X 滾軸當前位置。
而 `(x - startX) * 3` 則是希望拖曳的距離可以拉長，所以乘以 3，如果你覺得不夠也可以乘以更大的數字。

最後將水平捲軸改為隱藏 `overflow-x: hidden`，即可完成!

```css
.items {
  height: 800px;
  padding: 100px;
  width: 100%;
  border: 1px solid white;
  /* overflow-x: scroll; */
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  transition: all 0.2s;
  transform: scale(0.98);
  will-change: transform;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  font-size: 0;
  perspective: 500px;
}
```

> 參閱 [Element.scrollLeft](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollLeft)

### 5. CSS 細節

看範例我們會注意到所有 `item` 橫著排列但角度卻不太相同，宛如手風琴，那是由於使用了 CSS 3D 配上 `transform: rotateY` 的效果。CSS 如下：

```css
.items {
  perspective: 500px;
}

.item:nth-child(even) {
  transform: scaleX(1.31) rotateY(40deg);
}
.item:nth-child(odd) {
  transform: scaleX(1.31) rotateY(-40deg);
}
```

`rotateY` 就是讓元素繞著 Y 軸旋轉的意思。然而，純粹使用 `transform: rotateY`， 物件會變形，但是看起來卻像是元素的面積在變化而已，沒有立體感，那是由於我們缺乏一個觀察這個 3D 變化的「透視角」。

透視角 `perspective` 的功用，它會模擬在 3D 空間內看東西的距離感。也是 2D 和 3D 之間的差別。
`perspective` 可以設定我們在距離多遠的地方觀看 3D 元素。若沒有加上 `perspective`，我們就像在無窮遠的地方看著元素一樣，即使有Ｙ軸翻轉，看起來也像是平面。

> 參閱 [perspective](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)
> 參閱 [rotateY()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/rotateY)
