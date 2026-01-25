var $grid
var editUserIds = [];
var userId;
var totalCnt = 0;
var $cbPeriod;
var Main = {
		/** variable */
		initVariable: function() {
			$grid = $('#grid');
            $cbPeriod = $('#cbPeriod');
		},
		
		/** add event */
		observe: function() {
            $('button').bind('click', function(event) { Main.eventControl(event); });
            $('.searchBox').bind('keyup', function(event) { Main.keyupEventControl(event); });
		},
		
		/** event handler */
		eventControl: function(event) {
            var curTarget = event.currentTarget;
            switch(curTarget.id) {
                case 'btnSearch':
                    this.search();
                    break;
            }
			
		},

        keyupEventControl: function(event) {
            if(event.keyCode == 13) {
                Main.search();
            }
        },
		/** init design */
		initDesign: function() {
            var instParams =
                {InstLevel:$('#sInstLevel').val(), instCd:$('#sInstCd').val(), instNm:$('#sInstName').val()}
            HmDropDownBtn.createDeptTreeGrid($('#srchInstCdArea'), $('#srchInstTree'), 'share', '13%', 22, '98%', 350, null, instParams);

            Master.createPeriodCondition4($cbPeriod, $('#date1'), $('#date2'));
            $('#date1').jqxDateTimeInput({formatString: 'yyyy-MM-dd', width: 100 });
            $('#date2').jqxDateTimeInput({formatString: 'yyyy-MM-dd', width: 100 });

            var srchResCd = new Array();
            $.ajax({
                type: 'GET',
                url: ctxPath + '/api/code/getCommonCode',
                data: {comCode1: '4017' , codeLvl: '2'},
                async: false,
                success: function (data) {
                    srchResCd.push({label: '전체', value: ''});
                    $.each(data.resultData, function (index, data) {
                        srchResCd.push({label: data.codeName, value: data.comCode2})
                    });
                }
            });
            $('#srchResCd').jqxDropDownList({source: srchResCd, width: 130, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })


            HmWindow.create($('#pwindow'), 100, 100);
			HmGrid.create($grid, {
				source: new $.jqx.dataAdapter(
						{
							datatype: 'json',
                            url: ctxPath + '/api/main/home/healthCheckUrl/getHealthCheckHist',
							updaterow: function(rowid, rowdata, commit) {
								if(editUserIds.indexOf(rowid) == -1)
									editUserIds.push(rowid);
									commit(true);
				            },
							datafields: [
                                { name: 'seqNo',    type: 'int' },
                                { name: 'url',      type: 'string' },
                                { name: 'instCd',   type: 'int' },
                                { name: 'instNm',   type: 'string' },
                                { name: 'instCenterNm',   type: 'string' },
                                { name: 'moisYn',   type: 'string' },
                                { name: 'resCd',   type: 'string' },
                                { name: 'resNm',   type: 'string' },
                                { name: 'errTime',   type: 'string' },
                                { name: 'parentName',   type: 'string' }
                            ]
                            ,beforeprocessing: function(data) {
                                if(data != null){
                                    totalCnt = data.resultData.length;
                                }
                            }
						},
                        {
                            formatData : function(data) {
                                if($("#srchInstTree").val() == ""){
                                    data.srchInstCd = $("#sInstCd").val();
                                }else{
                                    data.srchInstCd = $("#srchInstTree").val();
                                }
                                data.srchUrl = $("#srchUrl").val();
                                data.srchResCd = $("#srchResCd").val();
                                data.period = $cbPeriod.val();
                                data.date1 = HmDate.getDateStr($('#date1'));
                                data.date2 = HmDate.getDateStr($('#date2'));
                                return data;
                            }
                        }
				),
                pageable : true,
                selectionmode: 'multiplerowsextended',
                pagermode: 'default',
                columns:
                    [
                        { text: 'No', width: '5%', pinned: true, editable: false , sortable: false, cellsalign: 'center', filterable: false,
                            cellsrenderer: function(row, column, value, rowData) {
                                return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row)*1 +"</div>";
                            }
                        },
                        { text : '시도',     datafield  : 'parentName', width: '8%', editable: false, cellsalign: 'center'},
                        { text : '시군구',     datafield  : 'instNm', width: '15%', editable: false, cellsalign: 'center'},
                        { text : '홈페이지명',   datafield  : 'instCenterNm', width: '32%', editable: false, cellsalign: 'center'},
                        { text : 'URL',     datafield  : 'url', width : '15%', editable: false, cellsalign: 'center'},
                        { text : '응답코드', datafield : 'resNm', width : '15%', cellsalign: 'center'},
                        { text : '장애시간', datafield : 'errTime', width : '10%', cellsalign: 'center'},
                        { text : '행안부',   datafield   : 'moisYn', width : '8%', cellsalign: 'center',
                            cellsrenderer: function(row, column, value, rowData){
                                var moisYn = '기타';
                                if(value == 1){
                                    moisYn = '행안부'
                                }
                                return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+ moisYn +'</div>';
                            }
                        }

                    ],
                editable: false,
				editmode : 'selectedcell'
			});
            /*$grid.on('celldoubleclick', function (event) {
                var rowIdx = HmGrid.getRowIdx($grid);
                var rowdata = HmGrid.getRowData($grid, rowIdx);
                $.post(ctxPath + '/main/popup/home/pHealthCheckUrlEdit.do',
                    function (result) {
                        HmWindow.open($('#pwindow'), '헬스체크URL 수정', result, 350, 250, 'pwindow_init', rowdata);
                    }
                );

			 });*/
		},
		
		/** init data */
		initData: function() {
            //Main.search();
		},

		search : function() {
            if($('#date1').val()>$('#date2').val()){
                var tempDate = $('#date1').val();
                $('#date1').val($('#date2').val());
                $('#date2').val(tempDate);
            }
			HmGrid.updateBoundData($grid, ctxPath + '/api/main/home/healthCheckUrl/getHealthCheckHist');
		}
};


$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});