# 13 - Slide in on Scroll

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/0c/28/9Ep0DzhO_o.jpg)

## 主題

當視窗捲軸滾動到「特定定點」時，觸發圖片滑動顯示效果。

## 步驟

### 1. 設定

已預先在所有圖片中加入 class 屬性動畫：

- align-right / align-left：滑入效果用。
- slide-in：已經將相關的動畫滑入效果寫好。
- slide-in.active：觸發執行動畫。

### 2. 觸發條件、偵聽滾動事件

滾動效果，所以要監聽的是整個視窗（window），事件選用 `scroll`。
因為使用 `scroll` 來操作時，每次滾動都會有大量事件被觸發，也就是連續觸發事件。
所以作者使用了 `debounce` 來使觸發間隔為 20 毫秒以上，來做滾動時的等待而減緩觸發，不希望連續觸發來降低重複事件的觸發，以降低對效能上的影響。

但是在快速滾動時，會導致有些事件不會觸發!! 所以個人不是很喜歡...

```js
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function checkSlide() {
  // 略
}
```

將 debounce 函式加入到監聽事件內，就會寫成 `window.addEventListener('scroll', debounce(checkSlide));`

> 參閱 [scroll](https://developer.mozilla.org/zh-TW/docs/Web/API/Document/scroll_event)
> 參閱 [網頁 DOM 事件的效能優化](https://mropengate.blogspot.com/2017/12/dom-debounce-throttle.html)
> 參閱 [throttle 與 debounce](https://blog.camel2243.com/2017/06/05/javascript-throttle-%E8%88%87-debounce%EF%BC%8C%E8%99%95%E7%90%86%E9%A0%BB%E7%B9%81%E7%9A%84-callback-%E5%9F%B7%E8%A1%8C%E9%A0%BB%E7%8E%87/)

### 3. 各種高度的取得及運用

`img.offsetTop` 可以取得元素離父層元素的距離，此時的父層元素為 `<body>` 透過這樣的方式可以取得元素頂點離網頁最上方的距離。
`window.innerHeight` 是指螢幕畫面的高度，要得到螢幕的下方位置是用`window.scrollY + window.innerHeight`。

判斷何時為圖片加上 `.active` 來作為觸發進入點。
圖片位置可以是上方、中間、下方，但最理想的情況是滾動到圖片中間時才觸發，因此需要加上圖片高度的一半 `img.height / 2` 來做條件判斷。

而且當圖片中間位置大於捲軸垂直位置時，移除 `.active`

```js
images.forEach(img => {
  // 圖片中間位置 = 圖片的頂部距離 + 圖片高的一半
  let imgMiddle = img.offsetTop + img.height / 2;
  // 如果 圖片中間位置 < 視窗高度 而且 圖片中間位置 > 捲軸垂直移動位置
  if (imgMiddle < windowBottom && imgMiddle > windowTop) {
    img.classList.add('active');
  } else {
    img.classList.remove('active');
  }
});
```

> 參閱 [Window.innerHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerHeight)
> 參閱 [HTMLElement.offsetTop](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop)

### 4. scroll vs. debounce

比較 scroll 與 debounce 兩者觸發效果。
因為作者有加入 debounce，但在快速捲動時會出現不觸發等情形。要特別注意...

只要將 `debounce` 函式加到偵聽裡面，再將 `scrollHandler` 當參數傳入即可! **`scrollHandler()` 不需加括號**，因不是直接調用。

```js
window.addEventListener('scroll', debounce(scrollHandler));
```
