var _inciNo = null;
var popupType = null;
var siGunYn =  null;
var _dmgInstDepth = null;
var ids = [];

var currentInciStat = null;
var currentTransInciStat = null;
var currentTransSidoStat = null;

var multiTransYn = null;
var _dmgInstCd = null;
var _dmgInstName = null;

var applyMultiYn;
var transMultiYn;
var accidentDetail;
var dmgInstDepth;

var _sAuthMain = $("#sAuthMain").val(); //세션의 권한  AUTH_MAIN_2:개발원, 3:시도, 4:시군구
var _inciBelowCont;
var _inciPrty = ''; //접수 유형(긴급일 경우 SMS 팝업 호출)
var _accdTypName = ''; //사고 유형(SMS 파라메터)
var _ncscNo = '';
var _contents={};
var _inciNoMulti;

function pwindow_init(rowdata) {
    var inciNo = rowdata.inciNo;
    _inciNo = rowdata.inciNo;

    $('#fileUpload').jqxFileUpload({ width : '100%', fileInputName : 'fileinput' });
    $('#fileUploadBrowseButton').val("첨부파일");

    $('#fileUpload').on('select', function(event) {
        var totallength = event.args.owner._fileRows.length + $('#attachFileList > li').length;
        var fileLength = event.args.owner._fileRows.length;
        var attFileSize = $('.jqx-file-upload-file-input')[fileLength - 1].files[0].size; //읽어오는 첨부파일 이름
        var attFullName  = $('.jqx-file-upload-file-input')[fileLength - 1].files[0].name;
        var attName = attFullName.substring(0, attFullName.lastIndexOf('.'));

        Server.get('/api/main/sys/getDetailBoardMgmtList', {
            data: { guid: 'A800930A-372D-41E2-BEDE-B40FFB5FDFAD'}, //사고신고키
            success: function(result) {
                if(result.fileSize != null){ //DB에서 설정된 파일 크기 비교는 byte , 저장된 값 -> mbyte
                    var limitFileSize = result.fileSize * 1024 * 1024;
                    if(attFileSize > limitFileSize){
                        alert(limitFileSize + "Byte로 용량이 제한되어있습니다.");
                        $('#fileUpload').jqxFileUpload('cancelFile', fileLength - 1);
                        return;
                    }
                }
                if(result.fileExt != null){ //DB에서 설정된 파일 확장자 (,구분자 복수개)
                    var fileExtName = $('.jqx-file-upload-file-input')[fileLength - 1].files[0].name.toLowerCase();
                    var banList = result.fileExt.split(',');
                    var allowCnt = 0;
                    for(var i in banList){
                        var checkOnt = fileExtName.indexOf(banList[i].toLowerCase());
                        if(checkOnt > 0){
                            //$('#fileUpload').jqxFileUpload('cancelFile', fileLength - 1);
                            allowCnt +=  1;
                        }
                    };
                    if(allowCnt == 0){
                        alert("제한된 확장자 입니다.")
                        $('#fileUpload').jqxFileUpload('cancelFile', fileLength - 1);
                        return;
                    }
                }
            }
        });

        /*if ($('.jqx-file-upload-file-input')[fileLength - 1].files[0].size > $('#uploadFileLength').val()) {
         alert($('#uploadFileLength').val() + "Byte로 용량이 제한되어있습니다.");
         $('#fileUpload').jqxFileUpload('cancelFile', fileLength - 1);
         return;
         }*/

        if (totallength > 10) {
            $('#fileUpload').jqxFileUpload('cancelFile', fileLength - 1);
            alert('첨부파일 최대 개수는 10개 입니다.');
        }

    });

    $.ajax({
        type : "post",
        url :$('#ctxPath').val() + '/api/main/acc/accidentApply/getAccidentDetail',
        data : "inciNo=" + inciNo,
        dataType : "json",
        success : function(jsonData) {

            var contents = jsonData.resultData.contents;

            _contents = contents;
            accidentDetail = contents;
            //전역변수에 현재 사고신고의 상태값 세팅 (버튼제어용)

            currentInciStat = contents.inciPrcsStat;
            currentTransInciStat = contents.transInciPrcsStat;
            currentTransSidoStat = contents.transSidoPrcsStat;

            $('#accdTypCd').val(contents.accdTypName);
            //$('#accdTypName').val(contents.accdTypName);
            $('#acpnMthd').val(contents.acpnMthdName);
            $('#attCrgr').val(contents.attCrgr);
            $('#attDept').val(contents.attDept);
            $('#attDtlsVia').val(contents.attDtlsVia);
            $('#attEmail').val(contents.attEmail);
            $('#attInstNm').val(contents.attInstNm);
            $('#attNatnCd').val(contents.attNatnCd);
            $('#attNatnNm').val(  contents.attNatnNm);
            $('#attSvrNm').val(contents.attSvrNm);
            $('#attTelNo').val(contents.attTelNo);
            $('#attTypCd').val( contents.attTypCd);
            $('#attVia').val(  contents.attVia);
            $('#crgr').val(  contents.crgr);
            $('#attIp').val(  contents.attIp);
            $('#attRemarks').val(  contents.attRemarks);
            $('#inciDttNm').val(contents.inciDttNm);

            $('#dclCrgr').val(  contents.dclCrgr);
            $('#dclCrgrId').val(  contents.dclCrgrId);
            $('#dclDept').val(  contents.dclDept);
            $('#dclEmail').val(  contents.dclEmail);
            //$('#dclHpNo').val(  contents.dclHpNo);
            $('#dclInstCd').val(  contents.dclInstName);
            //$('#dclInstName').val(  contents.dclInstName);
            //$('#dclMail').val(  contents.dclMail);
            $('#dclTelNo').val(  contents.dclTelNo);
            $('#dmgCpgr').val(  contents.dmgCpgr);
            $('#dmgCrgr').val(  contents.dmgCrgr);
            $('#dmgDept').val(  contents.dmgDept);
            $('#dmgEmail').val(  contents.dmgEmail);
            //$('#dmgHpNo').val(  contents.dmgHpNo);
            $('#dmgInstCd').val(  contents.dmgInstName);
            //$('#dmgInstName').val(  contents.dmgInstName);
            $('#dmgNatnCd').val(  contents.dmgNatnCd);
            $('#dmgNatnNm').val(  contents.dmgNatnNm);
            //$('#dmgSvrNm').val(  contents.dmgSvrNm);
            $('#dmgSvrUsrNm').val(  contents.dmgSvrUsrNm);
            $('#dmgTelNo').val(  contents.dmgTelNo);
            $('#dmgIp').val(contents.dmgIp);

            $('#dngrGr').val(  contents.dngrGr);
            $('#histoModifiedYn').val(  contents.histoModifiedYn);
            $('#inciAcpnCd').val(  contents.inciAcpnCd);
            $('#inciAcpnDt').val(  contents.inciAcpnDt);
            $('#inciDt').val(HmUtil.parseDate(contents.inciDt));

            if(contents.inciDclCont != null){
                $('#inciDclCont').val(  contents.inciDclCont.htmlCharacterUnescapes());
            }

            //$('#inciBelowCont').val(  contents.inciBelowCont);

            //$('#inciEndCont').val(  contents.inciEndCont);
            $('#inciEndDt').val(  contents.inciEndDt);

            if(contents.inciInvsCont != null){
                $('#inciInvsCont').val(  contents.inciInvsCont.htmlCharacterUnescapes());
            }

            $('#inciNo').val(  contents.inciNo);
            $('#inciNoMulti').val(  contents.inciNoMulti);
            $('#inciPrcsStat').val(  contents.inciPrcsStat);
            $('#inciPrcsStatName').val(  contents.inciPrcsStatName);
            $('#inciPrty').val(  contents.inciPrtyName);
            //$('#inciPrtyName').val(  contents.inciPrtyName);
            $('#inciTrnsCfdt').val(  contents.inciTrnsCfdt);
            $('#inciTrnsRcptInstCd').val(  contents.inciTrnsRcptInstCd);
            $('#inciTrnsReqInstCd ').val(  contents.inciTrnsReqInstCd);
            $('#inciTrnsRqdt').val(  contents.inciTrnsRqdt);
            $('#inciTrnsRslt').val(  contents.inciTrnsRslt);
            $('#inciTrnsYn').val(  contents.inciTrnsYn);
            $('#inciTtl').val(  contents.inciTtl);
            $('#inciTypCd').val(  contents.inciTypCd);
            $('#inciUpdDt').val(  contents.inciUpdDt);
            $('#innciNoBefore').val(  contents.innciNoBefore);
            $('#ipsIp').val(  contents.ipsIp);
            //$('#ncscNo').val(  contents.ncscNo);
            //$('#netDiv').val(  contents.netDivName);
            $('#osNm').val(  contents.osNm);
            $('#packetKey').val(  contents.packetKey);
            //$('#recoInciCd').val(  contents.recoInciCd);
            $('#recoInciName').val(  contents.recoInciName);
            $('#riskLevel').val(  contents.riskLevelName);
            $('#riskValue').val(  contents.riskValue);
            $('#tmsIp').val(  contents.tmsIp);
            $('#transInciPrcsStat ').val(  contents.transInciPrcsStat);
            $('#trtMthdCd').val(  contents.trtMthdCd);
            $('#remarks').val(contents.remarks);

            multiTransYn = contents.multiTransYn;
            _dmgInstCd = contents.dmgInstCd;
            _dmgInstName = contents.dmgInstName;
            _dmgInstDepth = contents.dmgInstDepth;
            _inciNoMulti = contents.inciNoMulti;

            applyMultiYn = contents.applyMultiYn;
            transMultiYn =contents.transMultiYn;
            dmgInstDepth = contents.dmgInstDepth;


            if(contents.inciBelowCont != null){
                $('#inciBelowCont').val(  contents.inciBelowCont.htmlCharacterUnescapes());
                _inciBelowCont = contents.inciBelowCont.htmlCharacterUnescapes(); //시도의견 팝업
                accidentDetail.inciBelowCont = contents.inciBelowCont.htmlCharacterUnescapes(); //한글보고서용 파라메터
            }

            _inciPrty = contents.inciPrty;
            _accdTypName = contents.accdTypName;
            _ncscNo = contents.ncscNo;

            //HmUtil.attachAccFileList(jsonData.resultData.attachFile, false); 기존첨부파일 다운만 되던거
            // console.log(jsonData.resultData.attachFile)
            HmUtil.attachAccFileList(jsonData.resultData.attachFile, true, "fileUpload");

            //처리방안 첨부파일(악성코드일때만 노출)
            if(contents.accdTypName != '악성코드공격'){
                $("#attachTr").css("display", "none");
            }else{
                HmUtil.attachHelpFileList(jsonData.resultData.attachHelpFile, false, null ,contents.accdTypName);
            }

            if(contents.remarksCd != null){
                if(contents.remarksCd == 1){
                    $("#remarksTitle").show();
                    $("#remarksDiv1").show();
                }else if(contents.remarksCd == 2){
                    $("#remarksTitle").show();
                    $("#remarksDiv2").show();
                }else {
                    $("#remarksTitle").hide();
                }

                //비고가 있을 경우 세부 정보 세팅
                if(contents.remarksCd != 0){
                    if(contents.remarksCd == 1){ //해킹
                        $.ajax({
                            type : "post",
                            url :$('#ctxPath').val() + '/api/main/acc/accidentApply/getTbzHacking',
                            data : "inciNo=" + inciNo,
                            dataType : "json",
                            success : function(jsonData) {
                                var contents = jsonData.resultData.contents;
                                if(contents != null){
                                    //console.log(contents.hackAttTypeCd+"  "+contents.hackTypeNmSelf+'  '+contents.hackTypeNm)
                                    if(contents.hackAttTypeCd == '000'){
                                        $("#hackAttType").val(contents.hackTypeNmSelf);
                                    }else{
                                        $("#hackAttType").val(contents.hackTypeNm);
                                    }
                                    $("#inciTarget").val(contents.inciTarget);
                                    $("#hackDomainNm").val(contents.hackDomainNm);
                                    $("#hackNetDiv").val(contents.hackNetDiv);
                                    $("#hackCont").val(contents.hackCont);
                                    $("#hackDomainNm").val(contents.hackDomainNm);

                                }
                            }
                        });
                    }else{ //취약점
                        $.ajax({
                            type : "post",
                            url :$('#ctxPath').val() + '/api/main/acc/accidentApply/getTbzHomepv',
                            data : "inciNo=" + inciNo,
                            dataType : "json",
                            success : function(jsonData) {
                                var contents = jsonData.resultData.contents;
                                if(contents != null){
                                    $("#attackTypeName").val(contents.attackTypeName)
                                    $("#homepvCont").val(contents.homepvCont)
                                }
                            }
                        });
                    }

                }

            }

            HmGrid.create($("#historyGrid"), {
                source: new $.jqx.dataAdapter(
                    {
                        datatype: 'json',
                        datafields: [
                            { name: 'histNo' , type: 'int'},
                            { name: 'instCd' , type: 'int'},
                            { name: 'inciNo' , type: 'int'},
                            { name: 'ttl' , type: 'string'},
                            { name: 'hstyCrtDt' , type: 'string'},
                            { name: 'crtrId' , type: 'string'},
                            { name: 'hstyCont' , type: 'string'},
                            { name: 'userName' , type: 'string'},
                            { name: 'instNm' , type: 'string'}

                        ],
                        updaterow: function(rowid, rowdata, commit) {
                            if(ids.indexOf(rowid) == -1)
                                ids.push(rowid);
                            commit(true);
                        },
                        url: ctxPath + '/api/main/acc/accidentApply/getAccidentHistoryList'
                    },
                    {
                        formatData: function(data) {
                            data.inciNo = rowdata.inciNo;
                            return data;
                        }
                    }
                ),
                editable: false,
                pageable: false,
                height: 300,
                autoheight: true,
                columns:
                    [
                        { text : '접수번호', datafield : 'inciNo', width: '120px;', editable: false },
                        { text : '날짜', datafield : 'hstyCrtDt', width: '150px;', editable: false ,
                            cellsrenderer: function(row, column, value, rowData){
                                var parseDate = "";
                                parseDate = HmUtil.parseDate(value);
                                return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+parseDate+'</div>';
                            }
                        },
                        { text : '제목',   datafield : 'ttl', minwidth: '150px;', editable: false },
                        { text : '소속', datafield  : 'instNm', width: '100px;', editable: false },
                        { text : '담당자', datafield  : 'userName', width: '120px;', editable: false }
                    ]
            }, CtxMenu.NONE);
            $("#historyGrid").on('bindingcomplete', function (event) {
                doButtonControll();
            });
        }
    });


    $("#historyGrid").on('rowdoubleclick', function (event) {
        doHistoryDetail(event.args.rowindex);
    });
}

