var checkedItems  = "";
var inciMultiYM = 'N';
function pCommonWindow_init(params) {
    if(_sAuthMain=='AUTH_MAIN_3'){
        //사고가 멀티이관을 한 사고인지 확인
        $.ajax({
            type : "post",
            url :$('#ctxPath').val() + '/api/main/acc/accidentApply/getInciMutiEndYn',
            data : "inciNo=" + _inciNo,
            dataType : "json",
            success : function(jsonData) {
                console.log(jsonData.resultData)
                if(jsonData.resultData != null){ //null 이면 멀티 이관 사고가 없다
                    inciMultiYM = 'Y';
                }
            }
        });
    }

    $(".proessDiv").hide();
    switch (popupType) {
        case 'memo':
            $("#memoDiv").show();
            $("#title").text("메모");
            break;
        case 'sidoCont':
            $("#sidoContDiv").show();
            $("#title").text("시도의견");

            $("#sidoCont").val($("#inciBelowCont").val()); //이미 등록된 시도의견이 있을 경우 팝업에 노출

            break;
        case 'assign':
            $("#assignDiv").show();
            $("#title").text("사고처리할당");

            var instCdScope = $("#sInstCd").val(); //할당시 본인 소속의 사용자들 노출
            var sourceMember = new Array();
            $.ajax({
                type: 'GET',
                url: ctxPath + '/api/main/env/userConf/getUserAddrList',
                data: {instCd: instCdScope, authMain: _sAuthMain},
                async: false,
                success: function (data) {
                    $.each(data.resultData, function (index, data) {
                        sourceMember.push({label: data.userName+'(' + data.userId + ')', value: data.userId})
                    });
                }
            });
            $('#assignMember').jqxDropDownList({
                source: sourceMember, displayMember: 'label', valueMember: 'value', width: 220, height: 21, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: false });
            break;

        case 'moveReq':
            $("#moveReqDiv").show();
            $("#title").text("이관요청");


            $("#areaCode").val(params.dmgInstCd);
            $("#areaName").val(params.dmgInstName);

            if(_dmgInstDepth == 2){
                if(_sAuthMain=='AUTH_MAIN_2'){
                    Server.get('/api/main/acc/accidentApply/getPntInst', {
                        data: {dmgInstCd: params.dmgInstCd},
                        success: function (result) {
                            $("#areaCode").val(result[0].INST_CD);
                            $("#areaName").val(result[0].INST_NM);
                        }
                    });
                }
            }else{
                if(params.applyMultiYn == 'Y' || params.transMultiYn == 'Y'){
                    $("#areaCode").show();
                    $("#areaName").hide();

                    var source = {
                        datatype: "json",
                        datafields: [
                            { name: 'INST_CD' },
                            { name: 'INST_NM' }
                        ],
                        id: 'LOCAL_CD',
                        data: {dmgInstCd: params.dmgInstCd},
                        url: '/api/main/acc/accidentApply/getLocalList',
                        async: false
                    };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $('#areaCode').jqxComboBox({ checkboxes: true, source: dataAdapter, theme: jqxTheme, displayMember: "INST_NM", valueMember: "INST_CD", width: 300, height: 21, placeHolder: '지역을 선택해 주세요'
                    }).on('checkChange', function (event) {

                    });
                }
            }
            break;

        case 'disuse':
            $("#disuseDiv").show();
            $("#title").text("사고처리 폐기승인요청");

            break;
        case 'conclusion':
            $("#conclusionDiv").show();
            $("#title").text("사고처리 종결승인요청");

            /*$('#assignMember').jqxDropDownList({
                source: [{ label: 'admin', value: 'admin' },
                    { label: 'admin2', value: 'admin2' }
                ],
                displayMember: 'label', valueMember: 'value', width: '30%', height: 21, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });*/

            var conclusionCd = new Array();
            $.ajax({
                type: 'GET',
                url: ctxPath + '/api/common/code/getCommonCode',
                data: {comCode1: '3005' , codeLvl: '2'},
                async: false,
                success: function (data) {
                    $.each(data.resultData, function (index, data) {
                        conclusionCd.push({label: data.codeName, value: data.comCode2})
                    });
                }
            });
            $('#conclusionType').jqxDropDownList({source: conclusionCd, width: 140, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })
            break;

        case 'reject':
            $("#rejectDiv").show();
            $("#title").text("반려");
            break;
        case 'reject_high':
            $("#rejectDiv").show();
            $("#title").text("반려(상위기관)");
            break;
        case 'miss':
            $("#missDiv").show();
            $("#title").text("오탐승인요청");
            break;
        case 'caution':
            $("#cautionDiv").show();
            $("#title").text("주의관제승인요청");
            break;


    }
}

