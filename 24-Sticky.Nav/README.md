# 24 - Sticky Nav

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/df/14/84SnZNMX_o.jpg)

## 主題

透過計算高度、position:fixed 屬性等，完成滾動後固定選單功能。

## 步驟

### 1. 對 CSS 增加樣式 fixed-nav

增加 CSS 中的 `position: fixed` 的功能。搭配 js 後滾到特定位置才會觸發。
另一種做法直接使用 `position: sticky` 也可完成。

```css
/* 當有 fixed-nav 時，把 site-wrap 縮放回 1，讓整體有放大效果 */
.fixed-nav .site-wrap {
  transform: scale(1);
}

/* 當有 fixed-nav 時，把 nav 固定，並加上陰影*/
.fixed-nav nav {
  position: fixed;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.1);
}
```

> 參閱 [position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

### 2. 取得頁面元素、偵測選單到頂部的高度

取得 nav 元素，並且取得導覽列 nav 離網頁最上方的距離。

所以要先知道當滾動至哪個距離時會開始生效，這裡有兩個辦法:

- header 的高度 `offsetHeight`
- nav 與網頁頂部的距離 `offsetTop`

這邊使用第二種方法

```js
// 取得 nav 元素
let nav = document.querySelector('#main');

// 取得 nav 與網頁頂部的距離
let topOfNav = nav.offsetTop;
```

### 3. 監聽滾動 scroll 事件

取得網頁向下捲動的距離 `window.scrollY`，加入判斷當向下捲動的距離 `>=` 導覽列 nav 的距離時，將 `body` 加入固定住的 class name。

為何會把 `.fixed-nav` 這個 class 加到 `body` 而不是 `nav`?
是因為如果是加到 `nav`，那晚點要操作其他元素時會很不方便（需要向上一層 -> 接著再找要設定的元素），綁在 `body` 並透果選取器選到要設定樣式的元素會較恰當。

```js
// fixNav
function fixNav() {
  console.log(window.scrollY); // scrollY 垂直捲軸
  if (window.scrollY >= topOfNav) {
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
  }
}

// 監聽 scroll 事件，並觸發 fixNav
window.addEventListener('scroll', fixNav);
```

### 4. 修正原本 DOM 元素 offsetHeight 高度問題

滾動後效果出來，但此時會生一個小問題，就是當 `nav` 變成 `position: fixed` 時它浮起來了，換另一種方式講就是 `nav` 變得不佔據 HTML 的空間，也因此下方的元素就跑上去了。

因此為了避免這個問題的發生，所以要把 `nav` 的高度加回去在 `body` 的 `padding-top`。
這邊 `nav` 的高度為 `80px`，所以固定時會變成 `padding-top: 80px`。
這裡要注意千萬不要在 CSS 寫死值，要是之後 `nav` 高度改變會變得很難修改。應該說當一個元素的值可能變動時都不要寫死值，而是要用變數的方式使之更有彈性。

```js
// 將 paddingTop 設定為 nav 的高度 (offsetHeight)
// 一般 字串組合
document.body.style.paddingTop = nav.offsetHeight + 'px';
// ES6 字串模板
// document.body.style.paddingTop = `${nav.offsetHeight}px`;

// 解除固定時，將 paddingTop 回復成原本的樣式
document.body.style.paddingTop = 0;
```

### 5. 新增 resize 來判斷畫面有無改變 (RWD 變版時)

針對 RWD 變版時，去偵聽有無 `resize`，來判斷高度是否改變。若有改變則重新設定 `nav.offsetTop` 距離。

```js
// 監聽 resize 事件，來判斷高度是否改變
window.addEventListener('resize', function() {
  // 重新設定 nav.offsetTop 距離。
  topOfNav = nav.offsetTop;
});
```

### 6. 加入 Logo 效果

到這裡功能差不多做完了，但如果 HTML 看得仔細的話會看到 `nav ul` 當中第一項的 `li` 是沒有在畫面上的，這是因為 CSS 設定 `max-width: 0` 所以看不到，而我要把它加回去。

```css
/* 當有 fixed-nav 時，把 logo 寬度增加*/
.fixed-nav li.logo {
  max-width: 500px;
}
```

透過更改 `max-width` 屬性，現在當滾動至一定位置，logo 出現了。

## 語法 & 備註

### offsetTop

`HTMLElement.offsetTop` 當前元素頂部距離最近父元素頂部的距離，和有沒有滾動條沒有關系。單位 px，只讀元素。

![](https://images2.imgbox.com/43/6a/y2j5IkGm_o.jpg)

> 參閱 [HTMLElement.offsetTop](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop)

### scrollTop

`Element.scrollTop` 代表在有滾動條時，滾動條向下滾動的距離也就是元素頂部被遮住部分的高度。在沒有滾動條時 `scrollTop == 0` 恒成立。單位 px，可讀可設置。

![](https://images2.imgbox.com/0c/08/Q9xuTpcz_o.jpg)

> 參閱 [Element.scrollTop](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop)

### offsetHeight

`HTMLElement.offsetHeight` 包括 padding、border、水平滾動條，但不包括 margin 的元素的高度。
對於 inline 的元素這個屬性一直是 0，單位 px，只讀元素。

![](https://images2.imgbox.com/f4/45/Ecw5AuDU_o.jpg)

> 參閱 [HTMLElement.offsetHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight)

### clientHeight

`Element.clientHeight` 包括 padding 但不包括 border、水平滾動條、margin 的元素的高度。
對於 inline 的元素這個屬性一直是 0，單位 px，只讀元素。

![](https://images2.imgbox.com/39/01/4VdjDTqS_o.jpg)

> 參閱 [Element.clientHeight](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight)
