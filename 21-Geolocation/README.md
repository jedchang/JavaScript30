# 21 - Geolocation

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg)

![](https://images2.imgbox.com/9a/d2/BblQ9I7a_o.jpg)

## 主題

利用 navigator.geolocation 來取得使用者裝置的座標 (經、緯度) 和速率。

## 步驟

### 1. 啟用 Local Server

此練習需要使用 Local Server，除了安裝編輯器相關套件或是安裝 npm 套件 (browser-sync)，安裝完成後可以透過 `npm start` or `npm run start` 來啟動 Local Server (預設 port:3000)

### 2. 測試

可以透過手機瀏覽器利用 `npm start` 啟動 server 後的內網 ip 來連線，但 chrome 似乎不行? firefox 桌機可以瀏覽。

後來選擇將檔案上傳到 codePen 上面，再用手機掃描頁面條碼，進行手機定位資訊等測試。

### 3. 程式撰寫

```js
// 取得 DOM 元素 指南針、數字
const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

// 使用 watchPosition 取得使用者裝置的座標 (經、緯度) 和速率等資訊
navigator.geolocation.watchPosition(
  data => {
    // 若成功取回，則回傳一組 Position (自定義名稱 data)
    console.log(data);
    // 使用 coords.speed 取回速度 (公尺/秒)
    speed.textContent = data.coords.speed;
    // 使用 coords.heading 取得方位，代表偏離北方的角度，0 => 正北、90 => 正東
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
  },
  err => {
    // 失敗，回傳錯誤訊息 (例如未取得定位授權等)
    console.error(err);
  }
);
```

#### getCurrentPosition() / watchPosition()

- getCurrentPosition()：透過此方法可以取得目前位置。
  當成功取得位置後，會回傳一包含位置資訊的物件，並隨即執行特定的回呼常式。

  > 可能取得較低精確度的資料 (IP 位置或 WiFi) 而隨即開始作業。

- watchPosition()：追蹤目前位置。
  此方法會持續追蹤在定位資料，當此資料改變時，會回傳一包含位置資訊的物件，並隨即執行特定的回呼常式。
  > 可能是裝置移動，或取得更精確的地理位置資訊

#### 屬性

- coords.latitude：緯度。
- coords.longitude：經度。
- coords.accuracy：精準度 (getCurrentPosition 精準度小於 watchPosition)
- coords.altitude：海拔高度(米)。
- coords.altitudeAccuracy：海拔精準度。
- coords.heading：前進方向的角度，以北方為 0 度順時針計算。
- coords.speed：目前的速度(米/秒)。
- timestamp：當下時間。

![](https://images2.imgbox.com/7e/ef/meNX9g2C_o.jpg)

> 參閱 [Navigator](https://developer.mozilla.org/zh-TW/docs/Web/API/Navigator)
> 參閱 [Geolocation](https://developer.mozilla.org/zh-TW/docs/Web/API/Geolocation)
> 參閱 [地理位置定位 (Geolocation)](https://developer.mozilla.org/zh-TW/docs/Web/API/Geolocation/Using_geolocation)
