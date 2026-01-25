define(function (require) {
    var $ = require('jquery'),
        d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        DateFormat = require('DateFormat'),
        marquee = require('marquee');

    //지도
    var MapController = require('./control/admctrl/BrfMgr_mapController.js');
    var MapModel = require('./control/admctrl/BrfMgr_mapModel.js');

    var EvtCntController = require('./control/admctrl/BrMgr_evtCntController.js');
    var EvtCntModel = require('./control/admctrl/BrMgr_evtCntModel.js');


    var mapController = new MapController(),
        mapModel = new MapModel(),
        evtCntController = new EvtCntController(),
        evtCntModel = new EvtCntModel();


    var D3Main = (function(){
        var rtTimer = null;
        var timeCnt = 0, refreshCnt = hmDashConf.refreshTime / 1000;
        var rotIdx = 0;
        /*var rotList = ['Seoul', 'Busan', 'Daegu', 'Incheon', 'Gwangju', 'Daejeon', 'Ulsan', 'Gyeonggi', 'Gangwon', 'Chungbuk', 'Chungnam',
            'Jeonbuk', 'Jeonnam', 'Gyeongbuk', 'Gyeongnam', 'Jeju', 'Sejong'];*/

        $('div.dateFunction').text($.format.date(new Date(), 'yyyy년 MM월 dd일 (E) A h:mm:ss'));

        //상단공지시항 애니메이션
        hmDashConf.getMarquee();

        var rotList = [
            {localNm: 'Seoul', localKrNm: '서울' ,localCd: 10},
            {localNm: 'Busan', localKrNm: '부산' ,localCd: 20},
            {localNm: 'Daegu', localKrNm: '대구' ,localCd: 30},
            {localNm: 'Incheon', localKrNm: '인천' ,localCd: 40},
            {localNm: 'Gwangju', localKrNm: '광주' ,localCd: 50},
            {localNm: 'Daejeon', localKrNm: '대전' ,localCd: 60},
            {localNm: 'Ulsan', localKrNm: '울산' ,localCd: 70},
            {localNm: 'Sejong', localKrNm: '세종' ,localCd: 170},
            {localNm: 'Gyeonggi', localKrNm: '경기' ,localCd: 80},
            {localNm: 'Gangwon', localKrNm: '강원' ,localCd: 90},
            {localNm: 'Chungbuk', localKrNm: '충북' ,localCd: 100},
            {localNm: 'Chungnam', localKrNm: '충남' ,localCd: 110},
            {localNm: 'Jeonbuk', localKrNm: '전북' ,localCd: 120},
            {localNm: 'Jeonnam', localKrNm: '전남' ,localCd: 130},
            {localNm: 'Gyeongbuk', localKrNm: '경북' ,localCd: 140},
            {localNm: 'Gyeongnam', localKrNm: '경남' ,localCd: 150},
            {localNm: 'Jeju', localKrNm: '제주' ,localCd: 160}

        ]

        var localNm = "";

        return {
            initialize: initialize,
            resizeWin: resizeWin,
            refreshData: refreshData,
            startTimer: startTimer,
            resetTimer:resetTimer,
        };

        /**
         * 토폴로지 초기화
         */
        function initialize() {

            $('#brf_map').html(mapController.getHTML());

            $('#allAlertGrid').html(evtCntController.getHTML());

            $('#localAlertGrid').html(evtCntController.getLocalHTML());

            //mapController.refresh(mapModel);
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
            rtTimer = d3.interval(function() {
                $('div.dateFunction').text($.format.date(new Date(), 'yyyy년 MM월 dd일 (E) A h:mm:ss'));
                if(++timeCnt > refreshCnt) {
                    refreshData();
                    timeCnt = 0;
                }
                $('div.ref_Fillbar').css('width', (timeCnt/refreshCnt * 100) + '%');
            }, 1000);
        }

        function clearTimer() {
            if(rtTimer != null) {
                d3.clearInterval(rtTimer);
            }
            rtTimer = null;
        }

        function resetTimer() {
            refreshData();
            timeCnt = 0;

            // this.clearTimer();
          //  this.startTimer();
        }

        /**
         * 데이터 갱신
         */
        function refreshData() {

            //상단 타이틀 바
            getCodeNotice();

            //지역별 위변조/헬스체크
            getLocalStatus();
            if(rotIdx >= rotList.length) rotIdx = 0;


            //각 지역별 경보현황
            $("#LocalTit").text(rotList[rotIdx].localKrNm);
            localNm = rotList[rotIdx].localKrNm;
            getLocalChart();

            //지도 로테이션
            //$('#localPnl').removeClass().addClass(rotList[rotIdx++] + 'Pnl');
            $('#localPnl').removeClass().addClass(rotList[rotIdx++].localNm + 'Pnl');
            
            //전체 경보현황
            getEvtChart();

            //지역별 경보현황
            getEvtLocalChart(localNm);

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

        function getCodeNotice(){
            Server.get('/api/code/getDashTextCode', {
                data:{comCode1:4020,comCode2:2},
                success: function(result) {
                    //alert(result[0].codeCont);
                    $('#noticeInput').val(result[0].codeCont);
                }
            });
        }

        function getLocalStatus() {
            Server.get('/api/webdash/adminControl/getLocalStatus', {
                success: function(result) {
                    mapModel.setData(result);
                    mapController.refresh(mapModel);
                }
            });
        }

        function getLocalChart() {
            Server.get('/api/webdash/adminControl/getLocalStatus', {
                data: {},
                success: function(result) {
                    mapModel.setData(result);
                    mapController.refresh(mapModel);
                }
            });
        }

        function getEvtChart() {
            Server.get('/api/webdash/center/webDashCenter/getEvtAllChart', {
                success: function(result) {
                    evtCntModel.setChartData(result);
                    evtCntController.refreshTypeChart(evtCntModel);
                }
            });
        }

        function getEvtLocalChart(localNm) {
            Server.get('/api/webdash/center/webDashCenter/getEvtChart', {
                data: {localNm: localNm},
                success: function(result) {
                    evtCntModel.setLocalChartData(result, localNm);
                    evtCntController.refreshTypeLocalChart(evtCntModel);
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

    //새로고침.
    $('#refreshBtn').click(function () {
        D3Main.resetTimer();
    });

    //창최대화
    $('.max').click(function () {
        window.moveTo(0, 0);
        window.resizeTo(screen.availWidth, screen.availHeight);
    });

});