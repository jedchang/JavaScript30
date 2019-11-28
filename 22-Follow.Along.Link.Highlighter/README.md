# 22 - Follow Along Link Highlighter

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/5b/60/8AV6p1Ed_o.jpg)

## 主題

根據滑鼠游標移動 highlight 位置。使用 getBoundingClientRect 方法。

## 步驟

### 1. 取得頁面 DOM 元素

```js
// 取得所有 a 元素
let triggers = document.querySelectorAll('a');
// 創建 span 元素來顯示 highlight 效果
let highlight = document.createElement('span');
// 加上 highlight 的 class
highlight.classList.add('highlight');
// 將建立的 span 放到頁面中
document.body.append(highlight);
```

### 2. 更改狀態並監聽事件

這裡使用`getBoundingClientRect()` 來取得該 a 元素的寬、高以及之於左上角的位置，使用 `console.log(linkCoords)` 可以看到如下資訊：

![](https://images2.imgbox.com/c3/4c/6N7KwPxA_o.jpg)

可以用這些資訊來設定剛剛創建的 span 的大小及位置並設定當滑鼠進入 a 時的事件監聽。

```js
function highlightLink() {
  // 取得當前 a 元素大小、位置等，本身距離瀏覽器窗口的位置
  const linkCoords = this.getBoundingClientRect();
  console.log(linkCoords);

  highlight.style.width = coords.width + 'px'; // 字串拼接
  highlight.style.height = `${coords.height}px`; // ES6 模板
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

// 監聽所有 a 元素的滑鼠移入，觸發 highlightLink
triggers.forEach(a => {
  a.addEventListener('mouseenter', highlightLink);
});
```

> 參閱 [Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

#### highlight 似乎會跑版

有個小問題，當滾動捲軸時 highlight 的效果會跑掉，這是因為當畫面載入時元素的位置。
也就是 `getBoundingClientRect()` 所獲得的資訊已經固定，當滾動捲軸時並不會自動更新資訊。

解決辦法是加上滾動的距離（X 軸及 Y 軸都要），而滾動的距離我們可以透過 `window.scrollX` 以及 `window.scrollY`取得

為避免 code 雜亂，我們新建一個 object 來儲存 highlight 所需要的資料

```js
// 建立物件 coords，存放位置訊息
const coords = {
  width: linkCoords.width,
  height: linkCoords.height,
  top: linkCoords.top + window.scrollY, // 因為 window 捲軸滑動的關係，必須加上 scroll 移動值。
  left: linkCoords.left + window.scrollX
};
```

> 參閱 [Element.querySelectorAll()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/querySelectorAll)

## 語法 & 備註

### append()、appendChild() 差異

`ParentNode.append()`：在 ParentNode 的最後一個子節點之後插入一組 Node 物件或 DOMString 物件。
`Node.appendChild()`：將一個節點添加到指定父節點的子節點列表末尾。

兩者差異點：

- ParentNode.append() 允許追加 DOMString 物件，而 Node.appendChild() 只接受 Node 物件。
- ParentNode.append() 沒有返回值，而 Node.appendChild() 返回追加的 Node 物件。
- ParentNode.append() 可以追加幾個節點和字串，而 Node.appendChild() 只能追加一個節點。

> 參閱 [ParentNode.append()](https://developer.mozilla.org/zh-CN/docs/Web/API/ParentNode/append)
> 參閱 [Node.appendChild](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild)
