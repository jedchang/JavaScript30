# 07 - Array Cardio Day 2

![image](https://img.shields.io/badge/JavaScript30-exercise-brightgreen.svg)

![](https://images2.imgbox.com/f1/e9/u2OW6yX8_o.jpg)

## 主題

---

使用 `some()`、`every()`、`find()`、`findIndex()`、ES6 展開運算子 `[...]`、`slice()` 等陣列語法，透過 4 個範例來使用各種操作。

## 步驟

---

#### 共二組可使用的資料：

1. people：[ { name: 'string', year: number } ]
2. comments：[ {text: 'string', id: number } ]

#### 題目內容：

1. people 中是否有 19 歲以上的人?
2. people 中是否每個人都 19 歲以上?
3. 在 comments 資料中，找到 id：823423 的資料
4. 在 comments 資料中，找到 id:823423 的資料索引值，並透過索引值刪除這筆資料

## 語法 & 備註

---

### some()

題目 1：people 中是否有 19 歲以上的人?

```javascript
const isAdult = people.some(function(person) {
  const currentYear = new Date().getFullYear();
  if (currentYear - person.year >= 19) {
    return true;
  }
});
```

ES6 箭頭函式：如果有大括號 {} 要補上 return

```javascript
const isAdultES6 = people.some(person => {
  return new Date().getFullYear() - person.year >= 19;
});
```

- some() 陣列比對：只要有一個元素是 true，就返回 true
- 陣列裡面有沒有某一個東西，有就會回傳索引數，找不到就會回傳 -1
- 會修改原有的陣列

> 參閱 [Array.prototype.some()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

### every()

題目 2：people 中是否每個人都 19 歲以上?

```javascript
const allAdults = people.every(function(person) {
  const nowYear = new Date().getFullYear();
  if (nowYear - person.year >= 19) {
    return true;
  }
});
```

ES6 箭頭函式：如果有大括號 {} 要補上 return

```javascript
const allAdultsES6 = people.every(person => {
  return new Date().getFullYear() - person.year >= 19;
});
```

- every() 陣列比對：所有元素都是 true 才是 true

> 參閱 [Array.prototype.every()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

### find()

題目 3：在 comments 資料中，找到 id：823423 的資料

```javascript
const ansFind = comments.find(function(comments) {
  // function 中 comments 為查找元件名稱，不是自定義名稱
  if (comments.id === 823423) {
    return true;
  }
});
```

ES6 箭頭函式：如果有大括號 {} 要補上 return

```javascript
const ansFindES6 = comments.find(comments => {
  return comments.id === 823423;
});
```

- find() 函式用來尋找目標元素，找到就返回該元素 (第一個符合)，找不到返回 undefined。
- find 與 filter 很像，但 find 只會回傳一次值，且是第一次為 true 的值。

> 參閱 [Array.prototype.find()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

### findIndex()、slice()、ES6 展開語法

題目 4：在 comments 資料中，找到 id:823423 的資料索引值，並透過索引值刪除這筆資料

```javascript
const indexES6 = comments.findIndex(comments => {
  return comments.id === 823423;
});

const newComments = [...comments.slice(0, indexES6), ...comments.slice(indexES6 + 1)];
```

- findIndex()：函式也是尋找陣列中符合的元素，並返回其 index (索引) 且第一個符合，找不到就返回 -1。
- slice()：取得範圍 (切割、擷取陣列)，但會產生新的陣列。
- ES6 展開運算子 => 可以把陣列中的元素取出

> 參閱 [Array.prototype.findIndex()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
> 參閱 [Array.prototype.slice()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
> 參閱 [Spread syntax](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
