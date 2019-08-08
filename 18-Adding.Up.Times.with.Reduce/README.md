# 18 - Adding Up Times with Reduce

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/ef/d4/u3f2zKWJ_o.jpg)

## 主題

使用 map 和 reduce 方法，將時間做累加計算。

## 步驟

### 1. 取得全部的時間值

#### querySelectorAll 選取方式

時間資訊利用 HTML dataset 方式放在 `<li>` 標籤屬性裡面，透過 querySelectorAll 來取得所有的數量。有以下幾種方法選取：

**選取屬性 data-time**

```js
let timeNodes = document.querySelectorAll('[data-time]');
let timeNodes = document.querySelectorAll('li[data-time]');
```

**選取標籤 li**

```js
let li = document.querySelectorAll('li');
```

> 參閱 [Element.querySelectorAll()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/querySelectorAll)

#### 把 Array-like 的 Node 元素轉成 Array（Array-like to Array）

但取得的是 NodeList 它是 Array-like 的物件，而不是真的 Array，因此他沒有 Array.prototype.map 這個 function 可以使用，因此我們需要先把它轉成 Array，有以下幾種方法：

**Array.from**

```js
let liAry = Array.from(li);
```

**ES6 展開運算子 (spread operator)**

```js
let liAry = [...li];
```

比較兩者：上面是 NodeList，下面是 Array

