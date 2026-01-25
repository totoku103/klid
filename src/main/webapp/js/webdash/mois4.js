define(function (require) {
   var $ = require('jquery');
   var d3 = require('d3');
   var dashConf = require('hmDashConf');

   var mois4Status = require('./control/mois4/Mois4_statusController.js');
   var mois4StatusController = new mois4Status();
   var mois4StatusM = require('./control/mois4/Mois4_statusModel.js');
   var mois4StatusModel = new mois4StatusM();

   var D3Main = (function(){
        var rtTimer = null;
        return {
            initialize: initialize,
            resizeWin: resizeWin,
            refreshData: refreshData,
            startTimer: startTimer
        };

        /**
         * 토폴로지 초기화
         */
        function initialize() {
            $('#wrap').html(mois4StatusController.getHTML());
            addEventListener();
        }

        /**
         * 이벤트 등록
         */
        function addEventListener() {
            d3.select(window).on("resize", resizeWin);
        }

        /** 타이머 */
        function startTimer() {
            if(rtTimer != null) return;
            rtTimer = d3.interval(function() {
                refreshData();
            }, dashConf.refreshTime);
        }
        /**
         * 데이터 갱신
         */
        function refreshData() {
            //데이터조회.
            searchContents();
            //차트조회.
            searchHighChart();
        }
        /**
         *  widnow.resize event handler
         */
        function resizeWin() {
            var w = $(window).innerWidth(), h = $(window).innerHeight();
            var scaleX = w / dashConf.env.stageW, scaleY = h / dashConf.env.stageH;
            $('div#dashMain').css('transform', 'scale({0},{1})'.substitute(scaleX, scaleY));
        }
        //조회.
       function searchContents() {
           var toDate1 = new Date();
           var year = toDate1.getFullYear();
           var month = new String(toDate1.getMonth()+1);
           var day = new String(toDate1.getDate());
           // 한자리수일 경우 0을 채워준다.
           if(month.length == 1){
               month = "0" + month;
           }
           if(day.length == 1){
               day = "0" + day;
           }
           Server.get('/api/webdash/mois/webDashMois/getDashConfigList', {
               data: {datTime:year+"-"+month+"-"+day},
               success: function (data) {
                   mois4StatusModel.setData(data);
                   mois4StatusController.refresh(mois4StatusModel);
               }
           });
        }

        //그래프표시.
       function searchHighChart(){
           var settingDate = new Date();
           var settingDate2 = new Date();
           settingDate.setDate(settingDate.getDate()-7); //일주일전 전
           settingDate2.setDate(settingDate2.getDate()-1); //하루 전

           var year = settingDate.getFullYear();
           var month = new String(settingDate.getMonth()+1);
           var day = new String(settingDate.getDate());
           // 한자리수일 경우 0을 채워준다.
           if(month.length == 1){
               month = "0" + month;
           }
           if(day.length == 1){
               day = "0" + day;
           }
           var datTime1 = year+"-"+month+"-"+day;

           var year2 = settingDate2.getFullYear();
           var month2 = new String(settingDate2.getMonth()+1);
           var day2 = new String(settingDate2.getDate());
           // 한자리수일 경우 0을 채워준다.
           if(month2.length == 1){
               month2 = "0" + month2;
           }
           if(day2.length == 1){
               day2 = "0" + day2;
           }
           var datTime2 = year2+"-"+month2+"-"+day2;

           Server.get('/api/webdash/mois/webDashMois/getDashChartSum', {
               data: {datTime1:datTime1,datTime2:datTime2},
               success: function (data) {
                  mois4StatusModel.setData(data);
                  mois4StatusController.refreshChart(mois4StatusModel);
               }//success
           });//ajax
        }
   }());

    $(function() {
        D3Main.initialize();
        D3Main.resizeWin();
        D3Main.refreshData();
        D3Main.startTimer();
    });

});