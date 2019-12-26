(function() {
  const timerDisplay = document.querySelector('.display__time-left');
  const endTime = document.querySelector('.display__end-time');
  const buttons = document.querySelectorAll('[data-time]'); // 屬性選取器
  // const buttons = document.querySelectorAll('.timer__button');

  let countdown;

  // 計時器
  const timer = function(seconds) {
    // 新的計時器被啟動時，先把原本的 setInterval 清除
    clearInterval(countdown);
    // 取得現在時間
    const now = Date.now();
    // 因為秒數是毫秒所以要 *1000
    const timestamp = now + seconds * 1000;
    displayTimeLeft(seconds); // 顯示畫面剩餘時間
    displayEndTime(timestamp); // 顯示畫面結束時間

    // 計時器執行在 countdown 裡面方便接著清除使用
    countdown = setInterval(() => {
      // 取得要跑的總時長
      const secondsLeft = Math.round((timestamp - Date.now()) / 1000);
      // 如果時間已經小於 0，結束這個 Interval 停止計時
      if (secondsLeft < 0) {
        clearInterval(countdown);
        timerDisplay.textContent = `Time Up!`;
        return;
      }
      // 更新時間
      displayTimeLeft(secondsLeft);
    }, 1000);
    // 若有時間差 會跳號時 會設定為 16 毫秒更新(1000 / 60 = 16)，所謂的 60 FPS (每秒更新 60 次)
  };

  // 顯示畫面剩餘時間
  const displayTimeLeft = function(seconds) {
    // 透過 Math.floor 來取得分鐘數最大整數 (傳入秒數 / 60)
    const minutes = Math.floor(seconds / 60);
    // 用 ％ 來取得傳入秒數除 60 的餘數（扣除分鐘數後的秒數）
    const remainderSeconds = seconds % 60;
    // console.log({ minutes, remainderSeconds });
    // 顯示秒數的部分若小於 0 ，數字前補 0
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    // 顯示對應時間
    document.title = display;
    timerDisplay.textContent = display;
  };

  // 顯示畫面結束時間
  const displayEndTime = function(timestamp) {
    // 用傳入的 timestamp 將總秒數轉換為時間格式
    const end = new Date(timestamp);
    // 取得小時
    const hour = end.getHours();
    // 轉換 12 小時制 (超過 12 小時就減 12，沒有就是現在小時)
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    // 取得分鐘
    const minutes = end.getMinutes();
    // 顯示分鐘，若分鐘數小於 10，則前面補 0
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  // 開始倒數計時
  const startTimer = function() {
    // 取得 data-time 的數值
    const seconds = parseInt(this.dataset.time);
    // 將取得的值傳入到計時器中
    timer(seconds);
  };

  // 每一個時間按鈕加上監聽事件
  buttons.forEach(button => button.addEventListener('click', startTimer));

  // 監聽 自訂時間 input 輸入欄位
  document.customForm.addEventListener('submit', function(e) {
    // 因為 form 表單，submit 後避免跳頁使用 preventDefault() 來阻止預設事件
    e.preventDefault();
    // 取得 input 欄位的值，並轉為數字
    const mins = parseInt(this.minutes.value);

    // 判斷有值才執行
    if (mins) {
      // 輸入欄位是要輸入分鐘，所以秒數*60
      timer(mins * 60);
      console.log(mins * 60);
      // 清空表單欄位
      this.reset();
    }
  });
})();
