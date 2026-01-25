var _file = null;
var cnt = 0;
var cnt2 = 0;
var _sAuthMain = $("#sAuthMain").val();
function pwindow_init(rowdata) {

    $('#emlYN').val('N');

    $('#fileUpload').jqxFileUpload({ width : '100%', fileInputName : 'fileinput' });
    $('#fileUploadBrowseButton').val("첨부파일");

    //사고일자
    $("#inciDt").jqxDateTimeInput({ width: 120, height: 21,  formatString: 'yyyy-MM-dd' });
    $('#inciDt').jqxDateTimeInput('val', new Date());

    //사고일자 시:분
    var nowHH = $.format.date(new Date(), 'HH');
    var nowMM = $.format.date(new Date(), 'mm');
    $('#inciDt_HH').jqxNumberInput({ inputMode: 'simple', value: nowHH, width: 40, height: 21, min: 0, max: 23, decimalDigits: 0, spinButtons: true});
    $('#inciDt_MM').jqxNumberInput({ inputMode: 'simple', value: nowMM, width: 40, height: 21, min: 0, max: 59, decimalDigits: 0, spinButtons: true});

    $('#gukYn').jqxDropDownList({ width: 300, height: 21, theme: jqxTheme, autoDropDownHeight: true,
        displayMember: 'label', valueMember: 'value', selectedIndex: 0,
        source: [
            { label: '아니오', value: 'N' },
            { label: '예', value: 'Y' }
        ]
    })
    .on('change', function(event) {
        if(event.args.item.value == 'Y'){
            $("#inciTtl").val("국-");
        }else{
            $("#inciTtl").val(null);
        }
    });

    if(_sAuthMain != 'AUTH_MAIN_2'){
        $("#gukYn").jqxDropDownList({ disabled: true });
    }

    //우선순위
    var inciPrty = new $.jqx.dataAdapter(
        { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
        { formatData : function(data) {$.extend(data, { comCode1: '3006' , codeLvl: '2'});  return data;		}}
    );
    $('#inciPrty').jqxDropDownList({ source: inciPrty, displayMember: 'codeName', valueMember: 'comCode2', width: '99%', height: 20, theme: jqxTheme, selectedIndex: 1, autoDropDownHeight: true });

    //망구분
    var netDiv = new $.jqx.dataAdapter(
        { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
        { formatData : function(data) {$.extend(data, { comCode1: '4004' , codeLvl: '2'});  return data;		}}
    );
    $('#netDiv').jqxDropDownList({ source: netDiv, displayMember: 'codeName', valueMember: 'comCode2', width: '99%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });

    //접수방법
    var acpnMthd = new $.jqx.dataAdapter(
        { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
        { formatData : function(data) {$.extend(data, { comCode1: '3004' , codeLvl: '2'});  return data;		}}
    );
    $('#acpnMthd').jqxDropDownList({ source: acpnMthd, displayMember: 'codeName', valueMember: 'comCode2', width: '99%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })
    .on('change', function(event) {
        if(event.args.item.value == '60' || event.args.item.value == '70'){
            $('#acpnMthdSubDiv').css('display', '')
        }else{
            $('#acpnMthdSubDiv').css('display', 'none')
        }
    });

    //침해등급
    var riskLevel = new $.jqx.dataAdapter(
        { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
        { formatData : function(data) {$.extend(data, { comCode1: '2001' , codeLvl: '2'});  return data;		}}
    );
    $('#riskLevel').jqxDropDownList({ source: riskLevel, displayMember: 'codeName', valueMember: 'comCode2', width: '99%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });

    //2021.01.05 요청 접수방법 지도/비지도 일때 심각도 추가
    $('#acpnMthdSub').jqxDropDownList({
        source: [
            { label: 'Critical', value: 'Critical' },
            { label: 'Warning', value: 'Warning' },
            { label: 'Suspicious', value: 'Suspicious' },
            { label: 'Informational', value: 'Informational' }
        ]
        , displayMember: 'codeName', valueMember: 'comCode2', width: 120, height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })



    /////////////////////신고기관정보/////////////////

    //신고기관정보-담당자 전화번호
    $('.home').jqxDropDownList({ source: [
        {label: '02', value: '02'},
        {label: '031', value: '031'},
        {label: '032', value: '032'},
        {label: '033', value: '033'},
        {label: '041', value: '041'},
        {label: '042', value: '042'},
        {label: '043', value: '043'},
        {label: '044', value: '044'},
        {label: '051', value: '051'},
        {label: '052', value: '052'},
        {label: '053', value: '053'},
        {label: '054', value: '054'},
        {label: '055', value: '055'},
        {label: '061', value: '061'},
        {label: '062', value: '062'},
        {label: '063', value: '063'},
        {label: '064', value: '064'},
        {label: '070', value: '070'}
    ],displayMember: 'label', valueMember: 'value', width: 50, height: 19, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: false });

    //신고기관정보-담당자 핸드폰
    // $('.mobile').jqxDropDownList({ source: [{label: '010', value: '010'}, {label: '011', value: '011'}, {label: '016', value: '016'}, {label: '017', value: '017'}, {label: '018', value: '018'}, {label: '019', value: '019'}],
    //     displayMember: 'label', valueMember: 'value', width: 50, height: 19, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });

    ////////////////////////////사고(피해)시스템 정보/////////////////////////
    //피해기관
    HmDropDownBtn.createDeptTreeGrid($('#dmgInstCdArea'), $('#dmgInstCd'), 'dmg', '98%', 22, '98%', 350, null,{InstLevel:$('#sInstLevel').val(), instCd:$('#sInstCd').val(), instNm:$('#sInstName').val()});
    //HmDropDownBtn.createDeptTreeGrid($('#dmgInstCdArea'), $('#dmgInstCd'), 'dmg', '98%', 22, '98%', 350, null);

    //피해 사고유형
    var accdTypCd = new $.jqx.dataAdapter(
        { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
        { formatData : function(data) {$.extend(data, { 'comCode1': '3002' , 'codeLvl': '2' });  return data;		}}
    );
    $('#accdTypCd').jqxDropDownList({ source: accdTypCd, displayMember: 'codeName', valueMember: 'comCode2', width: '98%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })
    .on('change', function(event) { //사고 유형 값에 따른 공통코드의 설명값이 조사내용에 들어간다.
        var comCode2 = event.args.item.value;
        _accdTypNm = event.args.item.label; //sms에서 사용할 사고 유형 한글명
        if(comCode2 != 0){
            Server.get('/api/common/code/getCommonCode', {
                data: { comCode1: 3002, comCode2: comCode2, codeLvl: '2'  },
                success: function(result) {
                    $("#inciInvsCont").val(result[0].codeCont)
                }
            });

            //20210615 사고유형->웹취약점공격 일경우 상세 부가정보 추가 해당 컬럼값은 dmg_Hp_No 에 추가
            //해당 기능은 우선 개발원 권한에서만 사용 , 7분류 개발원 + 지차제 모두 적용 추가
            if(comCode2 == '40' || comCode2 == '90' || comCode2 == '100' || comCode2 == '110'){ //웹취약점일때
                    $('#accdTypCdSubDiv').css('display', '');
                    $('#accdTypCdSub').text('웹취약점');
                    /*$('#accdTypCdSub').jqxDropDownList({
                        source: [
                            { label: '시스템권한획득', value: '시스템권한획득' },
                            { label: '홈페이지변조', value: '홈페이지변조' },
                            { label: '정보유출', value: '정보유출' }
                        ], displayMember: 'codeName', valueMember: 'comCode2', width: 120, height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })*/

            }else{
                $('#accdTypCdSubDiv').css('display', 'none')
                var accdTypCdText = $("#accdTypCd").text()
                $('#accdTypCdSub').text(accdTypCdText);
            }
        }else{
            $("#inciInvsCont").val(null)
        }

    });


    ////////////////////////////공격시스템 정보/////////////////////////
    //공격유형
    // var attTypCd = new $.jqx.dataAdapter(
    //     { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
    //     { formatData : function(data) {$.extend(data, { 'comCode1': '3003' , 'codeLvl': '2' });  return data;		}}
    // );
    // $('#attTypCd').jqxDropDownList({ source: attTypCd, displayMember: 'codeName', valueMember: 'comCode2', width: '98%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });

    //공격루트
    // var attVia = new $.jqx.dataAdapter(
    //     { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
    //     { formatData : function(data) {$.extend(data, { 'comCode1': '3009' , 'codeLvl': '2' });  return data;		}}
    // );
    // $('#attVia').jqxDropDownList({ source: attVia, displayMember: 'codeName', valueMember: 'comCode2', width: '98%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });

    //공격세부루트
    // var attDtlsVia = new $.jqx.dataAdapter(
    //     { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
    //     { formatData : function(data) {$.extend(data, { 'comCode1': '3010' , 'codeLvl': '2' });  return data;		}}
    // );
    // $('#attDtlsVia').jqxDropDownList({ source: attDtlsVia, displayMember: 'codeName', valueMember: 'comCode2', width: '98%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });

    //비고
    var remarks = new $.jqx.dataAdapter(
        { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
        { formatData : function(data) {$.extend(data, { 'comCode1': '4006' , 'codeLvl': '2' });  return data;		}}
    );
    $('#remarks').jqxDropDownList({ source: remarks, displayMember: 'codeName', valueMember: 'comCode2', width: '98%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })
        .on('change', function(event) {
            //비고 :: 0없음, 1해킹, 2취약점
            var remarksValue = event.args.item.value;
            if(remarksValue == 1){
                $("#remarksTitle").show();

                $("#remarksDiv2").hide();
                $("#remarksDiv1").show();
            }else if(remarksValue == 2){
                $("#remarksTitle").show();

                $("#remarksDiv1").hide();
                $("#remarksDiv2").show();
            }else{
                $("#remarksTitle").hide();
                $("#remarksDiv1").hide();
                $("#remarksDiv2").hide();
            }
        });
    copyDataSetting(rowdata);
}

$('#fileUpload').on('select', function (event) {
    var fileName = event.args.file;
    _file = fileName
});

$('#fileUpload').on('remove', function (event) { _file=null; });

$('#fileUpload').on('select', function(event) {
    var totallength = event.args.owner._fileRows.length + $('#attachFileList > li').length;
    var fileLength = event.args.owner._fileRows.length;
    var attFileSize = $('.jqx-file-upload-file-input')[fileLength - 1].files[0].size; //읽어오는 첨부파일 이름

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
    $('.jqx-file-upload-buttons-container').css('display', 'none')
});

$('#pbtnAdd').click(function() {
    //if (!validateForm()) return;
    var dmgIpList = [];
    if($('.ipClass').val() === undefined){
        alert("피해 IP를 입력해주세요.");
        return false;
    }

    $('.ipClass').each(function(i) {
        if(this.value != ''){
            dmgIpList.push(this.value)
        }
    });

    var attIpList = [];
    if($('.attIpClass').val() === undefined){
        alert("공격 IP를 입력해주세요.");
        return false;
    }

    $('.attIpClass').each(function(i) {
        if(this.value != ''){
            attIpList.push(this.value)
        }
    });
    var inciDt = $.format.date($('#inciDt').jqxDateTimeInput('getDate'), 'yyyyMMdd');
    var inciDt_HH = $("#inciDt_HH").val();
    var inciDt_MM = $("#inciDt_MM").val();

    if(inciDt_HH < 10){
        inciDt_HH = '0'+ $("#inciDt_HH").val();
    }
    if(inciDt_MM < 10){
        inciDt_MM = '0'+ $("#inciDt_MM").val();
    }
    var params={
        instCd: $("#sInstCd").val(),

        //기본정보
        inciDt: inciDt + inciDt_HH + inciDt_MM + '00', //사고일시
        inciDttNm : $("#inciDttNm").val(),              //탐지명
        inciTtl: $("#inciTtl").val(),   //사고제목
        inciPrty: '00'+$("#inciPrty").val(),          //우선순위
        netDiv: $("#netDiv").val(),             //망구분
        acpnMthd: '00'+$("#acpnMthd").val(),
        riskLevel: $("#riskLevel").val(),
        inciPrcsStat : '1',                     //처리상태 기본 (1: 접수)

        //신고기관정보
        dclInstCd: $("#sInstCd").val(),
        dclCrgr: $("#dclCrgr").val(),
        dclEmail: $("#dclEmail").val(),
        dclTelNo: $("#dclTelNo").val() ,


        //사고피해 시스템정보
        dmgSvrNm: $("#dmgSvrNm").val(),
        dmgInstCd: $("#dmgInstCd").val(),
        dmgCrgr: $("#dmgCrgr").val(),
        dmgDept: $("#dmgDept").val(),
        dmgNatnCd: $("#dmgNatnCd").val(), //피해 국가
        accdTypCd: $("#accdTypCd").val(),
        dmgSvrUsrNm: $("#dmgSvrUsrNm").val(),
        osNm: $("#osNm").val(),
        dmgHpNo: $("#dmgHpNo_before").val() + "-" + $("#dmgHpNo1").val() + "-" + $("#dmgHpNo2").val(),
        dmgEmail: $("#dmgEmail").val(),


        //공격시스템 정보
        attNatnCd: $("#attNatnCd").val(),   //공격 국가
        attRemarks : $("#attRemarks").val(),  //공격비고

        remarks: $("#remarks").val(),

        //사고 조사 내용, 시도의견
        inciDclCont: $("#inciDclCont").val(),
        inciInvsCont: $("#inciInvsCont").val(),
        inciBelowCont: $("#inciBelowCont").val(),

        dmgIpList : dmgIpList,
        attIpList : attIpList

    };

    if($("#acpnMthd").val() == '60' || $("#acpnMthd").val() == 70 ){ //접수방법이 인공지능일때만 심각도 컬럼 데이터 추가
        params.acpnMthdSub = $("#acpnMthdSub").val() //dmgHpNo 컬럼 -> acpnMthdSub 신규 심각도 컬럼으로 사용 xml에서 해당 파라메터로 컬럼 값 입력
    }else{
        params.acpnMthdSub = '';
    }
    ;

    //사고유형 7분류 한글값 DCL_HP_NO 컬럼에 저장
    params.accdTypCdSub = $("#accdTypCdSub").text();

    if(_sAuthMain == 'AUTH_MAIN_2') {
        var gukYn = $("#gukYn").val(); //국정원 발송여부 Y면 NCSC_NO 컬럼 = inciNo 설정
        params.gukYn = gukYn;
    };

    var dclInstlevel = $("#sInstLevel").val();
    var dclInstCd = $("#sInstCd").val();
    if(dclInstlevel == 1) { //신고기관이 1레벨 이면서
        if (dclInstCd == '1200000' || dclInstCd == '1500000' || dclInstCd == '1400000' || dclInstCd == '1600000' || dclInstCd == '1311000'){
            params.inciPrcsStat = 1;
        }else{ //서울~부산 시도 일때는 시도 상태 값을 입력
            params.inciPrcsStat = 0;
            params.transInciPrcsStat = 1;
        }
    };

    var riskValue ; //침해등급에 따른 침해 값
    if($("#riskLevel").val() == 1){
        riskValue = 20;
    }else if($("#riskLevel").val() == 2){
        riskValue = 40;
    }else if($("#riskLevel").val() == 3){
        riskValue = 60;
    }
    else if($("#riskLevel").val() == 4) {
        riskValue = 80;
    }
    else{
        riskValue = 100;
    }
    params.riskValue = riskValue;

    if($("#remarks").val() == 1){ //비고:: 해킹 여기
        params.inciTarget = $("#inciTarget").val();
        params.hackAttTypeCd = $("#hackAttTypeCd").val();
        params.hackAttTypeSelf = $("#hackAttTypeSelf").val();
        params.userId = $("#sUserId").val();
        params.hackNetDiv  = $("#hackNetDiv").val();
        params.hackDomainNm = $("#hackDomainNm").val();
        params.hackCont = $("#hackCont").val();


    }else if($("#remarks").val() == 2){ //비고:: 취약점
        params.userId = $("#sUserId").val();
        params.attackTypeCd = $("#attackTypeCd").val();
        params.homepvCont = $("#homepvCont").val();
    }

    if($("#dmgTelNo1").val() != '' && $("#dmgTelNo2").val()){
        params.dmgTelNo = $("#dmgTelNo_before").val() + "-" + $("#dmgTelNo1").val() + "-" + $("#dmgTelNo2").val() ;
    }

    if($("#gukYn").val()=="Y"){
        params.dclInstCd='1400000';
    }
    if($("#emlYN").val()=="Y"){
        params.dclInstCd='1500000';
    }

    //20210324 사고복사 시도용
    if(params.transInciPrcsStat == null || params.transInciPrcsStat === undefined){
        params.transInciPrcsStat = 0;
    }
    // if(!confirm("사고제목 : "+params.inciTtl+"\n" +
    //         "탐지명 : "+params.inciDttNm+"\n" +
    //         "피해기관 : "+$("#dropDownButtonContentdmgInstCdArea div").text()+"\n" +
    //         "공격유형 : " +$("#dropdownlistContentaccdTypCd").text()+"\n"+
    //         "피해 IP : "+params.dmgIpList+"\n" +
    //         "공격 IP : "+params.attIpList + " 를 접수하시겠습니까?"
    //     )) return;

    // var loader = $('#comLoader');
    // if(loader.length <= 0) {
    //     loader = $('<div id="comLoader" style="z-index: 100000"></div>');
    //     loader.appendTo('body');
    // }
    // loader.jqxLoader({ isModal: false, width: 300, height: 70, theme: jqxTheme, text: '처리중입니다. 잠시만 기다려주세요.' });
    // loader.jqxLoader('open');

    //로딩바
    var loader = $('#comLoader');
    if(loader.length <= 0) {
        loader = $('<div id="comLoader" style="z-index: 100000"></div>');
        loader.appendTo('body');
    }
    loader.jqxLoader({ isModal: false, width: 300, height: 70, theme: jqxTheme, text: '처리중입니다. 잠시만 기다려주세요.' });
    loader.jqxLoader('open');

    Server.post('/api/main/acc/accidentApply/addAccidentApply', {
        data : params,
        success : function(result) {
            //첨부파일
            $('#fileUpload').jqxFileUpload({
                uploadUrl : ctxPath + '/api/file/accUpload?inciNo=' + result
            });
            if ($('.jqx-file-upload-file-row').length == 0) {
                //location.href = $('#ctxPath').val() + '/main/board/pNoticeBoardContents.do?boardNo=1' + result;
            } else {
                try{
                    $('#fileUpload').jqxFileUpload('uploadAll');
                }catch (e) {
                    console.log(e);
                }
                inciNo = result;
                uploadCnt = $('.jqx-file-upload-file-row').length;
            }
            //alert("사고신고가 접수 되었습니다.");
            //$('#pwindow').jqxWindow('close');
            //HmGrid.updateBoundData($accidentGrid);
//
            ////사고접수의 우선순위가 긴급(10)일 경우에만 sms전송 팝업 호출
            //if($("#inciPrty").val() == 10){
            //    //SMS전송값 세팅
            //    var smsParams={
            //        inciNo : result ,   //접수일련번호
            //        dmgInstNm : $("#dropDownButtonContentdmgInstCdArea").children('div').text(), //피해기관명
            //        accdTypNm : _accdTypNm,          //사고유형 명
            //        instCd : $("#dmgInstCd").val(),  //피해기관 instCd
            //        type : 1    //1: 사고접수, 0:이관승인
            //    };
            //    var pwin = $('#pSmsWindow');
            //    try {
            //        if(pwin.length == 0) {
            //            pwin = $('<div id="pSmsWindow" style="position: absolute;"></div>')
            //            pwin.append($('<div></div>'));
            //            pwin.append($('<div></div>'));
            //            $('body').append(pwin);
            //        }
            //        HmWindow.create(pwin);
            //    } catch(e) {}
            //    $.get(ctxPath + '/main/popup/sys/pCustUserSms.do',
            //        function(result) {
            //            HmWindow.open(pwin, 'SMS 전송', result, 800, 510,'smsPop_init', smsParams);
            //        }
            //    );
            //}

            if($("#gukYn").val()=="Y"){

                var formData = new FormData($("#form1")[0]);
                //var ctParam = {
                //type:'INCI',
                var obj={
                    incidentId:result,
                    incidentName:params.inciTtl.replace("국-",""),
                    createDateTime :params.inciDt,
                    modifyDateTime :params.inciDt,
                    incidentType   :'기타',
                    incidentContent:$.base64('encode',$("#dmgInstCdArea")[0].innerText+params.inciDclCont),
                    informInfo:{ //사용안함
                        name:params.dclCrgr,
                        email:params.dclEmail,
                        phone:params.dclTelNo,
                        cellularPhone:'',
                        fax:''
                    },
                    reportInfo:{ //사용안함
                        reportDateTime     :params.inciDt,
                        institutionCode    :'',
                        institutionName    :params.dclCrgr,
                        name               :params.dclCrgr,
                        email              :'',
                        phone              :'',
                        cellularPhone      :'',
                        fax                :'',
                    },
                    transferInfo:{ //사용안함
                        transferDateTime       :             '',
                        institutionCode        :             '',
                        institutionName        :             '',
                        name                   :             '',
                        email                  :             '',
                        phone                  :             '',
                        cellularPhone          :             '',
                        fax                    :             '',
                    },
                    attackIpInfo:[],
                    victimIpInfo:[],
                    relayIpInfo:{ // 사용안함
                        ip           :                       '',
                        port         :                       '',
                        nation       :                       '',
                    },
                    victimInfo:{ // 사용안함
                        institutionCode   :                  params.dmgInstCd,
                        institutionName   :                  '피해기관명',
                        incidentEquipName :                  '피해장비명',
                        securityManager:{
                            name              :              '',
                            email             :              '',
                            phone             :              '',
                            cellularPhone     :              '',
                            fax               :              '',
                        },
                        systemUser:{
                            name            :                '',
                            email           :                '',
                            phone           :                '',
                            cellularPhone   :                '',
                            fax             :                '',
                        }
                    },
                    detectionInfo:[{
                        detectionDateTime     :              params.inciDt,
                        institutionCode       :              '',
                        institutionName       :              '',
                        detectionEquipName    :              '',
                        detectionRuleName     :              params.inciDttNm,
                        detectionCount        :              ''
                    }],
                    fileInfo:{ // 사용안함
                    }
                }
                //}

                params.attIpList.forEach(function (value, index, array1) {
                    var pushData = {
                        ip:value,
                        port:'',
                        nation:value
                    }
                    obj.attackIpInfo.push(pushData);
                });
                params.dmgIpList.forEach(function (value, index, array1) {
                    var pushData = {
                        ip:value,
                        port:'',
                        nation:value
                    }
                    obj.victimIpInfo.push(pushData);
                });

                $.ajax({
                    type:"post", url:$('#sNcscUrl').val()+'/api/inci/key',
                    dataType:'json',
                    success:function (jsonData){
                        formData.append("obj",JSON.stringify(obj));
                        formData.append("type","INCI");
                        formData.append("key",jsonData.key);
                        $.ajax({
                            type:"post",
                            url:$('#sNcscUrl').val()+'/api/inci/upload',
                            data:formData,
                            enctype:'multipart/form-data',
                            processData: false,
                            contentType: false,
                            cache: false,
                            success:function (uploadResult){
                                if(uploadResult.result!="OK"){
                                    alert(uploadResult.msg);
                                }else{
                                    alert("사고신고가 접수 되었습니다.");
                                    loader.jqxLoader('close');
                                    $('#pwindow').jqxWindow('close');
                                    HmGrid.updateBoundData($accidentGrid);

                                    if($("#inciPrty").val() == 10){
                                        var msg = $("#dropDownButtonContentdmgInstCdArea").children('div').text()+" "
                                            +_accdTypNm+"\n관련"+"긴급 사고 ("+result+")확인부탁드립니다.";

                                        ///main/env/userConf/getPushUsers.do
                                        var resultArr =  new Array() ;

                                        var params={sUserId : $("#sUserId").val()};

                                        if($("#sAuthMain").val()=='AUTH_MAIN_2')
                                            params.sType="A";
                                        else if($("#sAuthMain").val()=='AUTH_MAIN_3')
                                            params.sType="C";

                                        $.ajax({
                                            type: 'POST',
                                            url: ctxPath + '/api/main/env/userConf/getPushUsers',
                                            data: params,
                                            success: function (data) {
                                                for(var i=0; i<data.resultData.length; i++){
                                                    resultArr.push(data.resultData[i]);
                                                }
                                            }
                                        });

                                        var message  = {
                                            receipt : {
                                                msg : msg,
                                                msgType : "사고접수",
                                                recv : resultArr
                                            }
                                        };

                                        // eb.send("worker.receipt", message, function (aa, result) {
                                        //     if (result == null) {
                                        //         console.log("ERROR: response null");
                                        //     }
                                        // });

                                    }
                                }
                            },
                            error:function(response, status, err){
                                alert(response);
                            }
                        });
                    }
                });
            }else{
                alert("사고신고가 접수 되었습니다.");
                loader.jqxLoader('close');
                $('#pwindow').jqxWindow('close');
                HmGrid.updateBoundData($accidentGrid);

                if($("#inciPrty").val() == 10){
                    var msg = $("#dropDownButtonContentdmgInstCdArea").children('div').text()+" "
                        +_accdTypNm+"\n관련"+"긴급 사고 ("+result+")확인부탁드립니다.";

                    var resultArr =  new Array() ;

                    var params={sUserId : $("#sUserId").val()};

                    if($("#sAuthMain").val()=='AUTH_MAIN_2')
                        params.sType="A";
                    else if($("#sAuthMain").val()=='AUTH_MAIN_3')
                        params.sType="C";

                    $.ajax({
                        type: 'POST',
                        url: ctxPath + '/api/main/env/userConf/getPushUsers',
                        data: params,
                        success: function (data) {
                            for(var i=0; i<data.resultData.length; i++){
                                resultArr.push(data.resultData[i]);
                            }
                        }
                    });

                    var message  = {
                        receipt : {
                            msg : msg,
                            msgType : "1",
                            recv : resultArr
                        }
                    };

                    // eb.send("worker.receipt", message, function (aa, result) {
                    //     if (result == null) {
                    //         console.log("ERROR: response null");
                    //     }
                    // });

                }
            }
        }
    });
});

$('#pbtnClose').click(function() {
    $('#pwindow').jqxWindow('close');
});

$('#btnDeptSearch').click(function() {
    $.post(ctxPath + '/main/popup/acc/pAccidentAdd.do',
        function (result) {
            HmWindow.open($('#pwindow2'), '기관조회', result, 900, 800);
        }
    );
});

$('.nation').click(function() {
    var params = {};
    params.type = this.id;
    var pwin = $('#pNationWindow');
    try {
        if(pwin.length == 0) {
            pwin = $('<div id="pNationWindow" style="position: absolute;"></div>')
            pwin.append($('<div></div>'));
            pwin.append($('<div></div>'));
            $('body').append(pwin);
        }
        HmWindow.create(pwin);
    } catch(e) {}


    $.post(ctxPath + '/main/popup/comm/pNationList.do', function(result) {
        HmWindow.open(pwin, '국가목록', result, 500, 500, 'pNationWindow_init', params);
    });
});

function copyDataSetting (rowdata){

    var inciNo = rowdata.inciNo;

    //신고기관 정보 -> 로그인 사용자의 기본값으로 세팅
    $.ajax({
        type: "post",
        url: $('#ctxPath').val() + '/api/main/env/userConf/getDetailUser',
        data: { userId : $("#sUserId").val() },
        dataType: "json",
        success: function (jsonData) {
            var contents = jsonData.resultData.contents;

            $("#dclInstName").val(contents.instNm); //신고기관
            $("#dclCrgr").val(contents.userName); //이름
            $("#dclTelNo").val(contents.offcTelNo); //연락처
            $("#dclEmail").val(contents.emailAddr); //이메일
        }
    });

    $.ajax({
        type : "post",
        url :$('#ctxPath').val() + '/api/main/acc/accidentApply/getAccidentDetail',
        data : "inciNo=" + inciNo,
        dataType : "json",
        success : function(jsonData) {
            var contents = jsonData.resultData.contents;

            $('#inciDttNm').val(contents.inciDttNm);

            $('#attEmail').val(contents.attEmail);
            $('#accdTypCd').val(contents.accdTypCd);
            $('#attNatnCd').val(contents.attNatnCd);
            $('#remarks').val(contents.remarksCd);
            $('#crgr').val(  contents.crgr);

            $('#dmgCrgr').val(  contents.dmgCrgr);
            $('#dmgDept').val(  contents.dmgDept);
            $('#dmgEmail').val(  contents.dmgEmail);
            $('#dmgInstCd').val(  contents.dmgInstCd);
            $('#dmgNatnCd').val(  contents.dmgNatnCd);
            $('#dmgSvrNm').val(  contents.dmgSvrNm);
            $('#dmgSvrUsrNm').val(  contents.dmgSvrUsrNm);

            if(contents.dmgTelNo != null){
                var dmgTelNoAll = contents.dmgTelNo.split("-")
                $('#dmgTelNo_before').val(dmgTelNoAll[0])
                $('#dmgTelNo1').val(dmgTelNoAll[1])
                $('#dmgTelNo2').val(dmgTelNoAll[2])
            }
            $('#inciDclCont').val(  contents.inciDclCont);
            $('#inciInvsCont').val(  contents.inciInvsCont);
            $('#inciBelowCont').val(  contents.inciBelowCont);
            $('#inciPrty').val(  contents.inciPrty);
            $('#inciTtl').val(  contents.inciTtl);
            $('#netDiv').val(  contents.netDiv);
            $('#osNm').val(  contents.osNm);
            //20210308 접수방법 + 심각도
            console.log(contents)
            console.log(contents.acpnMthd.slice(-2))
            $("#acpnMthd").val(contents.acpnMthd.slice(-2));

            if(contents.acpnMthd.slice(-2) == '60' || contents.acpnMthd.slice(-2) == '70' ){ //접수방법이 인공지능일때만 심각도 컬럼 데이터 추가
                $("#acpnMthdSub").val(contents.dmgHpNo) //dmgHpNo 컬럼 -> acpnMthdSub 신규 심각도 컬럼으로 사용 xml에서 해당 파라메터로 컬럼 값 입력
            };


        }
    });
}

$('#ipAdd').click(function() {
    var ipTextValue = $("#dmgIp").val();
    if(ipTextValue == ''){
        alert("IP를 입력해주세요");
        return false;
    };
    if (!$.validateIp(ipTextValue)) {
        alert("IP형식이 유효하지 않습니다.");
        $("#dmgIp").val(null);
        return false;
    };
    appendHtml($(this).parent().parent(), ipTextValue);
    $("#dmgIp").val(null);
    cnt2 = cnt2 + 1;

});

$('#attIpAdd').click(function() {
    var ipTextValue = $("#attIp").val();
    if(ipTextValue == ''){
        alert("IP를 입력해주세요");
        return false;
    }
    if (!$.validateIp(ipTextValue)) {
        alert("IP형식이 유효하지 않습니다.");
        $("#attIp").val(null);
        return false;
    }
    appendHtml2($(this).parent().parent(), ipTextValue);
    $("#attIp").val(null);
    cnt = cnt + 1;

});

$('.pop_grid').on('click', '#dmgMinus', function() {
    var dmgIpInputCnt = $(".ipClass").length;

    if(dmgIpInputCnt == 1){ //ip입력란이 전부 지워질 경우 피해 국가 리셋
        cnt2 = 0;
        $("#dmgNatnName").val(null);
        $("#dmgNatnCd").val(null);
    }
    $(this).parent().remove();
});

$('.pop_grid').on('click', '#attMinus', function() {
    var attIpInputCnt = $(".attIpClass").length;

    if(attIpInputCnt == 1){
        cnt = 0;
        $("#attNatnName").val(null);
        $("#attNatnCd").val(null);
    }

    $(this).parent().remove();
});

function appendHtml($target, value, label) {
    value = typeof value !== 'undefined' ? value : "";
    label = typeof label !== 'undefined' ? label : "";

    var keywordHtml = '';
    $.ajax({
        type: "post",
        url: $('#ctxPath').val() + '/api/main/acc/accidentApply/getInstByIP',
        data: { checkIp : value },
        dataType: "json",
        success: function (jsonData) {
            var resultText = "";
            if(jsonData.resultData.contents === null){
                resultText = "없음";
            }else{
                resultText = jsonData.resultData.contents.instNm;
                var dmgNationCd = jsonData.resultData.contents.instCd

                if(cnt2 == 1){
                    $("#dmgNatnName").val('한국');
                    $("#dmgNatnCd").val(1);
                }
            }

            if (label != '') {
                keywordHtml += '<tr class="pop_grid ' + value + '"><td class="pop_gridSub" style="width:120px;"></td><td>';
            }
            keywordHtml += '<div style="float: left"><input type="text" class="pop_inputWrite ipClass" value="'+value+'" style="width:125px;float:left;"/>';
            if (label != '') {
                keywordHtml += '<button type="button" class="p_btnPlus3 checkIp" style="margin-left: 0px;"></button>';
                keywordHtml += '</td></tr>';
            } else {
                keywordHtml += '<button type="button" class="p_btnMinus" id="dmgMinus" style="float: left"></button>';
                keywordHtml += '<span id="dmgIpName'+cnt2+'" style="float: left">'+resultText+'</span>';
                keywordHtml += '</div>';
            }
            $target.append(keywordHtml);
        }
    });

}

function appendHtml2($target, value, label) {
    value = typeof value !== 'undefined' ? value : "";
    label = typeof label !== 'undefined' ? label : "";

    var keywordHtml = '';
    $.ajax({
        type: "post",
        url: $('#ctxPath').val() + '/api/main/acc/accidentApply/getIpByNationNm',
        data: { checkIp : value },
        dataType: "json",
        success: function (jsonData) {
            var resultText = "";
            if(jsonData.resultData.contents === null){
                resultText = "없음";
            }else{
                resultText = jsonData.resultData.contents.name;

                var attNationCd = jsonData.resultData.contents.nationCd

                if(cnt == 1){
                    $("#attNatnName").val(resultText);
                    $("#attNatnCd").val(attNationCd);
                }
            }
            if(resultText.length > 9){
                resultText = resultText.substring(0,7) + '...';
            }
            if (label != '') {
                keywordHtml += '<tr class="pop_grid ' + value + '"><td class="pop_gridSub" style="width:120px;"></td><td>';
            }

            keywordHtml += '<div style="float: left"><input type="text" class="pop_inputWrite attIpClass" value="'+value+'" style="width:150px;float:left;"/>';
            if (label != '') {
                keywordHtml += '<button type="button" class="p_btnPlus3 checkIp" style="margin-left: 0px;"></button>';
                keywordHtml += '</td></tr>';
            } else {
                keywordHtml += '<button type="button" class="p_btnMinus" id="attMinus" style="float: left"></button>';
                keywordHtml += '<span id="ipName'+cnt2+'" style="float: left">'+resultText+'</span>';
                keywordHtml += '</div>';
            }
            $target.append(keywordHtml);
        }
    });
}