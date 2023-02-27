   //  静态常量: 数据格式
    const DEFAUL_FORMAT = 'yyyy-mm-dd';
    /**
     * @class: EasyDate
     * @description: 封装Date 加强版 通过EasyDate 模拟接口 实现月份调取/日期格式化等增值API
     * @param {*}
     * @return {*}
     * @Date: 2022-05-13 15:06:47
     */    
    class EasyDate{
      constructor(offset,options){
        // this.base = new Date();
        let date = EasyDate.isDate(offset);
        if (date) {
          this.base = new Date(date);
        }
        //直接用offset 判断是不是Date对象 如果是 直接拷贝
        if (offset instanceof Date) {
          this.base = new Date(offset);
          return;
        }
        this.format = options?.format || DEFAUL_FORMAT;
      }

      /**
       * @method: resetTime  
       * @description: 将日期对象的时间清零
       * @param {*}
       * @return {*}
       * @Date: 2022-05-13 15:16:20
       */      
      resetTime(){
        this.base.setHours(0);
        this.base.setMinutes(0);
        this.base.setSeconds(0);
        this.base.setMilliseconds(0);
      }

      setDate(date){
        this.base.setDate(date);
      }

      getDate(){
        return this.base;
      }

      transDate(offset){
        offset = Number(offset);
        this.base.setMonth(this.base.getMonth() + offset);
      }

      
      /**
       * @method: isLeapYear 
       * @description: 判断是否闰年
       * @param {*} year
       * @return {*} Boolean
       * @Date: 2022-05-13 15:22:06
       */      
      isLeapYear(year){
        if (!year && year <= 1900){
          return false;
        }
        if (year % 100 === 0 && year % 400 === 0){
          return true;
        }
        if (year %4 === 0){
          return true;
        }
      }

      /**
       * @method: getFirstDay 
       * @description: 获取月份的第一天的星期
       * @param {*}
       * @return {*}  返回月份的第一天的星期 => empty
       * @Date: 2022-05-13 15:35:15
       */      
      getFirstDay(){
        let date = this.clone();
        date.setDate(1);
        return date.getDay();
      }

      /*
       *@method: getDay 获取星期
       *@params {Number} 星期 getDay 
      */
       getDay() {
        return this.base.getDay();
      }

      /**
       * @method: clone 
       * @description: 克隆当前日期EasyDate对象
       * @param {*}
       * @return {*} new EasyDate
       * @Date: 2022-05-13 15:33:31
       */      
      clone(){
        return new EasyDate(this.base,{
          format: DEFAUL_FORMAT
        });
      }

      /**
       * @method: isGreaterOrEqual
       * @description: 判断参考日期是否>=
       * @param {*} date
       * @return {*} Boolean
       * @Date: 2022-05-13 15:56:19
       */      
      isGreaterOrEqual(date){
        if (!date){
          return false;
        }
        date = (date instanceof EasyDate) ? date : new EasyDate(date,{
          format: DEFAUL_FORMAT
        });
        return this.toString() >= date.toString();
      }

      /**
       * @method: toString
       * @description:  将数据转化为字符串
       * @param {*}
       * @return {*} 返回字符串数据
       * @Date: 2022-05-13 15:50:02
       */      
      toString(){
        return EasyDate.formating(this.base,this.format);
      }

      /**
       * @static: toDouble 
       * @description: 十位补0 
       * @param {*} num
       * @return {*}  两位数
       * @Date: 2022-05-13 15:40:16
       */      
      static toDouble(num){
        return String(num)[1] && String(num) || '0' + num;
      }

      /**
       * @static: formating 数据格式化
       * @description: 将日期对象的日期按照‘yyyy-mm-dd’ 的格式输出
       * @param {*} date 日期对象
       * @param {*} format  格式
       * @return {*}  格式化后的数据
       * @Date: 2022-05-13 15:48:18
       */      
      static formating(date = new Date(),format = DEFAUL_FORMAT){
        let regMap = {
          'y': date.getFullYear(),
          'm': EasyDate.toDouble(date.getMonth() +  1),
          'd': EasyDate.toDouble(date.getDate())
        }

        return Object.entries(regMap).reduce((acc,[reg,value])=>{
          return acc.replace(new RegExp(`${reg}+`,'gi'),value);
        },format);
      }

      /**
       * @static: isDate
       * @description: 判断字符串是否是日期 且 是标准格式
       * @param {*} dateStr 日期字符串
       * @param {*} format  标准模板字符串
       * @RegExp: /[\:\/\\\|\~]/g,匹配任意连接符  /(\d+)-(\d+)-(\d+)/g,匹配年月日数据
       * @return {*} 标准格式日期字符串
       * @Date: 2022-05-13 16:25:52
       */      
      static isDate(dateStr,format = DEFAUL_FORMAT){
        if (!dateStr){
          return EasyDate.formating(new Date(),format);
        }

        if (dateStr instanceof EasyDate || dateStr instanceof Date){
          return dateStr;
        }
        dateStr = dateStr.replace(/[\:\/\\\|\~]/g,'-');
        return dateStr.replace(/(\d+)-(\d+)-(\d+)/g, function (item, $1, $2, $3) {
          return `${$1.length === 4 && $1 || ('20' + $1)}-${EasyDate.toDouble($2)}-${EasyDate.toDouble($3)}`
        })
      }


      static getCalendarData(date,today = this,format = DEFAUL_FORMAT){
        let month = date.getMonth(); // 获取月份
        date = new Date(date);
        date.setDate(1); // 设置日期为这个月的第一天
        let dates = []; // 存放每一天的数据
        while(date.getMonth() === month){
          let label = EasyDate.formating(date,format);

          dates.push({
            date: label.substr(0,10),
            today: today && today.toString() === label,
            disabled: label.substr(0,10) > today.toString()
          });
          date.setDate(date.getDate() + 1);
        }
        return dates;
      }

      toObject(today){
        let month = this.base.getMonth();
        return {
          year: this.base.getFullYear(),
          month: EasyDate.toDouble(month + 1),
          empty: this.getFirstDay(),
          days: EasyDate.getCalendarData(this.base,today)
        }
      }
    }

    