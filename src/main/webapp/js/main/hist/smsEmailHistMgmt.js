var $smsHistGrid,$emailHistGrid,$cbPeriod,$date1,$date2;
var Main = {
    /** variable */
    initVariable: function () {
        $smsHistGrid = $("#smsHistGrid"), $emailHistGrid = $("#emailHistGrid"),
        $cbPeriod = $('#cbPeriod'),$date1 = $('#date1'), $date2 = $('#date2');
    },

    /** add event */
    observe: function () {
        $('button').bind('click', function (event) { Main.eventControl(event); });
    },

    /** event handler */
    eventControl: function (event) {
        var curTarget = event.currentTarget;
        switch (curTarget.id) {
	        case 'btnSearch': this.search(); break;
			case 'btnExcel_sms': this.exportExcel_sms(); break;
			case 'btnExcel_email': this.exportExcel_email(); break;
        }
    },

    /** init design */
    initDesign: function () {
        Master.createPeriodCondition4($cbPeriod,$date1,$date2);

        $date1.jqxDateTimeInput({formatString: 'yyyy-MM-dd'});
        $date2.jqxDateTimeInput({formatString: 'yyyy-MM-dd'});

        // $('#splitter').jqxSplitter({ width: '100%', height: '100%', orientation: 'horizontal', theme: jqxTheme, panels: [{ size: '50%', collapsible: false }, { size: '50%' }] });
		
        HmGrid.create($smsHistGrid, {
            source: new $.jqx.dataAdapter({
                    datatype: 'json',
                    url: ctxPath + '/api/main/hist/smsEmailHist/getSmsHist',
                },
                {
                    formatData: function(data) {
                         $.extend(data, Main.getCommParams());
                        return data;
                    }
                }
            ),
            pageable : true,
            pagermode: 'default',
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, 'SMS 이력관리');
            },
            columns:
                [
                    {text: '일시', width: '10%', datafield: 'ymdhms', cellsalign:'center'},
                    {text: '휴대폰번호', width: '10%', datafield: 'cellNo',cellsalign:'center'},
                    {text: '메시지내용', width: '60%', datafield: 'shortMsg',cellsalign:'left',
                        cellsrenderer: function(row, column, value, rowData){
                            var cont = "";
                            if(value != null){
                                cont = value.htmlCharacterUnescapes();
                            }
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+cont+'</div>';
                        }
                    },
                    {text: '수신자명', width: '10%', datafield: 'cellName', cellsalign:'center'},
                    //{text: '전송일시', width: '10%', datafield: 'sndDate', cellsalign:'center'},
                    {text: '발신자명', width: '10%', datafield: 'sendName', cellsalign:'center'}
                ]
        }, CtxMenu.NONE);

        // HmGrid.create($emailHistGrid, {
        //     source: new $.jqx.dataAdapter({
        //             datatype: 'json',
        //             url: ctxPath + '/main/hist/smsEmailHist/getEmailHist.do',
        //         },
        //         {
        //             formatData: function(data) {
        //                 $.extend(data, Main.getCommParams());
        //                 return data;
        //             }
        //         }
        //     ),
        //     pageable: false,
        //     showtoolbar: true,
        //     rendertoolbar: function(toolbar) {
        //         HmGrid.titlerenderer(toolbar, 'EMAIL 이력관리');
        //     },
        //     columns:
        //         [
        //             {text: '일시', width: 250, datafield: 'ymdhms'},
        //             {text: '메일ID', width: 250, datafield: 'mailId'},
        //             {text: '제목', width: 250, datafield: 'mailTitle'},
        //             {text: '내용', minwidth: 250, datafield: 'mailMsg'},
        //             {text: '메일발송일시', width: 250, datafield: 'mailSndDate'},
        //         ]
        // }, CtxMenu.NONE);
    },

    /** init data */
    initData: function () {

    },
    getCommParams: function(){
    	var params = {};
    	try{
    		$.extend(params, {
				period: $cbPeriod.val(),
				date1: HmDate.getDateStr($('#date1')),
				time1: HmDate.getTimeStr($('#date1')),
				date2: HmDate.getDateStr($('#date2')),
				time2: HmDate.getTimeStr($('#date2'))
			});
    	}catch(err){}
    	
    	return params;
    },
    search: function() {
        if($('#date1').val()>$('#date2').val()){
            var tempDate = $('#date1').val();
            $('#date1').val($('#date2').val());
            $('#date2').val(tempDate);
        }
		HmGrid.updateBoundData($smsHistGrid);
		// HmGrid.updateBoundData($emailHistGrid);
	},
	
	exportExcel_sms: function(){
		// 화면에서 바로 출력시
		// var rows = $smsHistGrid.jqxGrid('getboundrows');
		// if(rows.length!=0)
		// 	$smsHistGrid.jqxGrid('exportdata','xls','SMS 이력관리');
		// else
		// 	alert("출력할 데이터가 존재하지 않습니다.");
		
		//서비스에서 엑셀출력시 (컬럼값고정)
		var params = {};
		$.extend(params, Main.getCommParams());

		HmUtil.exportExcel(ctxPath + '/api/main/hist/smsEmailHist/export_sms', params);
	},
	
	exportExcel_email: function(){
		// 화면에서 바로 출력시
		var rows = $emailHistGrid.jqxGrid('getboundrows');
		if(rows.length!=0)
			$emailHistGrid.jqxGrid('exportdata','xls','EMAIL 이력관리');
		else
			alert("출력할 데이터가 존재하지 않습니다.");
		
		// 서비스에서 엑셀출력시 (컬럼값고정)		
//		var params = {};
//		$.extend(params, Main.getCommParams());
//		
//		HmUtil.exportExcel(ctxPath + '/main/hist/smsEmailHist/export_email.do', params);
	}
};

$(function () {
    Main.initVariable();
    Main.initDesign();
    Main.initData();
    Main.observe();
});