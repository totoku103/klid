define(function (require) {
    var $ = require('jquery'),
        d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        DateFormat = require('DateFormat'),
        marquee = require('marquee');

    //사이버위기경보
    var CyberAlertController = require('./control/mois1/Mois1_cyberAlertController.js');
    var CyberAlertModel = require('./control/mois1/Mois1_cyberAlertModel.js');
    var CyberUpdInfoController = require('./control/mois1/Mois1_cyberUpdInfoController.js');
    var CyberUpdInfoModel = require('./control/mois1/Mois1_cyberUpdInfoModel.js');
    //공지사항
    var NoticeBoardController = require('./control/local/Local_noticeBoardController.js');
    var NoticeBoardModel = require('./control/local/Local_noticeBoardModel.js');
    // 보안자료실
    var SecurityBoardController = require('./control/local/Local_securityBoardController.js');
    var SecurityBoardModel = require('./control/local/Local_securityBoardModel.js');
    //침해사고현황
    var ManualDenyController = require('./control/admctrl/Admctrl_manualDenyController.js');
    var ManualDenyModel = require('./control/admctrl/Admctrl_manualDenyModel.js');
    //공격자TOP5
    var BrfAttackTop5Controller = require('./control/extbrf/Extbrf_attackTop5Controller.js');
    var BrfAttackTop5Model =  require('./control/extbrf/Extbrf_attackTop5Model.js');
    //지도
    var CountryController = require('./control/extctrl/Extctrl_countryController.js');
    var CountryModel = require('./control/extctrl/Extctrl_countryModel.js');
    //유형별추이
    var EvtCntController = require('./control/extctrl/Extctrl_evtCntController.js');
    var EvtCntModel = require('./control/extctrl/Extctrl_evtCntModel.js');

    var cyberAlertController = new CyberAlertController(),
        cyberAlertModel = new CyberAlertModel(),
        cyberUpdInfoController = new CyberUpdInfoController(),
        cyberUpdInfoModel = new CyberUpdInfoModel(),
        noticeBoardController = new NoticeBoardController(),
        noticeBoardModel = new NoticeBoardModel(),
        securityBoardController = new SecurityBoardController(),
        securityBoardModel = new SecurityBoardModel(),
        manualDenyController = new ManualDenyController(),
        manualDenyModel = new ManualDenyModel(),
        brfAttackTop5Controller = new BrfAttackTop5Controller(),
        brfAttackTop5Model = new BrfAttackTop5Model(),
        countryController = new CountryController(),
        countryModel = new CountryModel(),
        evtCntController = new EvtCntController(),
        evtCntModel = new EvtCntModel();

    var D3Main = (function(){
        var rtTimer = null;
        var timeCnt = 0, refreshCnt = hmDashConf.refreshTime/1000;

        $('div.dateFunction').text($.format.date(new Date(), 'yyyy년 MM월 dd일 (E) A h:mm:ss'));

        //상단공지시항 애니메이션
        hmDashConf.getMarquee();

        return {
            initialize: initialize,
            resizeWin: resizeWin,
            refreshData: refreshData,
            startTimer: startTimer,
            resetTimer:resetTimer
        };

        /**
         * 토폴로지 초기화
         */
        function initialize() {
            $('div.dateFunction').text($.format.date(new Date(), 'yyyy년 MM월 dd일 (E) A h:mm:ss'));

            $('#local_cyberAlert').html(cyberAlertController.getHTML());
            $('#local_cyberUpdInfo').html(cyberUpdInfoController.getHTML());
            $('#admctrl_manualDeny').html(manualDenyController.getHTML());
            $('#attTop5').html(brfAttackTop5Controller.getHTML());
            $('#extctrl_country').html(countryController.getHTML());
            $('#extctrl_evtCnt').html(evtCntController.getHTML());

            // resize
            cyberAlertController.resize();
            cyberUpdInfoController.resize();
            brfAttackTop5Controller.resize();

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
            // this.startTimer();
        }
        /**
         * 데이터 갱신
         */
        function refreshData() {
            //상단 타이틀 바
            getCodeNotice();
            cyberAtInfo();
            noticeList();
            secuList();
            getIncidentStatus();
            getAttNationTop5();
            //위협이벤트
            getInciCnt();
            //고위협공격시도
            getTbzledgeCnt();
            //유형별차트
            getTypeChart();
        }

        function getCodeNotice(){
            Server.get('/api/code/getDashTextCode', {
                data:{comCode1:4020,comCode2:4},
                success: function(result) {
                    $('#noticeInput').val(result[0].codeCont);
                }
            });
        }

        //공지사항리스트
        function noticeList() {
            Server.get('/api/webdash/sido/webDashSido/getNoticeList', {
                data: {
                    listSize: '3',
                    sInstCd: $("#sInstCd").val(),
                    sAuthMain:$("#sAuthMain").val(),
                    sPntInstCd:$("#sPntInstCd").val()
                },
                success: function (data) {
                    noticeBoardModel.setData(data);
                    noticeBoardController.refresh(noticeBoardModel, $('#local_noticeBoard'));
                }
            });
        }


        //보안리스트
        function secuList() {
            Server.get('/api/webdash/sido/webDashSido/getSecuList', {
                data: {
                    listSize: '3',
                    sInstCd: $("#sInstCd").val(),
                    sAuthMain:$("#sAuthMain").val()
                },
                success: function (data) {
                    securityBoardModel.setData(data);
                    securityBoardController.refresh(securityBoardModel, $('#local_securityBoard'));
                }
            });
        }

        //위기경보조회.
        function cyberAtInfo() {
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

        //침해사고현황
        function getIncidentStatus() {
            Server.get('/api/webdash/adminControl/getIncidentStatus', {
                success: function(result) {
                    manualDenyModel.setData(result);
                    manualDenyController.refresh(manualDenyModel);
                }
            });
        }

        //공격국가
        function getAttNationTop5() {
            Server.get('/api/webdash/center/webDashCenter/getAttNationTop5', {
                success: function(result) {
                    countryController.refresh(countryModel, result);

                    //TOP5
                    brfAttackTop5Model.setData(result);
                    brfAttackTop5Controller.refresh(brfAttackTop5Model);
                }
            });
        }

        //위협이벤트
        function getInciCnt() {
            var params = {};
            params.sAuthMain=$("#sAuthMain").val();
            params.sInstCd=$('#sInstCd').val();

            Server.get('/api/webdash/adminControl/getInciCnt', {
                data:params,
                success: function(result) {
                    evtCntModel.setInciData(result);
                    evtCntController.refreshInci(evtCntModel);
                }
            });
        }

        //고위협공격시도
        function getTbzledgeCnt() {
            Server.get('/api/webdash/adminControl/getTbzledgeCnt', {
                success: function(result) {
                    evtCntModel.setTbzledgeData(result);
                    evtCntController.refreshTbz(evtCntModel);
                }
            });
        }

        //유형별차트
        function getTypeChart() {
            var params = {};
            params.sAuthMain=$("#sAuthMain").val();
            params.sInstCd=$('#sInstCd').val();

            //2019.08.19 추가 사고접수 유형별 집계카운트 추가
            Server.get('/api/webdash/adminControl/getInciTypeCnt', {
                data: {},
                success: function(result) {
                    evtCntModel.setInciTypeCnt(result);
                }
            });

            Server.get('/api/webdash/center/webDashCenter/getTypeChart', {
                data: params,
                success: function(result) {
                    evtCntModel.setChartData(result);
                    evtCntController.refreshTypeChart(evtCntModel);
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