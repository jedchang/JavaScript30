# 19 - Webcam Fun

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/de/72/n1cnNBzO_o.jpg)

## 主題

使用視訊鏡頭顯示取視訊畫面及並透過 canvas 轉換成影像檔案與濾鏡的效果。

## 步驟

### 1. 啟用 Local Server

此練習需要使用 Local Server，除了安裝編輯器相關套件或是安裝 npm 套件 (browser-sync)，安裝完成後可以透過 `npm start` or `npm run start` 來啟動 Local Server (預設 port:3000)

### 2. 讀取影像

透過 `navigator.mediaDevices.getUserMedia` 取得視訊影像

```js
/*----------  取得鏡頭影像  ----------*/
function getVideo() {
  // 取得使用者的視訊裝置，回傳 Promise 狀態
  navigator.mediaDevices
    .getUserMedia({
      video: true, // 影像
      audio: false // 聲音
    })
    // 成功 則把回傳的 MediaStream 寫進 html 的 video tag 中並播放
    .then(localMediaStream => {
      console.log(localMediaStream);

      video.srcObject = localMediaStream;
      video.play();
    })
    // 失敗 印出錯誤結果
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}
// 啟動鏡頭
getVideo();
```

> 參閱 [MediaDevices.getUserMedia()](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)

### 3. 將取得影像資料，輸出到 canvas

```js
/*----------  取得 MediaStream 影像資料 輸出在 canvas 中  ----------*/
function paintToCanvas() {
  // 設置 canvas 寬高
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  // setInterval 來持續取得目前的影像資訊
  return setInterval(() => {
    // 在 canvas 中設置 drawImage 參數與來源 video 相同 (X軸、Y軸、長度、寬度)
    ctx.drawImage(video, 0, 0, width, height);
  }, 16);
}
/* 監聽 video 事件，是否啟動鏡頭 */
video.addEventListener('canplay', paintToCanvas);
```

> 參閱 [CanvasRenderingContext2D.drawImage()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)

### 4. 新增拍照功能

```js
/*----------  新增拍照功能  ----------*/
function takePhoto() {
  // 設定當前拍照聲音為第 0 秒並播放
  snap.currentTime = 0;
  snap.play();

  // 用 toDataURL 將 canvas 的內容轉為 base64 的圖檔資訊
  const data = canvas.toDataURL('image/jpeg');
  // console.log(data);

  // 用 createElement 來建立一個新的 a 元素
  const link = document.createElement('a');

  // 設定連結位置為轉換圖檔後 base64 位置
  link.href = data;

  // 設定屬性：下載
  link.setAttribute('download', 'picture');

  // a 元素裡新增一個 img
  link.innerHTML = `<img src="${data}" alt="picture" />`;

  // 將 a 元素 新增至 strip 圖片區塊（在第一筆的位置）
  strip.insertBefore(link, strip.firstChild);
}
```

> 參閱 [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLCanvasElement/toDataURL)
> 參閱 [Node.insertBefore()](https://developer.mozilla.org/zh-TW/docs/Web/API/Node/insertBefore)

### 5. 新增濾鏡效果

在 `paintToCanvas()` 內新增濾淨效果語法：

```js
function paintToCanvas() {
  // ...略

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    /*----------  新增濾鏡效果  ----------*/
    // 透過　getImageData　取得當前　canvas　中所有的像素點(r、g、b、alpha　的資訊)
    let pixels = ctx.getImageData(0, 0, width, height);
    // 製作效果
    pixels = redEffect(pixels); // 紅色濾鏡效果
    // 置入效果
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}
```

新增一個對應的濾鏡效果 `redEffect()`

```js
/*----------  濾鏡效果函式  ----------*/
function redEffect(pixels) {
  // 透過迴圈將取回的所有像素資料跑一次，i +=4 是因為四個一組(r、g、b、alpha）
  for (let i = 0; i < pixels.data.length; i += 4) {
    // 下面組合就是單純把 R(紅色) 增強達到紅色濾鏡的效果
    pixels.data[i + 0] = pixels.data[i + 0] + 100;
    pixels.data[i + 1] = pixels.data[i + 1] - 50;
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
  }
  return pixels;
}
```

## 其它

其它還有 RGB 三色分離效果 `rgbSplit()` 與綠幕的濾鏡效果 `greenScreen()`，原則上皆與上述操作邏輯相同 (紅色濾鏡效果)
