# 03 - CSS Variables

![image](https://img.shields.io/badge/JavaScript30-exercise-brightgreen.svg)

![](https://images2.imgbox.com/71/5e/wxLgTK0t_o.jpg)

## 主題

---

使用**原生 CSS 變數功能**，透過 JS 更改 CSS 變數值，達到即時更新調整內距、模糊、邊框色等效果。

## 步驟

---

### 在 :root 宣告 CSS 變數：

1. 宣告方法：使用兩個 `-` 符號，代表「變數」，如：`--spacing`
2. 使用方法：使用 `var()` 代表「使用變數」，如：`var(--spacing)`

### 事件監聽 (change、mousemove) 三個 input 的值：

1. 利用 HTML `data-* 屬性` 取得自定義的資料，如：`this.dataset.sizing`
2. 透過 `document.documentElement.style.setProperty('--base', '#fff');` JS 控制來更改 CSS 的變數。

## 語法 & 備註

---

### :root 偽元素 (全域)

`:root` 這個偽元素是文檔的根元素，等同於 `<html>` 標籤，所以常用於聲明**全域**的 CSS 變量：

```css
/* 設定變數 (全域) */
:root {
  --color: #ffc600;
  --spacing: 10px;
  --blur: 10px;
}

/* 使用變數 */
img {
   background： var(--color);
}
```

- :root 這個區域底下代表是全域的變數，裡面的變數用 `--` 兩個斜線加上自訂的變數名稱。
- 使用方式： `var + (--name)`

在 JS 使用的話，語法如下：

```js
// ：root = 文檔的根元素 = <html> = document.documentElement
document.documentElement.style.setProperty('--color', '#000');
```

> 參閱 [使用 CSS 變數](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)

### data-attribute 屬性

可以先在 HTML 中利用 `data attribute` 設值，然後利用 `dataset` 可取得 `data-*` attribute 的值。
也就是可取得自定義的資料，另外也可使用 `getAttribute` 取得資料。

使用 JS 取得 dataset 屬性：

```js
//方法1
document.querySelector('#blur').dataset.sizing;
document.querySelector('#blur').dataset[sizing];

//方法2 - 利用 getAttribute()
document.querySelector('#blur').getAttribute('data-sizing');
```

> 參閱 [HTMLElement​.dataset](https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLElement/dataset)

### style.setProperty 設置屬性

- 幫對象的 `style` 新增一個屬性。
- 但要記得要加上單位 **(例如，px)**

下列三種方法，皆可達到修改 CSS 的效果，實際應用中，`style.setProperty` 會比較方便帶**參數**進去，且**可讀性**較佳。

```js
const el = document.querySelector('img');

//方法1
el.setAttribute('style', `padding: 15px`);

//方法2
el.style.setProperty('padding', '15px');

//方法3
el.style.padding = '15px';
```

> 參閱 [CSSStyle​Declaration​.set​Property()](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration/setProperty)

### filter:blur()

CSS3 的濾鏡功能，blur 是高斯模糊，參數越高越模糊。

> 參閱 [filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)

### forEach()

因為使用 `document.querySelectorAll` 取得畫面上三個 input 的值，取回的是 **NodeList**，很像陣列 (array-like)，但**不具陣列的所有功能**，但可以使用 `forEach()` 來對每一個都執行。

- 將取回的 NodeList 用 `forEach` 去針對每個 inputs 做事件觸發。
- 參數 input 為自定義名稱。

```js
inputs.forEach(function(input) {
  // change 事件，只做在最後，如滑鼠放開才改變
  input.addEventListener('change', changeHandler);
  // mousemove 事件，滑鼠移動過程中即改變
  input.addEventListener('mousemove', changeHandler);
});
```

> 參閱 [Array​.prototype​.for​Each()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