$('#pbtnClose').click(function() {
    $('#pwindow').jqxWindow('close');
});

//메모등록 2018.10.22 주석
/*$('#memo').click(function() {
    var params = {
        type: "memo",
        inciNo : _inciNo
        ,popupTitle: '메모'
    }
    popupType = "memo";
    HmAccProcPopup.callProcessPopup(params)

});*/
$('#pSidoCont').click(function() {
    var params = {
        type: "sidoCont",
        inciNo : _inciNo
        ,popupTitle: '시도의견'
        ,cont : _inciBelowCont
    }
    popupType = "sidoCont";
    HmAccProcPopup.callProcessPopup(params)

});
$('#hwpDownload').click(function () {
    HmUtil.exportHwp(ctxPath + '/api/main/acc/accidentApply/makeAcciHwpDownload', accidentDetail);
});

$('#assign').click(function() {
    popupType = "assign";
    var params = {
        type: "assign",
        inciNo : _inciNo
        ,popupTitle: '사고할당'
    }
    HmAccProcPopup.callProcessPopup(params)

});

//이관 요청 1->7
$('#moveReq').click(function() {
    //alert(applyMultiYn+"   "+transMultiYn)
    popupType = "moveReq";
    var params = {
        type: "moveReq",
        inciNo : _inciNo
        ,popupTitle: '사고이관요청'
        ,dmgInstCd: _dmgInstCd  //피해기관 코드 , 이관시 해당 시의 값을 넣기 위해
        ,dmgInstName: _dmgInstName  //디스플레이용
        ,multiTransYn : multiTransYn
        ,applyMultiYn : applyMultiYn
        ,transMultiYn : transMultiYn
    };
    HmAccProcPopup.callProcessPopup(params)
});

