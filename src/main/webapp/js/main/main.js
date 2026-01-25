var Main = {
		/** variable */
		initVariable: function() {
            var url = unescape(location.href);
			var paramArr = url.split("?");
			if(paramArr.length>1){
                if(paramArr[1]=='Y')
                	alert("페이지 업데이트 중입니다.");
			}
		},

		/** add event */
		observe: function() {
            $('#alarmEdit').click(function () {
                Main.editThreatPopup();
            });
            $('#statusEdit').click(function () {
                Main.editPeriodPopup();
            });
            $("#moreNotice").click(function () {
                location.href=$('#ctxPath').val() +'/main/sec/noticeBoardList.do';
            });
            $("#moreQna").click(function () {
                location.href=$('#ctxPath').val() +'/main/sec/qnaBoardList.do';
            });
            $("#moreMonitoring").click(function () {
                location.href=$('#ctxPath').val() +'/main/home/forgeryUrl.do';
            });
		},

		/** event handler */
		eventControl: function(event) {


		},
		
		/** init design */
		initDesign: function() {
            if($("#sAuthMain").val() == 'AUTH_MAIN_2'){
                $("#alarmEdit").css("display", "inline");
            }
		},
		
		/** init data */
		initData: function() {
			this.getThreat();
			this.getNoticeList();
            this.getQnaList();
			this.getPeriod();
            this.getAccdTypeTop5();
            this.getInstTop5();
            this.getTodayStatus();
            this.getYearStatus();
            this.getForgeryHm();
		},

    	editThreatPopup: function () {
            $.get(ctxPath + '/main/popup/sys/pThreatSet.do',
                function(result) {
                    HmWindow.open($('#pwindow'), '예.경보 발령 설정', result, 400, 304,'pwindow_init',{instCd:$('#sInstCd').val()});
                }
            );
        },

		getThreat: function () {
            Server.get('/api/main/sys/getThreatNow', {
                data: {instCd: $('#sInstCd').val()},
                success: function (data) {
                    if(data.length==0){
                        $('#alarmCircle').attr('class','Circle1');
                    }else{
                        $('#alarmCircle').attr('class','Circle'+data[0].nowThreat);
                    }
                }
            });
        },

	//공지사항 리스트 조회.
     getNoticeList : function() {
          $.ajax({
                type: 'POST',
                url: ctxPath + '/api/main/sec/noticeBoard/getMainNoticeList',
                data: {
                        listSize: '6',
                        sAuthMain:$("#sAuthMain").val(),
                        sInstCd:$("#sInstCd").val(),
                        sPntInstCd:$("#sPntInstCd").val()
                },
                success: function (data) {
                    $("#noticeUl").empty();
                    if(data.resultData.length > 0){
                        var html="";
                        $.each(data.resultData, function (index, data) {
                            html+="<li onclick=Main.noticeDetailPop("+"'"+data.bultnNo+"'"+")>";
                            html+="<span>"+data.bultnTitle+"</span>";
                            html+="<strong>"+data.regDate+"</strong>";
                            html+="</li>";
                        });
                        $("#noticeUl").html(html);
                    }
                }
            });
        },

        //문의/의견 리스트 조회.
        getQnaList : function() {
            $.ajax({
                type: 'POST',
                url: ctxPath + '/api/main/sec/qnaBoard/getMainQnaList',
                data: {
                    listSize: '6',
                    sInstCd:$("#sInstCd").val()
                },
                success: function (data) {
                    $("#qnaUl").empty();
                    if(data.resultData.length > 0){
                        var html="";
                        $.each(data.resultData, function (index, data) {
                            html+="<li onclick=Main.qnaDetailPop("+"'"+data.bultnNo+"'"+","+"'"+data.isSecret+"'"+","+"'"+data.userId+"'"+")>";
                            html+="<span>"+data.bultnTitle+"</span>";
                            html+="<strong>"+data.regDate+"</strong>";
                            html+="</li>";
                        });
                        $("#qnaUl").html(html);
                    }
                }
            });
        },

        editPeriodPopup: function () {
            $.get(ctxPath + '/main/popup/sys/pPeriodSet.do',
                function(result) {
                    HmWindow.open($('#pwindow'), '미처리 기간설정', result, 300, 106,'pwindow_init',{instCd:$('#sInstCd').val()});
                }
            );
        },

		getPeriod: function () {
            Server.get('/api/main/sys/getPeriodNow', {
                data: {instCd: $('#sInstCd').val()},
                success: function (data) {
                    if(data.length==0){
                        $('#period1').text('10일 이내');
                        $('#period2').text('10~20일');
                        $('#period3').text('30일 이상');
                    }else{
                        if(data[0] != null){
                            $('#period1').text(data[0].period1+'일' + ' 이내');
                            $('#period2').text(data[0].period1+ '~'+data[0].period2+'일');
                            $('#period3').text(data[0].period3+'일'+ ' 이상');
                        }else{
                            $('#period1').text('10일 이내');
                            $('#period2').text('10~20일');
                            $('#period3').text('30일 이상');
                        }
                    }
                    //기간별 조회
                    Server.get('/api/main/acc/accidentApply/getPeriodStatus', {
                        data: { sAuthMain:$("#sAuthMain").val(),
                            sInstCd:$("#sInstCd").val()},
                        success: function (data) {
                            if(data.length > 0){
                                if(data[0] != null){
                                    $('#period1Cnt').text(HmUtil.commaNum(data[0].cnt1)+"건");
                                    $('#period2Cnt').text(HmUtil.commaNum(data[0].cnt2)+"건");
                                    $('#period3Cnt').text(HmUtil.commaNum(data[0].cnt3)+"건");
                                }else{
                                    $('#period1Cnt').text("0건");
                                    $('#period2Cnt').text("0건");
                                    $('#period3Cnt').text("0건");
                                }
                            }else{
                                $('#period1Cnt').text("0건");
                                $('#period2Cnt').text("0건");
                                $('#period3Cnt').text("0건");
                            }
                        }
                    });
                }
            });
        },

        getAccdTypeTop5: function () {
            var startDt = new Date();
            var endDt = new Date();

            startDt.setDate(startDt.getDate() -7 );
            startDt =  $.format.date(startDt, "yyyyMMdd") + '000000';
            endDt =  $.format.date(endDt, "yyyyMMdd") + '235959';

            var params = {};
            params.atype=Main.getDates();
            params.sAuthMain=$("#sAuthMain").val();
            params.instCd=$('#sInstCd').val();
            params.dateType = 'inci_acpn_dt';
            params.startDt = startDt;
            params.endDt = endDt;

                Server.get('/api/main/rpt/reportInciType/getTypeList', {
                    data:params,
                    success: function(result) {
                        if(result.length > 0){
                            var html="";
                            /*result.sort(function (a,b) {
                                return b.evtCnt-a.evtCnt;
                            });*/
                            var size=0;
                            if(result.length>5)
                                size=5;
                            else
                                size = result.length;

                            for (var i = 0; i < size; i++) {
                                html+="<li><span></span>";
                                html+=result[i].name+"<strong>"+HmUtil.commaNum(result[i].y) +"</strong>";
                                html+="</li>";
                            }
                            $("#accdTypeList").html(html);
                        }
                    }
                });
        },

        getInstTop5: function () {
            var startDt = new Date();
            var endDt = new Date();

            startDt.setDate(startDt.getDate() -7 );
            startDt =  $.format.date(startDt, "yyyyMMdd") + '000000';
            endDt =  $.format.date(endDt, "yyyyMMdd") + '235959';

            var params = {};
            params.atype=Main.getDates();
            params.sAuthMain=$("#sAuthMain").val();
            params.instCd=$('#sInstCd').val();

            params.dateType = 'inci_acpn_dt';
            params.startDt = startDt;
            params.endDt = endDt;

            //일일실적 보고서 쿼리와 맞춤 , 기간조건 금일기준 1주일전 000000 ~ 금일 235959
            var callUrl = '';
            if($('#sAuthMain').val() == 'AUTH_MAIN_3' ){
                callUrl = '/api/main/rpt/reportInciLocal/getInciSidoList'; //시도,시군구 일경우 시군구 조회
                params.topInstView = 'main'; //메인에서 호출시 피해기관은 본청(시도)까지 표현. 해당 parameter로 쿼리 분기 처리
            }else if($('#sAuthMain').val() == 'AUTH_MAIN_4' ){
                callUrl = '/api/main/rpt/reportInciLocal/getInciSidoList';
            }else{
                callUrl = '/api/main/rpt/reportInciLocal/getLocalList' //개발원일 경우 시도 조회
                params.sortType = 'main' //메인페이지에서 호출시 정렬은 cnt 역순
            }
            
            Server.get(callUrl, {
                data:params,
                success: function(result) {
                    if(result.length > 0){
                        var html="";
                        /*result.sort(function (a,b) {
                            return b.evtCnt-a.evtCnt;
                        });*/
                        var size=0;
                        if(result.length>5)
                            size=5;
                        else
                            size = result.length;

                        for (var i = 0; i < size; i++) {
                            html+="<li><span></span>";
                            var name = result[i].name;

                            if($('#sAuthMain').val()=='AUTH_MAIN_3'){
                                if(name=='서울'||name=='세종'||name=='부산'||name=='대구'||name=='인천'||name=='광주'||name=='대전'
                                    ||name=='울산'||name=='경기'||name=='강원'||name=='충북'||name=='충남'||name=='전북'||name=='전남'
                                    ||name=='경북'||name=='경남'||name=='제주'){
                                    name = '본청';
                                }
                            }
                            
                            html+=name+"<strong>"+HmUtil.commaNum(result[i].y)+"</strong>";
                            html+="</li>";
                        }
                        $("#instTypeList").html(html);
                    }
                }
            });
        },
        returnTwo: function (str) {
            str="0"+str;
            return str.slice(-2);
        },
        getDates: function () {
            var today = new Date();
            var hhmmss = Main.returnTwo(today.getHours())+ Main.returnTwo(today.getMinutes())+ Main.returnTwo(today.getSeconds());
            if(hhmmss>="000000"&& hhmmss<="060000"){
                return 0;
            }
            return 1;
        },
        getTodayStatus: function () {
            Server.get('/api/main/acc/accidentApply/getTodayStatus', {
                data: { sAuthMain:$("#sAuthMain").val(),
                    sInstCd:$("#sInstCd").val(),
                    atype: Main.getDates()
                },
                success: function (data) {
                    if(data.length > 0){
                        if(data[0] == null){
                            $('#accApply').text("0");
                            $('#accIng').text("0");
                            $('#accEnd').text("0");
                        }else{
                            $('#accApply').text(HmUtil.commaNum(data[0].ing + data[0].end));
                            $('#accIng').text(HmUtil.commaNum(data[0].ing));
                            $('#accEnd').text(HmUtil.commaNum(data[0].end));
                        }
                    }else{
                        $('#accApply').text("0");
                        $('#accIng').text("0");
                        $('#accEnd').text("0");
                    }
                }
            });
        },

        getYearStatus: function () {
            var toDate = new Date();
            $("#yearSpan").text(toDate.getFullYear()+"년 처리완료");



            Server.get('/api/main/acc/accidentApply/getYearStatus', {
                data: {sAuthMain:$("#sAuthMain").val(),
                    sInstCd:$("#sInstCd").val(),
                    atype: Main.getDates()
                },
                success: function (data) {
                    if(data.length > 0){
                        if(data[0] != null){
                            $('#yearEnd').text(HmUtil.commaNum(data[0].end));
                        }else{
                            $('#yearEnd').text("0");
                        }
                    }else{
                        $('#yearEnd').text("0");
                    }
                }
            });
        },

    noticeDetailPop: function(bultnNo) {
        var params = { boardNo : bultnNo };
        HmUtil.createPopup('/main/board/pNoticeBoardContents.do', $('#hForm'), 'pNoticeBoardContents', 1000, 750, params);
    },

    qnaDetailPop: function(bultnNo,isSecret,qnaUserId) {

        var sessionId = $('#sUserId').val();  //로그인 id
        var authMain = $("#sAuthMain").val();
        //비밀글 여부 확인, 본인&관리자 권한만 열람
        if(isSecret == 'Y'){
            if(authMain != 'AUTH_MAIN_1'){
                if(qnaUserId != sessionId){
                    alert("비밀글입니다.");
                    return false;
                }
            }
        }
        var params = { boardNo : bultnNo };

        HmUtil.createPopup('/main/board/pQnaBoardContents.do', $('#hForm'), 'pQnaBoardContents', 1000, 650, params);
    },
    //홈페이지 모니터링 조회.
    getForgeryHm : function() {
        var toDate1 = new Date();
        var toDate2 = new Date();
        //5분전
        toDate1.setMinutes(toDate1.getMinutes()-5);
        //5분후
        toDate2.setMinutes(toDate2.getMinutes()+5);

        var year = toDate1.getFullYear();
        var month = new String(toDate1.getMonth()+1);
        var day = new String(toDate1.getDate());
        var hh = new String(toDate1.getHours());
        var mm =  new String(toDate1.getMinutes());
        var ss =  new String(toDate1.getSeconds());
        // 한자리수일 경우 0을 채워준다.
        if(month.length == 1){
            month = "0" + month;
        }
        if(day.length == 1){
            day = "0" + day;
        }
        if(hh.length == 1){
            hh = "0" + hh;
        }
        if(mm.length == 1){
            mm = "0" + mm;
        }
        if(ss.length == 1){
            ss = "0" + ss;
        }

        var time1 = year+""+month+""+day+""+hh+""+mm+""+ss;

        var year = toDate2.getFullYear();
        var month = new String(toDate2.getMonth()+1);
        var day = new String(toDate2.getDate());
        var hh = new String(toDate2.getHours());
        var mm =  new String(toDate2.getMinutes());
        var ss =  new String(toDate2.getSeconds());
        // 한자리수일 경우 0을 채워준다.
        if(month.length == 1){
            month = "0" + month;
        }
        if(day.length == 1){
            day = "0" + day;
        }
        if(hh.length == 1){
            hh = "0" + hh;
        }
        if(mm.length == 1){
            mm = "0" + mm;
        }
        if(ss.length == 1){
            ss = "0" + ss;
        }

        var time2 = year+""+month+""+day+""+hh+""+mm+""+ss;
        
        //홈페이지 모니터링 전체/정상/장애 수치 통계
        $.ajax({
            type: 'POST',
            url: ctxPath + '/api/main/home/forgeryUrl/getMainForgeryCnt',
            data: {
                sInstCd:$("#sInstCd").val(),
                sAuthMain: $("#sAuthMain").val()
            },
            success: function (data) {
                var healthNormalCnt = 0; // 헬스정상
                var healthErrCnt =  0;   // 헬스장애
                var urlNormalCnt =  0;   // url정상
                var urlErrCnt =  0;   // url장애

                if(data.resultData.contents != null){
                    healthNormalCnt = data.resultData.contents.healthNormalCnt;
                    healthErrCnt =  data.resultData.contents.healthErrCnt;
                    urlNormalCnt = data.resultData.contents.urlNormalCnt;
                    urlErrCnt =  data.resultData.contents.urlErrCnt;
                }

                var healthTotal =  healthNormalCnt + healthErrCnt;
                var urlTotal =  urlNormalCnt +   urlErrCnt;


                $("#healthErr").text(HmUtil.commaNum(healthErrCnt));
                $("#healthTotal").text(HmUtil.commaNum(healthTotal));
                $("#urlTotal").text(HmUtil.commaNum(urlTotal));
                $("#urlErr").text(HmUtil.commaNum(urlErrCnt));
            }
        });
            
        $.ajax({
            type: 'POST',
            url: ctxPath + '/api/main/home/forgeryUrl/getMainForgeryHm',
            data: {
                sInstCd:$("#sInstCd").val(),
                time1:time1,
                time2:time2
            },
            success: function (data) {

                $("#monitorTbody1").empty();
                $("#monitorTbody2").empty();
                if (data.resultData.length > 0) {
                    var html1 = "";
                    var html2 = "";
                    var blueCnt = 0; //정상 카운트
                    var redCnt = 0; //장애 카운트

                   var half = data.resultData.length / 2;
                   var halfIs = data.resultData.length%2;
                   if(halfIs==1)
                       half = parseInt(half)+1

                    // $.each(data.resultData, function (index, data) {
                    //     if(index%2 == 0){//짝수
                    for (var i = 0; i < half; i++) {
                        html1 += "<tr>";
                        html1 += "<td>" + data.resultData[i].instNm + "</td>";
                        if (data.resultData[i].hmCnt == "0" && data.resultData[i].foCnt == "0") { //정상
                            html1 += "<td><span class=blue></span></td>";
                            blueCnt = blueCnt + 1;
                        } else { //장애
                            html1 += "<td><span class=red></span></td>";
                            redCnt = redCnt + 1;
                        }
                        if (data.resultData[i].hmCnt == "1") { //장애 있음
                            html1 += "<td ><span style='cursor: pointer' class=red onclick='Main.doCheck("+data.resultData[i].instCd+");'></span></td>";
                        } else { //정상
                            html1 += "<td><span class=blue></span></td>";
                        }
                        if (data.resultData[i].foCnt == "1") { //위변조 있음
                            html1 += "<td><span style='cursor: pointer' class=red onclick='Main.doForgery("+data.resultData[i].instCd+");'></span></td>";
                        } else { //정상
                            html1 += "<td><span class=blue></span></td>";
                        }
                        html1 += "</tr>";

                    }
                     for(var i=half; i<data.resultData.length ; i++){

                        // }else{//홀수
                            html2+="<tr>";
                            html2+="<td>"+data.resultData[i].instNm+"</td>";
                            if(data.resultData[i].hmCnt == "0" && data.resultData[i].foCnt == "0"){ //정상
                                html2+="<td><span class=blue></span></td>";
                                blueCnt =blueCnt+1;
                            }else{ //장애
                                html2+="<td><span class=red></span></td>";
                                redCnt =redCnt+1;
                            }
                            if(data.resultData[i].hmCnt == "1"){ //장애 있음
                                html2 += "<td><span style='cursor: pointer' class=red onclick='Main.doCheck("+data.resultData[i].instCd+");'></span></td>";
                            }else{ //정상
                                html2+="<td><span class=blue></span></td>";
                            }
                            if(data.resultData[i].foCnt == "1"){ //위변조 있음
                                html2 += "<td><span style='cursor: pointer' class=red onclick='Main.doForgery("+data.resultData[i].instCd+");'></span></td>";
                            }else{ //정상
                                html2+="<td><span class=blue></span></td>";
                            }
                            html2+="</tr>";
                        }


                    // if(data.resultData.length% 2 == 1){//총건수 홀수.
                    //     html2+="<tr>";
                    //     html2+="<td></td>";
                    //     html2+="<td></td>";
                    //     html2+="<td></td>";
                    //     html2+="<td></td>";
                    //     html2+="</tr>";
                    // }

                    $("#monitorTbody1").html(html1);
                    $("#monitorTbody2").html(html2);
                }//if
            }
        });
    },

    doForgery : function(instCd) {
        location.href = ctxPath + '/main/home/forgeryUrl.do?instCd='+ instCd;
    },
    doCheck : function(instCd) {
        location.href = ctxPath + '/main/home/healthCheckUrl.do?instCd='+ instCd;
    }
};


$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
    Main.initData();
    setInterval(function() {
       // Main.initData();
    }, 600000); // 1분마다 실행( 1분 60000)

    // var alertYn = sessionStorage.alertYn;
    // if(alertYn == undefined || alertYn == null){
    //     alert('신규 사이버침해대응시스템 테스트 운영 중입니다.\n기간 : 2018.12.24(월) ~ 2018.12.28(화)\n수정사항 및 변경요청은 "문의사항" 게시판에 의견 주시기 바랍니다.\n문의처 : 02)2031-9904, lcsc@klid.or.kr');
    //     sessionStorage.alertYn = "Y";
    // }
});


