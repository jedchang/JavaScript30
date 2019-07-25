# 16 - Mouse Move Shadow

![image](https://img.shields.io/badge/JavaScript30-exercise-brightgreen.svg)

![](https://images2.imgbox.com/71/1c/wNzVOkmt_o.jpg)

## 主題

滑鼠移動時，讓文字陰影（textShadow）跟著移動的效果。並了解 ES6 的解構賦值的用法。

## 步驟

### 1. 目標對象、設定基本偏移量

取得外層與文字區域的元件。並且設定陰影偏移基準範圍。

```js
let hero = document.querySelector('.hero');
let text = document.querySelector('h1');
let walk = 100; // 設定 text-shadow 座標最大的偏移範圍
```

### 2. 陣列的解構賦值

透過解構賦值取得 `hero` 的寬、高和滑鼠座標，`e` 裡面的 `offsetX`、`offsetY`

```js
hero.addEventListener('mousemove', function(e) {
  // 傳統取值方法
  let x = e.offsetX;
  let y = e.offsetY;

  // ES6 物件解構取值 簡寫
  let { offsetX, offsetY } = e;
  // ES6 物件解構取值 完整寫法
  let { offsetX: x, offsetY: y } = e;

  // 傳統取值方法
  let width = hero.offsetWidth;
  let height = hero.offsetHeight;

  // ES6 物件解構取值 簡寫
  let { offsetWidth, offsetHeight } = hero;
  // ES6 物件解構取值 完整寫法
  let { offsetWidth: width, offsetHeight: height } = hero;
});
```

### 3. offset、座標計算、陰影位移

要特別留意的是 `offsetLeft`, `offsetTop`, `offsetWidth`, `offsetHeight` 是 **Element** 的屬性。而 `offsetX` 和 `offsetY` 是 **Event** 的屬性。

#### Element 屬性

- `offsetLeft`, `offsetTop` 指該 element 到 offsetParent 的距離。
- `offsetWidth`, `offsetHeight` 指該 element 的寬高。

> 參閱 [HTMLElement.offsetTop](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetTop)

#### Event 屬性

- `offsetX`, `offsetY`，指滑鼠到外層容器的距離。

取得滑鼠的座標，offsetX 與 offsetY 回傳的座標，是以「目前 DOM box model 區塊範圍」為主，回傳滑鼠座標位於「目前的 DOM 區塊範圍」的哪裡，用 `this` 和 `e.target` 查看就知道範圍有所不同! 另外 DOM 與 DOM 重疊的話，依舊是分開計算。

此範例 hero 和 h1 是重疊，所以需要再加上目標座標值。

![](https://images2.imgbox.com/0d/98/Wk6Lsu9r_o.jpg)

#### 座標計算

因為若滑鼠從父元素移到子元素的話，offsetX 與 offsetY 會歸 0 重新計算。所以需要將父元素與子元素之間座標的落差補足，判斷如果在目標區域外，則在加上目標座標。

```js
// 如果 this (hero) 和 e.target (h1) 目標對象不一樣
if (this !== e.target) {
  // 目前 DOM 滑鼠的 X 座標 + 目前 DOM 位於父元素的 X 座標
  offsetX += e.target.offsetLeft;
  // 目前 DOM 滑鼠的 Y 座標 + 目前 DOM 位於父元素的 Y 座標
  offsetY += e.target.offsetTop;
}
console.log(offsetX, offsetY);
```

> 參閱 [MouseEvent.offsetX](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/offsetX)

#### js & jQuery 寫法

- js：`element.offsetTop`、`element.offsetLeft`
- jQuery：`$('element').Offset().top`、`$('element').Offset().left`

#### 陰影位移

要讓滑鼠上下位置滑動，造成陰影偏移，偏移量的值=100，固範圍需要 -50 ~ 0 ~ 50。

`(座標在 hero 的比例 * 最大偏移量的值) - (一半的最大偏移量的值)`

- (offsetX / offsetWidth)：可以取得當前滑鼠 X 在 offsetWidth 的百分比，此時原點在畫面左上角。
- ((offsetX / offsetWidth) \* walk) - walk / 2：可以讓原點變成在畫面中心。已就是取得 -50 ~ 0 ~ 50 範圍。
- 最後在整數化 Math.round()

最後再用 js 改變 `text-shadow` 屬性樣式，

```css
/* offset-x | offset-y | blur-radius | color */
text-shadow: 1px 1px 2px black;
```

```js
let xWalk = Math.round((offsetX / offsetWidth) * walk) - walk / 2;
let yWalk = Math.round((offsetY / offsetHeight) * walk) - walk / 2;

text.style.textShadow = `
  ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.3),
  ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.3),
  ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.3),
  ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.3)
