# 15 - LocalStorage

![image](https://img.shields.io/badge/JavaScript30-exercise-brightgreen.svg)

![](https://images2.imgbox.com/7f/58/eW4mvN5v_o.jpg)

## 主題

了解 LocalStorage 用法，並使用 LocalStorage 做資料增減動作完成練習。

## 步驟

### 1. 設定
HTML 主架構由一個 `<div class="wrapper">` 包著 `<ul>` 清單列表 與 `<form>` 表單。

### 2. 輸入欄位後的新增功能
`localStorage.getItem()` 取到的是字串，需傳成物件，要用 `JSON.parse()` 把一個 JSON 字串轉換成物件。
假設沒有取到值就用空陣列。items 為自定義名稱，顯示在 localStorage 中的 Key 名稱。

```js
const items = JSON.parse(localStorage.getItem('items')) || [];
```

增加功能 `addItem(e)` 因為是在表單上，所以用 `e.preventDefault()` 避免每次 submit 都會重整網頁。
form 中有兩個 input 欄位，所以用 querySelector 屬性選取器選取 `[name=item]` 的值。
宣告新增要存入的物件，是輸入的文字與是否勾選的狀態 (done)，這邊物件中一樣的名字 `text: text` 可用 ES6 縮寫為 `text`。
記得 `JSON.stringify(items)` 字串化。會將物件轉為字串。
`this.reset()` 為 form 表的重設方法。輸入完後清除。

addItems (表單) 偵聽 `submit` 事件。 
`submit` 是 form 表單做送出的一個事件。然後執行 addItem 函式

```js
function addItem(e){
  e.preventDefault();
  const text = this.querySelector('[name=item]').value;
  const obj = {
    text,
    done: false
  };
  items.push(obj);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
  createList(items, itemsList);
}

addItems.addEventListener('submit', addItem); 
```

### 3. 新增的清單列表，組畫面
將新增的列表顯示在 HTML 中，所以要寫一個 createList function 來顯示。

`createList(data = [], platesList)` 
- 第一個參數`data = []` 是資料。為 ES6 寫法帶入參數 data，若沒有傳入值就用預設值 []。
- 第二個參數 platesList 是要放在 DOM 位置，然後再印出畫面。

`map(plate, i)` 會 return 產生新陣列。
- `plate` 自定義名稱
- `i (index)` 索引

印出的 `<li>` 清單列表中使用三元運算判斷，`${plate.done ? 'checked' : ''}` 如果 plate.done 為 true，就顯示 checked 屬性，不然就沒有。

`join('')` 字串化。例："1, 2, 3" 變 "123"
預設陣列中間會用逗點 `,` 隔開，使用 `join('')` 不帶值，表示不用 `,` 隔開。

#### 增加刪除按鈕
在組字串中新增一個 `<span data-index=${i}></span>` 來當作刪除按鈕

```js
function createList(data = [], platesList) {
  platesList.innerHTML = data
    .map((plate, i) => {
      return `
  <li>
    <input type="checkbox" data-index="${i}" id="item${i}" ${plate.done ? 'checked' : ''} />
    <label for="item${i}">${plate.text}</label>
    <span data-index=${i}></span>
  </li>
`;
    })
    .join('');
}
```

### 4. 切換 checkbox 狀態，刪除按鈕
取得 html 中的 `data-index` 屬性。並使用 `e.target.matches('input')` 判斷是否點擊觸發目標。
`<span>` 刪除按鈕也是一樣，判斷 span 是否為觸發目標。然後做 `splice()` 刪除當前一筆。
最後判斷有符合 input 或 span 其中一個才執行 `setItem()` 寫入儲存。
記得 `JSON.stringify(items)` 字串化。將物件轉為字串再存取。
監聽 itemsList 的 click 動作，來表示是否完成 (done)

```js
function toggleItem(e) {
  let index = e.target.dataset['index'];

  if (e.target.matches('input')) {
    items[index].done = !items[index].done; 

  if (e.target.matches('span')) {
    items.splice(index, 1); 

  if (e.target.matches('input') || e.target.matches('span')) {
    localStorage.setItem('items', JSON.stringify(items)); // 更新 LS 資料
    createList(items, itemsList); // 更新畫面
  } 
}

itemsList.addEventListener('click', toggleItem);
```


### 5. 客制化 Checkbox
作者有預先自訂 checkbox 樣式，將預設 input checkbox 樣式修改

```css
/**
 * 客制化 checkbox
 * 這裡的 checkbox 先把它 display:none
 * 再利用 pseudoElement 的方式添加假的 checkbox
**/
input[type="checkbox"] {
  display: none;
}
input[type="checkbox"] + label:before {
  content: '⬜️';
  margin-right: 10px;
}
input[type="checkbox"]:checked + label:before {
  content: '🌮';
}
/* 增加刪除按鈕樣式 */
.plates span:before {
  cursor: pointer;
  content: '❌';
  font-size: 14px;
  vertical-align: bottom;
}
```

## 語法 & 備註

### LocalStorage、SessionStorage、cookie 差異

LocalStorage：
- 關閉視窗重啟還會存在。不會過期、除非手動清除。
- 大小預設有 5MB
- 每次 request 不會帶上

SessionStorage：
- 單次執行，關閉視窗後即消失。
- 大小預設有 5mb
- 每次 request 不會帶上

cookie：
- 限制大小約 4kb
- 每次 request 時都會帶上。


> 參閱 [Window.localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
> 參閱 [Window.sessionStorage](https://developer.mozilla.org/zh-TW/docs/Web/API/Window/sessionStorage)
> 參閱 [cookies](https://developer.mozilla.org/zh-TW/docs/Mozilla/Add-ons/WebExtensions/API/cookies)


### LocalStorage

localStorage 是瀏覽器儲存在本地端的資料，格式為 `key : value`。
需要注意的是**「value 的型態只有 String」**!

#### setItem 建立
每次呼叫就等於將資料暫存的內容重新刷新一次。

`Storage.setItem('key', 'value')`
- 透過在 `setItem()` 方法中指定物件屬性的 key 以及 value ，我們可以在 storage 物件中加入屬性或修改原本的屬性內容。

#### getItem 取得
取得 localStorage 的內容，可以在 data 容器中存入多筆 JSON 物件。

`Storage.getItem('key')`
- 透過在 `getItem()` 方法中輸入屬性的 key ，我們可以得到 storage 物件對應的屬性 value 。


#### removeItem 移除
將指定的物件暫存刪掉。

`Storage.removeItem('key')`
- 透過 `removeItem()` 方法，我們可以把指定的屬性從 storage 物件中移除。

#### clear 移除
將所有暫存刪掉。

`Storage.clear()`
- 透過 `clear()` 方法，我們可以直接把 storage 中的所有屬性移除。

### 屬性選取器
屬性選擇器是一種特殊類型的選擇器，它根據元素的屬性和屬性值來匹配元素。它們的通用語法由方括號 `[]` 組成。
- `[attr]`：該選擇器選擇包含 attr 屬性的所有元素，不論 attr 的值為何。
- `[attr=val]`：該選擇器僅選擇 attr 屬性被賦值為 val 的所有元素。
- `[attr~=val]`：該選擇器僅選擇具有 attr 屬性的元素，而且要求 val 值是 attr 值包含的被空格分隔的取值列表裡中的一個。

```html
<form class="add-items">
  <input type="text" name="item" placeholder="Item Name" required />
  <input type="submit" value="+ Add Item" />
</form>
```

```js
const text = this.querySelector('[name=item]').value;
```

### join()
`join()` 方法會將陣列（或一個類陣列（array-like）物件）中所有的元素連接、合併成一個字串，並回傳此字串。

`arr.join([separator])`
- separator：用來隔開陣列中每個元素的字串。如果必要的話，separator 會自動被轉成字串型態。如果未傳入此參數，陣列中的元素將預設用英文逗號（「,」）隔開。如果 separator 是空字串，合併後，元素間不會有任何字元。

```js
let ary = [1, 2, 3];
ary.toString(); // "1, 2, 3"
ary.join(""); // "123"
```

> 參閱 [Array.prototype.join()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

### map()
`map()` 方法會建立一個新的陣列，其內容為原陣列的每一個元素經由回呼函式運算後所回傳的結果之集合。

```js
let array1 = [1, 4, 9, 16];
let map1 = array1.map(function(x){
  return x * 2;
}) 

// ES6 箭頭省略 return
let map2 = array1.map((x) => x * 2) 

console.log(map1); // [2, 8, 18, 32]
```

> 參閱 [Array.prototype.map()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

