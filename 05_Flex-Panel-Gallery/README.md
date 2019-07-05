# 05 - Flex Panel Gallery

![image](https://img.shields.io/badge/JavaScript30-exercise-brightgreen.svg)

![](https://images2.imgbox.com/53/d1/yXOdHIce_o.jpg)

## 主題

運用 CSS Flex、transform、transition.. 等屬性與 JS 監聽事件 (click、transitionend)，達到點擊後會動畫展開的效果。

## 步驟

1. CSS flex 排版。
2. forEach 針對取回的每一個元件做偵聽。
3. 加上 class 屬性作動畫效果。
4. transitionend 事件，對每一個屬性去觸發，如果有很多屬性記得做個簡易判斷。

## 語法 & 備註

### css flex

HTML tag 是由外層個 panels 包覆 5 個子層 panel，先在外層容器 panels 設定 `display: flex`，
再為每個子層 panel 加上 `flex: 1` 來使各子元件最大占比為 `1`，平均分配，那就是每個元件最大占比為 20%。

- `flex-grow`：子元素小於父元素時，子元素擴展權重。
- `flex-shrink`：子元素大於父元素時，子元素縮小權重。
- `flex-basic`：  子元素的基本大小，作為父元素的大小比較基準。預設為 0， 直接採用 flex-grow 屬性。若設為 auto， 子元素以自己的基本大小為單位。

> flex 教學遊戲 [flexboxfroggy](https://flexboxfroggy.com/)

```javascript
let panels = document.querySelectorAll('.panel');

function clickHandler() {
  this.classList.toggle('open');
}

function transitionHandler(e) {
  console.log(e);
  if (e.propertyName.indexOf('flex') !== -1) {
    this.classList.toggle('open-active');
  }
}

panels.forEach(function(panel) {
  panel.addEventListener('click', clickHandler);
  panel.addEventListener('transitionend', transitionHandler);
});
```

### querySelectorAll()

`querySelectorAll` 取回的是 **NodeList**，很像陣列 (array-like)，但**不具陣列的所有功能**。

### forEach()

- 將取回的 NodeList 用 `forEach` 去針對每個 .panel 做事件觸發。
- 參數 panel 為自定義名稱。
- 使用 callback function (回調函式) / Event Handler (處理事件)
  - 第一段 click 事件觸發
  - 第二段 transitionend 動畫結束後觸發事件

### transitionend()

- 各家瀏覽器對於 transitionend 屬性名稱加上的 flex 不一樣。

  - **chrome、firefox**：propertyName 屬性名稱為 `flex-grow`
  - **Safari**：propertyName 屬性名稱為 `flex`

- 有雷，目前為 2 次屬性做動作 (1.開 2.關) 所以需要函式中的 if 判斷。
- transitionend 會針對每一個屬性去觸發，如果有很多屬性記得做個簡易判斷，`if (e.propertyName.indexOf('flex') !== -1)` 因各家瀏覽器對於 transitionend 屬性名稱加上的 flex 不一樣，針對 chrome、firefox，判斷查找文字 "flex" 找不到 (-1) 才執行函式內容。
