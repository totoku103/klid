var currentStep;
$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});

var Main = {
    /** variable */
    initVariable : function() {

    },

    /** add event */
    observe : function() {
        $('button').bind('click', function (event) {
            Main.eventControl(event);
        });
    },

    /** event handler */
    eventControl : function(event) {
        var curTarget = event.currentTarget;
        switch (curTarget.id) {
            case 'btnEdit':
                this.edit();
                break;
            case 'history1':
                this.doHistory(1);
                break;
            case 'history2':
                this.doHistory(2);
                break;
            case 'history3':
                this.doHistory(3);
                break;
            case 'history4':
                this.doHistory(4);
                break;
            case 'history5':
                this.doHistory(5);
                break;
            case 'btnWrite':
                this.doCreateHistory();
                break;
            case 'btnHistoryDel':
                this.doHistoryDel();
                break;
        }
    },

    /** init design */
    initDesign : function() {
        $('#topSplitter').jqxSplitter({ width: '100%', height: '100%', orientation: 'horizontal', theme: jqxTheme, panels: [{ size: '20%' }, { size: '80%' }] });
    },

    /** init data */
    initData : function() {
        $.ajax({
            type : "post",
            url :$('#ctxPath').val() + '/api/main/sys/getRiskMgmt',
            data : {},
            dataType : "json",
            success : function(jsonData) {
                var basis1 = jsonData.resultData.basis1;
                var basis2 = jsonData.resultData.basis2;
                var basis3 = jsonData.resultData.basis3;
                var basis4 = jsonData.resultData.basis4;
                var basis5 = jsonData.resultData.basis5;

                $("#basis1").val( "0"           +"~" + basis1 );
                $("#basis2").val( (basis1+1)*1  +"~" + basis2 );
                $("#basis3").val( (basis2+1)*1  +"~" + basis3 );
                $("#basis4").val( (basis3+1)*1  +"~" + basis4 );
                $("#basis5").val( (basis4+1)*1  +"~" + basis5 );
            }
        });
    },

    edit: function () {
        $.post(ctxPath + '/main/popup/sys/pRiskMgmtEdit.do',
            function (result) {
                HmWindow.open($('#pwindow'), '위협등급관리 변경', result, 350, 250);
            }
        );
    },

    doHistory: function (type) {
        switch (type) {
            case 1:
                $("#riskValues").text($("#basis1").val());
                $(".riskName").text("정상");
                break;
            case 2:
                $("#riskValues").text($("#basis2").val());
                $(".riskName").text("관심");
                break;
            case 3:
                $("#riskValues").text($("#basis3").val());
                $(".riskName").text("주의");
                break;
            case 4:
                $("#riskValues").text($("#basis4").val());
                $(".riskName").text("경계");
                break;
            case 5:
                $("#riskValues").text($("#basis5").val());
                $(".riskName").text("심각");
                break;
        }
        currentStep = type; //히스토리 내역이 몇단계 꺼 인지 (정상:1, 관심:2 ~ 심각:5)

        //$('#mainDiv').jqxSplitter({ width: '100%', height: '100%', orientation: 'horizontal', theme: jqxTheme, panels: [{ size: '50%' }, { size: '50%' }] });
        $('#hisoryDiv').show(); //하단 이력 영역 노출

        HmGrid.create( $('#historyGrid'), {
            source: new $.jqx.dataAdapter({
                dataType: 'json',
                url: ctxPath + '/api/main/sys/getRiskHistory',
                data : {step : currentStep}
            }),
            columns: [
                {text: '내용', minwidth: 250, datafield: 'contents'},
                {text: '등록자', width: 120, datafield: 'usrName', cellsalign: 'center'},
                {text: '아이디', width: 120, datafield: 'usrId',   cellsalign: 'center'},
                {text: '등록일', width: 150, datafield: 'regDt',
                    cellsrenderer: function(row, column, value, rowData){
                        var parseDate = "";
                        parseDate = HmUtil.parseDate(value);
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+parseDate+'</div>';
                    }
                },
            ]
            , pageable: false
            , editable: false
        });
    },

    doCreateHistory: function () {
        //var rows = HmGrid.getRowData( $("#historyGrid"), rowindex);
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

        $.post(ctxPath + '/main/popup/sys/pRiskHistoryWrite.do',
            function(result) {
                HmWindow.open(pwin, "위협등급관리 변경이력", result, 400, 250, 'pHistoryWindow_init', currentStep);
            }
        );

    },

    doHistoryDel: function(){
        var rowIdx = HmGrid.getRowIdx( $('#historyGrid'), '데이터를 선택해주세요.');
        if (rowIdx === false) return;
        var rowdata = HmGrid.getRowData($('#historyGrid'), rowIdx);

        Server.post('/api/main/sys/delRiskHistory', {
            data : {logSeq : rowdata.logSeq},
            success : function(result) {
                alert("삭제되었습니다.");
                Main.doHistory(currentStep);
            }
        });
    }

};