var _file = null;
var cnt = 0;
var cnt2 = 0;
var _accdTypNm ;
var _sAuthMain = $("#sAuthMain").val();
function pwindow_init(jobData) {
    $('#pwindow').on('close', function (event) {
        $('#dmgInstCdArea').jqxDropDownButton('close');
    });
    $(".jqx-popup").on('click', function (event) {
        $('#dmgInstCdArea').jqxDropDownButton('close');
    });

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

    $("#emlYN").val("N");

    $('#fileUpload').jqxFileUpload({ width : '100%', fileInputName : 'fileinput' });
    $('#fileUploadBrowseButton').val("첨부파일");

    //사고일자
    $("#inciDt").jqxDateTimeInput({ width: 120, height: 21,  formatString: 'yyyy-MM-dd' });
    $('#inciDt').jqxDateTimeInput('val', new Date());

    //사고일자 시:분
    var nowHH = $.format.date(new Date(), 'HH');
    var nowMM = $.format.date(new Date(), 'mm');
    $('#inciDt_HH').jqxNumberInput({ inputMode: 'simple', value: nowHH, width: 40, height: 21, min: 0, max: 23, decimalDigits: 0, spinButtons: true, readOnly: true});
    $('#inciDt_MM').jqxNumberInput({ inputMode: 'simple', value: nowMM, width: 40, height: 21, min: 0, max: 59, decimalDigits: 0, spinButtons: true, readOnly: true});

    $('#gukYn').jqxDropDownList({ width: 300, height: 21, theme: jqxTheme, autoDropDownHeight: true,
        displayMember: 'label', valueMember: 'value', selectedIndex: 0,
        source: [
            { label: '아니오', value: 'N' },
            { label: '예', value: 'Y' }
        ]
    })
    .on('change', function(event) {
        var prev_inciTtl = $("#inciTtl").val();
        if(event.args.item.value == 'Y'){
            $("#inciTtl").val("국-"+prev_inciTtl);

        }else{
            $("#inciTtl").val(prev_inciTtl.replace("국-",""));

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
    $('#acpnMthd').jqxDropDownList({ source: acpnMthd, displayMember: 'codeName', valueMember: 'comCode2', width: '99%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });


    //침해등급
    var riskLevel = new $.jqx.dataAdapter(
        { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
        { formatData : function(data) {$.extend(data, { comCode1: '2001' , codeLvl: '2'});  return data;		}}
    );
    $('#riskLevel').jqxDropDownList({ source: riskLevel, displayMember: 'codeName', valueMember: 'comCode2', width: '99%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });



    /////////////////////신고기관정보/////////////////

    //신고기관
    //HmDropDownBtn.createDeptTreeGrid($('#dclInstArea'), $('#dclInstCd'), 'dcl', '98%', 22, '98%', 350, null);

    //인지기관
	/*var recoInciCd = new $.jqx.dataAdapter(
	 { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
	 { formatData : function(data) {$.extend(data, { comCode1: '4001' , codeLvl: '2'});  return data;		}}
	 );
	 $('#recoInciCd').jqxDropDownList({ source: recoInciCd, displayMember: 'codeName', valueMember: 'comCode2', width: '80%', height: 21, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });*/


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
    /*$('.mobile').jqxDropDownList({ source: [{label: '010', value: '010'}, {label: '011', value: '011'}, {label: '016', value: '016'}, {label: '017', value: '017'}, {label: '018', value: '018'}, {label: '019', value: '019'}],
        displayMember: 'label', valueMember: 'value', width: 50, height: 19, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });*/

    ////////////////////////////사고(피해)시스템 정보/////////////////////////
    //피해기관
    HmDropDownBtn.createDeptTreeGrid($('#dmgInstCdArea'), $('#dmgInstCd'), 'dmg', '98%', 22, '98%', 350, null,{InstLevel:$('#sInstLevel').val(), instCd:$('#sInstCd').val(), instNm:$('#sInstName').val()});


    //피해 사고유형
    var accdTypCd = new $.jqx.dataAdapter(
        { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
        { formatData : function(data) {$.extend(data, { 'comCode1': '3002' , 'codeLvl': '2' });  return data;		}}
    );
    $('#accdTypCd').jqxDropDownList({ source: accdTypCd, displayMember: 'codeName', valueMember: 'comCode2', width: '98%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })
    .on('change', function(event) { //사고 유형 값에 따른 공통코드의 설명값이 조치내용에 들어간다.
        var comCode2 = event.args.item.value;
        _accdTypNm = event.args.item.label; //sms에서 사용할 사고 유형 한글명
        if(comCode2 != 0){
            Server.get('/api/common/code/getCommonCode', {
                data: { comCode1: 3002, comCode2: comCode2, codeLvl: '2'  },
                success: function(result) {
                    $("#inciInvsCont").val(result[0].codeCont)
                }
            });
        }else{
            $("#inciInvsCont").val(null)
        }

    });

    ////////////////////////////공격시스템 정보/////////////////////////
    //공격유형 20181005 미사용 협의
    /*var attTypCd = new $.jqx.dataAdapter(
        { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
        { formatData : function(data) {$.extend(data, { 'comCode1': '3003' , 'codeLvl': '2' });  return data;		}}
    );
    $('#attTypCd').jqxDropDownList({ source: attTypCd, displayMember: 'codeName', valueMember: 'comCode2', width: '98%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });

    //공격루트
    var attVia = new $.jqx.dataAdapter(
        { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
        { formatData : function(data) {$.extend(data, { 'comCode1': '3009' , 'codeLvl': '2' });  return data;		}}
    );
    $('#attVia').jqxDropDownList({ source: attVia, displayMember: 'codeName', valueMember: 'comCode2', width: '98%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });

    //공격세부루트
    var attDtlsVia = new $.jqx.dataAdapter(
        { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
        { formatData : function(data) {$.extend(data, { 'comCode1': '3010' , 'codeLvl': '2' });  return data;		}}
    );
    $('#attDtlsVia').jqxDropDownList({ source: attDtlsVia, displayMember: 'codeName', valueMember: 'comCode2', width: '98%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });
    */

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

    //비고>해킹-공격유형 여기
    var hackAttTypeCd = new $.jqx.dataAdapter(
        { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
        { formatData : function(data) {$.extend(data, { 'comCode1': '4015' , 'codeLvl': '2' });  return data;		}}
    );
    $('#hackAttTypeCd').jqxDropDownList({ source: hackAttTypeCd, displayMember: 'codeName', valueMember: 'comCode2', width: 140, height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })
    .on('change', function(event) {
        var typeCd = event.args.item.value;

        if(typeCd == '000'){
            $("#hackAttTypeSelf").show();
        }else{
            $("#hackAttTypeSelf").hide();
        }
    });

    //비고>해킹-망구분
    $('#hackNetDiv').jqxDropDownList({
        source: [
            {label: '외부망', value: '외부망'},
            {label: '내부망', value: '내부망'}
        ],
        theme: jqxTheme,
        displayMember: 'label',
        valueMember: 'value',
        width: 100,
        height: 21,
        autoDropDownHeight: true,
        selectedIndex: 0
    })


    //비고>취약점탐지-공격유형
    var attackTypeCd = new $.jqx.dataAdapter(
        { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
        { formatData : function(data) {$.extend(data, { 'comCode1': '4011' , 'codeLvl': '2' });  return data;		}}
    );
    $('#attackTypeCd').jqxDropDownList({ source: attackTypeCd, displayMember: 'codeName', valueMember: 'comCode2', width: 140, height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })

    $('#srchType').jqxDropDownList({ width: 70, height: 21, theme: jqxTheme, autoDropDownHeight: true,
        displayMember: 'label', valueMember: 'value', selectedIndex: 0,
        source: [
            { label: 'OR', value: 'OR' },
            { label: 'AND', value: 'AND' }
        ]
    })


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
        data: { guid: 'A800930A-372D-41E2-BEDE-B40FFB5FDFAD'}, //사고신고
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
    if(!validateForm()) return;

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
        //접수테이블 키값은 신고기관 코드로 조합하여 생성 -> 2018.10.25 신고기관은 로그인 유저의 지역값으로 변경
        instCd: $("#sInstCd").val(),

        //기본정보
        inciDt: inciDt + inciDt_HH + inciDt_MM + '00', //사고일시
        inciTtl: $("#inciTtl").val(),                   //사고제목
        inciDttNm : $("#inciDttNm").val(),              //탐지명
        inciPrty: '00'+$("#inciPrty").val(),          //우선순위
        netDiv: $("#netDiv").val(),             //망구분
        acpnMthd: '00'+$("#acpnMthd").val(),    //사고접수방법
        riskLevel: $("#riskLevel").val(),
        inciPrcsStat : '1',                     //처리상태 기본 (1: 접수)

        //신고기관정보
        dclInstCd: $("#sInstCd").val(), //2018.10.25 신고기관은 로그인 유저의 지역값으로 변경
        //recoInciCd: $("#recoInciCd").val(),
        dclCrgr: $("#dclCrgr").val(),
        dclEmail: $("#dclEmail").val(),
        dclTelNo: $("#dclTelNo").val() ,
        //dclHpNo: $("#dclHpNo_before").val() + "-" + $("#dclHpNo1").val() + "-" + $("#dclHpNo2").val(),


        //사고피해 시스템정보
        //dmgSvrNm: $("#dmgSvrNm").val(),
        dmgIp:    $("#dmgIp").val(), //피해기관 아이피
        dmgInstCd: $("#dmgInstCd").val(),
        dmgCrgr: $("#dmgCrgr").val(),
        dmgDept: $("#dmgDept").val(),
        dmgNatnCd: 1, //$("#dmgNatnCd").val(), //피해 국가 20190101 피해국가 1(한국)으로 고정
        accdTypCd: $("#accdTypCd").val(),
        dmgSvrUsrNm: $("#dmgSvrUsrNm").val(),
        osNm: $("#osNm").val(),
        //dmgHpNo: $("#dmgHpNo_before").val() + "-" + $("#dmgHpNo1").val() + "-" + $("#dmgHpNo2").val(),
        dmgEmail: $("#dmgEmail").val(),


        //공격시스템 정보
        attNatnCd: $("#attNatnCd").val(),   //공격 국가
        attRemarks : $("#attRemarks").val(),  //비고

        /*attSvrNm: $("#attSvrNm").val(),
        attIp:    $("#attIp").val(), //공격기관 아이피
        attInstNm: $("#attInstNm").val(),
        attCrgr: $("#attCrgr").val(),
        attDept: $("#attDept").val(),
        attTypCd: $("#attTypCd").val(),
        attVia: $("#attVia").val(),
        attDtlsVia: $("#attDtlsVia").val(),
        attTelNo: $("#attTelNo_before").val() + "-" + $("#attTelNo1").val() + "-" + $("#attTelNo2").val() ,
        attEmail: $("#attEmail").val(),*/

        remarks: $("#remarks").val(),

        //사고 조사 내용, 시도의견
        inciDclCont: $("#inciDclCont").val(),
        inciInvsCont: $("#inciInvsCont").val(),
        inciBelowCont: $("#inciBelowCont").val(),
        dmgIpList : dmgIpList,
        attIpList : attIpList
    };

    if(_sAuthMain == 'AUTH_MAIN_2') {
        var gukYn = $("#gukYn").val(); //국정원 발송여부 Y면 NCSC_NO 컬럼 = inciNo 설정
        params.gukYn = gukYn;
    };

    var dclInstlevel = $("#sInstLevel").val();
    var dclInstCd = $("#sInstCd").val();
    if(dclInstlevel == 1) { //신고기관이 1레벨 이면서
        //1200000 지역정보
        //1500000	국가정보자원관리원
        //1400000	국가사이버안전센터
        //1600000	사이버위협분석팀
        //1311000	행정안전부
        if (dclInstCd == '1200000' || dclInstCd == '1500000' || dclInstCd == '1400000' || dclInstCd == '1600000' || dclInstCd == '1311000'){
            params.inciPrcsStat = 1;
        }else{ //서울~부산 시도 일때는 시도 상태 값을 입력
            params.inciPrcsStat = 0;
            params.transInciPrcsStat = 1;
        }
    }

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
            if($("#gukYn").val()=="Y"){

                var formData = new FormData($("#form1")[0]);

                //var ctParam = {
                //    type:'INCI',
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
                            detectionCount        :              '',
                            detectionPayload      :              '',
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
                                    successAccidentAdd(result);
                                }
                            },
                            error:function(response, status, err){
                                alert(response);
                            }
                        });
                    }
                });

            }else{
                successAccidentAdd(result);
            }
        }
    });
});

function successAccidentAdd(result) {
    alert("사고신고가 접수 되었습니다.");
    $('#pwindow').jqxWindow('close');
    HmGrid.updateBoundData($accidentGrid);

    //사고접수의 우선순위가 긴급(10)일 경우에만 sms전송 팝업 호출
    //20181126 사고접수 일경우 SMS 팝업 호출 제거
    /*if($("#inciPrty").val() == 10){
        //SMS전송값 세팅
        var smsParams={
            inciNo : result ,   //접수일련번호
            dmgInstNm : $("#dropDownButtonContentdmgInstCdArea").children('div').text(), //피해기관명
            accdTypNm : _accdTypNm,          //사고유형 명
            instCd : $("#dmgInstCd").val(),  //피해기관 instCd
            type : 1    //1: 사고접수, 0:이관승인
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
                HmWindow.open(pwin, 'SMS 전송', result, 800, 510,'smsPop_init', smsParams);
            }
        );
    }*/

    //푸쉬발송 긴급에서 -> 접수 상시로 변경
    var msg = $("#dropDownButtonContentdmgInstCdArea").children('div').text()+" "
    +_accdTypNm+"\n관련"+"사고 ("+result+")확인부탁드립니다.";

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

            var message  = {
                receipt : {
                    msg : msg,
                    msgType : "사고접수",
                    recv : resultArr
                }
            };
            eb.send("worker.receipt", message, function (aa, result) {
                if (result == null) {
                    console.log("ERROR: response null");
                }
            });
        }
    });

   /* var message  = {
        receipt : {
            msg : msg,
            msgType : "사고접수",
            recv : resultArr
        }
    };
console.log(message.recv)
     eb.send("worker.receipt", message, function (aa, result) {
         if (result == null) {
             console.log("ERROR: response null");
         }
     });*/


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
    //var value = $(this).parent().find($('input')).attr('name');
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

