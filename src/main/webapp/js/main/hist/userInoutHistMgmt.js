var $userHistGrid, $cbPeriod,$date1,$date2;

var totalCnt = 0;
var Main = {
    /** variable */
    initVariable: function () {
        $userHistGrid = $("#userHistGrid"),
        $cbPeriod = $('#cbPeriod'),$date1 = $('#date1'), $date2 = $('#date2');
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
            case 'btnSearch': this.search(); break;
            case 'btnExcel': break;
        }
    },

    /** init design */
    initDesign: function () {
        Master.createPeriodCondition4($cbPeriod,$date1,$date2);
        $date1.jqxDateTimeInput({formatString: 'yyyy-MM-dd'});
        $date2.jqxDateTimeInput({formatString: 'yyyy-MM-dd'});
        // 구분
        $('#sLogCd').jqxDropDownList({
            source: [
            	{label: '전체', value: ''}, {label: 'IN', value: 'IN'}, {label: 'OUT', value: 'OUT'}
            ],
            displayMember: 'label',
            valueMember: 'value',
            width: '100px',
            height: 22,
            theme: jqxTheme,
            placeHolder: '전체',
            autoDropDownHeight: true
        });
        
        // 사용자ID
        var source_userId = new $.jqx.dataAdapter({
        	datatype: 'json', 
        	url: ctxPath + '/api/main/hist/userInoutHist/getLogUserList'
        });
        $('#sUsrId').jqxDropDownList({
                source: source_userId,
                displayMember: 'label',
                valueMember: 'value',
                width: '100px',
                height: 22,
                theme: jqxTheme,
                placeHolder: '전체'
        });
        
        HmGrid.create($userHistGrid, {
            source: new $.jqx.dataAdapter({
                    datatype: 'json',
                    url: ctxPath + '/api/main/hist/userInoutHist/getUserInoutHist',
                    beforeprocessing: function(data) {
                        if(data != null){
                            totalCnt = data.resultData.length;
                        }
                    },
                },
                {
                    formatData: function(data) {
                         $.extend(data, Main.getCommParams());
                        return data;
                    }
                }
            ),
            columns:
                [
                    {text: '번호', datafield: 'no', width: 100, cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row)*1 +"</div>";
                        }
                    },
                    {text: '날짜', datafield: 'logDt', width: 150, cellsalign: 'center'},
                    {text: '구분', datafield: 'logCd', width: 100, cellsalign: 'center'},
                    {text: '소속기관', datafield: 'instNm', width: 150, cellsalign: 'center'},
                    {text: '이름', datafield: 'usrName', width: 150, cellsalign: 'center'},
                    {text: '아이디', datafield: 'usrId', width: 100, cellsalign: 'center'},
                    {text: '아이피', datafield: 'usrIp', minwidth: 250, cellsalign: 'center'}
                ]
        }, CtxMenu.COMM);
    },

    /** init data */
    initData: function () {

    },
    
    search : function(){
        if($('#date1').val()>$('#date2').val()){
            var tempDate = $('#date1').val();
            $('#date1').val($('#date2').val());
            $('#date2').val(tempDate);
        }
    	HmGrid.updateBoundData($userHistGrid);
    },
    
    getCommParams: function(){
    	var params = {};
    	try{
    		$.extend(params, {
				period: $cbPeriod.val(),
				date1: HmDate.getDateStr($('#date1')),
				time1: HmDate.getTimeStr($('#date1')),
				date2: HmDate.getDateStr($('#date2')),
				time2: HmDate.getTimeStr($('#date2')),
				sLogCd: $('#sLogCd').val(),
				sUsrId: $('#sUsrId').val()
			});
    	}catch(err){}
    	
    	return params;
    }
};

$(function () {
    Main.initVariable();
    Main.initDesign();
    Main.initData();
    Main.observe();
});