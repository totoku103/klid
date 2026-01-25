define(function (require) {
    var $ = require('jquery'),
        d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        DateFormat = require('DateFormat'),
        marquee = require('marquee');

    //침해사고현황
    var ManualDenyController = require('./control/extbrf/Extbrf_manualDenyController.js');
    var ManualDenyModel = require('./control/extbrf/Extbrf_manualDenyModel.js');

    //지도
    var CountryController = require('./control/extbrf/Extbrf_countryController.js');
    var CountryModel = require('./control/extbrf/Extbrf_countryModel.js');

    //카운트/그리드
    var EvtCntController = require('./control/extbrf/Extbrf_evtCntController.js');
    var EvtCntModel = require('./control/extbrf/Extbrf_evtCntModel.js');

    //공격자 top5
    var BrfAttackTop5Controller = require('./control/extbrf/Extbrf_attackTop5Controller.js');
    var BrfAttackTop5Model =  require('./control/extbrf/Extbrf_attackTop5Model.js');

    var manualDenyController = new ManualDenyController(),
        manualDenyModel = new ManualDenyModel(),
        countryController = new CountryController(),
        countryModel = new CountryModel(),
        evtCntController = new EvtCntController(),
        evtCntModel = new EvtCntModel(),
        brfAttackTop5Controller = new BrfAttackTop5Controller(),
        brfAttackTop5Model = new BrfAttackTop5Model();



    var D3Main = (function(){
        var rtTimer = null;
        var timeCnt = 0, refreshCnt = hmDashConf.refreshTime / 1000;

        $('div.dateFunction').text($.format.date(new Date(), 'yyyy년 MM월 dd일 (E) A h:mm:ss'));

        //상단공지시항 애니메이션
        hmDashConf.getMarquee();

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

            //침해사고현황
            $('#extbrf_manualDeny').html(manualDenyController.getHTML());
            $('#extbrf_country').html(countryController.getHTML());

            //이벤트 카운트/그리드
            $('#extbrf_evtCnt').html(evtCntController.getHTML());

            $('#attTop5').html(brfAttackTop5Controller.getHTML());

            manualDenyController.resize();

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
            //this.clearTimer();
            //this.startTimer();
        }

        /**
         * 데이터 갱신
         */
        function refreshData() {
            //상단 타이틀 바
            getCodeNotice();
            //manualDenyController.refresh(manualDenyModel);
            getAttNationTop5();
            getIncidentStatus();
            getInciCnt();
            getTbzledgeCnt();
            getTypeChart();

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
                data:{comCode1:4020,comCode2:3},
                success: function(result) {
                    //alert(result[0].codeCont);
                    $('#noticeInput').val(result[0].codeCont);
                }
            });
        }

        //공격국가
        function getAttNationTop5() {
            Server.get('/api/webdash/center/webDashCenter/getAttNationTop5', {
                success: function(result) {
                    //countryController.refresh(countryModel);
                    countryController.refresh(countryModel, result);

                    //그리드
                    brfAttackTop5Model.setData(result)
                    brfAttackTop5Controller.refresh(brfAttackTop5Model);
                }
            });
        }

        function getInciCnt() {
            var params = {};
            params.sAuthMain=$("#sAuthMain").val();
            params.sInstCd=$('#sInstCd').val();

            Server.get('/api/webdash/adminControl/getInciCnt', {
                data: params,
                success: function(result) {
                    evtCntModel.setInciData(result);
                    evtCntController.refreshInciType(evtCntModel);
                }
            });
        }

        function getTbzledgeCnt() {
            Server.get('/api/webdash/adminControl/getTbzledgeCnt', {
                success: function(result) {
                    evtCntModel.setTbzledgeData(result)
                    evtCntController.refreshTbzledge(evtCntModel);
                }
            });
        }

        function getIncidentStatus() {
            Server.get('/api/webdash/adminControl/getIncidentStatus', {
                success: function(result) {
                    manualDenyModel.setData(result);
                    manualDenyController.refresh(manualDenyModel);
                }
            });
        }

        function getTypeChart() {
            var params = {};
            params.sAuthMain=$("#sAuthMain").val();
            params.sInstCd=$('#sInstCd').val();

            Server.get('/api/webdash/center/webDashCenter/getTypeChart', {
                data:params,
                success: function(result) {
                    evtCntModel.setChartData(result);
                    evtCntController.refreshTypeChart(evtCntModel);
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