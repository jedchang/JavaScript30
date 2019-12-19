# 28 - Video Speed Controller

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/6a/c7/Vyx1LMXT_o.jpg)

## 主題

製作出移動特定元素即可控制影片播放速率。

## 步驟

這次要練習的東西與之前所做的播放器有點類似先前的 [11 - Custom Video Player](https://github.com/jedchang/JavaScript30/tree/master/11-Custom.Video.Player)，也是要控制影片的播放速度。主要是把原本 input range 改成一般的 div 滑鼠事件監聽。所以我們要自行計算速率及畫面上的顯示。

### 1. 取得頁面元素

```js
const speed = document.querySelector('.speed');
const bar = document.querySelector('.speed-bar');
const video = document.querySelector('.flex');
```

### 2. 監聽滑鼠事件

由於預期的效果是當滑鼠滑入到 `div.speed` 時更改播放速度，故要將監聽事件綁在 `div.speed` 上

```js
// 滑鼠移動事件
function moveHandler(e) {
  // code here
}

// 監聽滑鼠事件
speed.addEventListener('mousemove', moveHandler);
```

### 3. 取得 y 軸座標的位置

這次的滑動方向是垂直的，因此只需要考慮垂直方向的 Y 座標。
滑鼠位於整頁頂端的 `(Y 軸定位) - (div.speed)` 到整頁頂端的距離，也就是滑鼠與調節器原點距離。

```js
// 滑鼠移動事件
function moveHandler(e) {
  // 滑鼠與調節器原點距離
  const y = e.pageY - this.offsetTop;

  // 進度條所佔的比例 (Y / div.speed 的高度)
  const percent = y / this.offsetHeight;
  console.log(percent);
}
```

![](https://images2.imgbox.com/d2/15/hyZ2PO50_o.jpg)

將比例轉成百分比 用 `Math.round` 來計算取得四捨五入的百分比值。

```js
// 滑鼠移動事件
function moveHandler(e) {
  const y = e.pageY - this.offsetTop;
  const percent = y / this.offsetHeight;

  // 將比例轉成百分比
  const height = Math.round(percent * 100) + '%';
  console.log(height);

  // 將調節器高度寫入
  bar.style.height = height;
}
```

![](https://images2.imgbox.com/57/e3/KaHfho75_o.jpg)

此時滑鼠在調節器上移動，就會跟著拖曳高度。

> 參閱 [HTMLElement.offsetTop](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop)
> 參閱 [HTMLElement.offsetHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight)
> 參閱 [Math.round()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/round)

### 4. 取得播放速度

因為現在 `percent` 直從 0 ~ 1 之間，播放數度是 0 不合乎常理，所以要給於一個正常範圍值，這邊設定為 0.4 ~ 4 的範圍區間。要算一下數學。

將 0 ~ 1 範圍，變更為其他數值範圍計算公式： **(0 ~ 1) \* (最大值 - 最小值) + 最小值**

```js
// 最小值、 最大值
const min = 0.4;
const max = 4;

// 取得播放速率
const playbackRate = percent * (max - min) + min;
```

![](https://images2.imgbox.com/98/c2/OKVc2vwK_o.jpg)

如此計算就可以將 `playbackRate` 的區間設定在 0.4 ~ 4 之間了，再來就剩下調節器上的速率文字跟著改變。

> 參閱 [Element: mouseleave event](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseleave_event)
> 參閱 [Element: mouseup event](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseup_event)
> 參閱 [Element: mouseover event](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/mouseover_event)

### 5. 設定影片播放速度

最後就是設定影片播放速度以及上面的文字顯示速率。
由於希望數字能最多在小數點後 2 位，故使用 `toFixed(2)`，最後再用 `video.playbackRate` 來設定影片速率。

```js
// 滑鼠移動事件
function moveHandler(e) {
  const y = e.pageY - this.offsetTop;
  const percent = y / this.offsetHeight;

  const height = Math.round(percent * 100) + '%';
  console.log(height);

  bar.style.height = height;

  // 最小值、 最大值
  const min = 0.4;
  const max = 4;

  // 取得播放速率
  const playbackRate = percent * (max - min) + min;
  console.log(playbackRate);

  // 用 toFixed(2) 來設定最多取得小數點後兩位，顯示於 speed-bar 上
  // bar.textContent = playbackRate.toFixed(2) + 'x';
  bar.textContent = playbackRate.toFixed(2) + 'x';
  // 控制影片速率
  video.playbackRate = playbackRate;
}
```

#### innerHTML 與 textContent 差別

簡單來說使用 `innerHTML` 會使放入的內容解析為 HTML，帶有 HTML 屬性作用，如果用 `<script>` 寫一段攻擊是會有作用的。

而 `textContent` 是解析為純文字，比較安全。

> 參閱 [Node.textContent](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent)
> 參閱 [HTMLMediaElement.playbackRate](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/playbackRate)
