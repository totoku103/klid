define(function (require) {
    var $ = require('jquery'),
        d3 = require('d3'),
        hmDashConf = require('hmDashConf'),
        DateFormat = require('DateFormat'),
        rnum1 = 1,
        rnum2 = 5,
        rTotal= 0;

    //위기경보
    var CyberAlertController = require('./control/mois1/Mois1_cyberAlertController.js');
    var CyberAlertModel = require('./control/mois1/Mois1_cyberAlertModel.js');
    var CyberUpdInfoController = require('./control/mois1/Mois1_cyberUpdInfoController.js');
    var CyberUpdInfoModel = require('./control/mois1/Mois1_cyberUpdInfoModel.js');
    //침해사고현황
    var ManualDenyController = require('./control/mois3/Mois3_manualDenyController.js');
    var ManualDenyModel = require('./control/mois3/Mois3_manualDenyModel.js');
    //지도
    var CityMapController = require('./control/local/Local_cityMapController.js');
    var CityMapModel = require('./control/local/Local_cityMapModel.js');
    //공지사항
    var NoticeBoardController = require('./control/local/Local_noticeBoardController.js');
    var NoticeBoardModel = require('./control/local/Local_noticeBoardModel.js');
    //보안자료실
    var SecurityBoardController = require('./control/local/Local_securityBoardController.js');
    var SecurityBoardModel = require('./control/local/Local_securityBoardModel.js');
    //기관별 상세현황
    var InstStateController = require('./control/local/Local_instStateController.js');
    var InstStateModel = require('./control/local/Local_instStateModel.js');

    var cyberAlertController = new CyberAlertController(),
        cyberAlertModel = new CyberAlertModel(),
        cyberUpdInfoController = new CyberUpdInfoController(),
        cyberUpdInfoModel = new CyberUpdInfoModel(),
        manualDenyController = new ManualDenyController(),
        manualDenyModel = new ManualDenyModel(),
        cityMapController = new CityMapController(),
        cityMapModel = new CityMapModel(),
        noticeBoardController = new NoticeBoardController(),
        noticeBoardModel = new NoticeBoardModel(),
        securityBoardController = new SecurityBoardController(),
        securityBoardModel = new SecurityBoardModel(),
        instStateController = new InstStateController(),
        instStateModel = new InstStateModel();

    var D3Main = (function(){
        var rtTimer = null;
        var timeCnt = 0, refreshCnt = hmDashConf.refreshTime/1000;

        var localCd = Number($("#dashLocal").val());
        var local_inst_cd = "";
        if(localCd == "10"){  //서울
            local_inst_cd= "6110000";
        }else if(localCd == "20"){//부산
            local_inst_cd= "6260000";
        }else if(localCd == "40"){//인천
            local_inst_cd= "6280000";
        }else if(localCd == "50"){//광주
            local_inst_cd= "6290000";
        }else if(localCd == "60"){//대전
            local_inst_cd= "6300000";
        }else if(localCd == "30"){ //대구
            local_inst_cd= "6270000";
        }else if(localCd == "70"){//울산
            local_inst_cd= "6310000";
        }else if(localCd == "80"){//경기
            local_inst_cd= "6410000";
        }else if(localCd == "90"){//강원
            local_inst_cd= "6420000";
        }else if(localCd == "100"){//충북
            local_inst_cd= "6430000";
        }else if(localCd == "110"){//충남
            local_inst_cd= "6440000";
        }else if(localCd == "120"){ //전북
            local_inst_cd= "6450000";
        }else if(localCd == "130"){//전남
            local_inst_cd= "6460000";
        }else if(localCd == "140"){ //경북
            local_inst_cd= "6470000";
        }else if(localCd == "150"){ //경남
            local_inst_cd= "6480000";
        }else if(localCd == "160"){//제주
            local_inst_cd= "6500000";
        }else if(localCd == "170"){//세종
            local_inst_cd= "5690000";
        }
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
            $('#local_manualDeny').html(manualDenyController.getHTML());
            $('#CityMap').html(cityMapController.getHTML());

            // resize
            cyberAlertController.resize();
            cyberUpdInfoController.resize();
            manualDenyController.resize();

            cityMapController.setCityMap(localCd);

            // add event
            addEventListener();
        }

        function setCityLogo() {
            var logo = ['Seoul', 'Busan', 'Daegu', 'Incheon', 'Gwangju', 'Daejeon', 'Ulsan', 'Gyeonggi', 'Gangwon', 'Chungbuk', 'Chungnam',
                'Jeonbuk', 'Jeonnam', 'Gyeongbuk', 'Gyeongnam', 'Jeju', 'Sejong'];
            $('#local_cityLogo').attr('src', '/img/webdash/CitySvgLogo/{0}.svg'.substitute(logo[localCd/10-1]));
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
            setCityLogo();
            cityMapController.setCityMap(localCd);
            cyberAtInfo();
            regionStatusManual();
            getSidoList();
            noticeList();
            secuList();
        }

        //공지사항리스트
        function noticeList() {
            Server.get('/api/webdash/sido/webDashSido/getNoticeList', {
                data: {
                    listSize: '5',
                    sInstCd: local_inst_cd,
                    sAuthMain:'AUTH_MAIN_3'
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
                    listSize: '5',
                    sInstCd: local_inst_cd,
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
                data: {instCd:local_inst_cd},
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

        //수동차단표시.
        function regionStatusManual() {
            Server.get('/api/webdash/sido/webDashSido/getRegionStatusManual', {
                data: {localCd:localCd, atype:getDates()},
                success: function (data) {
                    if (data.length > 0) {
                        manualDenyModel.setData(data[0].receiptCnt, data[0].processCnt, data[0].completeCnt);
                        instStateModel.setCount(data[0].processCnt, data[0].completeCnt);
                    } else {
                        manualDenyModel.setData(0, 0, 0);
                        instStateModel.setCount(0, 0);
                    }
                    manualDenyController.refresh(manualDenyModel);
                    //기관별 상세현황 조회.
                    processList();
                }
            });
        }

        //시도리스트
        function getSidoList() {
            Server.get('/api/webdash/sido/webDashSido/getSidoList', {
                data: {instCd: local_inst_cd},
                success: function (data) {
                    cityMapModel.setData3(localCd,data);
                    forgeryStatus();
                }
            });
        }

        //위변조 표시.
        function forgeryStatus() {
            Server.get('/api/webdash/sido/webDashSido/getForgeryCheck', {
                data: {localCd:localCd},
                success: function (data) {
                    cityMapModel.setData(localCd,data);
                    hcStatus();
                }
            });
        }

        //헬스체크 표시.
        function hcStatus() {
            Server.get('/api/webdash/sido/webDashSido/getHcCheck', {
                data: {localCd:localCd},
                success: function (data) {
                    cityMapModel.setData2(data);
                    cityMapController.refresh(cityMapModel, localCd);
                }
            });
        }

        //처리현황
        function processList() {
            if(rTotal > 0){
                //데이터 더있을경우.
                if(rTotal > rnum2){
                    rnum1 = rnum1 + 5;
                    rnum2 = rnum2 + 5;
                }else{ //데이터 더 없음.
                    rnum1 = 1;
                    rnum2 = 5;
                }
            }

            Server.get('/api/webdash/sido/webDashSido/getProcess', {
                data: {
                    localCd:localCd,rnum1: rnum1, rnum2: rnum2, atype:getDates()
                },
                success: function (data) {
                    if(data.length > 0){
                        rTotal = data[0].dataCnt;
                    }else{
                        rTotal = 0;
                    }

                    instStateModel.setData(data);
                    instStateController.refresh(instStateModel, $('#local_instState'));
                }
            });
        }

        function getDates() {
            var today = new Date();
            var hhmmss = returnTwo(today.getHours())+returnTwo(today.getMinutes())+returnTwo(today.getSeconds());
            if(hhmmss>="000000" && hhmmss<="060000"){
                return 0;
            }
            return 1;
        }
        function returnTwo(str) {
                str="0"+str;
            return str.slice(-2);
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