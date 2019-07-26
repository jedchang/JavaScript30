# 10 - Hold Shift and Check Checkboxes

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/33/16/utjrAE6c_o.jpg)

## 主題

使用 `shift + 滑鼠點擊` 完成連續區間範圍勾選項目。

## 步驟

### 1. 設定

- 使用 `querySelectorAll('.inbox input[type="checkbox"]')` 將畫面中的 checkbox 選取，因為所選取的不是陣列，但此範例需要用完整的陣列功能，因此使用 `Array.from` 將它轉為真正的陣列。
- 設置一個變數紀錄 `let lastChecked` 作為上一個勾選後的紀錄使用。
- 設置一個變數紀錄 `let nowChecked` 作為目前勾選後的紀錄使用。
- 將上一個到目前勾選做一個區間的判斷。

> 參閱 [Array​.from()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

### 2. 事件觸發

- 將所選取的 checkboxes 用 `forEach` 將每一個 `input` 加入 `addEventListener('click', clickHandler)` 做滑鼠的點擊偵聽事件。
- 判斷偵聽滑鼠事件中的 `e.shiftKey` 是否為 true，來判斷 shift 鍵是否使用。

### 3. clickHandler

- 判斷是否有觸發 shift 鍵 (true or false)，`e.shiftKey`，並且 lastChecked 不能是空值，表示要有最後的點選才能成為一個範圍區間。lastCheck 若為 0，在 if 判斷中會等於 false，所以後面一定要設值 `!== null`
- 使用陣列功能 `slice()` 判斷，`Math.min` 將較小數值放前面，`Math.max` 將較大數值放後面，比較兩者區間範圍。
- 將切出來範圍做 `forEach`，**checked 有點選的為 true**

```js
(function() {
  const checkboxes = Array.from(document.querySelectorAll('.inbox input[type="checkbox"]'));
  let lastChecked = null;

  function clickHandler(e) {
    if (this.checked) {
      if (e.shiftKey && lastChecked !== null) {
        let nowChecked = checkboxes.indexOf(this);
        checkboxes.slice(Math.min(nowChecked, lastChecked), Math.max(nowChecked, lastChecked)).forEach(input => {
          input.checked = true;
        });
      }

      lastChecked = checkboxes.indexOf(this);
    } else {
      lastChecked = null;
    }
  }

  checkboxes.forEach(input => {
    input.addEventListener('click', clickHandler);
  });
})();
```

## 語法 & 備註

### indexOf()

indexOf 主要用於取的陣列的索引位子。

- 陣列裡面有沒有某一個東西，有就會回傳索引數，找不到就會回傳 -1
- 會修改原有的陣列

```js
var ary = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
ary.indexOf(7); // 6
```

> 參閱 [Array.prototype.indexOf()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

### slice()

slice 與 splice 有點類似，也是取得範圍 (切割、擷取陣列)，但是 slice 可以從特定範圍變成一個新陣列。

```js
arr.slice([begin[, end]])
```

begin：起始值。begin 會擷取到、
end：到哪一個之前停止擷取。end 不會擷取到、
擷取陣列的某一個區段
當只想要某個索引數到某個索引數之間的東西 就可以用 slice
他也可以複製你的陣列，但僅能做淺層複製，稍微複雜如 [{abc:1},{abc:2}] 就沒辦法
需做深層複製可參考 lodash deep clone array
會產生新的陣列

> 參閱 [Array​.prototype​.slice()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
