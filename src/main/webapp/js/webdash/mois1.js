define(function (require) {
    var $ = require('jquery'),
        d3 = require('d3'),
        hmDashConf = require('hmDashConf');

    //상황판
    var CyberAlertController = require('./control/mois1/Mois1_cyberAlertController.js');
    var CyberAlertModel = require('./control/mois1/Mois1_cyberAlertModel.js');
    //하단 설명
    var CyberUpdInfoController = require('./control/mois1/Mois1_cyberUpdInfoController.js');
    var CyberUpdInfoModel = require('./control/mois1/Mois1_cyberUpdInfoModel.js');

    var cyberAlertController = new CyberAlertController(),
        cyberAlertModel = new CyberAlertModel(),
        cyberUpdInfoController = new CyberUpdInfoController(),
        cyberUpdInfoModel = new CyberUpdInfoModel();

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
            $('#alertGraph').html(cyberAlertController.getHTML());
            $('#alertHistory').html(cyberUpdInfoController.getHTML());

            // add event
            addEventListener();
        }

        /**
         * 이벤트 등록
         */
        function addEventListener() {
            d3.select(window).on("resize", resizeWin);
        }

        /**
         * 타이머
         */
        function startTimer() {
            if(rtTimer != null) return;
              rtTimer = d3.interval(refreshData, hmDashConf.refreshTime);
        }

        /**
         * 데이터 갱신
         */
        function refreshData() {
            cyberAtInfo();
        }

        /**
         *  widnow.resize event handler
         */
        function resizeWin() {
            var w = $(window).innerWidth(),
                h = $(window).innerHeight(),
                scaleX = w / hmDashConf.env.stageW,
                scaleY = h / hmDashConf.env.stageH;
            $('div#dashMain').css('transform', 'scale({0},{1})'.substitute(scaleX, scaleY));
        }

       //데이터 조회.
       function cyberAtInfo() {
           //조회.
           Server.get('/api/webdash/mois/webDashMois/getThreatNow', {
               data: {instCd:$("#sInstCd").val()},
               success: function (data) {
                   if(data.length > 0){
                       cyberAlertModel.setData(data[0].nowThreat);
                       cyberUpdInfoModel.setData(data[0].pastThreat,data[0].nowThreat,data[0].modDt);
                   }else{
                       //관심.
                       cyberAlertModel.setData(2);
                       cyberUpdInfoModel.setData('','','');
                   }
                   //그래프표시.
                   cyberAlertController.refresh(cyberAlertModel);
                   //하단표시.
                   cyberUpdInfoController.refresh(cyberUpdInfoModel);
               }
           });
       }

    }());

    $(function () {
        D3Main.initialize();
        D3Main.resizeWin();
        D3Main.refreshData();
        D3Main.startTimer();
    });
});