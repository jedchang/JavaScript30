# 17 - Sort Without Articles

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/ac/9e/7LE1XGHz_o.jpg)

## 主題

使用 sort 和 RegExp 方法，省略某些關鍵字後將陣列做排序。

## 步驟

### 1. 使用正則表達式來過濾某些字元

使用 `replace()` 替換，並搭配正則表達式來將包含了 a、the、tan 開頭的文字取代為空陣列 `('')` 並清除頭尾空白字元 `trim()`。

- `/^(a |the |an )/`：`^` 就是開頭含有 a、the、an 的字串。
- `i`：修飾符 i 就是 ignoreCase 執行對大小寫不敏感的匹配。
- `g`：修飾符 g 就是 global 執行全局匹配。

整體的意思就是 **"過濾開頭含有 a、the、tan 且不分大小寫字串!"**

```js
function strip(bands) {
  let regexp = /^(a |the |an )/i;
  return bands.replace(regexp, '').trim();
}
```

#### charCodeAt 字串編碼

使用 `charCodeAt()` 返回字串第一個 Unicode 編碼

```js
let str = 'HELLO WORLD';
let n = str.charCodeAt(0); // H => 編碼 72
```

> 參閱 [String.prototype.charCodeAt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)

### 2. 陣列的排序

針對陣列資料進行排序，排序方式是依照字元由小排到大。

使用 `sort()` 方法，會對一個陣列的所有元素進行排序，並回傳此陣列。

- 如不帶值，預設是由小到大。
- 函式接受兩個參數，兩者比較，需要回傳值 return。
- 比較兩者時，返回型別只有三種：小於 0 (負數)、等於 0、大於 0 (正數)。一般習慣上使用 -1、0、1 代表。
- 會修改原有的陣列。

```js
// 一般寫法
let sortBands = bands.sort(function(a, b) {
  if (strip(a) > strip(b)) {
    return 1;
  } else {
    return -1;
  }
});

// ES6 箭頭函式 + 三元判斷
// 箭頭單行不用寫 return
let sortBands = bands.sort((a, b) => (strip(a) > strip(b) ? 1 : -1));

console.log(sortBands); // ["Anywhere But Here", "The Bled", "Counterparts", ...]
```

### 3. 將排序後的資料渲染到畫面中

`map()`：

- 對陣列中的各元素進行操作，不會改變原始陣列內容，會產一個新陣列。
- 如果不回傳則是 undefined。
- 回傳數量等於原始陣列的長度。
- 使用 return 返回一個內容。

`join()`：

- 將陣列元素用固定符號串成字串。
- 預設為 `","`，可以使用空字串 `""` 取代。
- 會修改原有的陣列。

排序完後的陣列資料渲染到 HTML 上，使用 `map()` 與 `join()` 來組成 `<li>` 元素。
後面需要 `join('')` 內容為空字串，將原先陣列內容切成字串。

```js
// 一般寫法
document.querySelector('#bands').innerHTML = sortBands
  .map(function(band) {
    return `<li>${band}</li>`;
  })
  .join('');

// ES6
document.querySelector('#bands').innerHTML = sortBands
  .map(band => {
    return `<li>${band}</li>`;
  })
  .join();

// ES6 單行寫法，不給 {} 可以省略 return
document.querySelector('#bands').innerHTML = sortBands.map(band =>`<li>${band}</li>`;).join();
```

## 語法 & 備註

### String.split()、Array.join()

`split()` 與 `join()` 執行的操作是相反的。

- `split()`：分割字串，把一個字串分割成字串陣列。原字串內容不變。
- `join()`：陣列元素用固定符號串成字串。

```js
let str = '123456';
let strSplit = str.split(''); // 分割輸入空字串 => 分開為陣列
console.log(strSplit); // ['1', '2', '3', '4', '5', '6']

let arr = ['a', 'b', 'c', 'd'];
let arrJoin = arr.join(''); // 合併空字串 => 合併為字串
console.log(arrJoin); // "abcd"
```

> 參閱 [String.prototype.split()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)
> 參閱 [Array.prototype.join()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