$('#pbtn_close').click(function() {
    $('#pCommonWindow').jqxWindow('close');
});

$('#pbtn_save').click(function() {

    var moveType = 'single';

    var params= {
        inciNo: _inciNo,
        grpNo : 0,
        grpRank : 0,
        depth : 0,
        instCd:$('#sInstCd').val(),
        inciNoMulti : _inciNoMulti
    }

    if(popupType == 'assign'){
        if(siGunYn == 'Y'){
            params.transInciPrcsStat = 2
        }else if(siGunYn == 'sido'){
            params.transSidoPrcsStat = 2
        }
        else{
            params.inciPrcsStat = 2;
        }

        params.hstyCont = $("#assignCont").val();
        params.crtrId = $('#assignMember').val(); //담당자 선택일 경우 콤보값
        params.ttl = "사고상태가 할당되었습니다";
        params.msg = "사고를 할당하시겠습니까?";

    }else if(popupType == 'moveReq'){

        if(siGunYn == 'Y'){
            params.transInciPrcsStat = 7
        }else{
            params.inciPrcsStat = 7;
        }
        var items = $("#areaCode").jqxComboBox('getCheckedItems');

        var areaCodes = [];


        if(items === undefined){ //단순 이관일 경우 (체크박스 없는 경우)

;            if(_dmgInstDepth == 2){ //단순 이관이면서 시군구로 바로 이관을 할경우
                if(_sAuthMain=='AUTH_MAIN_2'){
                    params.inciTrnsRcptInstCd = $("#areaCode").val();
                }else{
                    params.inciTrnsRcptSidoInstCd = _dmgInstCd
                }
            }else{
                params.inciTrnsRcptInstCd = _dmgInstCd
            }
            checkedItems = $("#areaName").val(); //히스토리에 넣을 지역명
        }else{                   //다중 이관일 경우 (시 -> 시도로  접수 했을 경우 ,체크박스)

            if(items==""||items==null){//20190611추가.. 이관기관 없으면 리턴
                alert("입력된 이관기관이 없습니다.");
                return;
            }

            if(items.length == 1){ //이관 기관이 단일 선택의 경우
                params.inciTrnsRcptSidoInstCd = items[0].originalItem.INST_CD;
                checkedItems = items[0].originalItem.INST_NM;
                /*if(siGunYn == 'Y'){ //이관형태가 시 인지 시군구 인지 에 따른 컬럼 분기
                    params.inciTrnsRcptSidoInstCd = items[0].originalItem.INST_CD;
                    checkedItems = items[0].originalItem.INST_NM;
                }else{
                    params.inciTrnsRcptInstCd = items[0].originalItem.INST_CD;
                    checkedItems = items[0].originalItem.INST_NM;
                }*/
            }else{                 //이관 기관이 복수일 경우 arry 형태

                checkedItems="";

                $.each(items, function (index) {
                    checkedItems += this.label;
                    if(index < items.length - 1) {
                        checkedItems +=	",";
                    }
                    areaCodes.push(this.originalItem.INST_CD)
                });
                if(items.length > 5){
                    checkedItems = items[0].label+"외 ";
                    checkedItems += items.length - 1
                }
                params.inciTrnsRcptInstCd = areaCodes;
                params.baseInciTrnsRcptInstCd = _dmgInstCd;
                /*if(siGunYn == 'Y'){ //이관형태가 시 인지 시군구 인지 에 따른 컬럼 분기
                    //params.inciTrnsRcptSidoInstCd = areaCodes;
                    params.inciTrnsRcptInstCd = areaCodes;
                    params.baseInciTrnsRcptInstCd = _dmgInstCd;
                }else{
                    params.inciTrnsRcptInstCd = areaCodes
                    //다중 insert 이후 원 사고 update 시 사고이관접수기관(InciTrnsRcptInstCd) 컬럼에 기존의 피해기관(dmgInstCd) 코드값을 넣는다
                    params.baseInciTrnsRcptInstCd = _dmgInstCd;
                }*/
                if(_sAuthMain == 'AUTH_MAIN_2'){
                    //params.inciPrcsStat = 7;
                    params.transInciPrcsStat = 7;
                }else if(_sAuthMain == 'AUTH_MAIN_3'){
                    params.transInciPrcsStat = 7;
                }
                moveType = 'multi'
            }

        }
        params.hstyCont = $("#moveReqCont").val();
        params.ttl = "사고상태가 ("+checkedItems+")로 이관요청되었습니다"
        params.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값

        params.msg = "사고를 ("+checkedItems+")로 이관 요청하시겠습니까?";

        // doPush();

    }else if(popupType == 'disuse'){
        if(siGunYn == 'Y'){
            params.transInciPrcsStat = 8 //시 폐기 승인요청
        }else if(siGunYn == 'sido'){
            params.transSidoPrcsStat = 8 //시도 폐기 승인요청
        }
        else{
            params.inciPrcsStat = 8; //개발원 폐기 승인요청
        }

        params.trtMthdCd = 9999; //코드의 폐기 코드 (3005);
        params.inciEndCont = $("#disuseCont").val(); //inci_end_cont  //폐기 사유 -> 접수테이블에 들어가는 값

        //히스토리 파라메터
        params.hstyCont = $("#disuseCont").val();
        params.ttl = "사고상태가 폐기 승인요청되었습니다"
        params.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값

        params.msg = "사고를 폐기 승인요청 하시겠습니까?";

    }else if(popupType == 'conclusion'){
        if(siGunYn == 'Y'){
            params.transInciPrcsStat = 9 //시 종결 승인요청
        }else if(siGunYn == 'sido'){
            params.transSidoPrcsStat = 9 //시도 종결 승인요청
        }
        else{
            params.inciPrcsStat = 9; //개발원 종결 승인요청
        }

        if($("#conclusionType").val().length == 2){
            params.trtMthdCd = '00'+$("#conclusionType").val(); //처리방법 선택값 (2자리 일경우 00 추가)
        }else{
            params.trtMthdCd = $("#conclusionType").val(); //처리방법 선택값
        }
        params.inciEndCont = $("#conclusioCont").val(); //inci_end_cont  //폐기 사유 -> 접수테이블에 들어가는 값

        //히스토리 파라메터
        params.hstyCont = $("#conclusioCont").val();
        params.ttl = "사고상태가 종결 승인요청되었습니다"
        params.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값

        params.msg = "사고를 종결 승인요청 하시겠습니까?";

    }else if(popupType == 'reject'){

        if(_sAuthMain == 'AUTH_MAIN_2'){
            if(currentInciStat == 9 && currentTransInciStat == 13 ){ //개발원이며, 시= 종결처리를 하고, 개발원= 종결 승인까지 한 상태에서 반려를 하면 개발원 상태는 이전단계인 이관 단계로
                params.inciPrcsStat = 11;
            }else if(currentInciStat == 8 && currentTransInciStat == 12){ //시에서 폐기종결 처리 하고 개발원에서 폐기 요청 이후 반려를 할경우 이관상태로
                params.inciPrcsStat = 11;
            }else if(currentInciStat == 14 && currentTransInciStat == 15) { //시에서 오탐종결 처리 하고 개발원에서 오탐 요청 이후 반려를 할경우 이관상태로
                params.inciPrcsStat = 11;
            }else if(currentInciStat == 16 && currentTransInciStat == 17) { //시에서 주의관제종결 처리 하고 개발원에서 주의관제 요청 이후 반려를 할경우 이관상태로
                params.inciPrcsStat = 11;
            }
            else{ //그 이외의 반려는 전부 접수 단계
                params.inciPrcsStat = 1;
                params.inciTrnsRcptInstCd = ''; //이관 요청을 보낸 상태에서 반려를 할 경우 시도의 이관기관 instCd를 삭제
            }
        }else if(_sAuthMain == 'AUTH_MAIN_3'){
            if(currentTransInciStat == 9 && currentTransSidoStat == 13 ){ //시 담당자이며, 시군구=종결처리, 시에서 종결 승인까지 한 상태에서 반려를 할 경우 시의 상태는 이전 단계인 이관
                params.transInciPrcsStat = 11;
            }else if(currentTransInciStat == 8 && currentTransSidoStat == 12){ //시군구 에서 폐기종결 처리 하고 시에서 폐기 요청 이후 반려를 할경우 이관상태로
                params.transInciPrcsStat = 11;
            }else if(currentTransInciStat == 14 && currentTransSidoStat == 15) { //시군구에서 오탐종결 처리 하고 시에서 오탐 요청 이후 반려를 할경우 이관상태로
                params.transInciPrcsStat = 11;
            }else if(currentTransInciStat == 16 && currentTransSidoStat == 17) { //시군구에서 주의관제종결 처리 하고 시에서 주의관제 요청 이후 반려를 할경우 이관상태로
                params.transInciPrcsStat = 11;
            }
            else{
                //그 이외의 반려는 전부 접수 단계로 (단 멀티 이관를 한 원사고의 반려는 접수가 아닌 '이관' 상태로
                //20190306 멀티이관 요청건에 대한 반려는 이관 상태가 아닌 접수상태로 정정
                if(inciMultiYM == 'Y'){
                    params.multiRejectYn = 'Y'; //service에서 해당값을 기준으로 반려 일 경우 다중 멀티 요청건을 삭제한다.
                    params.transInciPrcsStat = 1;
                }else{
                    params.transInciPrcsStat = 1;
                    params.inciTrnsRcptSidoInstCd = ''; //이관요청을 보낸 상태에서 반려를 할 경우 시군구의 이관기관 instCd를 삭제
                }
            }
        }else if(_sAuthMain == 'AUTH_MAIN_4'){ //시군구에서 반려 처리 하면 전부 접수 단계
            params.transSidoPrcsStat = 1;
        }

        /*if(siGunYn == 'Y'){
            params.transInciPrcsStat = 5 //시 반려
        }else if(siGunYn == 'sido'){
            params.transSidoPrcsStat = 5 //시도 반려
        }
        else{
            params.inciPrcsStat = 5; //개발원 반려
        }*/

        //히스토리 파라메터
        params.hstyCont = $("#rejectCont").val();
        params.ttl = "사고상태가 반려되었습니다."
        params.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값

        params.msg = "사고를 반려 하시겠습니까?";

    }
    else if(popupType == 'reject_high'){

        if(_sAuthMain == 'AUTH_MAIN_2'){ //개발원에서 시도의 처리를 반려 할 경우 시도의 상태는 초기 이관 상태로
            if(currentTransSidoStat == 0 || currentTransSidoStat == null ){ //사고가 개발원->시도 까지만 내려간 건 : 개발원 반려 시 시도 상태는 접수
                params.transInciPrcsStat = 1;
            }else{
                params.transInciPrcsStat = 11; //사고가 개발원->시도->시군가 까지 내려간 경우 : 개발원 반려시 시도 상태는 이관
            }

            params.ttl = "사고상태가 지원센터에서 반려되었습니다."
        }else if(_sAuthMain == 'AUTH_MAIN_3'){ //시도에서 시군구 처리를 반려 할 경우 시군구는 전부 접수 상태로
            params.transSidoPrcsStat = 1;
            params.ttl = "사고상태가 시도에서 반려되었습니다."
        }
        //히스토리 파라메터
        params.hstyCont = $("#rejectCont").val();
        params.crtrId = $('#sUserId').val();

        params.msg = "사고를 반려 하시겠습니까?";

    }

    else if(popupType == 'miss'){
        if(siGunYn == 'Y'){
            params.transInciPrcsStat =  14//시 오탐승인요청
        }else if(siGunYn == 'sido'){
            params.transSidoPrcsStat = 14 //시도 오탐승인요청
        }
        else{
            params.inciPrcsStat = 14; //개발원 오탐승인요청
        }

        if($("#conclusionType").val().length == 2){
            params.trtMthdCd = '00'+$("#conclusionType").val(); //처리방법 선택값 (2자리 일경우 00 추가)
        }else{
            params.trtMthdCd = $("#conclusionType").val(); //처리방법 선택값
        }
        params.inciEndCont = $("#missCont").val(); //inci_end_cont  //폐기 사유 -> 접수테이블에 들어가는 값

        //히스토리 파라메터
        params.hstyCont = $("#missCont").val();
        params.ttl = "사고상태가 오탐 승인요청되었습니다"
        params.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값

        params.msg = "사고를 오탐 승인요청 하시겠습니까?";

    }else if(popupType == 'caution'){
        if(siGunYn == 'Y'){
            params.transInciPrcsStat = 16 //시 주의관제승인요쳥
        }else if(siGunYn == 'sido'){
            params.transSidoPrcsStat = 16 //시도 주의관제 승인요청
        }
        else{
            params.inciPrcsStat = 16; //개발원 주의관제 승인요청
        }

        if($("#conclusionType").val().length == 2){
            params.trtMthdCd = '00'+$("#conclusionType").val(); //처리방법 선택값 (2자리 일경우 00 추가)
        }else{
            params.trtMthdCd = $("#conclusionType").val(); //처리방법 선택값
        }
        params.inciEndCont = $("#cautionCont").val(); //inci_end_cont  //폐기 사유 -> 접수테이블에 들어가는 값

        //히스토리 파라메터
        params.hstyCont = $("#cautionCont").val();
        params.ttl = "사고상태가 주의관제 승인요청되었습니다"
        params.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값

        params.msg = "사고를 주의관제 승인요청 하시겠습니까?";

    }else if(popupType == 'sidoCont'){ //시도의견 등록
        params.inciBelowCont = $("#sidoCont").val(); //접수테이블 시도의견 update

        //히스토리
        params.hstyCont = $("#sidoCont").val();
        params.ttl = "시도 의견이 등록되었습니다."
        params.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값

        params.msg = "시도 의견을 등록 하시겠습니까?";
    }
    else{
        //메모
        params.ttl = $("#memoTtl").val();
        params.hstyCont = $("#memoCont").val();
        params.crtrId = $('#sUserId').val(); //담당자? 없을 경우 세션값
    }
    if(moveType == 'single'){ // 이관 기관이 한개 일경우는 모든(공통) 로직이 단순 업데이트

        // console.log('single params',params);

        if(!confirm(params.msg)) return;

        Server.post('/api/main/acc/accidentApply/updateAccidentProcess', {
            data : params,
            success : function() {
                HmGrid.updateBoundData($accidentGrid);
                //HmGrid.updateBoundData($("#historyGrid"), ctxPath + '/api/main/acc/accidentApply/getAccidentHistoryList');
                alert("처리 되었습니다.");

                if(popupType == 'moveReq')
                    doPush();

                if(popupType == 'sidoCont'){ //시도의견 일때는 등록팝업만 닫고 상세 팝업은 유지
                    $('#pCommonWindow').jqxWindow('close');
                    $("#inciBelowCont").val($("#sidoCont").val()); //입력한 시도 의견 세팅
                    HmGrid.updateBoundData($("#historyGrid"), ctxPath + '/api/main/acc/accidentApply/getAccidentHistoryList'); //히스토리 내역 갱신
                }else{
                    $('#pCommonWindow').jqxWindow('close');  //설정 팝업 닫고
                    $('#pwindow').jqxWindow('close'); //상세팝업 닫고
                }
            }
        });
    }else{ //이관 기관이 복수일 경우 기관수 만큼 insert / select -> update 실행

        if(!confirm(params.msg)) return;

        Server.post('/api/main/acc/accidentApply/updateMultiAccidentProcess', {
            data : params,
            success : function() {
                alert("처리 되었습니다.");
                HmGrid.updateBoundData($("#historyGrid"), ctxPath + '/api/main/acc/accidentApply/getAccidentHistoryList');
                HmGrid.updateBoundData($accidentGrid);
                $('#pCommonWindow').jqxWindow('close');
                $('#pwindow').jqxWindow('close'); //상세팝업 닫고
            }
        });
    }
});
//이관 요청 시 푸쉬 발송
function doPush(){
    var msg = $("#dropDownButtonContentdmgInstCdArea").children('div').text()+" "
        +_accdTypName+"\n관련"+"사고 ("+_inciNo+")확인부탁드립니다.";

    ///main/env/userConf/getPushUsers.do
    var resultArr =  new Array() ;

    var params={sUserId : $("#sUserId").val()};
    params.sInstCd = $('#sInstCd').val();

    if($("#sAuthMain").val()=='AUTH_MAIN_2') //개발원 이관요청 -> 개발원 담당자
        params.sType="B";
    else if($("#sAuthMain").val()=='AUTH_MAIN_3') //시도 이관요청 -> 시도담당자
        params.sType="D";

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
                    msgType : "이관요청",
                    recv : resultArr
                }
            };
            // console.log('message',message);
            eb.send("worker.receipt", message, function (aa, result) {
				console.log('worker.receip',message)
                if (result == null) {
                 console.log("ERROR: response null");
                }
            });
        }//success
    });
    /*var message  = {
        receipt : {
            msg : msg,
            msgType : "이관요청",
            recv : resultArr
        }
    };*/

    // eb.send("worker.receipt", message, function (aa, result) {
    //     if (result == null) {
    //         console.log("ERROR: response null");
    //     }
    // });
}