define(function (require) {
    var $ = require('jquery'),
        d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        DateFormat = require('DateFormat'),
        marquee = require('marquee'),
        chk = "",
        rowCnt = 5;

    //침해사고현황
    var ManualDenyController = require('./control/admctrl/Admctrl_manualDenyController.js');
    var ManualDenyModel = require('./control/admctrl/Admctrl_manualDenyModel.js');
    //홈페이지 위변조 현황
    var ForgeryController = require('./control/admctrl/Admctrl_forgeryController.js');
    var ForgeryModel = require('./control/admctrl/Admctrl_forgeryModel.js');
    //시스템장애현황
    var SysErrorController = require('./control/admctrl/Admctrl_sysErrorController.js');
    var SysErrorModel = require('./control/admctrl/Admctrl_sysErrorModel.js');
    //위변조//헬스체크
    var MapController = require('./control/admctrl/Admctrl_mapController.js');
    var MapModel = require('./control/admctrl/Admctrl_mapModel.js');
    //위협, 고위협 공격시도 카운트
    var EvtCntController = require('./control/admctrl/Admctrl_evtCntController.js');
    var EvtCntModel = require('./control/admctrl/Admctrl_evtCntModel.js');
    //기관별 탐지현황
    var LocalEvtChartController = require('./control/admctrl/Admctrl_localEvtChartController.js');
    var LocalEvtChartModel = require('./control/admctrl/Admctrl_localEvtChartModel.js');

    var manualDenyController = new ManualDenyController(),
        manualDenyModel = new ManualDenyModel(),
        forgeryController = new ForgeryController(),
        forgeryModel = new ForgeryModel(),
        sysErrorController = new SysErrorController(),
        sysErrorModel = new SysErrorModel(),
        mapController = new MapController(),
        mapModel = new MapModel(),
        evtCntController = new EvtCntController(),
        evtCntModel = new EvtCntModel(),
        localEvtChartController = new LocalEvtChartController(),
        localEvtChartModel = new LocalEvtChartModel();

    var D3Main = (function(){
        var rtTimer = null;
        var timeCnt = 0, refreshCnt = hmDashConf.refreshTime / 1000;
        var rotIdx = 0;
        var rotList = ['Seoul', 'Busan', 'Daegu', 'Incheon', 'Gwangju', 'Daejeon', 'Ulsan', 'Gyeonggi', 'Gangwon', 'Chungbuk', 'Chungnam',
            'Jeonbuk', 'Jeonnam', 'Gyeongbuk', 'Gyeongnam', 'Jeju', 'Sejong'];

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
            $('#admctrl_manualDeny').html(manualDenyController.getHTML());
            $('#admctrl_evtCnt').html(evtCntController.getHTML());
            $('#admctrl_forgery').html(forgeryController.getHTML());
            $('#SysGrid').html(sysErrorController.getHTML());
            $('#admctrl_map').html(mapController.getHTML());
            $('#admctrl_localEvtChart').html(localEvtChartController.getHTML());
            localEvtChartController.initChart();
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
           // this.clearTimer();
           // this.startTimer();
        }

        /**
         * 데이터 갱신
         */
        function refreshData() {
            //상단 타이틀 바
            getCodeNotice();
            //침해사고현황
            getIncidentStatus();
            //위협이벤트
            getInciCnt();
            //고위협 공격시도
            getTbzledgeCnt();
            //위변조//헬스체크
            getLocalStatus();
            //홈페이지 위변조 현황
            getUrlStatus();
            //시스템 장애현황
            getSysError();
            //기관별 탐지현황
            getLocalInciCnt();

            //지도효과.
            if(rotIdx >= rotList.length) rotIdx = 0;
            $('#KMgrMapOn').removeClass().addClass(rotList[rotIdx++] + 'Pnl');

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
                data:{comCode1:4020,comCode2:1},
                success: function(result) {
                    //alert(result[0].codeCont);
                    $('#noticeInput').val(result[0].codeCont);
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

        //유형별
        function getInciCnt() {
            var params = {};
            params.sAuthMain=$("#sAuthMain").val();
            params.sInstCd=$('#sInstCd').val();

            Server.get('/api/webdash/adminControl/getInciCnt', {
                data:params,
                success: function(result) {
                    if(result.length > 0){
                        var html="";
                        result.sort(function (a,b) {
                            return b.evtCnt-a.evtCnt;
                        });
                        var size=0;
                        if(result.length>5)
                            size=5;
                        else
                            size = result.length;

                        evtCntModel.setInciData(result.slice(0,5));

                        evtCntController.refreshInciType(evtCntModel);
                    }
                    // result.sort(function (a,b) {
                    //     return b.evtCnt-a.evtCnt;
                    // });
                    // if(result.length > 5) { //5건 넘을경우
                    //     if(chk == "Y"){ //다음데이터.
                    //         evtCntModel.setInciData(result.slice(rowCnt,rowCnt+5));
                    //        if(result.length > rowCnt+5 ){
                    //            rowCnt = rowCnt+5;
                    //             chk = "Y";
                    //         }else{
                    //             chk = "";
                    //             rowCnt = 5;
                    //         }
                    //     }else{
                    //         evtCntModel.setInciData(result.slice(0,5));
                    //         chk = "Y";
                    //     }
                    // }else{
                    //     evtCntModel.setInciData(result);
                    // }
                    //
                    // evtCntController.refreshInciType(evtCntModel);
                }
            });
        }

        function returnTwo(str) {
            str="0"+str;
            return str.slice(-2);
        }
        function getDates() {
            var today = new Date();
            var hhmmss = returnTwo(today.getHours())+ returnTwo(today.getMinutes())+ returnTwo(today.getSeconds());
            if(hhmmss>="000000"&& hhmmss<="060000"){
                return { aType:0 };
            }
            return {aType : 1 };
        }

        function getTbzledgeCnt() {
            Server.get('/api/webdash/adminControl/getTbzledgeCnt', {
                success: function(result) {
                    evtCntModel.setTbzledgeData(result);
                    evtCntController.refreshTbzledge(evtCntModel);
                }
            });
        }

        function getLocalInciCnt() {
            var params = {};
            params.sAuthMain=$("#sAuthMain").val();
            params.sInstCd=$('#sInstCd').val();

            Server.get('/api/webdash/adminControl/getLocalInciCnt', {
                data: params,
                success: function(result) {
                    localEvtChartModel.setData(result);
                    localEvtChartController.refresh(localEvtChartModel);
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

        function getUrlStatus() {
            Server.get('/api/webdash/adminControl/getUrlStatus', {
                success: function(result) {
                    forgeryModel.setData(result);
                    forgeryController.refresh(forgeryModel);
                }
            });
        }

        function getSysError() {
            var hostNm = "";
           if(location.hostname == "localhost"){//로컬
               hostNm = "local";
           }else{
               hostNm = "local";
           }

           var result =[
    {
        "name": "LM1",
        "id": "1",
        "originNameCnt": "0"
    },
    {
        "name": "LM2",
        "id": "2",
        "originNameCnt": "0"
    },
    {
        "name": "LM3",
        "id": "3",
        "originNameCnt": "0"
    },
    {
        "name": "LM4",
        "id": "4",
        "originNameCnt": "0"
    },
    {
        "name": "LM5",
        "id": "5",
        "originNameCnt": "0"
    },
    {
        "name": "LM6",
        "id": "6",
        "originNameCnt": "0"
    },
    {
        "name": "LM7",
        "id": "7",
        "originNameCnt": "0"
    },
    {
        "name": "LM8",
        "id": "8",
        "originNameCnt": "0"
    },
    {
        "name": "LM9",
        "id": "9",
        "originNameCnt": "0"
    },
    {
        "name": "LM10",
        "id": "10",
        "originNameCnt": "0"
    },
    {
        "name": "LM11",
        "id": "11",
        "originNameCnt": "0"
    },
    {
        "name": "LM12",
        "id": "12",
        "originNameCnt": "0"
    },
    {
        "name": "LM13",
        "id": "13",
        "originNameCnt": "0"
    },
    {
        "name": "LM14",
        "id": "14",
        "originNameCnt": "0"
    },
    {
        "name": "LM15",
        "id": "15",
        "originNameCnt": "0"
    },
    {
        "name": "LM16",
        "id": "16",
        "originNameCnt": "0"
    },
    {
        "name": "LM17",
        "id": "17",
        "originNameCnt": "0"
    },
    {
        "name": "LM18",
        "id": "18",
        "originNameCnt": "0"
    },
    {
        "name": "LM19",
        "id": "19",
        "originNameCnt": "0"
    },
    {
        "name": "LM20",
        "id": "20",
        "originNameCnt": "0"
    },
    {
        "name": "GM",
        "id": "21",
        "originNameCnt": "0"
    }
]


           sysErrorModel.setData(result);
            sysErrorController.refresh(sysErrorModel)
            /*Server.get('/webdash/adminControl/getSysErrorStatus.do', {
                data: {hostNm:hostNm},
                success: function(result) {
                    console.log("result",result)
                    sysErrorModel.setData(result);
                    sysErrorController.refresh(sysErrorModel);
                }
            });*/
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