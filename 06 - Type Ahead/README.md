# 06 - Type Ahead

![image](https://img.shields.io/badge/JavaScript30-exercise-brightgreen.svg)

![](https://images2.imgbox.com/54/f0/U19Za1pQ_o.jpg)

## 主題

---

利用 HTML5 `fetch()` 來取回 json 檔案，並透過 `filter()` 及 `RegExp()` 等語法來製作搜尋即時顯示關聯效果！

## 步驟

---

1. 透過 `fetch()` API 方式，來取得 cities 的資料。
2. 將 cities 的資料過濾出符合條件的資料
   - `filter()`：過濾陣列。
   - `RegExp()`：正則表達式。
   - `match()`：可在字符串內檢索指定的值，或找到一個或多個正則表達式的匹配。
3. 搜尋結果產出，並用 highlight 黃色底色顯示。
4. `toLocaleString()`：將數字加上千分位。

## 語法 & 備註

---

### fetch()

fetch 在使用時看似與 jQuery \$.ajax 挺相近的，所以在使用上也相對容易上手，不過兩者亦有不同概念之處 ([可參考](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch))。

```javascript
const cities = [];
fetch(endpoint)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    cities.push(...data);
  });
```

- 宣告 cities 注意是用 const 常數，所以不能變更。
- 第一個 then 使用 response.json() 來將資料轉成 json 格式。(**此階段我們無法直接讀取回傳的資料內容，所以需要再轉一次，才能使用取得的資料。**)
- 第二個 then 裡面的 data 才是真正的 json 物件，如果沒透過 then 基本上也只是個 Promise 物件而已。並且可以透過 **blob()、json()、text()** 轉成可用的資訊
- 最後面的 `push(...data)` 為 ES6 解構賦值，因為上面宣告陣列為常數 (不能改變)，所以要將取得值在推回去原陣列。

> ES6 箭頭涵式如果帶有括號 {}，必須自己補上 return

```javascript
function displayMatches() {
  // trim() 將取得的值，去頭尾空白。
  let filterTxt = this.value.trim();
  let regexp = new RegExp(filterTxt, 'gi');
  let filterArray = cities.filter(function(place) {
    return place.city.match(regexp) || place.state.match(regexp);
  });
  // 略...
}
```

### RegExp()

`new RegExp()` 正規表達式，篩選過濾 `g` (代表全部)，`i` (代表不分大小寫)。

### filter()

輸入框中過濾篩選出 json 中符合條件的 city 或 state 的地區。
用 filter 來過濾陣列，並且會**產生新的陣列**，參數 place 為自定義名稱，filter 需要 return。

### match()

`str.match(regexp)` 的回傳值。符合搜索 city 的內容 或者 `||` 符合搜索 state 的內容，兩者只要符合其中一個條件即可。

- 有符合：return 一個 Array (包含符合條件的結果)。
- 無符合：return null

```javascript
function displayMatches() {
  let filterTxt = this.value.trim();
  // 略...
  let html = filterArray
    .map(function(place) {
      let cityName = place.city.replace(regexp, `<span class="h1">${filterTxt}</span>`);
      let stateName = place.state.replace(regexp, `<span class="h1">${filterTxt}</span>`);
      let populationNum = place.population * 1;
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${populationNum.toLocaleString()}</span>
      </li>
    `;
    })
    .join('');

  suggestions.innerHTML = html;
}
```

#### map()

透過 map() 將每一筆資料轉換成 ul 的子元素。需要 **return 產生一個新的陣列**。
.map() 回傳是一個 Array，後面加了 `.join('')`，**將原本是 「Array 的資料轉化成一個字串」**。

#### replace(regexp/substr, value)

replace() 來取代配對值。

- 前面 `regexp` 是要替換的對象。正則或是字串。
- 後面 `<span class="h1">${filterTxt}</span>` 為 ES6 字串模板寫法，為替換的內容。

#### toLocaleString()

獲取的 place.population 為字串，要變成數字才能作千分位。利用 js 是弱型別的特性，**(字串 \* 1 = 會轉為數字)**

- `replace(regexp/substr, value)`
- 取得的 `place.city` 和 `place.state` (也就是等於我們的 this.value) 只是**字串**。
  我們要替他加上 highlight ，範例已經寫好 class 所以我們直接把他們加上 `<span class="hl">`