//이관승인 요청 7->11
$('#moveApp').click(function() {
    var datas = {}
    datas.inciNo= _inciNo;
    datas.grpNo = 0;
    datas.grpRank = 0;
    datas.depth = 0;
    datas.inciPrcsStat = 11; //이관
    datas.transInciPrcsStat = 1;   //이관승인을 하면 처리상태: '이관' ,  이관처리상태는 '접수'(1)가 된다.
    datas.inciTrnsCfd = 'Y';
    datas.inciTrnsYn = 'Y';

    //히스토리 파라메터
    datas.ttl = "사고상태가 이관승인 되었습니다."
    datas.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    datas.instCd = $('#sInstCd').val();
    datas.crtrName = $('#sUserName').val();

    if(!confirm('이관승인 하시겠습니까?')) return;

    Server.post('/api/main/acc/accidentApply/updateAccidentProcess', {
        data : datas,
        success : function(result) {
            alert("처리되었습니다.");
            //HmGrid.updateBoundData($("#historyGrid"), ctxPath + '/api/main/acc/accidentApply/getAccidentHistoryList');
            HmGrid.updateBoundData($accidentGrid);
            $('#pwindow').jqxWindow('close');

            var msg = _dmgInstName + " "
                + _accdTypName + "\n관련" + "긴급 사고 (" + result.inciNo + ")확인부탁드립니다.";

            ///api/main/env/userConf/getPushUsers
            var resultArr = new Array();

            var params = {sUserId: $("#sUserId").val()};

            if ($("#sAuthMain").val() == 'AUTH_MAIN_2') {
                //개발원 이관 승인 -> 시도 전부
                params.sType = "C";
                params.sInstCd = _contents.inciTrnsRcptInstCd;
            }else if($("#sAuthMain").val()=='AUTH_MAIN_3') {
                //시도 이관 승인 -> 시군구 전부
                params.sType = "E";
                params.sInstCd = _contents.inciTrnsRcptSidoInstCd;
            }
            $.ajax({
                type: 'POST',
                url: ctxPath + '/api/main/env/userConf/getPushUsers',
                data: params,
                success: function (data) {
                    for(var i=0; i<data.resultData.length; i++){
                        resultArr.push(data.resultData[i]);
                    }

                    var message  = {
                        receipt : {
                            msg : msg,
                            msgType : "이관승인",
                            recv : resultArr
                        }
                    };
                    // console.log(message);

                    eb.send("worker.receipt", message, function (aa, result) {
                        if (result == null) {
                            console.log("ERROR: response null");
                        }
                    });
                }//success
            });

            if(_inciPrty == '0010'){ //접수 유형이 긴급일때 SMS팝업 호출

                // eb.send("worker.receipt", message, function (aa, result) {
                //     if (result == null) {
                //         console.log("ERROR: response null");
                //     }
                // });

                sendSmsPopup();
            }
        }
    });
});


$('#moveReqToSiGu').click(function() {
    //alert(applyMultiYn+"   "+transMultiYn)
    siGunYn = 'Y';
    popupType = "moveReq";
    var params = {
        type: "moveReq",
        inciNo : _inciNo
        ,popupTitle: '사고이관요청'
        ,dmgInstCd: _dmgInstCd  //피해기관 코드 , 이관시 해당 시의 값을 넣기 위해
        ,dmgInstName: _dmgInstName  //디스플레이용
        ,multiTransYn : multiTransYn
        ,applyMultiYn : applyMultiYn
        ,transMultiYn : transMultiYn
    };
    HmAccProcPopup.callProcessPopup(params)
});


$('#moveAppToSiGu').click(function() {
    var datas = {}
    datas.inciNo= _inciNo;
    datas.grpNo = 0;
    datas.grpRank = 0;
    datas.depth = 0;
    datas.transInciPrcsStat = 11; //시군구 이관승인시 시도 상태는 11(이관) 시군구 상태는 1(접수)
    datas.transSidoPrcsStat = 1;

    datas.inciTrnsCfd = 'Y';
    datas.inciTrnsYn = 'Y';

    //히스토리 파라메터
    datas.ttl = "사고상태가 이관승인 되었습니다."
    datas.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    datas.instCd = $('#sInstCd').val();
    datas.crtrName = $('#sUserName').val();

    if(!confirm('이관승인 하시겠습니까?')) return;

    Server.post('/api/main/acc/accidentApply/updateAccidentProcess', {
        data : datas,
        success : function(result) {
            alert("처리되었습니다.");
            //HmGrid.updateBoundData($("#historyGrid"), ctxPath + '/api/main/acc/accidentApply/getAccidentHistoryList');
            HmGrid.updateBoundData($accidentGrid);
            $('#pwindow').jqxWindow('close');

            //푸쉬발송 시작
            var msg = _dmgInstName+" "
                +_accdTypName+"\n관련"+"긴급 사고 ("+result.inciNo+")확인부탁드립니다.";

            ///api/main/env/userConf/getPushUsers
            var resultArr =  new Array() ;

            var params={sUserId : $("#sUserId").val()};

            if ($("#sAuthMain").val() == 'AUTH_MAIN_2') {
                //개발원 이관 승인 -> 시도 전부
                params.sType = "C";
                params.sInstCd = _contents.inciTrnsRcptInstCd;
            }else if($("#sAuthMain").val()=='AUTH_MAIN_3') {
                //시도 이관 승인 -> 시군구 전부
                params.sType = "E";
                params.sInstCd = _contents.inciTrnsRcptSidoInstCd;
            }

            $.ajax({
                type: 'POST',
                url: ctxPath + '/api/main/env/userConf/getPushUsers',
                data: params,
                success: function (data) {
                    for(var i=0; i<data.resultData.length; i++){
                        resultArr.push(data.resultData[i]);
                    }

                    var message  = {
                        receipt : {
                            msg : msg,
                            msgType : "이관승인",
                            recv : resultArr
                        }
                    };
                    // console.log('message',message);

                    eb.send("worker.receipt", message, function (aa, result) {
                        if (result == null) {
                            console.log("ERROR: response null");
                        }
                    });
                }//success
            });

            if(_inciPrty == '0010'){ //접수 유형이 긴급일때 SMS팝업 호출
                sendSmsPopup();
            }
        }
    });
});

