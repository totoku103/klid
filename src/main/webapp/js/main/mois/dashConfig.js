var $datTime;

$(function () {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});

var Main = {
    /** variable */
    initVariable: function () {
        $datTime = $('#datTime');
    },

    /** add event */
    observe: function () {
        $('button').bind('click', function (event) {
            Main.eventControl(event);
        });
    },

    /** event handler */
    eventControl: function (event) {
        var curTarget = event.currentTarget;
        switch (curTarget.id) {
            case 'btnWrite':
                this.saveContents();
                break;
            case 'btnSearch':
                this.searchContents();
                break;
        }
    },

    /** init design */
    initDesign: function () {
        var toDate = new Date();
        //타임인풋생성
        $datTime.jqxDateTimeInput({width: '100px', height: '21px', formatString: "yyyy-MM-dd", theme: jqxTheme});
        //날짜 셋팅
        $datTime.jqxDateTimeInput('setDate', toDate);
    },

    /** init data */
    initData: function () {
       this.searchContents();
    },

    searchContents : function() {
        //조회.
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/main/mois/dashConfig/getDashConfigList',
            data: {datTime: $('#datTime').val()},
            async: false,
            success: function (data) {
                if(data.resultData != null){
                    //등록,수정체크
                    $("#addType").val("U");
                    $("#workCp1").val(data.resultData.workCp1);
                    $("#workCp2").val(data.resultData.workCp2);
                    $("#workCp3").val(data.resultData.workCp3);
                    $("#workPs1").val(data.resultData.workPs1);
                    $("#workPs2").val(data.resultData.workPs2);
                    $("#workPs3").val(data.resultData.workPs3);
                    $("#workMng1").val(data.resultData.workMng1);
                    $("#workMng2").val(data.resultData.workMng2);
                    $("#workMng3").val(data.resultData.workMng3);
                    $("#workCon1").val(data.resultData.workCon1);
                    $("#workCon2").val(data.resultData.workCon2);
                    $("#workCon3").val(data.resultData.workCon3);
                    $("#nirsCdM").val(data.resultData.nirsCdM);
                    $("#nirsCdA").val(data.resultData.nirsCdA);
                    $("#nirsCdD").val(data.resultData.nirsCdD);
                    $("#nirsDdM").val(data.resultData.nirsDdM);
                    $("#nirsDdA").val(data.resultData.nirsDdA);
                    $("#nirsDdD").val(data.resultData.nirsDdD);
                    $("#nirsHkM").val(data.resultData.nirsHkM);
                    $("#nirsHkA").val(data.resultData.nirsHkA);
                    $("#nirsHkD").val(data.resultData.nirsHkD);
                    $("#nirsEtM").val(data.resultData.nirsEtM);
                    $("#nirsEtA").val(data.resultData.nirsEtA);
                    $("#nirsEtD").val(data.resultData.nirsEtD);
                    $("#klidCdM").val(data.resultData.klidCdM);
                    $("#klidCdA").val(data.resultData.klidCdA);
                    $("#klidCdD").val(data.resultData.klidCdD);
                    $("#klidDdM").val(data.resultData.klidDdM);
                    $("#klidDdA").val(data.resultData.klidDdA);
                    $("#klidDdD").val(data.resultData.klidDdD);
                    $("#klidHkM").val(data.resultData.klidHkM);
                    $("#klidHkA").val(data.resultData.klidHkA);
                    $("#klidHkD").val(data.resultData.klidHkD);
                    $("#klidEtM").val(data.resultData.klidEtM);
                    $("#klidEtA").val(data.resultData.klidEtA);
                    $("#klidEtD").val(data.resultData.klidEtD);
                    $("#gtAv").val(data.resultData.gtAv);
                    $("#gtMax").val(data.resultData.gtMax);
                    $("#ctAv").val(data.resultData.ctAv);
                    $("#ctMax").val(data.resultData.ctMax);
                    $("#ssAv").val(data.resultData.ssAv);
                    $("#ssMax").val(data.resultData.ssMax);
                    $("#gtRst").val(data.resultData.gtRst);
                    $("#ctRst").val(data.resultData.ctRst);
                    $("#ssRst").val(data.resultData.ssRst);
                    $("#errSvr").val(data.resultData.errSvr);
                    $("#errNet").val(data.resultData.errNet);
                    $("#errStr").val(data.resultData.errStr);
                    $("#errBak").val(data.resultData.errBak);
                    $("#errHom").val(data.resultData.errHom);
                    $("#noti1").val(data.resultData.noti1);
                    $("#noti2").val(data.resultData.noti2);
                    $("#secu1").val(data.resultData.secu1);
                    $("#secu2").val(data.resultData.secu2);
                    $("#niraSum1").text(Number(data.resultData.nirsCdM)+Number(data.resultData.nirsCdA)+Number(data.resultData.nirsCdD));
                    $("#niraSum2").text(Number(data.resultData.nirsDdM)+Number(data.resultData.nirsDdA)+Number(data.resultData.nirsDdD));
                    $("#niraSum3").text(Number(data.resultData.nirsHkM)+Number(data.resultData.nirsHkA)+Number(data.resultData.nirsHkD));
                    $("#niraSum4").text(Number(data.resultData.nirsEtM)+Number(data.resultData.nirsEtA)+Number(data.resultData.nirsEtD));
                    $("#klidSum1").text(Number(data.resultData.klidCdM)+Number(data.resultData.klidCdA)+Number(data.resultData.klidCdD));
                    $("#klidSum2").text(Number(data.resultData.klidDdM)+Number(data.resultData.klidDdA)+Number(data.resultData.klidDdD));
                    $("#klidSum3").text(Number(data.resultData.klidHkM)+Number(data.resultData.klidHkA)+Number(data.resultData.klidHkD));
                    $("#klidSum4").text(Number(data.resultData.klidEtM)+Number(data.resultData.klidEtA)+Number(data.resultData.klidEtD));
                    $("#sum1").text(Number(data.resultData.nirsCdM)+Number(data.resultData.nirsDdM)+Number(data.resultData.nirsHkM)+Number(data.resultData.nirsEtM));
                    $("#sum2").text(Number(data.resultData.klidCdM)+Number(data.resultData.klidDdM)+Number(data.resultData.klidHkM)+Number(data.resultData.klidEtM));
                    $("#sum3").text(Number(data.resultData.nirsCdA)+Number(data.resultData.nirsDdA)+Number(data.resultData.nirsHkA)+Number(data.resultData.nirsEtA));
                    $("#sum4").text(Number(data.resultData.klidCdA)+Number(data.resultData.klidDdA)+Number(data.resultData.klidHkA)+Number(data.resultData.klidEtA));
                    $("#sum5").text(Number(data.resultData.nirsCdD)+Number(data.resultData.nirsDdD)+Number(data.resultData.nirsHkD)+Number(data.resultData.nirsEtD));
                    $("#sum6").text(Number(data.resultData.klidCdD)+Number(data.resultData.klidDdD)+Number(data.resultData.klidHkD)+Number(data.resultData.klidEtD));
                    $("#sum7").text(Number($("#sum1").text())+Number($("#sum3").text())+Number($("#sum5").text()));
                    $("#sum8").text(Number($("#sum2").text())+Number($("#sum4").text())+Number($("#sum6").text()));
                    var cnt = Number(data.resultData.workPs1)+Number(data.resultData.workPs2)+Number(data.resultData.workPs3);
                    $("#totalCnt").text("총"+cnt+"명");
                }else{
                    //등록,수정체크
                    $("#addType").val("I");
                    $("#workCp1").val("");
                    $("#workCp2").val("");
                    $("#workCp3").val("");
                    $("#workPs1").val("");
                    $("#workPs2").val("");
                    $("#workPs3").val("");
                    $("#workMng1").val("");
                    $("#workMng2").val("");
                    $("#workMng3").val("");
                    $("#workCon1").val("");
                    $("#workCon2").val("");
                    $("#workCon3").val("");
                    $("#attCnt").val("");
                    $("#nirsCdM").val("");
                    $("#nirsCdA").val("");
                    $("#nirsCdD").val("");
                    $("#nirsDdM").val("");
                    $("#nirsDdA").val("");
                    $("#nirsDdD").val("");
                    $("#nirsHkM").val("");
                    $("#nirsHkA").val("");
                    $("#nirsHkD").val("");
                    $("#nirsEtM").val("");
                    $("#nirsEtA").val("");
                    $("#nirsEtD").val("");
                    $("#klidCdM").val("");
                    $("#klidCdA").val("");
                    $("#klidCdD").val("");
                    $("#klidDdM").val("");
                    $("#klidDdA").val("");
                    $("#klidDdD").val("");
                    $("#klidHkM").val("");
                    $("#klidHkA").val("");
                    $("#klidHkD").val("");
                    $("#klidEtM").val("");
                    $("#klidEtA").val("");
                    $("#klidEtD").val("");
                    $("#gtAv").val("");
                    $("#gtMax").val("");
                    $("#ctAv").val("");
                    $("#ctMax").val("");
                    $("#ssAv").val("");
                    $("#ssMax").val("");
                    $("#gtRst").val("");
                    $("#ctRst").val("");
                    $("#ssRst").val("");
                    $("#errSvr").val("");
                    $("#errNet").val("");
                    $("#errStr").val("");
                    $("#errBak").val("");
                    $("#errHom").val("");
                    $("#noti1").val("");
                    $("#noti2").val("");
                    $("#secu1").val("");
                    $("#secu2").val("");
                    $("#niraSum1").text("");
                    $("#niraSum2").text("");
                    $("#niraSum3").text("");
                    $("#niraSum4").text("");
                    $("#klidSum1").text("");
                    $("#klidSum2").text("");
                    $("#klidSum3").text("");
                    $("#klidSum4").text("");
                    $("#sum1").text("");
                    $("#sum2").text("");
                    $("#sum3").text("");
                    $("#sum4").text("");
                    $("#sum5").text("");
                    $("#sum6").text("");
                    $("#sum7").text("");
                    $("#sum8").text("");
                    $("#totalCnt").text("총명");
                }
            }
        });
    },
    saveContents : function() {
        //등록,수정
        if (!this.validateForm())
            return;
       var params={
            workCp1: $('#workCp1').val(),workPs1: $('#workPs1').val(),workMng1: $('#workMng1').val(),workCon1: $('#workCon1').val(),
           workCp2: $('#workCp2').val(),workPs2: $('#workPs2').val(),workPs3: $('#workPs3').val(),workMng2: $('#workMng2').val(),
           workCon2: $('#workCon2').val(), workCp3: $('#workCp3').val(),workMng3: $('#workMng3').val(),
           workCon3: $('#workCon3').val(), nirsCdM: $('#nirsCdM').val(),nirsDdM: $('#nirsDdM').val(),nirsHkM: $('#nirsHkM').val(),nirsEtM: $('#nirsEtM').val(),
           klidCdM: $('#klidCdM').val(),klidDdM: $('#klidDdM').val(),klidHkM: $('#klidHkM').val(),klidEtM: $('#klidEtM').val(),
           nirsCdA: $('#nirsCdA').val(),nirsDdA: $('#nirsDdA').val(),nirsHkA: $('#nirsHkA').val(),nirsEtA: $('#nirsEtA').val(),
           klidCdA: $('#klidCdA').val(),klidDdA: $('#klidDdA').val(),klidHkA: $('#klidHkA').val(),klidEtA: $('#klidEtA').val(),
           nirsCdD: $('#nirsCdD').val(),nirsDdD: $('#nirsDdD').val(),nirsHkD: $('#nirsHkD').val(),nirsEtD: $('#nirsEtD').val(),
           klidCdD: $('#klidCdD').val(),klidDdD: $('#klidDdD').val(),klidHkD: $('#klidHkD').val(),klidEtD: $('#klidEtD').val(),
           gtAv: $('#gtAv').val(),gtMax: $('#gtMax').val(),ctAv: $('#ctAv').val(),ctMax: $('#ctMax').val(),
           ssAv: $('#ssAv').val(),ssMax: $('#ssMax').val(),gtRst: $('#gtRst').val(),ctRst: $('#ctRst').val(),
           ssRst: $('#ssRst').val(),errSvr: $('#errSvr').val(),errNet: $('#errNet').val(),errStr: $('#errStr').val(),
           errBak: $('#errBak').val(),errHom: $('#errHom').val(),noti1: $('#noti1').val(),noti2: $('#noti2').val(),
           secu1: $('#secu1').val(),secu2: $('#secu2').val(),datTime: $('#datTime').val()
        };

       var urlType = "";

       if($("#addType").val() == "I"){ //등록
            urlType = ctxPath + '/api/main/mois/dashConfig/addDashConfig';
       }else if($("#addType").val() == "U"){ //수정
           urlType = ctxPath + '/api/main/mois/dashConfig/editDashConfig';
       }
       $.ajax({
           type: 'POST',
           url: urlType,
           data: params,
            success: function (data) {
               alert("저장완료되었습니다.");
               Main.searchContents();
            }
        });
    },
    validateForm : function() {

        if($('#workPs1').val() == ""){
            $('#workPs1').val("0");
        }
        if($('#workPs2').val() == ""){
            $('#workPs2').val("0");
        }
        if($('#workPs3').val() == ""){
            $('#workPs3').val("0");
        }
        if($('#nirsCdM').val() == ""){
            $('#nirsCdM').val("0");
        }
        if($('#nirsCdA').val() == ""){
            $('#nirsCdA').val("0");
        }
        if($('#nirsCdD').val() == ""){
            $('#nirsCdD').val("0");
        }
        if($('#nirsDdM').val() == ""){
            $('#nirsDdM').val("0");
        }
        if($('#nirsDdA').val() == ""){
            $('#nirsDdA').val("0");
        }
        if($('#nirsDdD').val() == ""){
            $('#nirsDdD').val("0");
        }
        if($('#nirsHkM').val() == ""){
            $('#nirsHkM').val("0");
        }
        if($('#nirsHkA').val() == ""){
            $('#nirsHkA').val("0");
        }
        if($('#nirsHkD').val() == ""){
            $('#nirsHkD').val("0");
        }
        if($('#nirsEtM').val() == ""){
            $('#nirsEtM').val("0");
        }
        if($('#nirsEtA').val() == ""){
            $('#nirsEtA').val("0");
        }
        if($('#nirsEtD').val() == ""){
            $('#nirsEtD').val("0");
        }
        if($('#klidCdM').val() == ""){
            $('#klidCdM').val("0");
        }
        if($('#klidCdA').val() == ""){
            $('#klidCdA').val("0");
        }
        if($('#klidCdD').val() == ""){
            $('#klidCdD').val("0");
        }
        if($('#klidDdM').val() == ""){
            $('#klidDdM').val("0");
        }
        if($('#klidDdA').val() == ""){
            $('#klidDdA').val("0");
        }
        if($('#klidDdD').val() == ""){
            $('#klidDdD').val("0");
        }
        if($('#klidHkM').val() == ""){
            $('#klidHkM').val("0");
        }
        if($('#klidHkA').val() == ""){
            $('#klidHkA').val("0");
        }
        if($('#klidHkD').val() == ""){
            $('#klidHkD').val("0");
        }
        if($('#klidEtM').val() == ""){
            $('#klidEtM').val("0");
        }
        if($('#klidEtA').val() == ""){
            $('#klidEtA').val("0");
        }
        if($('#klidEtD').val() == ""){
            $('#klidEtD').val("0");
        }
        if($('#gtAv').val() == ""){
            $('#gtAv').val("0");
        }
        if($('#gtMax').val() == ""){
            $('#gtMax').val("0");
        }
        if($('#ctAv').val() == ""){
            $('#ctAv').val("0");
        }
        if($('#ctMax').val() == ""){
            $('#ctMax').val("0");
        }
        if($('#ssAv').val() == ""){
            $('#ssAv').val("0");
        }
        if($('#ssMax').val() == ""){
            $('#ssMax').val("0");
        }
        if($('#errSvr').val() == ""){
            $('#errSvr').val("0");
        }
        if($('#errNet').val() == ""){
            $('#errNet').val("0");
        }
        if($('#errStr').val() == ""){
            $('#errStr').val("0");
        }
        if($('#errBak').val() == ""){
            $('#errBak').val("0");
        }
        if($('#errHom').val() == ""){
            $('#errHom').val("0");
        }
        return true;
    }
};

//숫자입력체크
function numkeyCheck(e) {
    event = e || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ){
        // 백스페이스, DELETE, 좌 화살표, 우 화살표
        return;
    }else{
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
}

//float 체크
function floatkeyCheck(e) {
    event = e || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;

    if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ){
        // 백스페이스, DELETE, 좌 화살표, 우 화살표
        return;
    }else{
        //. 입력처리
         event.target.value = event.target.value.replace(/[^0-9.f]/g, "");
    }
}


