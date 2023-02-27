(function(win){
  class DatePicker{
    constructor(target,wrap,options = {},callback){
      this.target = target || $('.dp-input');
      this.wrap = wrap || $('.calender-page');
      this.$container = $('.month-data');
      this.options = options;
      this.date = new EasyDate();
      this.today = new EasyDate();
      this.callback = callback || function(data){
        this.target.val(data);
      }
      this.initPicker();
      this.eventAgent();
      this.showPicker();
    }

    initPicker(){
      let data = this.initMonthData();
      let html = this.createHTML(data);
      this.appendToCalender(html);
      this.addNextMonth();
    }

    initMonthData(){
      return this.date.toObject(new EasyDate(),this.today);
    }

    createHTML(data){
      return template('date-picker',data);
    }

    appendToCalender(html){
      this.$container.append(html);
    }

    prependToCalender(html){
      this.$container.prepend(html);
    }

    /**
     * @method: addLastMonth
     * @description: 添加上个月
     * @return {*}
     * @Date: 2022-05-17 16:48:13
     */    
    addLastMonth(){
      this.date.transDate('-1');
      let data = this.date.toObject(this.today);
      let html = this.createHTML(data);
      this.prependToCalender(html);
    }

    /**
     * @method: addNextMonth
     * @description: 添加下个月
     * @return {*}
     * @Date: 2022-05-17 16:48:40
     */    
    addNextMonth(){
      this.date.transDate('+1');
      let data = this.date.toObject(this.today);
      let html = this.createHTML(data);
      this.appendToCalender(html);
      this.date.transDate('-1');
    }

    eventAgent(){
      this.target.on('focus',function(){
        $calender_page.addClass('show');
      });

      this.wrap.on('click','li:not(.disabled,.empty)',function(e){
        $('.selected').removeClass('selected');
        let value = e.target.dataset.date;
        e.target.classList.add('selected');
        $input.val(value);
        $calender_page.removeClass('show');
      });
    }

    showPicker () {
      let that = this;

      this.pullDown = new PullDown({
        contentEle: this.$container,
        callback (cb) {
          console.log('加载中');
          that.addLastMonth();
          cb && cb();
        }
      });
    }
    
    


  }
  win.DatePicker = DatePicker;
})(window)


