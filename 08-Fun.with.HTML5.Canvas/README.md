# 08 - Fun with HTML5 Canvas

![image](https://img.shields.io/badge/JavaScript30-exercise-brightgreen.svg)

![](https://images2.imgbox.com/3e/af/mWbBlrrf_o.jpg)

## 主題

使用 HTML5 Canvas 製作一個畫布，透過滑鼠來繪製色彩變化且粗細不一的線條。

## 步驟

### 1. 在 HTML 上建立 `canvas` 畫布區塊，設定 `2D` 環境，和變數 ctx 作為 canvas 操作元素，並設定相關屬性：

- `strokeStyle` 線條顏色
- `lineWidth` 線條寬度
- `lineCap` 線條結束樣式
- `lineJoin` 線條轉折樣式

### 2. 透過 JS 設定 canvas 會應用到的相關變數

- canvas 的顏色、線條粗細、座標位置、狀態切換、判斷粗細變化等

```js
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d'); // 宣告為 2D 渲染
canvas.width = window.innerWidth; // canvas 尺寸為螢幕的寬高
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55'; // 線條顏色
ctx.lineWidth = 100; // 線條寬度
ctx.lineCap = 'round'; // 線條結束、收尾樣式
ctx.lineJoin = 'round'; // 線條連接、轉折樣式
let isDrawing = false; // 宣告狀態切換，判斷是否執行繪製中：一開始無法繪製
let lastX = 0;
let lastY = 0;
let hue = 0; // 設定 HSL 色相值
let direction = true; // 判斷粗細變化用
```

1. 監聽滑鼠各個狀態事件 `addEventListener`
   - `mousedown`滑鼠按下：開始繪製
   - `mousemove`滑鼠移動：繪製移動過程
   - `mouseup`滑鼠放開：停止繪製
   - `mouseout、mouseleave`滑鼠離開：停止繪製

## 語法 & 備註

### direction = !direction

true、false 互相切換，如同　 jQuery toggle() 效果

### HTML5 Canvas 功能

畫布效果在 canvas 中的使用順序：

#### 1. 定義線條樣式

- `strokeStyle` 線條顏色
- `lineWidth` 線條寬度
- `lineCap` 線條結束樣式
- `lineJoin` 線條轉折樣式

#### 2. 移動順序

- `beginPath()` 開始一個新的繪製路徑
- `moveTo()` 將繪製路徑的起點移動到指定的座標中
- `lineTo()` 連接路徑終點到指定的座標中
- `stroke()` 繪製路徑

> 參閱 [MDN-CanvasRenderingContext2D](https://developer.mozilla.org/zh-TW/docs/Web/API/CanvasRenderingContext2D)

### HSL 色彩　(HSL color)

國外有不少設計師喜歡 HSL (Hue, Saturation, Lightness) 色彩寫法

- 色相角度但不加單位，0~360
- 色彩飽和度，0~100%
- 色彩亮度，0~100%

HSL 常見語法：
`HSL(240, 100%, 50%)`

#### 1. 色相 (Hue)

色相的 0 度為 R (紅)色，120 度為 G（綠）色，240 度為 B（藍）色，順序為順時鐘旋轉，也就是 紅、橙、黃、綠、藍、靛、紫 順序。

#### 2. 亮度/明度 (Lightness)

HSL 色彩中的 L 預設值會是 50%，若要變暗一點就把數值往 0% 調整，若要變亮變白一點就把數值往 100% 調整。

#### 3. 飽和度 (Saturation)

如同亮度（Lightness）一樣，飽和度（Saturation）也是採用百分比方式呈現。
以色彩預設都是 100% 飽和的情況下，若是要讓色彩變得不那麼鮮豔，就把色彩飽和度（Saturation）往 0% 的方向調整即可，色彩飽和度（Saturation）不同於色彩亮度（Lightness）的地方在於，色彩飽和度（Saturation）降低之後，色彩越是不鮮豔就越接近灰色而不是變黑，這一點千萬要能夠區分。

> 參閱 [RGB、HSL、Hex 網頁色彩碼，看完這篇全懂了](http://csscoke.com/2015/01/01/rgb-hsl-hex/)
