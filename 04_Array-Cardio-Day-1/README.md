# 04 - Array Cardio Day 1

![image](https://img.shields.io/badge/JavaScript30-exercise-brightgreen.svg)

![](https://images2.imgbox.com/f2/3c/p6PkNQuw_o.jpg)

## 主題

---

使用 `filter()`、`map()`、`sort()`、`reduce()` 等陣列語法，透過 8 個範例來使用各種操作。

## 步驟

---

#### 共三組可使用的資料：

1. inventors：first (名)、last (姓) 、year (出生日期)、passed (逝世日期)
2. people：逗點分隔的姓名 (firstName, lastName)
3. data：在最後練習中提供的一組包含重覆資料的陣列

#### 題目內容：

1. 過濾出生於 1500~1599 年代的發明者名單
2. 組合一組發明者的名字 (first) 和姓氏 (last)
3. 按出生日期排序發明人，年齡最大到最小
4. 所有發明家們總共活了多少年
5. 按存活的年數/年齡 排序
6. 列出 wiki 巴黎大道所有包含 'de' 的路名
7. 按姓氏字母 last name 順序排列人員
8. 總結 data 內每一個種類的數量

## 語法 & 備註

---

### filter()

題目 1：過濾出生於 1500~1599 年代的發明者名單

```javascript
let bornFilter = inventors.filter(function(inventor) {
  return inventor.year >= 1500 && inventor.year < 1600;
});
```

ES6 箭頭函式：單行沒有大括號{}，可省略 return

```javascript
let bornFilter = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600);
```

- **使用 filter 會產生新的陣列**。
- 會將結果為 `true` 的資料組成新陣列回傳。inventor 為自定義名稱。
- 使用 `console.table(bornFilter)` 印出表格樣式

> 參閱 [Array​.prototype​.filter()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

### map()

題目 2：組合一組發明者的名字 (first) 和姓氏 (last)。

```javascript
let fullName = inventors.map(function(inventor) {
  return inventor.first + ' ' + inventor.last;
});
```

ES6 箭頭函式：

```javascript
let fullName = inventors.map(inventor => inventor.first + ' ' + inventor.last);
```

- **使用 map 會產生新的陣列**。
- 透過 map 來將 first、last 組合並返回一個新陣列。inventor 為自定義名稱。

> 參閱 [Array​.prototype​.map()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

### sort()

題目 3：按出生日期排序發明人，年齡最大到最小。

```javascript
let ordered = inventors.sort(function(a, b) {
  if (a.year > b.year) {
    return 1;
  } else {
    return -1;
  }
});
```

ES6 箭頭函式：加上三元運算子判斷

```javascript
let ordered = inventors.sort((a, b) => (a.year > b.year ? 1 : -1));
```

- sort() 方法將陣列中的元素排列至其應當的位置上並返回到**原來陣列上**
- 比較函數接收兩個參數 a 和 b，其返回值如下：
  - (a, b) 的回傳值 **< 0**：`return -1`，**即 a 排在 b 前面**。
  - (a, b) 的回傳值 **> 0**：`return 1`，**即 b 排在 a 前面**。
  - (a, b) 的回傳值 **== 0**：`return 0`，**即 a、b 不動**。

> return 值： -1 排前面，1 排後面，0 就不動
> 參閱 [Array​.prototype​.sort()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

### reduce()

題目 4：所有發明家們總共活了多少年。

reduce 累加寫法：

```javascript
let totalYears = inventors.reduce(function(total, inventor) {
  return total + inventor.passed - inventor.year;
}, 0);

// 第一次執行：total = 0 (初始預設值), inventor = { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
// 第二次執行：total = 0 + 76 (1955 - 1879), inventor = { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
// 第三次執行：total = 0 + 76 + 84 (1727 - 1643), , inventor = { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
// 略...
```

- 是一個快速把陣列數字累加的方法，不需寫迴圈，會修改原有的陣列。
- `0` 初始預設值。指的是從 0 開始算起。

forEach 寫法：

```javascript
let total = 0;
inventors.forEach(function(inv) {
  total += inv.passed - inv.year;
});
```

> 參閱 [Array​.prototype​.reduce()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

### sort()

題目 5：按存活的年數/年齡 排序

```javascript
let oldest = inventors.sort(function(a, b) {
  return a.passed - a.year - (b.passed - b.year);
});
```

- sort() 方法將陣列中的元素排列至其應當的位置上並返回到**原來陣列上**
- 比較 a 存活時間和 b 存活時間，然後排序。

### Array.from()、map()、filter()

題目 6：列出 wiki 巴黎大道所有包含 'de' 的路名

```javascript
let category = document.querySelector('.mw-category');
let links = Array.from(category.querySelectorAll('a'));
let de = links
  .map(function(link) {
    //取得連結的文字
    return link.textContent;
  })
  .filter(function(streetName) {
    //過濾文字
    return streetName.includes('de');
  });
```

ES6 寫法：

```javascript
let category = document.querySelector('.mw-category');
let links = Array.from(category.querySelectorAll('a'));
let de = links.map(link => link.textContent).filter(streetName => streetName.includes('de'));
```

- `querySelectorAll` 取得的值是 **NodeList** (不是陣列，但很像陣列 Array-like)，想用陣列的方法需要利用 `Array.from()` 轉為陣列，才可以使用陣列提供的方法。
- 接著透過 `Array.from()` 產生我們要的陣列。
- 有了資料後，再透過 `map()` 的方法取出資料。
- 用 `filter()` 過濾/篩選 含有 **'de'** 的路名。

> Array.from() 方法會從類陣列 (array-like) 或是可迭代 (iterable) 物件建立一個新的 Array 實體
> 參閱 [Array​.from()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

### 解構賦值 (Destructuring Assignment)、sort()、split()

題目 7：按姓氏字母 last name 順序排列人員

```javascript
let alpha = people.sort((a, b) => {
  let [aLast, aFirst] = a.split(', ');
  let [bLast, bFirst] = b.split(', ');

  return aLast > bLast ? 1 : -1;
});
```

- sort 對人名排序，會使用到 `split()` 方法，由於 people 的資料都是 ['Beck, Glenn’] 這樣的**逗點字串**，這筆陣列中並沒有分出 last name 或 first name 要取得 lastName 就必須要使用 `split()` 來切開。
- `split()` 會返回陣列，所以宣告了陣列 `[aLast, aFirst]` 來接值，這是 **ES6 中的解構賦值**用法。

> 參閱 [String​.prototype​.split()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)
> 參閱 [解構賦值](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

### reduce() 累加總數

題目 8：總結 data 內每一個種類的數量

```javascript
const data = [
  'car',
  'car',
  'truck',
  'truck',
  'bike',
  'walk',
  'car',
  'van',
  'bike',
  'walk',
  'car',
  'van',
  'car',
  'truck'
];

let transportation = data.reduce(function(obj, item) {
  // 如果 obj 裡面沒有該項目，就設為 0
  if (!obj[item]) {
    obj[item] = 0;
  }
  // obj 裡面的項目 +1
  obj[item] += 1;
  return obj;
}, {}); // {} 初始值為空物件累加

console.table(transportation);
```

- reduce() 累加：我們會有一個暫存值，進入陣列去跟每個值做運算，最後回傳這個暫存值。
- 利用預設值將 `reduce()` 的第一個參數設定為空物件 `obj={}`。
- 因為只有一開始 **obj[item] 會是空值**，後面就會 `+=1`，所以他只會跑一次。
