var _file = null;
var _inciNo = null;
var currentInciStat = null;
var currentTransInciStat = null;
var currentInciTrnsRcptInstCd = null;
var inciInvsContBefore;
	function pwindow_init(rowdata) {

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


        //전화번호
        /*$('.mobile').jqxDropDownList({ source: [{label: '010', value: '010'}, {label: '011', value: '011'}, {label: '016', value: '016'}, {label: '017', value: '017'}, {label: '018', value: '018'}, {label: '019', value: '019'}],
            displayMember: 'label', valueMember: 'value', width: 50, height: 19, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });*/

        //지역번호
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

        //피해 사고유형
        var accdTypCd = new $.jqx.dataAdapter(
            { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
            { formatData : function(data) {$.extend(data, { 'comCode1': '3002' , 'codeLvl': '2' });  return data;		}}
        );
        $('#accdTypCd').jqxDropDownList({ source: accdTypCd, displayMember: 'codeName', valueMember: 'comCode2', width: '70%', height: 21, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })
        .on('change', function(event) { //사고 유형 값에 따른 공통코드의 설명값이 조치내용에 들어간다.
            var comCode2 = event.args.item.value;
            //20210615 사고유형->웹취약점공격 일경우 상세 부가정보 추가 해당 컬럼값은 dmg_Hp_No 에 추가
            //해당 기능은 우선 개발원 권한에서만 사용
            //if($("#sAuthMain").val()=='AUTH_MAIN_2'){
                if(comCode2 == '40' || comCode2 == '90' || comCode2 == '100' || comCode2 == '110') { //웹취약점일때
                    $('#accdTypCdSubDiv').css('display', '');
                    $('#accdTypCdSub').text('웹취약점');
                }else{
                    $('#accdTypCdSubDiv').css('display', 'none')
                    var accdTypCdText = $("#accdTypCd").text()
                    $('#accdTypCdSub').text(accdTypCdText);
                }
            //}

            if(comCode2 != rowdata.accdTypCd){
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
            }else{
                $("#inciInvsCont").val(inciInvsContBefore)
            }

        });


        //공격유형
        /*var attTypCd = new $.jqx.dataAdapter(
            { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
            { formatData : function(data) {$.extend(data, { 'comCode1': '3003' , 'codeLvl': '2' });  return data;		}}
        );
        $('#attTypCd').jqxDropDownList({ source: attTypCd, displayMember: 'codeName', valueMember: 'comCode2', width: '70%', height: 21, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });

        //공격루트
        var attVia = new $.jqx.dataAdapter(
            { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
            { formatData : function(data) {$.extend(data, { 'comCode1': '3009' , 'codeLvl': '2' });  return data;		}}
        );
        $('#attVia').jqxDropDownList({ source: attVia, displayMember: 'codeName', valueMember: 'comCode2', width: '70%', height: 21, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });

        //공격세부루트
        var attDtlsVia = new $.jqx.dataAdapter(
            { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
            { formatData : function(data) {$.extend(data, { 'comCode1': '3010' , 'codeLvl': '2' });  return data;		}}
        );
        $('#attDtlsVia').jqxDropDownList({ source: attDtlsVia, displayMember: 'codeName', valueMember: 'comCode2', width: '70%', height: 21, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });
        */

        //비고>해킹-공격유형
        var hackAttTypeCd = new $.jqx.dataAdapter(
            { datatype: 'json', url: ctxPath + '/api/common/code/getCommonCode' },
            { formatData : function(data) {$.extend(data, { 'comCode1': '4015' , 'codeLvl': '2' });  return data;		}}
        );
        $('#hackAttTypeCd').jqxDropDownList({ source: hackAttTypeCd, displayMember: 'codeName', valueMember: 'comCode2', width: 140, height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })
            .on('change', function(event) {
                $("#hackAttTypeSelf").val(null);

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

        var inciNo = rowdata.inciNo;
        _inciNo    = rowdata.inciNo; //수정시 조건 키값
        $.ajax({
            type : "post",
            url :$('#ctxPath').val() + '/api/main/acc/accidentApply/getAccidentDetail',
            data : "inciNo=" + inciNo,
            dataType : "json",
            success : function(jsonData) {
                var contents = jsonData.resultData.contents;
                $('#accdTypCd').val(contents.accdTypCd);
                $('#accdTypName').val(contents.accdTypName);
                $('#acpnMthdName').val(contents.acpnMthdName);

                $('#attNatnCd').val(contents.attNatnCd);
                $('#attNatnCdDiv').text(contents.attNatnNm);
                $('#attRemarks').val(contents.attRemarks);
                $('#inciDttNm').val(contents.inciDttNm);
                /*
                $('#attCrgr').val(contents.attCrgr);
                $('#attDept').val(contents.attDept);
                $('#attDtlsVia').val(contents.attDtlsVia);
                $('#attEmail').val(contents.attEmail);
                $('#attInstNm').val(contents.attInstNm);
                $('#attNatnCd').val(contents.attNatnCd);
                $('#attNatnCdDiv').text(contents.attNatnNm);
                $('#attSvrNm').val(contents.attSvrNm);


                $('#attTelNo').val(contents.attTelNo);
                $('#attIp').val(  contents.attIp);
                if(contents.attTelNo != null){
                    var attTelNoAll = contents.attTelNo.split("-")
                    $('#attTelNo_before').val(attTelNoAll[0])
                    $('#attTelNo1').val(attTelNoAll[1])
                    $('#attTelNo2').val(attTelNoAll[2])
                }

                $('#attTypCd').val( contents.attTypCd);
                $('#attVia').val(  contents.attVia);
                */

                $('#remarks').val(contents.remarks);
                $('#remarksCd').val(  contents.remarksCd);
                $('#crgr').val(  contents.crgr);
                $('#dclCrgr').val(  contents.dclCrgr);
                $('#dclCrgrId').val(  contents.dclCrgrId);
                $('#dclDept').val(  contents.dclDept);
                $('#dclEmail').val(  contents.dclEmail);
                //$('#dclHpNo').val(  contents.dclHpNo);
                $('#dclInstName').val(  contents.dclInstName);
                $('#dclInstName').val(  contents.dclInstName);
                //$('#dclMail').val(  contents.dclMail);
                $('#dclTelNo').val(  contents.dclTelNo);

                $('#dmgCpgr').val(  contents.dmgCpgr);
                $('#dmgCrgr').val(  contents.dmgCrgr);
                $('#dmgDept').val(  contents.dmgDept);
                $('#dmgEmail').val(  contents.dmgEmail);
                $('#dmgHpNo').val(  contents.dmgHpNo);
                $('#dmgInstCd').val(  contents.dmgInstCd);
                $('#dmgNatnCdDiv').text(contents.dmgNatnNm);
                $('#dmgInstName').val(  contents.dmgInstName);
                $('#dmgNatnCd').val(  contents.dmgNatnCd);
                //$('#dmgSvrNm').val(  contents.dmgSvrNm);
                $('#dmgSvrUsrNm').val(  contents.dmgSvrUsrNm);
                //$('#dmgIp').val(  contents.dmgIp);

                if(contents.dmgTelNo != null){
                    var dmgTelNoAll = contents.dmgTelNo.split("-")
                    $('#dmgTelNo_before').val(dmgTelNoAll[0])
                    $('#dmgTelNo1').val(dmgTelNoAll[1])
                    $('#dmgTelNo2').val(dmgTelNoAll[2])
                }

                if(contents.dmgHpNo != null){
                    var dmgHpNoAll = contents.dmgHpNo.split("-")
                    $('#dmgHpNo_before').val(dmgHpNoAll[0])
                    $('#dmgHpNo1').val(dmgHpNoAll[1])
                    $('#dmgHpNo2').val(dmgHpNoAll[2])
                }


                $('#dngrGr').val(  contents.dngrGr);
                $('#histoModifiedYn').val(  contents.histoModifiedYn);

                $('#inciAcpnCd').val(  contents.inciAcpnCd);
                $('#inciAcpnDt').val(  contents.inciAcpnDt);

                if(contents.inciDclCont != null){
                    $('#inciDclCont').val(  contents.inciDclCont.htmlCharacterUnescapes());
                }

                $('#inciDt').val(  HmUtil.parseDate(contents.inciDt));
                $('#inciEndCont').val(  contents.inciEndCont);
                $('#inciEndDt').val(  contents.inciEndDt);

                if(contents.inciInvsCont != null){
                    $('#inciInvsCont').val(  contents.inciInvsCont.htmlCharacterUnescapes());
                    inciInvsContBefore = contents.inciInvsCont.htmlCharacterUnescapes();
                }

                if(contents.inciBelowCont != null){
                    $('#inciBelowCont').val(  contents.inciBelowCont.htmlCharacterUnescapes());
                }

                $('#inciNo').val(  contents.inciNo);
                $('#inciNoMulti').val(  contents.inciNoMulti);
                $('#inciPrcsStat').val(  contents.inciPrcsStat);
                $('#inciPrcsStatName').val(  contents.inciPrcsStatName);
                $('#inciPrty').val(  contents.inciPrty);
                $('#inciPrtyName').val(  contents.inciPrtyName);
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
                $('#ncscNo').val(  contents.ncscNo);
                $('#netDiv').val(  contents.netDivName);
                $('#osNm').val(  contents.osNm);
                $('#packetKey').val(  contents.packetKey);
                $('#recoInciCd').val(  contents.recoInciCd);
                //$('#recoInciName').val(  contents.recoInciName);
                $('#riskLevelName').val(  contents.riskLevelName);
                //$('#riskValue').val(  contents.riskValue);
                $('#tmsIp').val(  contents.tmsIp);
                $('#transInciPrcsStat ').val(  contents.transInciPrcsStat);
                $('#trtMthdCd').val(  contents.trtMthdCd);

                //HmUtil.attachAccFileList(jsonData.resultData.attachFile, false);
                HmUtil.attachAccFileList(jsonData.resultData.attachFile, true, "fileUpload");

                currentInciStat = contents.inciPrcsStat;
                currentTransInciStat = contents.transInciPrcsStat;
                currentInciTrnsRcptInstCd = contents.inciTrnsRcptInstCd;

                //개발원 접수 상태 일 때 피해기관 수정 가능
                if($("#sAuthMain").val() == 'AUTH_MAIN_2'){
                    if(currentInciStat == 1){
                        $("#dmgInstName").hide(); //피해기관 표시값 감추고 트리 활성화
                        var instParams = {
                            instCd : contents.dmgInstCd,
                            instNm : contents.dmgInstName
                        }
                        HmDropDownBtn.createDeptTreeGrid($('#dmgInstCdArea'), $('#dmgInstCd'), 'dmg', '98%', 22, '98%', 350, null, instParams)
                    }

                    //개발원 자체 접수이면서 이관이후 부터는 제목/탐지명/사고유형 변경 불가
                    if(currentTransInciStat != null && currentInciStat >= 11){
                        $("#inciTtl").css("border","none");
                        $("#inciTtl").attr("readonly","readonly");

                        $("#inciDttNm").css("border","none");
                        $("#inciDttNm").attr("readonly","readonly");

                        $("#accdTypCd").jqxDropDownList({ disabled: true });

                    }

                }
                //시도 자체 접수 상태 일 때 피해기관 수정 가능
                if($("#sAuthMain").val() == 'AUTH_MAIN_3'){
                    if(currentInciStat == 0 && currentTransInciStat == 1 ){ //시도 직접 접수일 경우 피해기관 수정
                        $("#dmgInstName").hide(); //피해기관 표시값 감추고 트리 활성화
                        HmDropDownBtn.createDeptTreeGrid($('#dmgInstCdArea'), $('#dmgInstCd'), 'dmg', '98%', 22, '98%', 350, null,{InstLevel:$('#sInstLevel').val(), instCd: $('#sInstCd').val(), instNm:$('#sInstName').val()});
                    }
                    //개발원에서 내려온 사고의 경우 제목/탐지명/사고유형 수정불가
                    if(currentInciTrnsRcptInstCd != 0){
                        $("#inciTtl").css("border","none");
                        $("#inciTtl").attr("readonly","readonly");

                        $("#inciDttNm").css("border","none");
                        $("#inciDttNm").attr("readonly","readonly");

                        $("#accdTypCd").jqxDropDownList({ disabled: true });

                    }else{ //시에서 자체 접수 일경우(이관 이후부터는 수정 불가)
                        if(currentTransInciStat >= 11){
                            $("#inciTtl").css("border","none");
                            $("#inciTtl").attr("readonly","readonly");

                            $("#inciDttNm").css("border","none");
                            $("#inciDttNm").attr("readonly","readonly");

                            $("#accdTypCd").jqxDropDownList({ disabled: true });
                        }
                    }
                    
                   
                }
                //시군구는 자체접수가 없으므로 제목/탐지/사고유형 수정불가
                if($("#sAuthMain").val() == 'AUTH_MAIN_4'){
                    $("#inciTtl").css("border","none");
                    $("#inciTtl").attr("readonly","readonly");

                    $("#inciDttNm").css("border","none");
                    $("#inciDttNm").attr("readonly","readonly");

                    $("#accdTypCd").jqxDropDownList({ disabled: true });
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

                    if(contents.remarksCd != 0){  //비고가 있을 경우 세부 정보 세팅
                        if(contents.remarksCd == 1){ //해킹
                            $.ajax({
                                type : "post",
                                url :$('#ctxPath').val() + '/api/main/acc/accidentApply/getTbzHacking',
                                data : "inciNo=" + inciNo,
                                dataType : "json",
                                success : function(jsonData) {
                                    var contents = jsonData.resultData.contents;
                                    if(contents != null){
                                        $("#hackAttTypeCd").val(contents.hackAttTypeCd);
                                        if(contents.hackAttTypeCd == '000'){
                                            $("#hackAttTypeSelf").show();
                                            $("#hackAttTypeSelf").val(contents.hackTypeNmSelf);
                                        }else{
                                            $("#hackAttTypeSelf").hide();
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
                                        if(contents != null){
                                            $("#attackTypeName").val(contents.attackTypeName)
                                            $("#homepvCont").val(contents.homepvCont)
                                            //2022.05.25 비고 취약점 탐지 선택시 콤보 박스 유지 추가
                                            //xml.dto 에 code 값 추가 이슈로 인해 js에서 한글값 확인해서 code값 넣음..
                                            if(contents.attackTypeName == '개인정보노출' ){
                                                $("#attackTypeCd").val('001');
                                            }else if(contents.attackTypeName == '홈페이지 위변'){
                                                $("#attackTypeCd").val('002');
                                            }else if(contents.attackTypeName == '정보노출'){
                                                $("#attackTypeCd").val('003');
                                            }else if(contents.attackTypeName == '관리자페이지 노출'){
                                                $("#attackTypeCd").val('004');
                                            }else if(contents.attackTypeName == '기타'){
                                                $("#attackTypeCd").val('005');
                                            }else{
                                                $("#attackTypeCd").val('001');
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }

                    //피해 아이피 목록
                    $.ajax({
                        type : "post",
                        url :$('#ctxPath').val() + '/api/main/acc/accidentApply/getDmgIpList',
                        data : "inciNo=" + inciNo,
                        dataType : "json",
                        success : function(jsonData) {
                            $.each(jsonData.resultData, function (index, data) {
                                appendHtml($("#ipTr"),'', '', index);

                                $(".ipClass_"+index).val(data.dmgIp)
                            });

                        }
                    });

                    //공격 아이피 목록
                    $.ajax({
                        type : "post",
                        url :$('#ctxPath').val() + '/api/main/acc/accidentApply/getAttIpList',
                        data : "inciNo=" + inciNo,
                        dataType : "json",
                        success : function(jsonData) {
                            $.each(jsonData.resultData, function (index, data) {
                                appendHtml2($("#attIpTr"),'', '', index)
                                $(".attIpClass_"+index).val(data.attIp)
                            });

                        }
                    });

                }
            }
        });



	}

	$('#fileUpload').on('select', function (event) {
        var fileName = event.args.file;
        _file = fileName
    });

	$('#fileUpload').on('remove', function (event) { _file=null; });

    $('#fileUpload').on('select', function(event) {
        var totallength = event.args.owner._fileRows.length + $('#attachFileList > li').length;
        var fileLength = event.args.owner._fileRows.length;

        if ($('.jqx-file-upload-file-input')[fileLength - 1].files[0].size > $('#uploadFileLength').val()) {
            alert($('#uploadFileLength').val() + "Byte로 용량이 제한되어있습니다.");
            $('#fileUpload').jqxFileUpload('cancelFile', fileLength - 1);
            return;
        }

        if (totallength > 2) {
            $('#fileUpload').jqxFileUpload('cancelFile', fileLength - 1);
            alert('첨부파일 최대 개수는 2개 입니다.');
        }
    });

	$('#p_btnEdit').click(function() {
        //피해 아이피 다중 등록
	    var dmgIpList = [];
        $('.ipInput').each(function(i) {
            if(this.value != ''){
                dmgIpList.push(this.value)
            }
        });

        var attIpList = [];
        $('.attIpInput').each(function(i) {
            if(this.value != ''){
                attIpList.push(this.value)
            }
        });
	    //if (!validateForm()) return;
        /*var inciDt = $.format.date($('#inciDt').jqxDateTimeInput('getDate'), 'yyyyMMdd');
        var inciDt_HH = $("#inciDt_HH").val();
        var inciDt_MM = $("#inciDt_MM").val();

        if(inciDt_HH < 10){
            inciDt_HH = '0'+ $("#inciDt_HH").val();
        }
        if(inciDt_MM < 10){
            inciDt_MM = '0'+ $("#inciDt_MM").val();
        }*/
        var params={
                inciNo: _inciNo,
                inciDttNm : $("#inciDttNm").val(), //탐지명

                //기본정보
                //inciDt: inciDt + inciDt_HH + inciDt_MM + '00', //사고일시
                inciTtl: $("#inciTtl").val(),   //사고제목
                //inciPrty: $("#inciPrty").val(),          //우선순위
                //netDiv: 1,             //망구분 컬럼 모름
                //acpnMthd: $("#acpnMthd").val(),
                //riskLevel: $("#riskLevel").val(),
                //inciPrcsStat : '1',                     //처리상태 기본 (1: 접수)

                //신고기관정보
                //dclInstCd: $("#dclInstCd").val(),
                //recoInciCd: $("#recoInciCd").val(),
                //dclCrgr: $("#dclCrgr").val(),
                //dclMail: $("#dclMail").val(),
                //dclTelNo: $("#dclTelNo_before").val() + "-" + $("#dclTelNo1").val() + "-" + $("#dclTelNo2").val() ,
                //dclHpNo: $("#dclHpNo_before").val() + "-" + $("#dclHpNo1").val() + "-" + $("#dclHpNo2").val(),

                remarks: $('#remarksCd').val(), //비고

                //사고피해 시스템정보
                //dmgSvrNm: $("#dmgSvrNm").val(),
                //아이피 컬럼 모름 ?? : ??
                dmgInstCd: $("#dmgInstCd").val(),
                dmgCrgr: $("#dmgCrgr").val(),
                dmgDept: $("#dmgDept").val(),
                dmgNatnCd: $("#dmgNatnCd").val(), //피해국가
                accdTypCd: $("#accdTypCd").val(),
                dmgSvrUsrNm: $("#dmgSvrUsrNm").val(),
                osNm: $("#osNm").val(),
                dmgTelNo: $("#dmgTelNo_before").val() + "-" + $("#dmgTelNo1").val() + "-" + $("#dmgTelNo2").val() ,
                dmgHpNo: $("#dmgHpNo_before").val() + "-" + $("#dmgHpNo1").val() + "-" + $("#dmgHpNo2").val(),
                dmgEmail: $("#dmgEmail").val(),
                dmgIp:    $("#dmgIp").val(),

                //공격시스템 정보
                attSvrNm: $("#attSvrNm").val(),
                //ip컬럼 모름 :: ??
                attInstNm: $("#attInstNm").val(),
                attCrgr: $("#attCrgr").val(),
                attDept: $("#attDept").val(),
                attNatnCd: $("#attNatnCd").val(), //공격국가
                attTypCd: $("#attTypCd").val(),
                attVia: $("#attVia").val(),
                attDtlsVia: $("#attDtlsVia").val(),
                attTelNo: $("#attTelNo_before").val() + "-" + $("#attTelNo1").val() + "-" + $("#attTelNo2").val() ,
                attEmail: $("#attEmail").val(),
                attIp:    $("#attIp").val(),

                //사고 조사 내용, 시도의견
                inciDclCont: $("#inciDclCont").val(),
                inciEndCont: $("#inciEndCont").val(),
                inciInvsCont: $("#inciInvsCont").val(),
                inciBelowCont: $("#inciBelowCont").val(),
                attRemarks : $('#attRemarks').val(),

                dmgIpList : dmgIpList,
                attIpList : attIpList

		};

        if($("#remarksCd").val() == 1){ //비고:: 해킹
            params.inciTarget = $("#inciTarget").val();
            params.hackAttTypeCd = $("#hackAttTypeCd").val();
            params.hackAttTypeSelf = $("#hackAttTypeSelf").val();
            params.userId = $("#sUserId").val();
            params.hackNetDiv  = $("#hackNetDiv").val();
            params.hackDomainNm = $("#hackDomainNm").val();
            params.hackCont = $("#hackCont").val();


        }else if($("#remarksCd").val() == 2){ //비고:: 취약점
            params.userId = $("#sUserId").val();
            params.attackTypeCd = $("#attackTypeCd").val();
            params.homepvCont = $("#homepvCont").val();
        }
        
        //수정시 히스토리 등록
        params.grpNo = 0;
        params.grpRank = 0;
        params.depth = 0;
        params.hstyCont ='';
        params.ttl = "사고상태가 수정 되었습니다."
        params.crtrId = $('#sUserId').val();
        params.instCd = $('#sInstCd').val();

        //사고유형 웹취약점 일경우 개발원 권한이면 dmg_Hp_No 컬럼에 추가
        //20211012 서브컬럼에 무조건 사고유형값이 한글로 입력되도록 변경
        //if($("#sAuthMain").val() == 'AUTH_MAIN_2') {
        params.accdTypCdSub = $("#accdTypCdSub").text();
        //}

		Server.post('/api/main/acc/accidentApply/editAccidentApply', {
			data : params,
			success : function(result) {

			    //첨부파일
                $('#fileUpload').jqxFileUpload({
                    uploadUrl : ctxPath + '/api/file/accUpload?inciNo=' + result.inciNo
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
				alert("사고신고가 수정 되었습니다.");
				$('#pwindow').jqxWindow('close');
                Main.search();
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

    /*$('.pop_grid').on('click', '.dmgMinus', function() {
        var dmgIpInputCnt = $(".ipInput ").length;
        if(dmgIpInputCnt == 1){
            $("#dmgNatnCd").val(null)
            $("#dmgNatnCdDiv").text(null)
        }
        $(this).parent().remove();
    });

    $('.pop_grid').on('click', '.attMinus', function() {
        $(this).parent().remove();
    });*/

    $('#ipAdd').click(function() {
        //var value = $(this).parent().find($('input')).attr('name');
        var ipTextValue = $("#dmgIp").val();

        if(ipTextValue == ''){
            alert("IP를 입력해주세요");
            return false;
        }
        if (!$.validateIp(ipTextValue)) {
            alert("IP형식이 유효하지 않습니다.");
            $("#dmgIp").val(null);
            return false;
        }

        var htmlType = 'plus'
        appendHtml($(this).parent().parent(), ipTextValue, '', '', htmlType);
        $("#dmgIp").val(null);

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

        var htmlType = 'plus'
        appendHtml2($(this).parent().parent(), ipTextValue, '', '', htmlType);
        $("#attIp").val(null);

    });
    function appendHtml($target, value, label, index, htmlType) {
        value = typeof value !== 'undefined' ? value : "";
        label = typeof label !== 'undefined' ? label : "";

        var keywordHtml = '';

        if(htmlType == 'plus'){ //plus의 경우 직접 입력하여 추가한 경우 , else 의 경우-> 기존 입력값(DB값)가져 와서 자동 세팅 할 경우
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
                    }

                    if (label != '') {
                        keywordHtml += '<tr class="pop_grid ' + value + '"><td class="pop_gridSub" style="width:120px;"></td><td>';
                    }

                    keywordHtml += '<div style="float: left"><input type="text" class="pop_inputWrite ipInput ipClass" value="'+value+'" style="width:125px;float:left;"/>';
                    if (label != '') {
                        keywordHtml += '<button type="button" class="p_btnPlus3 checkIp" style="margin-left: 0px;"></button>';
                        keywordHtml += '</td></tr>';
                    } else {
                        keywordHtml += '<span id="dmgIpName" style="float: left">'+resultText+'</span>';
                        keywordHtml += '</div>';
                    }
                    $target.append(keywordHtml);

                }
            });
        }else{
            if (label != '') {
                keywordHtml += '<tr class="pop_grid ' + value + '"><td class="pop_gridSub" style="width:120px;"></td><td>';
            }

            keywordHtml += '<div style="float: left"><input type="text" class="pop_inputWrite ipInput ipClass_'+index+'" readonly="readonly" style="width:125px;float:left; border: none" />';
            if (label != '') {
                keywordHtml += '<button type="button" class="p_btnPlus3" style="margin-left: 0px;"></button>';
                keywordHtml += '</td></tr>';
            } else {
                keywordHtml += '<span id="dmgIpName'+index+'" style="float: left;"></span>';
                keywordHtml += '</div>';
            }
            $target.append(keywordHtml);
        }

    }
    function appendHtml2($target, value, label, index, htmlType) {
        value = typeof value !== 'undefined' ? value : "";
        label = typeof label !== 'undefined' ? label : "";

        var keywordHtml = '';

        if(htmlType == 'plus'){
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
                    }

                    if(resultText.length > 9){
                        resultText = resultText.substring(0,7) + '...';
                    }

                    if (label != '') {
                        keywordHtml += '<tr class="pop_grid ' + value + '"><td class="pop_gridSub" style="width:120px;"></td><td>';
                    }

                    keywordHtml += '<div style="float: left"><input type="text" class="pop_inputWrite attIpInput" value="'+value+'" style="width:150px;float:left;"/>';
                    if (label != '') {
                        keywordHtml += '<button type="button" class="p_btnPlus3 checkIp" style="margin-left: 0px;"></button>';
                        keywordHtml += '</td></tr>';
                    } else {
                        keywordHtml += '<span id="ipName" style="float: left">'+resultText+'</span>';
                        keywordHtml += '</div>';
                    }
                    $target.append(keywordHtml);

                }
            });
        }else{
            if (label != '') {
                keywordHtml += '<tr class="pop_grid ' + value + '"><td class="pop_gridSub" style="width:120px;"></td><td>';
            }

            keywordHtml += '<div style="float: left"><input type="text" class="pop_inputWrite attIpInput attIpClass_'+index+'" readonly="readonly" style="width:150px;float:left; border: none" />';
            if (label != '') {
                keywordHtml += '<button type="button" class="p_btnPlus3" style="margin-left: 0px;"></button>';
                keywordHtml += '</td></tr>';
            } else {
                keywordHtml += '</div>';
            }
            $target.append(keywordHtml);
        }
    }

	function validateForm(){
    	/*var str = $('#p_sagoGrpNam').val();
 		var byteLen = str.byteLen();
    	if(byteLen == 0) {
    		alert("기관명을 선택해주세요.");
    		$("#p_ddbGrp").attr("tabindex", -1).focus();
    		return false;
    	}


 		byteLen = str.byteLen();
    	if(byteLen == 0) {
    		alert("IP주소를 입력해주세요.");
    		$("#p_sagoIp").focus();
    		return false;
    	}
    	if(!NetisJS.checkIP(str)) {
    		alert("IP형식이 유효하지 않습니다.");
    		$("#p_sagoIp").focus();
    		return false;
    	}
    	str = $('#p_sagoProtocol').val();
 		byteLen = str.byteLen();
    	if(byteLen > 10) {
    		alert("프로토콜 자릿수가 초과 되었습니다. (Max : 10 까지)");
    		$("#p_sagoProtocol").focus();
    		return false;
    	}
    	str = $('#p_gongkNam').val();
 		byteLen = str.byteLen();
    	if(byteLen > 60) {
    		alert("프로토콜 자릿수가 초과 되었습니다. (Max : 60 까지)");
    		$("#p_gongkNam").focus();
    		return false;
    	}
    	str = $('#p_sagoMemo').val();
 		byteLen = str.byteLen();
    	if(byteLen > 300000000) {
    		alert("사고내용 자릿수가 초과 되었습니다. (Max : 300MB 까지)");
    		$("#p_sagoMemo").focus();
    		return false;
    	}
    	str = $('#p_jochiMemo').val();
 		byteLen = str.byteLen();
    	if(byteLen > 1000) {
    		alert("대응방법 자릿수가 초과 되었습니다. (Max : 1000 까지)");
    		$("#p_jochiMemo").focus();
    		return false;
    	}
    	return true;*/
    };