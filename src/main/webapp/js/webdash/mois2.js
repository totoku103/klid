define(function (require) {
    var $ = require('jquery'),
        d3 = require('d3'),
        hmDashConf = require('hmDashConf');

    //중앙행정기관
    var CenterController = require('./control/mois2/Mois2_centerController.js');
    var CenterModel = require('./control/mois2/Mois2_centerModel.js');
    //지방자치단체
    var RegionController = require('./control/mois2/Mois2_regionController.js');
    var RegionModel = require('./control/mois2/Mois2_regionModel.js');

    var centerController = new CenterController(),
        centerModel = new CenterModel(),
        regionController = new RegionController(),
        regionModel = new RegionModel();

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
            $('#mois2_center').html(centerController.getHTML());
            $('#mois2_region').html(regionController.getHTML());

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
            centerContents();
            regionContents();
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

       //중앙행정기관 조회.
        function centerContents(){
            Server.get('/api/webdash/mois/webDashMois/getHmHcUrlCenter', {
                data: {},
                success: function (data) {
                    centerModel.setData(data);
                    centerController.refresh(centerModel);
                }
            });
        }
       //지방자치단체 모니터링 조회.
       function regionContents(){
           Server.get('/api/webdash/mois/webDashMois/getHmHcUrlRegion', {
               data: {},
               success: function (data) {
                   regionModel.setData(data);
                   regionContents2();
               }
           });
       }

       //지방자치단체 위변조 조회.
       function regionContents2(){
           Server.get('/api/webdash/mois/webDashMois/getForgeryRegion', {
               data: {},
               success: function (data) {
                   regionModel.setData2(data);
                   regionController.refresh(regionModel);
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