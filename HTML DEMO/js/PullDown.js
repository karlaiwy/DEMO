(function(win){
  function PullDown({ pocketEle, contentEle, callback }) {
    this.isPocket = !!pocketEle;
    this.$pocket = pocketEle || $('.pd-pocket');
    this.$content = contentEle || $('.pd-content');
    this.startPosY = 0;
    this.startPosX = 0;
    this.isPulling = false; //是否下拉中
    this.isLoading = false; //是否加载中
    this.callback = callback || function () { return false; }
    this.maxDown = 120;
    this.eventInt();
  }
  
  PullDown.prototype.eventInt = function () {
    $(this.$content).on('touchstart touchmove touchend', this.eventAgent.bind(this));
  }
  
  PullDown.prototype.eventAgent = function (ev) {
    let evType = ev.type;
    if (evType in this.__proto__) {
  
      this[evType].bind(this)(ev);
    }
  }
  
  PullDown.prototype.touchstart = function (ev) {
    //如果正在加载中 停止行为
    if (this.isLoading === true) {
      this.isPulling = false;
      return false;
    }
    //如果正在拖拽中 停止重复拖拽行为
    if (this.isPulling === true) {
      return false;
    }
    this.startPosY = ev.targetTouches[0].pageY;
    this.startPosX = ev.targetTouches[0].pageX;
    this.isPulling = true;
  }
  
  PullDown.prototype.touchmove = function (ev) {
  
    //手指移动量
    let diffY = ev.targetTouches[0].pageY - this.startPosY;
    let diffX = ev.targetTouches[0].pageX - this.startPosX;
    //如果已经有一次下拉行为没有结束的话 终止拖拽
    if (this.isPulling === false) {
      return false;
    }
    //如果正在加载中 禁止拖拽
    if (this.isLoading === true) {
      return false;
    }
  
    //当垂直滑动距离 大于水平滑动距离的一半的时候 认为是上下运动
    if ((Math.abs(diffY) - Math.abs(diffX)) < Math.abs(diffX) / 2) {
      return false;
    }
  
    //判断当前scrollTop滚动高度是否是0
    if (document.documentElement.scrollTop !== 0) {
      return false;
    }
  
    //当前Y点 - 初始Y点 如果>0的话 用户在下拉 反之 用户在上拉
    if (diffY < 0) {
      return false;
    }
  
    //当拉到最大限度的时候 触发刷新功能
    if (diffY > this.maxDown) {
      this.loading();
      return false;
    }
  
    $(this.$content).css({
      transform: `translate(0,${diffY}px) translateZ(0)`
    })
  
  }
  
  PullDown.prototype.touchend = function (ev) {
    //如果正在加载中 终止行为
    if (this.isLoading === true) {
      return false;
    }
    if (this.isPulling === false) {
      return false;
    }
    this.isPulling = false; //释放拖拽中开关
    //松开手指 自动回弹
    this.backTop();
  }
  
  PullDown.prototype.backTop = function () {
    $(this.$content).css({
      transition: '.3s',
      transform: `translate(0,0) translateZ(0)`
    })
  }
  
  PullDown.prototype.loading = function () {
    $('body').css({
      overflow: 'hidden'
    });
    this.isLoading = true; //正在加载中
    this.callback(this.loadEnd.bind(this));
    if (this.isPocket) {
      $(this.$pocket).css({
        visibility: "visible"
      })
    }
  }
  
  PullDown.prototype.loadEnd = function (msg) {
    $('body').css({
      overflow: 'auto'
    });
    this.isLoading = false; //二次回调=>加载结束
    this.isPulling = false;
    //加载完成 回弹
    this.backTop();
  }
  win.PullDown = PullDown;
})(window)