(function() {
  /*----------  選取器  ----------*/
  const player = document.querySelector('.player');
  // player 裡面選取
  const video = player.querySelector('.viewer');
  const progress = player.querySelector('.progress');
  const progressBar = player.querySelector('.progress__filled');
  const toggle = player.querySelector('.toggle');
  // 使用屬性選取 [] 篩選 dataset 自定義資料屬性
  const skipButtons = player.querySelectorAll('[data-skip]');
  const ranges = player.querySelectorAll('.player__slider');

  /*----------  播放、暫停  ----------*/
  function togglePlay() {
    // 三元判斷：如果屬性是 video.paused (影片是否正在暫停)，就執行函式 "play"，不然就 "pause"
    const method = video.paused ? 'play' : 'pause';
    // 中括號 [] 取物件屬性，video['play']() => video.play()
    video[method]();

    // 寫法2
    // video.paused ? video.play() : video.pause();

    // 寫法3：等同於用 if 判斷，上面更為精簡
    // if (video.paused) {
    //   video.play();
    // } else {
    //   video.pause();
    // }
  }

  /*----------  更新按鈕樣式  ----------*/
  function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    // 更改文字內容
    toggle.textContent = icon;
  }

  /*----------  改變播放時間  ----------*/
  function skip() {
    // currentTime 屬性：現在播放時間
    // dataset 值是字串，利用 parseFloat 需轉換成數字型態，且返回浮點數
    video.currentTime += parseFloat(this.dataset.skip);
  }

  /*----------  音量、速率 範圍更新  ----------*/
  function handleRangeUpdate() {
    // volume 屬性：音量
    // playbackRate 屬性：播放速度

    // 中括號 [] 取物件屬性，取用 HTML 中 name 屬性傳遞參數
    video[this.name] = this.value;

    // 寫法2：等同於用判斷式取值
    // if (this.name === 'volume') {
    //   video.volume = this.value;
    // } else if (this.name === 'playbackRate') {
    //   video.playbackRate = this.value;
    // }
  }

  /*----------  進度條  ----------*/
  function handleProgress() {
    // currentTime 屬性：現在播放時間
    // duration 屬性：總時間

    // 進度百分比 = (現在播放時間 / 總共時間) * 100
    const percent = (video.currentTime / video.duration) * 100;
    // 變更 flex-basis 屬性：初始大小、預設寬度
    progressBar.style.flexBasis = `${percent}%`;
  }

  /*----------  拖曳進度條  ----------*/
  function scrub(e) {
    // 計算當前秒數 = (e.offsetX 滑鼠座標 / 進度條總長度) * 總時間
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  /*----------  事件偵聽 ----------*/
  // 點擊 畫面觸發
  video.addEventListener('click', togglePlay);
  // 點擊 按鈕觸發
  toggle.addEventListener('click', togglePlay);

  // play、pause 事件會在播放或暫停開始時被觸發，觸發後改變按鈕樣式
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  // currentTime 更新時會觸發 timeupdate 事件
  video.addEventListener('timeupdate', handleProgress);

  // 針對 2 個按鈕 (快進、快退) 做 click 事件偵聽，執行 skip 函式
  skipButtons.forEach(button => button.addEventListener('click', skip));

  // 針對2個 input 做音量、播放速率做 change、mousemove 事件偵聽，執行 handleRangeUpdate 函式
  ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
  ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

  /*----------  事件偵聽 進度條拖曳 ----------*/
  // 狀態切換
  let mousedown = false;
  // 進度條 點擊事件
  progress.addEventListener('click', scrub);
  // 進度條 滑鼠移動事件，兩者符合 mousedown = true 且 scrub(e)
  progress.addEventListener('mousemove', e => mousedown && scrub(e));
  // 進度條 滑鼠按下事件
  progress.addEventListener('mousedown', () => (mousedown = true));
  // 進度條 滑鼠放開事件
  progress.addEventListener('mouseup', () => (mousedown = false));
})();