![](https://i.imgur.com/pLmh2Gq.jpg);

#### 將取得值用 map() 建立新陣列

取得每個 `<li>` 中的 dataset 值，再用 map 建立新陣列。

![](https://i.imgur.com/tPJwZHQ.jpg);

```html
<li data-time="4:04">
  Video 58
</li>
```

```js
let liAry = [...li].map(item => {
  return item.dataset.time;
});

console.log(liAry);
```

### 2. 陣列的解構賦值，取出秒數

轉成真正陣列後，然後再在用一次 `map()` 建立新陣列，用陣列的解構賦值取出秒、分、時。
再用 `split()` 分割字串，將**字串 "5:43"** 切開為 **["5", "43"]** 這時還是字串。
然後計算時間轉換成秒數 5:43 變成 343 秒

#### 將時間字串轉成數字

因為這時取得的陣列值還是字串，若直接回傳 `min * 60 + sec` 會出現，字串相加。
`"5:43"` 變成 `"300":"43"`，分的秒 + 秒的秒 = `"30043"`，這不是我們要的總秒數。

![](https://i.imgur.com/wBtpY06.jpg);

```js
let timeCode = liAry.map(time => {
  const [min, sec] = time.split(':'); // "5:43" => ["5", "43"]
  return min * 60 + sec; // 回傳會變成字串相加
});
```

有以下幾種方法轉換：

**sec 乘以 1 轉型**

```js
let timeCode = liAry.map(time => {
  const [min, sec] = time.split(':');
  return min * 60 + sec * 1; // sec * 1 轉型，弱型別，乘以數字會變成數字
});
```

**parseInt、parseFloat 等**

```js
let timeCode = liAry.map(time => {
  const [min, sec] = time.split(':');
  return parseInt(min * 60) + parseInt(sec); // parseInt 轉數字
});
```

時間還是字串。Chrome 中是紅色且有雙引號。

![](https://i.imgur.com/tPJwZHQ.jpg);

時間已經變數字。Chrome 中是籃紫色這是沒有雙引號。

![](https://i.imgur.com/JHf80sE.jpg);

#### 將上述做連貫寫法

將上面多段 map 做連貫寫法

```js
let totalTime = [...li]
  .map(item => {
    return item.dataset.time;
  })
  .map(time => {
    const [min, sec] = time.split(':');
    return min * 60 + sec * 1;
  });

console.log(totalTime);
```

### 3. reduce() 加總所有陣列中的秒數

用 `reduce()` 加總所有陣列中的秒數，`reduce()` 中的兩個參數

- second：前一個數值
- currentSecond：從陣列中取得的數值
- 最後是一個初始值 `0`

```js
let totalSeconds = timeCode.reduce((second, currentSecond) => {
  return second + currentSecond;
}, 0);

console.log(totalSeconds); // 17938 秒
```

所獲得全部總秒數為 `17938` 秒

### 4. 將總秒數轉成「時：分：秒」

最後需要將獲得的總秒數，換成「時：分：秒」，需要用到 `Math.floor` 無條件捨去，整數化。

`totalSeconds % 3600` 表示扣掉轉換完小時之後所剩下的秒數。

```js
// 1hr = 3600 sec
let hours = Math.floor(totalSeconds / 3600);

// 1 min = 60 sec
// totalSeconds % 3600 表示扣掉轉換完小時之後所剩下的秒數
// 剛剛的 3600 已被小時算過，剩下的就用餘數，然後再除以 60 秒
let mins = Math.floor((totalSeconds % 3600) / 60);

// 剛剛的 3600 已被小時、分鐘算過，剩下的就用餘數
let seconds = (totalSeconds % 3600) % 60;
// let seconds = totalSeconds % 60;

console.log(`${hours}:${mins}:${seconds}`); // 4:58:58
```

**最後時間為 「4：58：58」**

## 語法 & 備註

### Array.from()

方法會從類陣列（array-like）或是可迭代（iterable）物件建立一個新的 Array 實體。
簡單說就是將字串或輸入參數組成陣列。

```js
Array.from([1, 2, 3], x => x + x);
// [2, 4, 6]
```

> 參閱 [Array.from()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

### 展開運算子 spread operator

展開運算子和其餘運算子一樣都是 `...` ，但是在應用的效果上是完全相反的，**展開運算子則是可以把陣列中的元素取出**，而其餘運算子是把許多的參數轉換成一個陣列。

- 語法中的 `...` 就是將陣列內的值一個一個取出來，然後在 return 回去。
- 將 **類陣列 (array-like)** 展開為 **真正陣列**。

```html
<ul>
  <li class="item">1</li>
  <li class="item">2</li>
  <li class="item">3</li>
  <li class="item">4</li>
  <li class="item">5</li>
</ul>
```

```js
// 取得到類陣列
let items = document.querySelectorAll('.item');

// 利用展開成為真正的陣列
let itemsArray = [...items];

console.log(items, itemsArray);
```

> 參閱 [spread operator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### Array.prototype.map()

map() 方法會建立一個新的陣列，其內容為原陣列的每一個元素經由回呼函式運算後所回傳的結果之集合。

對陣列中的各元素進行操作，操作後的值 **會被寫入新的陣列中並返回**。
這很適合將原始的變數運算後重新組合一個新的陣列。

- map 不會改變原始陣列內容，產一個新陣列
- 如果不回傳則是 undefined
- 回傳數量等於原始陣列的長度
- 使用 return 返回一個內容。**(有 return 一般都要一個變數去接這個值)**

```js
var ary = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// item就是每一個值

ary.map(function(item) {
  return item + 1;
});
// [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
```

> map() 與 forEach() 很像，但 map() 會 return 一個值  
> map() 會產生新陣列，但 forEach() 只會修改原陣列
> 參閱 [Array.prototype.map()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

### split()

分割字串，把一個字串分割成字串陣列。原字串內容不變。

```js
var str = 'How are you doing today?';

// 用空格來做分割
console.log(str.split(' ')); // How,are,you,doing,today?

// 用空字串來做分割
console.log(str.split('')); // H,o,w, ,a,r,e, ,y,o,u, ,d,o,i,n,g, ,t,o,d,a,y,?

// 用空格來做分割，且傳回前面 3 個
console.log(str.split(' ', 3)); // How,are,you
```

> 注意：`String.split()` 執行的操作與 `Array.join()` 執行的操作是相反的。
>
> - `split()`：分割字串，把一個字串分割成字串陣列。原字串內容不變。
> - `join()`：陣列元素用固定符號串成字串。
>   參閱 [String.prototype.split()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)