`;
```

> 參閱 [text-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)

## 語法 & 備註

### this 和 e.target 差異

- `this`：總是會拿到被監聽的對象本身，也就是 element.addEventListener(<eventHandler>) 的 element。
- `e.target`：則是指事件被觸發時的對象，有可能不是 element 本身。

```js
const hero = document.querySelector('.hero');
hero.addEventListener('mousemove', moveShadow);

function moveShadow(e) {
  console.log('this', this); // 回傳的一定是 ".hero"
  console.log('e', e.target); // 回傳的可能是 ".hero" 也可能是 "h1"
}
```

### offsetX, clientX, pageX, screenX 的區別

- `offsetX`：意為偏移量，是事件物件距左上角為參考原點的距離。以元素盒子模型的內容區域的左上角為參考點。不包括 border。
- `clientX`：事件物件相對於瀏覽器視窗可視區域的 X、Y 座標(視窗座標)，可視區域不包括工具欄和滾動條。
- `pageX`：事件物件相對於整個文件的座標以畫素為單位。
- `screenX`：事件物件相對於裝置螢幕的左上角的座標，當改變螢幕的解析度的時候，座標會隨之改變。

### 物件解構賦值

解構賦值 (Destructuring assignment) 透過解構賦值，可以把直接把物件或陣列中的值塞入變數中。

物件解構也是和陣列解構有著相同的概念，只不過陣列是使用順序的索引值對應，但物件則是使用物件的屬性名稱來做對應(因此沒有順序性)。在以下範例則是快速將物件值解構在變數上。

```js
let family = {
  ming: '小明',
  jay: '杰倫'
};

// 一般會這樣寫
let ming = family.ming;
let jay = family.jay;

// 縮寫版
let { ming, jay } = family;
// ming: 小明
// jay: 杰倫
```

而物件的解構方法，還能重新賦予變數的名稱，如以下 `Ginyu` 在取得值後，將變數名稱改為 `Goku`，因此 `Goku === '基紐'`。

```js
let GinyuTeam = {
  Ginyu: '基紐',
  Jeice: '吉斯',
  burter: '巴特'
  // ...
};
let { Ginyu: Goku } = GinyuTeam; // Goku: '基紐'
```

**在物件解構賦值中，冒號前是用來對應物件的屬性名稱，冒號後才是真正建立的變數名稱和被賦值的對象。**

> 參閱 [解構賦值](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
> 參閱 [鐵人賽：ES6 解構賦值](https://wcc723.github.io/javascript/2017/12/25/javascript-destructuring/)
> 參閱 [ES6 物件解構賦值](https://pjchender.blogspot.com/2017/01/es6-object-destructuring.html)

### Math.round()、Math.floor()、Math.ceil()

- `Math.round()` 函數回傳**四捨五入**為最接近的整数。

```js
alert(Math.round(25.9)); //26
alert(Math.round(25.5)); //26
alert(Math.round(25.1)); //25
```

- `Math.floor()` 函式會回傳**向下捨入**為最接近的整数。(floor => 地板、向下 )

```js
alert(Math.floor(25.9)); //25
alert(Math.floor(25.5)); //25
alert(Math.floor(25.1)); //25
```

- `Math.ceil()` 函式會回傳**向上捨入**為最接近的整数。(ceil => 天花板、向上)

```js
alert(Math.ceil(25.9)); //26
alert(Math.ceil(25.5)); //26
alert(Math.ceil(25.1)); //26
```

> 參閱 [Math.round()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
> 參閱 [Math.floor()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
> 參閱 [Math.Math.ceil()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)