//폐기
$('#disuse').click(function() {
    popupType = "disuse";
    var params = {
        type: "disuse",
        inciNo : _inciNo
        ,popupTitle: '사고폐기요청'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//폐기승인 (폐기종결 처리)
$('#disuseApp').click(function() {
    var datas = {}
    datas.inciNo= _inciNo;
    datas.grpNo = 0;
    datas.grpRank = 0;
    datas.depth = 0;
    datas.inciPrcsStat = 12; //폐기 종결
    datas.inciTrnsCfd = 'Y';

    //히스토리 파라메터
    datas.ttl = "사고상태가 폐기 종결되었습니다."
    datas.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    datas.instCd = $('#sInstCd').val();
    datas.crtrName = $('#sUserName').val();

    updateProcessCenter(datas);

    // Server.post('/main/acc/accidentApply/updateAccidentProcess.do', {
    //     data : datas,
    //     success : function(result) {
    //         alert("처리되었습니다.");
    //         $('#pwindow').jqxWindow('close');
    //         HmGrid.updateBoundData($accidentGrid);
    //     }
    // });
});

//종결
$('#conclusion').click(function() {
    popupType = "conclusion";
    var params = {
        type: "conclusion",
        inciNo : _inciNo
        ,popupTitle: '사고종결요청'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//종결승인 (종결 처리)
$('#conclusionApp').click(function() {
    var datas = {}
    datas.inciNo= _inciNo;
    datas.grpNo = 0;
    datas.grpRank = 0;
    datas.depth = 0;
    datas.inciPrcsStat = 13; //종결완료
    datas.inciTrnsCfd = 'Y';

    //히스토리 파라메터
    datas.ttl = "사고상태가 종결되었습니다."
    datas.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    datas.instCd = $('#sInstCd').val();
    datas.crtrName = $('#sUserName').val();
    //console.log('_ncscNo',_ncscNo);

    updateProcessCenter(datas);
});

//반려
$('#reject').click(function() {
    popupType = "reject";
    var params = {
        type: "reject",
        inciNo : _inciNo
        ,popupTitle: '사고반려'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//상위기관 반려(개발원)
$('#reject_high').click(function() {
    popupType = "reject_high";
    var params = {
        type: "reject_high",
        inciNo : _inciNo
        ,popupTitle: '사고반려'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//오탐승인요청
$('#miss').click(function() {
    popupType = "miss";
    var params = {
        type: "miss",
        inciNo : _inciNo
        ,popupTitle: '오탐승인요청'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//오탐종결
$('#missApp').click(function() {
    var datas = {}
    datas.inciNo= _inciNo;
    datas.grpNo = 0;
    datas.grpRank = 0;
    datas.depth = 0;
    datas.inciPrcsStat = 15; //오탐종결

    //히스토리 파라메터
    datas.ttl = "사고상태가 오탐종결되었습니다."
    datas.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    datas.instCd = $('#sInstCd').val();
    datas.crtrName = $('#sUserName').val();

    updateProcessCenter(datas);

    // Server.post('/main/acc/accidentApply/updateAccidentProcess.do', {
    //     data : datas,
    //     success : function(result) {
    //         alert("처리되었습니다.");
    //         $('#pwindow').jqxWindow('close');
    //         HmGrid.updateBoundData($accidentGrid);
    //     }
    // });
});

//주의관제요청
$('#caution').click(function() {
    popupType = "caution";
    var params = {
        type: "caution",
        inciNo : _inciNo
        ,popupTitle: '주의관제요청'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//주의관제종결
$('#cautionApp').click(function() {
    var datas = {}
    datas.inciNo= _inciNo;
    datas.grpNo = 0;
    datas.grpRank = 0;
    datas.depth = 0;
    datas.inciPrcsStat = 17; //오탐종결

    //히스토리 파라메터
    datas.ttl = "사고상태가 주의관제종결되었습니다."
    datas.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    datas.instCd = $('#sInstCd').val();
    datas.crtrName = $('#sUserName').val();

    updateProcessCenter(datas);

    // Server.post('/main/acc/accidentApply/updateAccidentProcess.do', {
    //     data : datas,
    //     success : function(result) {
    //         alert("처리되었습니다.");
    //         $('#pwindow').jqxWindow('close');
    //         HmGrid.updateBoundData($accidentGrid);
    //     }
    // });
});
// ------- 시 관련 버튼 이벤트처리 --------
//시 할당
$('#assign_si').click(function() {
    siGunYn = 'Y';
    popupType = "assign";
    var params = {
        type: "assign",
        inciNo : _inciNo
        ,popupTitle: '사고할당'
    }
    HmAccProcPopup.callProcessPopup(params)

});

//시 종결승인요청
$('#conclusion_si').click(function() {
    siGunYn = 'Y';
    popupType = "conclusion";
    var params = {
        type: "conclusion",
        inciNo : _inciNo
        ,popupTitle: '사고종결요청'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//시 종결승인
$('#conclusionApp_si').click(function() {
    var datas = {}
    datas.inciNo= _inciNo;
    datas.grpNo = 0;
    datas.grpRank = 0;
    datas.depth = 0;
    datas.transInciPrcsStat = 13; //시 종결완료
    datas.inciTrnsCfd = 'Y';

    //히스토리 파라메터
    datas.ttl = "사고상태가 종결되었습니다."
    datas.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    datas.instCd = $('#sInstCd').val();
    datas.crtrName = $('#sUserName').val();

    Server.post('/api/main/acc/accidentApply/updateAccidentProcess', {
        data : datas,
        success : function(result) {
            alert("처리되었습니다.");
            $('#pwindow').jqxWindow('close');
            HmGrid.updateBoundData($accidentGrid);
        }
    });
});

//시 반려
$('#reject_si').click(function() {
    siGunYn = 'Y';
    popupType = "reject";
    var params = {
        type: "reject",
        inciNo : _inciNo
        ,popupTitle: '사고반려'
    }
    HmAccProcPopup.callProcessPopup(params)
});


//상위기관 반려(시)
$('#reject_high_si').click(function() {
    popupType = "reject_high";
    var params = {
        type: "reject_high",
        inciNo : _inciNo
        ,popupTitle: '사고반려'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//시 폐기
$('#disuse_si').click(function() {
    siGunYn = 'Y';
    popupType = "disuse";
    var params = {
        type: "disuse",
        inciNo : _inciNo
        ,popupTitle: '사고폐기요청'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//시 폐기승인 (폐기종결 처리)
$('#disuseApp_si').click(function() {
    var datas = {}
    datas.inciNo= _inciNo;
    datas.grpNo = 0;
    datas.grpRank = 0;
    datas.depth = 0;
    datas.transInciPrcsStat = 12; //폐기 종결

    //히스토리 파라메터
    datas.ttl = "사고상태가 폐기 종결되었습니다."
    datas.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    datas.instCd = $('#sInstCd').val();
    datas.crtrName = $('#sUserName').val();

    Server.post('/api/main/acc/accidentApply/updateAccidentProcess', {
        data : datas,
        success : function(result) {
            alert("처리되었습니다.");
            $('#pwindow').jqxWindow('close');
            HmGrid.updateBoundData($accidentGrid);
        }
    });
});

//시 오탐승인요청
$('#miss_si').click(function() {
    siGunYn = 'Y';
    popupType = "miss";
    var params = {
        type: "miss",
        inciNo : _inciNo
        ,popupTitle: '오탐승인요청'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//시 오탐종결
$('#missApp_si').click(function() {
    var datas = {}
    datas.inciNo= _inciNo;
    datas.grpNo = 0;
    datas.grpRank = 0;
    datas.depth = 0;
    datas.transInciPrcsStat = 15; //오탐종결

    //히스토리 파라메터
    datas.ttl = "사고상태가 오탐종결되었습니다."
    datas.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    datas.instCd = $('#sInstCd').val();
    datas.crtrName = $('#sUserName').val();

    Server.post('/api/main/acc/accidentApply/updateAccidentProcess', {
        data : datas,
        success : function(result) {
            alert("처리되었습니다.");
            $('#pwindow').jqxWindow('close');
            HmGrid.updateBoundData($accidentGrid);
        }
    });
});

//시 주의관제요청
$('#caution_si').click(function() {
    siGunYn = 'Y';
    popupType = "caution";
    var params = {
        type: "caution",
        inciNo : _inciNo
        ,popupTitle: '주의관제요청'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//시 주의관제종결
$('#cautionApp_si').click(function() {
    var datas = {}
    datas.inciNo= _inciNo;
    datas.grpNo = 0;
    datas.grpRank = 0;
    datas.depth = 0;
    datas.transInciPrcsStat = 17; //오탐종결

    //히스토리 파라메터
    datas.ttl = "사고상태가 주의관제종결되었습니다."
    datas.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    datas.instCd = $('#sInstCd').val();
    datas.crtrName = $('#sUserName').val();

    Server.post('/api/main/acc/accidentApply/updateAccidentProcess', {
        data : datas,
        success : function(result) {
            alert("처리되었습니다.");
            $('#pwindow').jqxWindow('close');
            HmGrid.updateBoundData($accidentGrid);
        }
    });
});

// ---------- 시도 관련 버튼 이벤트처리 ----------
//시도 할당
$('#assign_sido').click(function() {
    siGunYn = 'sido';
    popupType = "assign";
    var params = {
        type: "assign",
        inciNo : _inciNo
        ,popupTitle: '사고할당'
    }
    HmAccProcPopup.callProcessPopup(params)

});

//시도 종결승인요청
$('#conclusion_sido').click(function() {
    siGunYn = 'sido';
    popupType = "conclusion";
    var params = {
        type: "conclusion",
        inciNo : _inciNo
        ,popupTitle: '사고종결요청'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//시도 종결승인
$('#conclusionApp_sido').click(function() {
    var datas = {}
    datas.inciNo= _inciNo;
    datas.grpNo = 0;
    datas.grpRank = 0;
    datas.depth = 0;
    datas.transSidoPrcsStat = 13; //시 종결완료
    datas.inciTrnsCfd = 'Y';

    //히스토리 파라메터
    datas.ttl = "사고상태가 종결되었습니다."
    datas.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    datas.instCd = $('#sInstCd').val();
    datas.crtrName = $('#sUserName').val();
    datas.inciNoMulti = _inciNoMulti;

    Server.post('/api/main/acc/accidentApply/updateAccidentProcess', {
        data : datas,
        success : function(result) {
            alert("처리되었습니다.");
            $('#pwindow').jqxWindow('close');
            HmGrid.updateBoundData($accidentGrid);
            //HmGrid.updateBoundData($("#historyGrid"), ctxPath + '/api/main/acc/accidentApply/getAccidentHistoryList');
        }
    });
});

//시도 폐기 요청
$('#disuse_sido').click(function() {
    siGunYn = 'sido';
    popupType = "disuse";
    var params = {
        type: "disuse",
        inciNo : _inciNo
        ,popupTitle: '사고폐기요청'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//시도 폐기승인 (폐기종결 처리)
$('#disuseApp_sido').click(function() {
    var datas = {}
    datas.inciNo= _inciNo;
    datas.grpNo = 0;
    datas.grpRank = 0;
    datas.depth = 0;
    datas.transSidoPrcsStat = 12; //폐기 종결

    //히스토리 파라메터
    datas.ttl = "사고상태가 폐기 종결되었습니다."
    datas.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    datas.instCd = $('#sInstCd').val();
    datas.crtrName = $('#sUserName').val();
    datas.inciNoMulti = _inciNoMulti;

    Server.post('/api/main/acc/accidentApply/updateAccidentProcess', {
        data : datas,
        success : function(result) {
            alert("처리되었습니다.");
            $('#pwindow').jqxWindow('close');
            HmGrid.updateBoundData($accidentGrid);
        }
    });
});

//시도 반려
$('#reject_sido').click(function() {
    siGunYn = 'sido';
    popupType = "reject";
    var params = {
        type: "reject",
        inciNo : _inciNo
        ,popupTitle: '사고반려'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//시도 오탐승인요청
$('#miss_sido').click(function() {
    siGunYn = 'sido';
    popupType = "miss";
    var params = {
        type: "miss",
        inciNo : _inciNo
        ,popupTitle: '오탐승인요청'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//시도 오탐종결
$('#missApp_sido').click(function() {
    var datas = {}
    datas.inciNo= _inciNo;
    datas.grpNo = 0;
    datas.grpRank = 0;
    datas.depth = 0;
    datas.transSidoPrcsStat = 15; //오탐종결

    //히스토리 파라메터
    datas.ttl = "사고상태가 오탐종결되었습니다."
    datas.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    datas.instCd = $('#sInstCd').val();
    datas.crtrName = $('#sUserName').val();
    datas.inciNoMulti = _inciNoMulti;

    Server.post('/api/main/acc/accidentApply/updateAccidentProcess', {
        data : datas,
        success : function(result) {
            alert("처리되었습니다.");
            $('#pwindow').jqxWindow('close');
            HmGrid.updateBoundData($accidentGrid);
        }
    });
});

//시도 주의관제요청
$('#caution_sido').click(function() {
    siGunYn = 'sido';
    popupType = "caution";
    var params = {
        type: "caution",
        inciNo : _inciNo
        ,popupTitle: '주의관제요청'
    }
    HmAccProcPopup.callProcessPopup(params)
});

//시도 주의관제종결
$('#cautionApp_sido').click(function() {
    var datas = {}
    datas.inciNo= _inciNo;
    datas.grpNo = 0;
    datas.grpRank = 0;
    datas.depth = 0;
    datas.transSidoPrcsStat = 17; //오탐종결

    //히스토리 파라메터
    datas.ttl = "사고상태가 주의관제종결되었습니다."
    datas.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    datas.instCd = $('#sInstCd').val();
    datas.crtrName = $('#sUserName').val();
    datas.inciNoMulti = _inciNoMulti;

    Server.post('/api/main/acc/accidentApply/updateAccidentProcess', {
        data : datas,
        success : function(result) {
            alert("처리되었습니다.");
            $('#pwindow').jqxWindow('close');
            HmGrid.updateBoundData($accidentGrid);
        }
    });
});


function doButtonControll() {
    var authTbz05 = $("#authTbz05").val(); //세션의 승인요청 권한 Y 일경우 승인요청 버튼 활성
    var authTbz06 = $("#authTbz06").val(); //세션의 승인 권한 Y 일경우 승인 버튼 활성

    //폐기요청, 종결요청, 이관승인, 오탐, 종결 승인요청 -> 반려버튼 활성
    if(currentInciStat == 8 || currentInciStat == 9 || currentInciStat == 7 || currentInciStat == 14 || currentInciStat == 16){
        $("#reject").css("display", "inline");
    }

    //접수, 할당, 반려 -> 폐기 및 종결 버튼 활성
    if(currentInciStat == 1 || currentInciStat == 2 || currentInciStat == 5){
        if(authTbz05 == 'Y'){
            $("#disuse").css("display", "inline");
            $("#conclusion").css("display", "inline");
            if(currentInciStat==2){
                var data = $("#historyGrid").jqxGrid('getrowdata',0);
                if(data.crtrId!=$('#sUserId').val()){
                    $("#disuse").css("display", "none");
                    $("#conclusion").css("display", "none");
                }
            }
        }
    }

    //시에서 폐기종결이면서 개발원이 폐기종결 이외의 경우 폐기종결 버튼 활성
    if(currentTransInciStat == 12){
        if(authTbz05 == 'Y'){
            $("#disuse").css("display", "inline");
            $("#reject_high").css("display", "inline"); //상위기관 반려(개발원)

            //개발원에서 폐기승인 및 폐기 종결을 했을 경우 폐기버튼은 숨김
            if(currentInciStat == 8 || currentInciStat == 12){
                $("#disuse").css("display", "none");
                $("#reject_high").css("display", "none");
            }
        }
    }

    //시에서 오탐종결이면서..
    if(currentTransInciStat == 15){
        if(authTbz05 == 'Y'){
            $("#miss").css("display", "inline");
            $("#reject_high").css("display", "inline"); //상위기관 반려(개발원)

            //개발원에서 오탐승인 및 오탐종결을 했을 경우 오탐버튼은 숨김
            if(currentInciStat == 14 || currentInciStat == 15){
                $("#miss").css("display", "none");
                $("#reject_high").css("display", "none");
            }
        }
    }

    //시에서 주의관제종결 이면서..
    if(currentTransInciStat == 17){
        if(authTbz05 == 'Y'){
            $("#caution").css("display", "inline");
            $("#reject_high").css("display", "inline"); //상위기관 반려(개발원)

            //개발원에서 주의관제승인 및 주의관제종결을 했을 경우 주의관제버튼은 숨김
            if(currentInciStat == 16 || currentInciStat == 17){
                $("#caution").css("display", "none");
                $("#reject_high").css("display", "none");
            }
        }
    }

    //폐기요청 -> 폐기승인 버튼 활성
    if(currentInciStat == 8){
        if(authTbz06 == 'Y') {
            $("#disuseApp").css("display", "inline");
        }
    }

    //종결요청 -> 종결승인 버튼 활성
    if(currentInciStat == 9){
        if(authTbz06 == 'Y') {
            $("#conclusionApp").css("display", "inline");
        }
    }
    //접수 상태 일때 이관 /할당/오탐/주의관제 버튼 활성
    if(currentInciStat == 1){
        if(dmgInstDepth != 0){ //  피해기관 뎁스가 0 아닐 때 이관 버튼 활성화  0, null(중앙지원, 개발원) , 2(시군구)일때는 이관 버튼 필요x
            $("#moveReq").css("display", "inline");
        }
		$("#assign").css("display", "inline");

        if(authTbz05 == 'Y') {
            $("#miss").css("display", "inline");
            $("#caution").css("display", "inline");
        }
    }

    //이관요청 일때 요청 승인 버튼 활성
    if(currentInciStat == 7){
        if(authTbz06 == 'Y') {
            $("#moveApp").css("display", "inline");
        }
    }

    //처리상태가 '이관'이면서 이관처리상태가 '접수'일때 시도군으로 이관 버튼 활성
    if(currentInciStat == 11 && currentTransInciStat == 1){
        $("#moveReqToSiGu").css("display", "inline");
    }

    if(currentInciStat == 11 && currentTransInciStat == 7){
        if(authTbz06 == 'Y') {
            $("#moveAppToSiGu").css("display", "inline");
        }
    }

    //개발원 이관이후 시가 종결되면 개발원쪽 종결버튼 활성화 / 시가 종결하면 개발원 종결요청 활성
    if( currentTransInciStat == 13 || (currentTransInciStat == 13 && currentInciStat == 7) ){
        if(authTbz05 == 'Y') {
            $("#conclusion").css("display", "inline");
            $("#reject_high").css("display", "inline"); //상위기관 반려(개발원)
        }

        if(currentInciStat == 9 || currentInciStat == 13){ //개발원 상태가 종결요청이거나 종결완료시 종결 요청버튼 감춘다
            $("#conclusion").css("display", "none");
            $("#reject_high").css("display", "none");
        }
    }

    //종결승인 버튼활성화
    if(currentInciStat == 9){
        if(authTbz06 == 'Y') {
            $("#conclusionApp").css("display", "inline");
        }
    }

    //오탐종결 버튼활성화
    if(currentInciStat == 14){
        if(authTbz06 == 'Y') {
            $("#missApp").css("display", "inline");
        }
    }

    //주의관제종결 버튼활성화
    if(currentInciStat == 16){
        if(authTbz06 == 'Y') {
            $("#cautionApp").css("display", "inline");
        }
    }


    // ----------- 시 버튼제어 -------------

    //접수상태: 할당, 종결승인 활성
    if(currentTransInciStat == 1){
        $("#assign_si").css("display", "inline");

        if(authTbz05 == 'Y') {
            $("#conclusion_si").css("display", "inline");
            $("#miss_si").css("display", "inline");
            $("#caution_si").css("display", "inline");

            $("#moveReqToSiGu").css("display", "inline"); //시도상태가 1(접수) 이며 요청권한 이 있을 때 이관 시군구로 이관 요청 버튼 활성
        }
    }

    //시도 상태가 이관 요청일 경우
    if(currentTransInciStat == 7){
        if(authTbz06 == 'Y') { //승인 권한이 있을 경우
            $("#moveAppToSiGu").css("display", "inline");
        }
    }

    //접수, 할당, 반려 -> 폐기
    if(currentTransInciStat == 1 || currentTransInciStat == 2 || currentTransInciStat == 5){

        if(authTbz05 == 'Y'){
            $("#disuse_si").css("display", "inline");
        }
    }

    //시군구가 폐기 종결완료 했을 경우 시도 폐기 버튼 활성
    if(currentTransSidoStat == 12){
        if(authTbz05 == 'Y'){
            $("#disuse_si").css("display", "inline");

            $("#reject_high_si").css("display", "inline"); //상위기관 반려(시)

            //시도상태가 폐기관련일때 폐기 버튼 감춤
            if(currentTransInciStat == 8|| currentTransInciStat == 12){
                $("#disuse_si").css("display", "none");
                $("#reject_high_si").css("display", "none"); //승인요청 상태에서는 상위반려 감춤
            }
        }
    }

    //시군구가 오탐종결완료 했을 경우 시도 오탐 버튼 활성
    if(currentTransSidoStat == 15){
        if(authTbz05 == 'Y'){
            $("#miss_si").css("display", "inline");

            $("#reject_high_si").css("display", "inline"); //상위기관 반려(시)

            //시도상태가 오탐관련일때 오탐 버튼 감춤
            if(currentTransInciStat == 14|| currentTransInciStat == 15){
                $("#miss_si").css("display", "none");
                $("#reject_high_si").css("display", "none"); //승인요청 상태에서는 상위반려 감춤
            }
        }
    }

    //시군구가 주의관제종결완료 했을 경우 시도 주의관제 버튼 활성
    if(currentTransSidoStat == 17){
        if(authTbz05 == 'Y'){
            $("#caution_si").css("display", "inline");
            $("#reject_high_si").css("display", "inline"); //상위기관 반려(시)

            //시도상태가 주의관제관련일때 오탐 버튼 감춤
            if(currentTransInciStat == 16|| currentTransInciStat == 17){
                $("#caution_si").css("display", "none");
                $("#reject_high_si").css("display", "none"); //승인요청 상태에서는 상위반려 감춤
            }
        }
    }

    //폐기요청 -> 폐기승인 버튼 활성
    if(currentTransInciStat == 8){
        if(authTbz06 == 'Y') {
            $("#disuseApp_si").css("display", "inline");
        }
    }

    //할당상태: 종결승인 활성
    if(currentTransInciStat == 2){
        if(authTbz05 == 'Y') {
            var data = $("#historyGrid").jqxGrid('getrowdata',0);
            if(data.crtrId!=$('#sUserId').val()){
                $("#conclusion_si").css("display", "none");
                $("#miss_si").css("display", "none");
                $("#caution_si").css("display", "none");
            }else{
                $("#conclusion_si").css("display", "inline");
                $("#miss_si").css("display", "inline");
                $("#caution_si").css("display", "inline");
            }
        }
    }
    //종결승인상태: 종결 활성
    if(currentTransInciStat == 9){
        if(authTbz06 == 'Y') {
            $("#conclusionApp_si").css("display", "inline");
        }
    }
    //시도가 종결상태: 시 종결요청 활성
    if(currentTransSidoStat == 13){
        if(authTbz05 == 'Y') {
            $("#conclusion_si").css("display", "inline");

            $("#reject_high_si").css("display", "inline"); //상위기관 반려(시)

        }

        if(currentTransInciStat == 9 || currentTransInciStat == 13){ //시의 상태가 종결요청이거나 종결완료시 종결 요청버튼 감춘다
            $("#conclusion_si").css("display", "none");
            $("#reject_high_si").css("display", "none"); //승인요청 상태에서는 상위반려 감춤
        }
    }

    //승인요청 상태: 반려활성
    if(currentTransInciStat == 8 || currentTransInciStat == 9 || currentTransInciStat == 7 || currentTransInciStat == 14|| currentTransInciStat == 16){
        $("#reject_si").css("display", "inline");
    }

    if(currentTransInciStat == 14){
        if(authTbz06 == 'Y') {
            $("#missApp_si").css("display", "inline");
        }
    }

    if(currentTransInciStat == 16){
        if(authTbz06 == 'Y') {
            $("#cautionApp_si").css("display", "inline");
        }
    }

    //시도 계정일 경우 시군구로 멀티 이관한 사고가 있는지 체크하여 종결 관련 버튼 제어
    if($("#sAuthMain").val()=='AUTH_MAIN_3') {
        //시도 계정일때 멀티 이관 사고에 대해서는 모든 버튼을 감춘다. 제어x
        var inciNoLeg = _inciNo.length;

        if(inciNoLeg > 16){
            $("#moveReqToSiGu").css("display", "none");
            $("#moveAppToSiGu").css("display", "none");
            $("#assign_si").css("display", "none");
            $("#disuse_si").css("display", "none");
            $("#disuseApp_si").css("display", "none");
            $("#conclusion_si").css("display", "none");
            $("#conclusionApp_si").css("display", "none");
            $("#reject_si").css("display", "none");
            $("#miss_si").css("display", "none");
            $("#missApp_si").css("display", "none");
            $("#caution_si").css("display", "none");
            $("#cautionApp_si").css("display", "none");

            $("#hwpDownload").css("display", "none");
            $("#pSidoCont").css("display", "none");
            $("#pbtnAdd").css("display", "none");
        }

        if(currentTransInciStat == 11){ //시의 상태가 이관일 경우에만 하위 멀티 이관 기관의 폐기 상태를 확인 한다. 상태 확인후 시에서 상태를 변경 이후 아래 버튼은 보일 필요 없음
            $.ajax({
                type : "post",
                url :$('#ctxPath').val() + '/api/main/acc/accidentApply/getInciMutiEndYn',
                data : "inciNo=" + _inciNo,
                dataType : "json",
                success : function(jsonData) {
                    if(jsonData.resultData != null){ //null 이면 멀티 이관 사고가 없다
                        var multiTotalCnt = jsonData.resultData.cnt; //멀티 이관한 총사고 건수
                        var multiEndCnt = jsonData.resultData.prcsStat; //멀티 이관 사고중 종결이 된 건수
                        var authTbz05 = $("#authTbz05").val();
                        if(multiTotalCnt == multiEndCnt){ //하위 기관으로 멀티 이관한 사고들이 모두 종결 되었을 경우 시도의 폐기/오탐/주의/종결 버튼 활성

                            if(authTbz05 == 'Y') {
                                $("#conclusion_si").css("display", "inline");
                                $("#miss_si").css("display", "inline");
                                $("#caution_si").css("display", "inline");
                                $("#disuse_si").css("display", "inline");
                            }

                        }
                    }

                }
            });
        }

    }


    // ---------  시군구 버튼제어 ---------
    if(currentTransSidoStat == 1){
        $("#assign_sido").css("display", "inline");

        if(authTbz05 == 'Y') {
            $("#conclusion_sido").css("display", "inline");
            $("#miss_sido").css("display", "inline");
            $("#caution_sido").css("display", "inline");
        }
    }

    //접수, 할당, 반려 -> 폐기
    if(currentTransSidoStat == 1 || currentTransSidoStat == 2 || currentTransSidoStat == 5){
        if(authTbz05 == 'Y'){
            $("#disuse_sido").css("display", "inline");
        }
    }

    //폐기요청 -> 폐기승인 버튼 활성
    if(currentTransSidoStat == 8){
        if(authTbz06 == 'Y') {
            $("#disuseApp_sido").css("display", "inline");
        }
    }

    if(currentTransSidoStat == 2){
        if(authTbz05 == 'Y') {
            $("#conclusion_sido").css("display", "inline");
        }
    }

    if(currentTransSidoStat == 9){
        if(authTbz06 == 'Y') {
            $("#conclusionApp_sido").css("display", "inline");
        }
    }

    if(currentTransSidoStat == 8 || currentTransSidoStat == 9 || currentTransSidoStat == 7 || currentTransSidoStat == 14 || currentTransSidoStat == 16){
        $("#reject_sido").css("display", "inline");
    }

    if(currentTransSidoStat == 14){
        if(authTbz06 == 'Y') {
            $("#missApp_sido").css("display", "inline");
        }
    }

    if(currentTransSidoStat == 16){
        if(authTbz06 == 'Y') {
            $("#cautionApp_sido").css("display", "inline");
        }
    }


}
function doHistoryDetail(rowindex) {
    var rows = HmGrid.getRowData( $("#historyGrid"), rowindex);
    var pwin = $('#pHistoryWindow');
    try {
        if(pwin.length == 0) {
            pwin = $('<div id="pHistoryWindow" style="position: absolute;"></div>')
            pwin.append($('<div></div>'));
            pwin.append($('<div></div>'));
            $('body').append(pwin);
        }
        HmWindow.create(pwin);
    } catch(e) {}

    $.post(ctxPath + '/main/popup/acc/pAccidentHistory.do',
        function(result) {
            HmWindow.open(pwin, "히스토리 상세 조회", result, 500, 280, 'pHistoryWindow_init', rows);
        }
    );

}
function sendSmsPopup(){
    var smsParams={
        inciNo : _inciNo ,   //접수일련번호
        dmgInstNm : _dmgInstName, //피해기관명
        accdTypNm : _accdTypName,          //사고유형 명
        instCd : _dmgInstCd,  //피해기관 instCd
        type : 0    //1: 사고접수, 0:이관승인
    };

    var pwin = $('#pSmsWindow');
    try {
        if(pwin.length == 0) {
            pwin = $('<div id="pSmsWindow" style="position: absolute;"></div>')
            pwin.append($('<div></div>'));
            pwin.append($('<div></div>'));
            $('body').append(pwin);
        }
        HmWindow.create(pwin);
    } catch(e) {}
    $.get(ctxPath + '/main/popup/sys/pCustUserSms.do',
        function(result) {
            HmWindow.open(pwin, 'SMS 전송', result, 930, 510,'smsPop_init', smsParams);
        }
    );
}
function updateProcessCenter(datas){
    Server.post('/api/main/acc/accidentApply/updateAccidentProcess', {
        data : datas,
        success : function(result) {
			console.log(result);
			console.log(_ncscNo);
            if(_ncscNo!=null){
                Server.get('/api/main/acc/accidentApply/getNcscInfo', {
                    data :{inciNo:_contents.inciNo},
                    success: function (result) {
						console.log("getNcscInfo:::  "   + _contents.inciNo);
                        alert("처리되었습니다.");
                        $('#pwindow').jqxWindow('close');
                        HmGrid.updateBoundData($accidentGrid);

                        var formData = new FormData($('#form1')[0]);
                        var incidentId = _ncscNo;
                        var institutionName    =result.instNm; //instNm 조치기관명
                        var name               =result.userName; //userName 조치자명
                        var email              =result.emailAddr; //emailAddr 조치자 이메일
                        var phone              =result.offcTelNo; //offcTelNo 조치자 전화
                        var cellularPhone      =''; //moblPhnNo 조치자 핸드폰
                        var fax                =result.offcFaxNo; //offcFaxNo 조치자 팩스
                        var responseDateTime   =result.hstyCrtDt; //hstyCrtDt 조치 시간
                        var responseType       ='조치완료';
                        //var responseContent    =$.base64('encode',result.hstyCont); //hstyCont 조치내용 euc-kr
                        var responseContent    = result.hstyCont; //hstyCont 조치내용



                        Server.get('/api/main/acc/accidentApply/getNciApi', {
                            data :{
                                incidentId : incidentId,
                                name : name,
                                email: email,
                                institutionName : institutionName,
                                responseDateTime: responseDateTime,
                                responseType: responseType,
                                responseContent: responseContent

                            },
                            success: function (result) {
                                console.log(result)
                            }
                        });

                       /* $.ajax({
                            type:"post", url:$('#sNcscUrl').val()+'/api/inci/key',
                            crossOrigin: true,
                            dataType:'json',
                            success:function (jsonData){
                                console.log(obj)
                                console.log(jsonData.key)
                                formData.append("type","RES");
                                formData.append("obj",JSON.stringify(obj));
                                formData.append("key",jsonData.key);
                                $.ajax({
                                    type:"post",
                                    url:$('#sNcscUrl').val()+'/api/inci/upload',
                                    dataType: 'json',
                                    data:formData,
                                    enctype:'multipart/form-data',
                                    processData: false,
                                    contentType: false,
                                    cache: false,
                                    success:function (uploadResult){
                                        alert("처리완료!!!")
                                        alert(uploadResult.result)
                                        if(uploadResult.result!="OK"){
                                            alert(uploadResult.msg);
                                        }else{
                                            alert("처리되었습니다.");
                                            $('#pwindow').jqxWindow('close');
                                            HmGrid.updateBoundData($accidentGrid);
                                        }
                                    },
                                    error:function(response, status, err){
                                        alert(response);
                                    }
                                });
                            }
                        });*/
                    }
                });
            }else{
                alert("처리되었습니다.");
                $('#pwindow').jqxWindow('close');
                HmGrid.updateBoundData($accidentGrid);
            }
        }
    });
}

$('#fileUpload').on('select', function (event) {
    var fileName = event.args.file;
    _file = fileName
});

$('#fileUpload').on('remove', function (event) { _file=null; });

$('#pbtnAdd').click(function() {
    //첨부파일
    $('#fileUpload').jqxFileUpload({
        uploadUrl : ctxPath + '/api/file/accUpload?inciNo=' + _inciNo
    });
    if ($('.jqx-file-upload-file-row').length == 0) {
        //location.href = $('#ctxPath').val() + '/main/board/pNoticeBoardContents.do?boardNo=1' + result;
        alert("저장되었습니다.");
        $('#pwindow').jqxWindow('close');
        Main.search();
    } else {
        try{
            $('#fileUpload').jqxFileUpload('uploadAll');
        }catch (e) {
            console.log(e);
        }
        alert("저장되었습니다.");
        $('#pwindow').jqxWindow('close');
        Main.search();
    }

});