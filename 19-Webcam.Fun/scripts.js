const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

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

    /*----------  新增濾鏡效果  ----------*/
    // 透過　getImageData　取得當前　canvas　中所有的像素點(r、g、b、alpha　的資訊)
    let pixels = ctx.getImageData(0, 0, width, height);
    // 製作效果
    pixels = redEffect(pixels); // 紅色濾鏡效果

    // pixels = rgbSplit(pixels); // 三色分離效果
    // pixels = greenScreen(pixels); // 綠幕效果

    // 置入效果
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

/*----------  濾鏡效果  ----------*/
function redEffect(pixels) {
  // 透過迴圈將取回的所有像素資料跑一次，i +=4 是因為四個一組(r、g、b、alpha）
  for (let i = 0; i < pixels.data.length; i += 4) {
    // 下面組合就是單純把 R(紅色) 增強達到紅色濾鏡的效果
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

/*----------  三色分離效果  ----------*/
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

/*----------  綠幕效果  ----------*/
function greenScreen(pixels) {
  // 設定存取拖拉控制範圍
  const levels = {};

  document.querySelectorAll('.rgb input').forEach(input => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    // 判斷 RGB 介於對應 min & max 中間
    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // 這裡 [i + 3] 指的是將 rgba 中的第三個 alpha (透明度) 設置為 0
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

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

// 啟動鏡頭
getVideo();

/* 監聽 video 事件，是否啟動鏡頭 */
video.addEventListener('canplay', paintToCanvas);
