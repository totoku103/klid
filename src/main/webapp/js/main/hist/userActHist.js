var $userHistGrid, $cbPeriod,$date1,$date2;
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
        $('#date1').jqxDateTimeInput({formatString: 'yyyy-MM-dd', width: 100 });
        $('#date2').jqxDateTimeInput({formatString: 'yyyy-MM-dd', width: 100 });

        // 구분
        $('#srchActType').jqxDropDownList({
            source: [
            	{label: '전체', value: ''}, {label: '등록', value: 'C'}, {label: '수정', value: 'U'}, {label: '삭제', value: 'D'}, {label: '다운로드', value: 'DOWNLOAD'}
            ],
            displayMember: 'label',
            valueMember: 'value',
            width: '100px',
            height: 22,
            theme: jqxTheme,
            placeHolder: '전체',
            autoDropDownHeight: true
        });
        
        HmGrid.create($userHistGrid, {
            source: new $.jqx.dataAdapter({
                    datatype: 'json',
                    url: ctxPath + '/api/main/hist/userActHist/getUserActHistList',
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        return data;
                    }
                }
            ),
            pageable: true,
            pageSize : 100,
            columns:
                [
                    {text: '번호', datafield: 'seq', width: '5%', cellsalign: 'center'},
                    {text: '메뉴명', datafield: 'menuName', width: 'auto',
                        cellsrenderer: function(row, column, value, rowData){
                            var parentMenuName = $userHistGrid.jqxGrid('getcellvalue', row, "parentMenuName");
                            return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+parentMenuName+' > '+value+'</div>';
                        }
                    },
                    {text: '구분', datafield: 'actType', width: '5%', cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData){
                            var actType = "";
                            if(value == 'C'){
                                actType = '등록';
                            }else if(value == 'U'){
                                actType = '수정';
                            }else if (value == 'D'){
                                actType = '삭제';
                            } else if(value == 'DOWNLOAD'){
                                actType = '다운로드';
                            } else {
                                actType = '-';
                            }
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+actType+'</div>';
                        }
                    },
                    {text: '이름',   datafield: 'regUserName', width: '10%', cellsalign:'center'},
                    {text: '아이디', datafield: 'regUserId', width: '10%', cellsalign:'center'},
                    {text: '소속', datafield: 'instNm', width: '15%', cellsalign:'center'},
                    {text: '접속 아이피', datafield: 'usrIp', width: '10%', cellsalign:'center'},
                    {text: '발생일시', datafield: 'regDate', width: '15%', cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData){
                            var parseDate = "";
                            parseDate = HmUtil.parseDate(value);
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+parseDate+'</div>';
                        }
                    }
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
				period      : $cbPeriod.val(),
				date1       : HmDate.getDateStr($('#date1'))+'000000',
				date2       : HmDate.getDateStr($('#date2'))+'235959',
                srchActType : $('#srchActType').val(),
                srchUserName: $('#srchUserName').val(),
                srchUserId  : $('#srchUserId').val()
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