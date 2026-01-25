var url;
var isAdmin = false;
var _bultnNo;
var _surveyExamType;
var _surveyTypeCode;
var _surveyYn = 'N';
$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});

var Main = {
    /** variable */
    initVariable : function() {
        /* 부모창이 메인페이지면 목록보기 버튼 보이게 */
        // url = $(opener.document).find("#parentPage").val();
        // var lastIndex = url.lastIndexOf("/");
        // url = url.substring(lastIndex + 1, url.length - 4);
        // if (url == "main" || url == "tchMain") {
        // 	//$("#btnBoardList").css("display", "inline");
        // }
        //
        // /* 권한이 admin이나 system이면 true */
        // var auth = $('#sAuth').val();
        // if(auth!=undefined) auth = auth.toUpperCase();
        // if (auth == 'SYSTEM' || auth == 'ADMIN')
        // 	isAdmin = true;
    },

    /** add event */
    observe : function() {
        $('button').bind('click', function(event) {
            Main.eventControl(event);
        });
        $('img').bind('click', function(event) {
            Main.eventControl(event);
        });
    },

    /** event handler */
    eventControl : function(event) {
        var curTarget = event.currentTarget;
        switch (curTarget.id) {
            case 'btnUpgrade':
                this.upgradeBoard();
                break;
            case 'btnDelete':
                this.deleteBoard();
                break;
            case 'btnBoardList':
                this.boardList();
                break;
            case 'btnClose':
                this.boardClose();
                break;
            case 'btnSurveySend':
                this.surveySend();
                break;
            case 'btnConfirmSave':
                this.confirmSave();
                break;
            case 'btnConfirmDel':
                this.confirmDel();
                break;

        }
    },

    /** init design */
    initDesign : function() {
        //$('#editor').jqxEditor({ height : "250px", editable : false, tools : '' });
        $('#editor').jqxEditor({ height : "500px"});
        $.ajax({
            type : "post",
            url : $('#ctxPath').val() + '/api/main/sec/noticeBoard/getBoardContents',
            data : "boardNo=" + $('#boardNo').val(), dataType : "json",
            success : function(jsonData) {

                if(jsonData.errorInfo != null){
                    location.href = ctxPath + "/error.do";
                    return;
                }
                var contents = jsonData.resultData.contents;

                var regDate = HmUtil.parseDate(contents.regDate);
                var endDt = HmUtil.parseDate(contents.endDt).replace("::", "")
                var openScopeName = '';

                if(contents.openScope != ''){
                    if(contents.openScope.indexOf(2) > -1){
                        openScopeName += '개발원 '
                    }

                    if(contents.openScope.indexOf(3) > -1){
                        openScopeName += '시도 '
                    }
                    if(contents.openScope.indexOf(4) > -1){
                        openScopeName += '시군구'
                    }
                }
                $('#openScopeName').val(openScopeName);
                $('#userName').val(contents.userName);
                $('#boardHits').val(contents.readCnt);
                $('#control').val(contents.controlStr);
                $('#boardTitle').val(contents.bultnTitle);
                $('#groupType').val(contents.groupType);
                $('#noticeType').val(contents.noticeType);
                $('#regDate').val(regDate);
                //$('#endDt').val(endDt);
                $('#instNm').val(contents.instNm);

                //$('#editor').val(contents.bultnCont.htmlCharacterUnescapes());

                if(contents.userId==$('#sUserId').val()){
                    /*if ($('#authNot02').val() == 'Y') {
                     $('#btnUpgrade').css("display", "inline");
                     };
                     if ($('#authNot03').val() == 'Y') {
                     $('#btnDelete').css("display", "inline");
                     };*/
                    var btnUpgradeHtml = '<button id="btnUpgrade" type="button" class="p_btnAdj"></button>';
                    var btnDeleteHtml = '<button id="btnDelete" type="button" class="p_btnDel" style="margin-left: 5px"></button>';

                    if($('#authNot02').val() == 'Y'){
                        $(".p_btnPos").append(btnUpgradeHtml);
                        $("#btnUpgrade").attr("onclick", "Main.rhdwltkgkddjqepdlxm()")
                    };
                    if($('#authNot03').val() == 'Y'){
                        $(".p_btnPos").append(btnDeleteHtml);
                        $("#btnDelete").attr("onclick", "Main.rhdwltkgkdtkrwp()")
                    };
                }

                HmUtil.attachFileList(jsonData.resultData.attachFile, false);
                _bultnNo = contents.bultnNo;

                if(contents.surveyTypeCode != null){  //공지사항 설문 문제 키 번호 , 해당 유무로 설문공지인지 아닌지 판단
                    //설문이 존재할경우 공지사항 내용란 줄이고 설문 차트 영역 높이 지정
                    _surveyYn = 'Y';
                    $('#editor').jqxEditor({ height : "250px", editable : false, tools : '' });
                    $('#surveyState').css("height","250px")

                    _surveyExamType = contents.surveyExamType; //설문유형 객관식인지, 주관식인지
                    _surveyTypeCode = contents.surveyTypeCode; //설문 타입 공통코드에서 정의된 코드번호

                    //설문 응시여부 확인
                    $.ajax({
                        type: 'POST',
                        url: ctxPath + '/api/main/sec/noticeBoard/getSurveyAnsweCnt',
                        data: { userId : $('#sUserId').val(),  bultnNo : _bultnNo },
                        success: function (data) {
                            if((data.resultData) * 1 > 0){ //이미 응시를 한 설문이다.

                                //설문유형에 따른 결과 화면 처리 객관식 = 통계 / 주관식 = 그리드
                                if(_surveyExamType == 'choose'){ //객관식
                                    $("#surveyState").show();
                                    Main.createChart(); //객관식 설문 결과 차트 시작
                                }else{ //주관식
                                    $("#surveyGrid").show();
                                    Main.createGrid();  //주관식 설문 결과 그리드
                                }

                            }else{							//미응시 설문이다.
                                //설문응시 화면
                                $("#surveyIng").show();
                                if(_surveyExamType == 'choose'){ //객관식 설문
                                    $("#surveyChooseDiv").show(); //객관식 설문 응시 영역 노출
                                    var surveyExamType = new Array();
                                    $.ajax({
                                        type: 'GET',
                                        url: ctxPath + '/api/code/getCommonCode',
                                        data: {comCode1: 4007, comCode2: contents.surveyTypeCode , codeLvl: '3'},
                                        async: false,
                                        success: function (data) {
                                            $.each(data.resultData, function (index, data) {
                                                surveyExamType.push({label: data.codeName, value: data.comCode3})
                                            });
                                        }
                                    });
                                    //설문 유형들 나열
                                    $('#surveyExamDiv').jqxDropDownList({source: surveyExamType, width: 100,autoDropDownHeight: true, selectedIndex : 0 })
                                }else{							//주관식 설문
                                    $("#surveyTextDiv").show();	//주관식 설문 응시영역 노출
                                }

                            }
                        }
                    });

                }else{ //설문이 없음
                    $('#editor').jqxEditor({ height : "500px"});
                }

                const originStr = contents.bultnCont.htmlCharacterUnescapes();
                $('#editor').val(DOMPurify.sanitize(originStr));

                //2022.01.18 긴급공지일때 하단 확인 메시지 입력란
                if(contents.cateNo == 2){
                    $('#editor').jqxEditor({ height : "250px", editable : false, tools : '' });
                    $("#noticeConfirm").show();
                    $("#confirmDiv").show();
                    Main.confirmGrid();
                }else{
                    $('#editor').jqxEditor({ height : "500px" });
                }
                //window.opener.Main.searchNBoard();

            } });

            $('.jqx-editor iframe').get(0).contentDocument.ondragstart = function (e) {
                e.preventDefault();
            };

    },

    /** init data */
    initData : function() {

    },

    /*upgradeBoard : function() {
     window.location.href = $('#ctxPath').val() + "/main/board/pNoticeBoardEdit.do?boardNo=" + $('#boardNo').val();
     },*/

    rhdwltkgkddjqepdlxm : function () {
        $.ajax({
            type : "post",
            url : $('#ctxPath').val() + '/api/main/sec/noticeBoard/checkAuth',
            data: {boardNo: $('#boardNo').val()},
            dataType : "json",
            success : function(jsonData) {
                console.log(jsonData.resultData)
                if(jsonData.resultData == 'N'){
                    alert("잘못된 접근 입니다.");
                    return
                }else{
                    window.location.href = $('#ctxPath').val() + "/main/board/pNoticeBoardEdit.do?boardNo=" + $('#boardNo').val();
                }
            }
        });
    },

    rhdwltkgkdtkrwp : function() {
        if (confirm("삭제 하시겠습니까?") != true)
            return;

        $.ajax({
            type : "post",
            url : $('#ctxPath').val() + '/api/main/sec/noticeBoard/checkAuth',
            data: {boardNo: $('#boardNo').val()},
            dataType : "json",
            success : function(jsonData) {
                if(jsonData.resultData == 'N'){
                    alert("잘못된 접근 입니다.");
                    return
                }else{
                    $.ajax({ type : "post", url : $('#ctxPath').val() + '/api/main/sec/noticeBoard/delBoard', data : "boardNo=" + $('#boardNo').val(), dataType : "json", success : function(jsonData) {
                    } });

                    $.ajax({ type : "post", url : $('#ctxPath').val() + '/api/file/delete', data : { boardNo : $('#boardNo').val() }, dataType : "json", success : function(jsonData) {
                        window.opener.Main.searchNBoard();
                        if (url == "main") {
                            window.location.href = $('#ctxPath').val() + "/main/board/pNoticeBoardList.do";
                        } else {
                            self.close();
                        }
                        alert("삭제 되었습니다");
                    } });
                }
            }
        });

    },

    boardList : function() {
        window.location.href = $('#ctxPath').val() + "/main/board/pNoticeBoardList.do";
    },

    boardClose : function() {
        self.close();
    },

    createGrid : function(){
        HmGrid.create($("#gridArea"), {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: ctxPath + '/api/main/sec/noticeBoard/getSurveyGrid',
                    updaterow: function(rowid, rowdata, commit) {
                        if(editUserIds.indexOf(rowid) == -1)
                            editUserIds.push(rowid);
                        commit(true);
                    },
                    datafields: [
                        { name: 'userId', type: 'string' },
                        { name: 'instCd', type: 'string' },
                        { name: 'userNm', type: 'string' },
                        { name: 'grade', type: 'string' },
                        { name: 'regDtime', type: 'string' },
                        { name: 'instNm', type: 'string' },
                        { name: 'surveyAnswer', type: 'string' }

                    ]
                },
                {
                    formatData : function(data) {
                        try{
                            $.extend(data, {
                                bultnNo    : _bultnNo
                            });
                        }catch(err){}
                        return data;
                    }
                }
            ),
            columns:
                [
                    { text : '이름', datafield : 'userNm', width: '15%', editable: false, cellsalign: 'center'},
                    { text : '아이디', datafield : 'userId', width : '15%', editable: false, cellsalign: 'center'},
                    { text : '소속기관', datafield : 'instNm', width : '20%', editable: false, cellsalign: 'center'},
                    { text : '응답결과', datafield : 'surveyAnswer', width : '30%', editable: false, cellsalign: 'center'},
                    { text: '등록일', width: '20%', datafield: 'regDtime',
                        cellsrenderer: function(row, column, value, rowData){
                            var parseDate = "";
                            parseDate = HmUtil.parseDate(value);
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+parseDate+'</div>';
                        }
                    }
                ],
            editable: false,
            pageable : false,
            height: 300,
            autoheight: true
            //editmode : 'selectedcell'
        });
    },

    createChart : function() {
        Server.get('/api/main/sec/noticeBoard/getSurveyChart', {
            data: {bultnNo: _bultnNo ,surveyTypeCode: _surveyTypeCode},
            success: function (result) {
                var series = [];

                for(var i in result){
                    var pushdata = {};
                    pushdata.answerCnt = result[i].answerCnt;
                    pushdata.answerName = result[i].answerName;
                    pushdata.name = result[i].answerName + result[i].answerCnt;
                    pushdata.y = result[i].answerCnt;
                    series.push(pushdata);
                }

                var chart =
                    HmHighchart.create('chartArea', {
                        centerTitle: {
                            text1: 1,
                            text1FontSize: 30
                        },

                        chart: {
                            type: 'pie'
                        },

                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.point.answerName + '</b>' + ' : ' + HmUtil.commaNum(this.point.answerCnt);
                            }
                        },

                        plotOptions: {
                            pie: {
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        series: [{
                            type: 'pie',
                            name: 'COUNT',
                            allowPointSelect: true,
                            innerSize: '65%',
                            showInLegend: true,
                            data: series
                        }]
                    });

            }//success
        })


    },
    surveySend : function() {
        //var dropDownItem = $("#surveyExamDiv").jqxDropDownList('getSelectedItem');
        //var itemLabel = dropDownItem.originalItem.label;

        //if (!confirm("\'"+itemLabel+"\' 으로 최종 제출 하시겠습니까?")) {
        if (!confirm("설문을 최종 제출 하시겠습니까?")) {
            return false
        }

        var params = {
            bultnNo : _bultnNo,
            usrId 	: $("#sUserId").val(),
            userName :  $("#sUserName").val()
        };
        if(_surveyExamType == 'text'){
            params.surveyAnswer = $("#surveyExamInput").val()
        }else{
            params.surveyAnswer = $("#surveyExamDiv").val()
        }


        Server.post('/api/main/sec/noticeBoard/addNoticeSurvey', {
            data : params,
            success : function(result) {
                alert("제출 되었습니다.")
                self.close();
                //location.href = $('#ctxPath').val() + '/main/board/pNoticeBoardContents.do?boardNo=' + _bultnNo;
            }
        });
    },

    confirmSave:function () {
        if($("#confirmInput").val() == ''){
            alert("내용을 입력해주세요.");
            return;
        };

        var checkParams = {
            bultnNo : _bultnNo,
            sUserId 	: $("#sUserId").val()
        };

        Server.get('/api/main/sec/noticeBoard/getConfirmReplyCheck', {
            data : checkParams,
            success : function(result) {
                console.log('result',result)
                if( result > 0){ //이미 등록
                    alert("이미 등록 하였습니다.");
                } else {

                    var params = {
                        bultnNo : _bultnNo,
                        sUserId 	: $("#sUserId").val(),
                        userName :  $("#sUserName").val(),
                        confirmContent: $("#confirmInput").val()
                    };

                    Server.post('/api/main/sec/noticeBoard/editNoticeConfirm', {
                        data : params,
                        success : function(result) {
                            alert("등록 되었습니다.");
                            self.close();
                        }
                    });
                } // else end
            }
        });
    },

    confirmGrid : function(){
        /*var test = new $.jqx.dataAdapter(
            { datatype: 'json', url: ctxPath + '/main/sec/noticeBoard/getConfirmList.do' },
            { formatData : function(data) {$.extend(data, { 'bultnNo': '13' });  return data;		}}
        );

        console.log("test",test);
        return*/
        HmGrid.create($("#confirmGrid"), {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: ctxPath + '/api/main/sec/noticeBoard/getConfirmList',

                },
                {
                    formatData : function(data) {
                        try{
                            $.extend(data, {
                                bultnNo    : _bultnNo
                            });
                        }catch(err){}
                        return data;
                    }
                }
            ),
            columns:
                [
                    { text : '이름', datafield : 'userName', width: '140', editable: false, cellsalign: 'center'},
                    { text : '소속기관', datafield : 'instNm', width : '140', editable: false, cellsalign: 'center'},
                    { text : '확인내용', datafield : 'content', minwidth : '400', editable: false, cellsalign: 'center'},
                    { text: '등록일', width: '150', datafield: 'checkReplyDate',
                        cellsrenderer: function(row, column, value, rowData){
                            var parseDate = "";
                            parseDate = HmUtil.parseDate(value);
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+parseDate+'</div>';
                        }
                    },
                    { text : '', datafield : 'aa', width : '10', editable: false, cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData){
                            var rowData = HmGrid.getRowData($('#confirmGrid'), row);
                            if($('#sUserId').val() == rowData.userId) {
                                return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px; color: #FF0000;font-weight: bold"; onclick="Main.confirmDel()">X</div>';
                            } else {
                                return '';
                            }

                        }
                    },
                ],
            editable: false,
            pageable : false,
            height: 210,
        });
    },

    confirmDel: function () {
        if(!confirm('삭제하시겠습니까?')) return;
        Server.post('/api/main/sec/noticeBoard/delNoticeConfirm', {
            data: {
                bultnNo: _bultnNo,
                sUserId: $('#sUserId').val()
            },
            success: function () {
                alert('삭제되었습니다.');
                HmGrid.updateBoundData($('#confirmGrid'), '/api/main/sec/noticeBoard/getConfirmList');
            }
        })
    }
};

$(window).resize(function () {
    if(_surveyYn == 'N'){
        var settingH = 750;
        var h = $(window).innerHeight();
        if(h > 750){
            var resizeH = 500 + (h - settingH)
            $('#editor').css("height",resizeH+"px")
            $('.jqx-editor-content').css("height",resizeH+"px")

        }
        if(h == 750){
            $('#editor').css("height","500px");
            $('.jqx-editor-content').css("height","490px")
        }
    }
})