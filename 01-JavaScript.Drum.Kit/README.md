# 01 - JavaScript Drum Kit

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/5b/d3/1gqCMN9Z_o.jpg)

## 主題

按下鍵盤時，JS 觸發播放聲音且觸發 CSS 樣式

## 步驟

1. 偵聽鍵盤事件中的 `keydown` 事件
   - 透過 `e.keyCode` 取得畫面上的對象、取得要播放的 audio
   - `audio.currentTime = 0` 先歸零再播放，確保從頭連續播放，可以一直重複按下播放。
2. 偵聽過渡事件 `transitionend`：該事件在 CSS 完成過渡後觸發。
3. `propertyName` 判斷事件目標屬性名稱。

## 語法 & 備註

```js
// 將所有程式包在一起，IIFE 立即函式
(function() {
  window.addEventListener('keydown', playHandler);

  function playHandler(e) {
    //******** play music ****************
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }

    //******** dom style ****************
    const btn = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (btn) {
      btn.classList.add('playing');
    }
  }

  let keys = document.querySelectorAll('.key');
  keys.forEach(KEY => {
    KEY.addEventListener('transitionend', transitionendHandler);
  });

  function transitionendHandler(e) {
    if (e.propertyName === 'transform') {
      e.currentTarget.classList.remove('playing');
    }
  }
})();
```

### addEventListener()

使用 `addEventListener()` 來偵聽鍵盤事件：

- `keydown` 鍵盤事件：按鈕按下觸發。
- `transitionend` 轉場/過渡事件：轉場事件在 CSS 完成過渡後觸發。也就是會在 CSS transition 结束後觸發。

### forEach()

因為使用 `let keys = document.querySelectorAll('.key')` 取得畫面上所有的 key，但是取回的是 **NodeList**，很像陣列 (array-like)，但**不具陣列的所有功能**，可以使用 `forEach()` 來對每一個都執行。

- 將取回的 NodeList 用 `forEach` 去針對每個 key 做事件觸發。
- 參數 KEY 為自定義名稱。

> 也可以使用 `Array.from` 將一個物件或字串轉為陣列格式的語法。

### HTMLmediaElement(audio) 取得標籤

- HTML 的 `audio` 標籤，透過 js 取得 **HTMLMediaElement** 元素，來進行影音的播放。

下列為使用 ES6 字串模板寫法與一般寫法差異：

```js
// ES6 字串模板寫法：選取 audio 標籤 data-key 屬性
const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
// 傳統寫法
var audio = document.querySelector('.key[data-key="' + e.keyCode + '"]');
```

### audio.play() 播放聲音

- 注意要加上 `currentTime = 0`，目的是要讓播放進度回到 0 (確保從頭連續播放，可以一直重複按下播放)
- 外層加上 `if()` 判斷，解決使用者按下不相關鍵盤 console 會跳錯問題。

```js
if (audio) {
  audio.currentTime = 0;
  audio.play();
}
```

### propertyName 判斷目標屬性名稱

在 transitionend 的事件中，我們使用了 `propertyName` 去判斷，目的讓 propertyName 只要不是 transform 的屬性就不需要執行，可以試試不加判斷的 `console.log(e)` 就會看到噴出很多事件。( 因為 transitionend 會針對每一個屬性去觸發 )

- 判斷事件目標屬性名稱為 `transform` 才執行。
- 綁事件對象 `currentTarget`，用一般 `target` 也是可以

> 參閱 [Event​.current​Target](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/currentTarget)
> 參閱 [Event​Target](https://developer.mozilla.org/zh-TW/docs/Web/API/EventTarget)
