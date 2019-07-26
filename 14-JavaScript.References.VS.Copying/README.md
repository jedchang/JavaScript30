# 14 - JavaScript References VS Copying

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/29/a1/1RZNCMkw_o.jpg)

## 主題

了解 JavaScript 中陣列與物件的傳址（Reference）與複製（Copying）

## 步驟

### 傳值（by value）、傳址（by reference）

在其他程式語言有語法可以決定要傳值還是傳參考，但在 JavaScript 中沒有選擇，**基本型別就是使用傳值**，**物件型別就是使用傳址**。

- **傳值（by value）**：當我們創造變數並給值（基本型別 Primitive type）時，這個變數會指向值在電腦記憶體中的位置，若我們以這個值為參照，指定另一個變數指向這個值時，電腦會在記憶體中新增（複製）一個新值，讓後來的這個變數指向新的值。
- **傳址（by reference）**：當我們創造變數並給值（物件型別 Object type）時，變數會指向物件在電腦記憶體中的位置，若我們以這個物件為參照，指定另一個變數指向這物件，這個變數就會指向電腦記憶體中同樣的物件，不會有新的物件在記憶體中被創造出來。

> by reference 也有人稱為傳參考
> 參閱 [JavaScript 的「傳值」與「傳址」](https://hackmd.io/@chupai/B13YRDJJB)

### 基本型別

在 Javascript 有六個原始型別（Primitive Type），分別為：

- **字串（string）**：字串型別
- **數字（number）**：數字型別
- **布林值（boolean）**：僅有 true, false 兩個值
- **空（null）**：僅有 null 的值
- **未定義（undefined）**：已宣告但沒有被定義的變數。（若沒有宣告則是 not defined）
- **符號（symbol）**：ES6 新定義

```js
let age = 100;
let age2 = age;
console.log(age, age2); // 100, 100
age = 200;
console.log(age, age2); // 200, 100
```

說明：

- 1. 先在電腦記憶體創造數值 100
- 2. 創造一個變數 age 並設定到電腦記憶體
- 3. 將變數 age 指向電腦記憶體內的 100
- 4. 電腦拷貝 age 的值，在電腦記憶體中設定另一個 100
- 5. 將變數 age2 指向電腦記憶體內另一個 100 `（age2 = 100）`
- 6. 在電腦記憶體創造數值 200
- 7. 將變數 age 指向電腦記憶體內的 200 `（age = 200）`

![](https://images2.imgbox.com/bf/d8/7RQHsDx0_o.jpg)

```js
let numA = 100;
let numB = 100;
let numC = 100;
numB = 200;
numC = 300;
numA += numB; // numA = numA + numB
numA += numC; // numA = numA + numC

console.log(numA, numB, numC); // 600, 200, 300
```

![](https://images2.imgbox.com/45/21/zux3c02K_o.jpg)

### 物件型別

除上面基本型別之外，還有一個 物件型別（Object Type）：

- **函式（function）**：是可呼叫的物件，為物件的一種
- **陣列（array）**：是結構較嚴謹的物件，為物件的一種
- **日期（date）**：為物件的一種

```js
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
let team = players;
team[3] = 'Max';

console.log('players:' + players, 'team:' + team);
// players: 'Wes', 'Sarah', 'Ryan', 'Max'
// team: 'Wes', 'Sarah', 'Ryan', 'Max'
```

結果 players 和 team 都是 `'Wes', 'Sarah', 'Ryan', 'Max'`，因為這是一個陣列（reference），而不是陣列複製。它們都指向同一個陣列！

要解決此問題，就是要複製一份陣列出來再做修改!

![](https://images2.imgbox.com/cd/e7/KdMD93yf_o.jpg)

> 參閱 [你懂 JavaScript 嗎？#4 型別（Types）](https://cythilya.github.io/2018/10/11/types/)
> 參閱 [JavaScript 是「傳值」或「傳址」](https://kuro.tw/posts/2017/12/08/JavaScript-%E6%98%AF%E3%80%8C%E5%82%B3%E5%80%BC%E3%80%8D%E6%88%96%E3%80%8C%E5%82%B3%E5%9D%80%E3%80%8D/)

### 陣列的複製

為了避免傳參考（Call by reference）的特性時會去異動到原本的陣列，就要先把原本的陣列做一次複製，以下幾種方法：

#### Array.prototype.Slice()

如果直接使用`slice()` 不指定起始與結束位置的話，就等於直接複製整個整列：

```js
const players2 = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
let team2 = players2.slice();
team2[3] = 'Max';

console.log('players2:' + players2, 'team2:' + team2);
// players2: 'Wes', 'Sarah', 'Ryan', 'Poppy'
// team2: 'Wes', 'Sarah', 'Ryan', 'Max'
```

> 參閱 [Array.prototype.slice()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

#### Array.prototype.concat()

`concat()` 方法被用來合併兩個或多個陣列。此方法不會改變現有的陣列，回傳一個包含呼叫者陣列本身的值，作為代替的是回傳一個新陣列。

此範例如果使用空陣列來合併原陣列，也會達到複製整個陣列的效果：

```js
const players3 = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
let team3 = [].concat(players3);
team3[3] = 'Max';

console.log('players3:' + players3, 'team3:' + team3);
// players3: 'Wes', 'Sarah', 'Ryan', 'Poppy'
// team3: 'Wes', 'Sarah', 'Ryan', 'Max'
```

> 參閱 [Array.prototype.concat()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

#### Spread syntax

展開運算符（Spread Operator）與其餘運算符（Rest Operator）是 ES6 中的其中兩種新特性。
展開運算子和其餘運算子一樣都是 `...` ，但是在應用的效果上是完全相反的。

- 展開運算子（Spread Operator）：則是可以把陣列中的元素取出。
- 其餘運算子（Rest Operator）：是把許多的參數轉換成一個陣列。

> 展開運算符是把一個陣列展開成個別的值的速寫語法，它只會在陣列字面定義與函式呼叫時使用

```js
const players4 = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team4 = [...players4];
team4[3] = 'Max';

console.log('players4:' + players4, 'team4:' + team4);
// players4: 'Wes', 'Sarah', 'Ryan', 'Poppy'
// team4: 'Wes', 'Sarah', 'Ryan', 'Max'
```

> 參閱 [Spread syntax](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

#### Array.from()

使用 ES6 的 `Array.from()` 也可以快速達到複製的效果。
這個方法之前在將 array-like（類陣列）轉成 Array 時常用到，但它也可以用來複製陣列。

```js
const players5 = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team5 = Array.from(players5);
team5[3] = 'Max';

console.log('players5:' + players5, 'team5:' + team5);
// players5: 'Wes', 'Sarah', 'Ryan', 'Poppy'
// team5: 'Wes', 'Sarah', 'Ryan', 'Max'
```

> 參閱 [Array.from()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

### 物件的複製

同樣的，物件也會有傳參考（Call by reference）的特性，所以與陣列相同。

#### Object.assign()

語法：
`Object.assign(目標物件, ...來源物件)`

被用來複製一個或多個物件自身所有可數的屬性到另一個目標物件。回傳的值為該目標物件。
使用`Object.assign()`，指定一個空的物件並把目標對象塞進去：

```js
const person2 = {
  name: 'Wes Bos',
  age: 80
};

const captain2 = Object.assign({}, person, {
  name: 'Max',
  number: 100,
  age: 100
});

console.log(person2, captain2);
// person2: {name: "Wes Bos", age: 80, number: 99}
// captain2: {name: "Max", age: 100, number: 100}
```

> 參閱 [Object.assign()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

#### Spread syntax

除了前面的陣列，物件也可以使用展開運算符（Spread Operator），複製一個新物件，再去修改值。

```js
const person3 = {
  name: 'Wes Bos',
  age: 80
};

const captain3 = { ...person3 };
captain3.name = 'Max';
captain3.age = '10';

console.log(person3, captain3);
// person3: {name: "Wes Bos", age: 80, number: 99}
// captain3: {name: "Max", age: 10, number: 100}
```

#### JSON.parse() && JSON.stringify()

這邊要注意，使用`Object.assign()`複製時，若在多階層的 object 時會發現只有第一層修改時，不會相互影響到，但在第二層發現會相互影響。

> `Object.assign()` 屬於淺拷貝（Shallow Copy）

所以 Object.assign 只能淺複製一層，若第二層以上依舊是 傳址(reference)
下面範例可以看到，dev 修改 `dev.social.twitter = '@dev'`的值，也影響到原本的 wes 中的 `social.twitter: @dev`

因此使用 `JSON.stringify()` 的方式先將其轉換為字串，在使用 `JSON.parse()` 的方式將其轉回物件。這樣就屬於一個新的物件。達到可複製二層以上的物件。

```js
const wes = {
  name: 'Wes',
  age: 100,
  social: {
    twitter: '@wesbos',
    facebook: 'wesbos.developer'
  }
};

const dev = Object.assign({}, wes);
dev.name = 'Dev';
dev.social.twitter = '@dev';

const dev2 = JSON.parse(JSON.stringify(wes));
dev2.name = 'Dev2';
dev2.social.twitter = '@dev2';

console.log(wes, dev, dev2);
// wes:
// name: 'Wes',
// age: 100,
// social: {
//   twitter: '@dev',
//   facebook: 'wesbos.developer'
// }

// dev:
// name: 'Dev',
// age: 100,
// social: {
//   twitter: '@dev',
//   facebook: 'wesbos.developer'
// }

// dev2:
// name: 'Dev2',
// age: 100,
// social: {
//   twitter: '@dev2',
//   facebook: 'wesbos.developer'
// }
```

> 參閱 [關於 JS 中的淺拷貝和深拷貝](https://larry850806.github.io/2016/09/20/shallow-vs-deep-copy/)