/*$('.pop_grid').on('click', '.checkIp', function() {
    var value = $(this).siblings(".pop_inputWrite").val();
    var spanId = $(this).siblings('span').attr('id');

    if(value == ''){
        alert("검색 할 IP를 입력해주세요.");
        return false;
    }

    if (!$.validateIp(value)) {
        alert("IP형식이 유효하지 않습니다.");
        $(this).siblings(".pop_inputWrite").val(null)
        return false;
    }

    $.ajax({
        type: "post",
        url: $('#ctxPath').val() + '/api/main/acc/accidentApply/getIpByInstNm',
        data: { checkIp : value },
        dataType: "json",
        success: function (jsonData) {
            if(jsonData.resultData.contents === null){
                $("#"+spanId).text("없음")
            }else{
                $("#"+spanId).text(jsonData.resultData.contents.name)
            }

        }
    });
});*/

$('.pop_grid').on('click', '#dmgMinus', function() {
    var dmgIpInputCnt = $(".ipClass").length;

    if(dmgIpInputCnt == 1){ //ip입력란이 전부 지워질 경우 피해 국가 리셋
        cnt2 = 0;
        //$("#dmgNatnName").val(null);
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
                var dmgNationCd = 1;
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
                resultText = jsonData.resultData.contents.krNm;

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
//eml로 사고접수 넣기
$('#btnImportEml').click(function () {
    var pwin = $('#pImportEmlCsvWindow');
    try {
        if(pwin.length == 0) {
            pwin = $('<div id="pImportEmlCsvWindow" style="position: absolute;"></div>')
            pwin.append($('<div></div>'));
            pwin.append($('<div></div>'));
            $('body').append(pwin);
        }
        HmWindow.create(pwin);
    } catch(e) {}
    $.post(ctxPath + '/main/popup/acc/pImportEmlCsv.do',
        function (result) {
            HmWindow.open(pwin, 'EML 파일 넣기', result, 300, 180, 'pwindow_init',{type : 'eml'});
        }
    );
});
//엑셀로 사고접수 넣기
$('#btnImportExcel').click(function () {
    var pwin = $('#pImportEmlCsvWindow');
    try {
        if(pwin.length == 0) {
            pwin = $('<div id="pImportEmlCsvWindow" style="position: absolute;"></div>')
            pwin.append($('<div></div>'));
            pwin.append($('<div></div>'));
            $('body').append(pwin);
        }
        HmWindow.create(pwin);
    } catch(e) {}
    $.post(ctxPath + '/main/popup/acc/pImportEmlCsv.do',
        function (result) {
            HmWindow.open(pwin, '엑셀 파일 넣기', result, 300, 180, 'pwindow_init',{type : 'csv'});
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

$('#checkDuplicateByDcl').click(function() {
    var params = {};

    if($('.ipClass').val() === undefined){
     alert("IP 조회 후 중복검사를 해주세요.");
     return false;
     }
    var checkedValues = '';
    var totalCnt = $('.ipClass').length;

    $('.ipClass').each(function(i) {
        if(this.value != ''){
            checkedValues += this.value;
            if(i < totalCnt - 1) {
                checkedValues += ",";
            }
        }
    });


    var pwin = $('#pAccDuplWindow');
    try {
        if(pwin.length == 0) {
            pwin = $('<div id="pAccDuplWindow" style="position: absolute;"></div>')
            pwin.append($('<div></div>'));
            pwin.append($('<div></div>'));
            $('body').append(pwin);
        }
        HmWindow.create(pwin);
    } catch(e) {}


    $.post(ctxPath + '/main/popup/comm/pAccDuplList.do', function(result) {
        HmWindow.open(pwin, '사고중복 확인', result, 800, 500, 'pAccDuplWindow_init', checkedValues);
    });
});

function validateForm(){
	var title = $('#inciTtl').val();
	var byteLen = title.byteLen();

	if(byteLen == 0) {
	    alert("사고제목을 입력해주세요");
	    return false;
	}

	if($("#inciDttNm").val() == ''){
        alert("탐지명을 입력해주세요");
        return false;
    }

   if($("#accdTypCd").val() == 0){
       alert("사고유형을 선택해주세요.");
       return false;
   }
    var inciDclContLeng = $("#inciDclCont").val().byteLen();
    if(inciDclContLeng == 0){
        alert("사고내용을 입력해주세요.");
        return false;
    }
   return true;
};