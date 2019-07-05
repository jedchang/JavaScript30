# 09 - Dev Tools Domination

![image](https://img.shields.io/badge/JavaScript30-exercise-brightgreen.svg)

![](https://images2.imgbox.com/22/a0/HT8FOctz_o.jpg)

## 主題

---

介紹 Chrome Dev Tools 開發工具，各種 console 的用法

## DOM BREAK ON

---

介紹 DOM 的中斷點模式，分別有三種觸發模式可選（可複選）

- `subtree modifications`：當子元素點發生變化時
- `arrtibute modifications`：當元素發生變化時
- `node removal`：當元素被移除時

使用方法如下圖，對選取的元素 **右鍵 > Break on > 選擇所需要的模式**

![](https://images2.imgbox.com/cd/11/5O1k0noV_o.jpg)

## CONSOLE

---

### console.log()

正規寫法，大家最常使用的，可以印出指定的字串或是變數。

- `console.log('%s', value)`：%s 會是一個變數，會帶入最後提供的值。
- `console.log('%c', font-style)`：可以改變樣式的，開頭用 %c，之後就跟平常 css 一樣。

ES6 字串模板，可用來替代上述寫法

```js
let txt = 'JavaScript';
console.log(`Hello ${txt}`);
```

### console.warn()

使用 warn 會跳出黃色警告!

```js
console.warn('警告');
```

### console.error()

使用 error 出現紅色的錯誤訊息!

```js
console.error('錯誤!');
```

### console.info()

chrome 改版似乎就取消了，原本會出現資訊圖示 (白字藍底圓的驚嘆號!)

```js
console.info('資訊');
```

### console.assert()

可用來測試判斷是否為真，若條件為 false 時，則回傳對應的錯誤訊息。

```js
function guess(a, b) {
  console.assert(a > b, '錯誤：' + a + ' 沒有比 ' + b + ' 大');
}
guess(10, 1); // 不會秀出訊息
guess(3, 10); // 錯誤：3 沒有比 10 大
```

### console.clear()

清除 console 內的文字，Windows 快捷鍵 `Ctrl + L`

### console.dir()

可顯示出物件的細節資料，如：DOM 元素、Function、prototype...

- log() 印出 dom 的元素
- dir() 印出元素更細節的方法

```js
const p = document.querySelector('p');
console.log(p);
console.dir(p);
```

### console.groupCollapsed() & console.groupEnd()

把輸出資訊透過 group 包起來去做分類，閱讀上似乎會方便些。

```js
console.groupCollapsed('訊息 Group'); // Group 開始
console.log('內文1');
console.log('內文2');
console.log('內文3');
console.groupEnd('訊息 Group'); // Group 結束
```

### console.count()

可顯示累加出現的次數。去計算指定的字樣出現過幾次。

```js
console.count('JS'); // JS: 1
console.count('30'); // 30: 1
console.count('30'); // 30: 2
console.count('JS'); // JS: 2
console.count('30'); // 30: 3
console.count('JS'); // JS: 3
console.count('30'); // 30: 4
```

### console.time() & console.timeEnd()

用來計算程式碼執行時，共花了多少時間去完成。

```js
console.time('花費時間');
fetch('https://api.github.com/users/wesbos')
  .then(function(data) {
    data.json();
  })
  .then(function(data) {
    console.timeEnd('花費時間'); // 花費時間: 962.18798828125ms
  });
```
