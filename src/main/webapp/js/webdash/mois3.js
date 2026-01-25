define(function (require) {
    var $ = require('jquery'),
        d3 = require('d3'),
        hmDashConf = require('hmDashConf');

    //범례표시.
    var RegionController = require('./control/mois3/Mois3_regionController.js');
    var RegionModel = require('./control/mois3/Mois3_regionModel.js');
    //자동차단
    var AutoDenyController = require('./control/mois3/Mois3_autoDenyController.js');
    var AutoDenyModel = require('./control/mois3/Mois3_autoDenyModel.js');
    //수동차단
    var ManualDenyController = require('./control/mois3/Mois3_manualDenyController.js');
    var ManualDenyModel = require('./control/mois3/Mois3_manualDenyModel.js');

    var regionController = new RegionController(),
        regionModel = new RegionModel(),
        autoDenyController = new AutoDenyController(),
        autoDenyModel = new AutoDenyModel(),
        manualDenyController = new ManualDenyController(),
        manualDenyModel = new ManualDenyModel();

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
            $('#mois3_region').html(regionController.getHTML());
            $('#mois3_autoDeny').html(autoDenyController.getHTML());
            $('#mois3_manualDeny').html(manualDenyController.getHTML());

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
            rtTimer = d3.interval(refreshData, 600000);
        }

        /**
         * 데이터 갱신
         */
        function refreshData() {
            regionSearch();
            regionStatuAuto();
            regionStatusManual();
        }

        //지도에 사고건수 표시.
        function regionSearch(){
            Server.get('/api/webdash/mois/webDashMois/getRegionStatus', {
                data: {},
                success: function (data) {
                    regionModel.setData(data);
                    regionController.refresh(regionModel);
                }
            });
        }

        //자동차단표시.
        function regionStatuAuto(){
            Server.get('/api/webdash/mois/webDashMois/getRegionStatusAuto', {
                data: {},
                success: function (data) {
                    // console.log(data);
                    autoDenyModel.setData(data);
                    autoDenyController.refresh(autoDenyModel);
                }
            });
        }

        //수동차단표시.
        function regionStatusManual(){
            Server.get('/api/webdash/mois/webDashMois/getRegionStatusManual', {
                data: {},
                success: function (data) {
                    if(data.length > 0){
                        manualDenyModel.setData(data[0].receiptCnt,data[0].processCnt,data[0].completeCnt);
                    }else{
                        manualDenyModel.setData(0,0,0);
                    }
                    manualDenyController.refresh(manualDenyModel);
                }
            });
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
    }());

    $(function () {
        D3Main.initialize();
        D3Main.resizeWin();
        D3Main.refreshData();
        D3Main.startTimer();
    });
});