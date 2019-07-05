# 12 - Key Sequence Detection

![image](https://img.shields.io/badge/JavaScript30-exercise-brightgreen.svg)

![](https://images2.imgbox.com/77/ca/HBxPVwK2_o.jpg)

## 主題

畫面中輸入特定的密碼後，觸發對應的特效。

## 步驟

### 1. 設定

此效果是在瀏覽器中透過鍵盤輸入觸發對應的密碼後執行效果，需要自訂密碼以及一個輸入用的空陣列來儲存鍵盤按下的文字。

#### 變數

```js
// 上, 下, 左, 右, B, A
const secretCode = [38, 40, 37, 39, 66, 65];
const input = [];
```

因為[插件網站](http://www.cornify.com) 也是用 KONAMI 當密碼，輸入一次後就會重複觸發，故不使用此密碼當作觸發條件。

#### 事件

所有的動作當然都是觸發在 `keyup` 後，針對 `window` 對這個瀏覽器視窗來做 `addEventListener` 監聽鍵盤動作。
不使用 `keydown` 來做觸發條件，因為按下後若沒放開會一直重複觸發。

### 2. 比對資料

要將 input 輸入的值加到陣列後並轉為字串，有以下幾種方式

- toString()：返回一個字串，表示指定的陣列及其元素。陣列、物件皆可使用此語法。
- join()：會將陣列，或一個類陣列（array-like）物件，中所有的元素連接、合併成一個字串，並回傳此字串。

```js
const secretCode = [38, 40, 37, 39, 66, 65];

secretCode.toString(); // "38,40,37,39,66,65"
secretCode.join(); // "38,40,37,39,66,65"
secretCode.join('|'); //"38|40|37|39|66|65"
```

比對輸入資料得值是否與密碼一樣，需要先將陣列轉為字串才能進行比對，若符合就觸發裡面的 `cornify_add()` 函式

```js
window.addEventListener('keyup', function(e) {
  input.push(e.keyCode);

  if (input.join() === secretCode.join()) {
    cornify_add();
  }
});
```

> 參閱 [Array.prototype.join()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
> 參閱 [Array.prototype.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)
> 參閱 [Object.prototype.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)

### 3. 重複觸發

因為輸入的陣列中的字元會不停累加上去，這樣的情況下，只允許使用者第一次輸入就輸入正確的目標字串才會觸發函式執行。

若要每次輸入後重複觸發效果，我們必須限制陣列長度與目標字串長度相等，然後讓陣列內容循環，每次輸入新的字元，最舊的字元就要退出陣列。

![](https://i.imgur.com/DmDf9Fo.jpg)

最舊的字元會存在陣列的最前方，最新的則是在最後方。我們希望每次打字都保留「從末端開始，和目標字串相同長度的陣列元素」。

這邊和作者不一樣，作者使用 `splice()` 方法來比對輸入值和密碼值長度。
我們使用 `while` 來判斷當輸入的長度大於密碼長度時，就將輸入的第一個元素移除， **確保輸入的值長度和密碼長度是一致的**，使用到 shift() 方法。

- shift()：此方法會移除並回傳陣列的第一個元素。此方法會改變陣列的長度。

```js
while (input.length > secretCode.length) {
  input.shift(); // 會移除並回傳陣列的第一個元素
}
```

![](https://i.imgur.com/TKo7kqM.jpg)

> 參閱 [Array.prototype.shift()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

## 語法 & 備註

### push()

`push()` 方法會添加一個或多個元素至陣列的末端，並且回傳陣列的新長度。

```js
let animals = ['pig', 'sheep', 'giraffe'];
animals.push('monkey');
console.log(animals); // (4) ["pig", "sheep", "giraffe", "monkey"]
```

> 參閱 [Array.prototype.push()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

### includes()

ES6 語法，`string` 和 `array` 都有 `includes()` 可使用，都是去判斷是否包含 incudes 設定的參數後回傳 `true` 或 `false`

```js
let arr = [1, 2, 3];

console.log(arr.includes(2)); // arr 中有無包含 2: true
console.log(arr.includes(4)); // arr 中有無包含 4: false
```

> 參閱 [Array.prototype.includes()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

### splice()

此函式可以對陣列內容過行刪除或新增。

```js
splice(start, deleteCount, item1, item2, ...)
```

- start：為開始位置，若為負值則會返著數（由陣列尾部開始數），
- deleteCount：為移除數量，若為 0 則不移除、若為負值則沒反應，
- item1：開始的為加入元素，可從第一個參數位置開始塞陣列元素。

```js
var arr = [1, 2, 3];
arr.splice(0, 1); //代表從位置0開始刪除1個元素，arr變成[2,3]
arr.splice(-1, 1); //代表從陣列尾巴第一個開始刪除1個元素，arr變成[1,2]
arr.splice(0, -1); //第二個參數不接受複數，arr不變
arr.splice(0, 1, '4'); //從位置0刪除1個元素，並從位置0塞入'4'，arr變成['4',2,3]
```

作者使用 `splice()` 方法來比對輸入值和密碼值長度。

```js
const input = [];
// secretCode.length = 6
const secretCode = [38, 40, 37, 39, 66, 65];
input.push(e.key);
// (-secretCode.length - 1) 就是 -7 也就是為 0
// 其實就是 input.splice(0, 1)
input.splice(-secretCode.length - 1, input.length - secretCode.length);
```

> 參閱 [Array.prototype.splice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

### keydown、keypress、keyup

- `key`：當按下鍵盤按下後回傳一個代表的鍵盤值。
- `keydown`：當鍵盤被按下去時觸發。
- `keypress`：當鍵盤被按下去時觸發，是要鍵盤會產生字元。
- `keypress`：當鍵盤被放開時觸發。

> 參閱 [KeyboardEvent.key](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key)
> 參閱 [keydown](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/keydown_event)
> 參閱 [keypress](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/keypress_event)
> 參閱 [keyup](https://developer.mozilla.org/zh-TW/docs/Web/API/Document/keyup_event)
