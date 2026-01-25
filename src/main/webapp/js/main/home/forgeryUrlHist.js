var $grid
var editUserIds = [];
var userId;
var totalCnt = 0;


var Main = {
		/** variable */
		initVariable: function() {
			$grid = $('#grid');
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
                case 'btnSend':
                    this.sendSms();
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
            // var srchLastRes = [{label: '전체', value: ''},{label: '정상', value: '200'},{label: '장애', value: '-1'}];
            // $('#srchLastRes').jqxDropDownList({source: srchLastRes, width: 90, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })
            //
            // var srchDelYn = [{label: '전체', value: ''},{label: '예', value: 'Y'},{label: '아니오', value: 'N'}];
            // $('#srchDelYn').jqxDropDownList({source: srchDelYn, width: 90, height:20 ,autoDropDownHeight: true, selectedIndex : 0 });

            var srchCheckYn = [{label: '전체', value: ''},{label: '예', value: '1'},{label: '아니오', value: '0'}];
            $('#srchCheckYn').jqxDropDownList({source: srchCheckYn, width: 90, height:20 ,autoDropDownHeight: true, selectedIndex : 0 });

            HmDate.create($('#date1'), $('#date2'), HmDate.DAY, 0);

		    var instParams =
                {InstLevel:$('#sInstLevel').val(), instCd:$('#sInstCd').val(), instNm:$('#sInstName').val()}

            //메인에서 클릭해서 왔을때
            if($("#mainPageInstCd").val() != ''){
                Server.post('/api/main/home/forgeryUrl/getByInstNm', {
                    data : {instCd : $("#mainPageInstCd").val()},
                    success : function(result) {
                        instParams.instCd = $("#mainPageInstCd").val();
                        instParams.instNm = result.instNm;
                        //$('#srchLastRes').val(-1);
                    }
                });
            }

            HmDropDownBtn.createDeptTreeGrid($('#srchInstCdArea'), $('#srchInstTree'), 'share', '13%', 22, '98%', 350, null, instParams);

            HmWindow.create($('#pwindow'), 100, 100);
			HmGrid.create($grid, {
				source: new $.jqx.dataAdapter(
						{
							datatype: 'json',
                            url: ctxPath + '/api/main/home/forgeryUrl/getForgeryUrlHist',
							updaterow: function(rowid, rowdata, commit) {
								if(editUserIds.indexOf(rowid) == -1)
									editUserIds.push(rowid);
									commit(true);
				            },
							datafields: [
                                { name: 'forgerySeq',   type: 'int' },
                                { name: 'pLocalNm',     type: 'string' },
                                { name: 'instNm',       type: 'string' },
                                { name: 'domain',       type: 'string' },
                                { name: 'url',          type: 'string' },
                                { name: 'depth',        type: 'int' },
                                { name: 'delYn',        type: 'string' },
                                { name: 'excpYn',       type: 'string' },
                                { name: 'detectTime',   type: 'string' },
                                { name: 'evtName',      type: 'string' },
                                { name: 'depthRes',     type: 'string' }
                            ]
                            ,beforeprocessing: function(data) {
                                if(data != null){
                                    // console.log(data);
                                    totalCnt = data.resultData.length;
                                }
                            }
						},
                        {
                            formatData : function(data) {
                                if($("#srchInstTree").val() == ""){
                                    if($("#mainPageInstCd").val() != ''){
                                        data.srchInstCd = $("#mainPageInstCd").val();
                                    }else{
                                        data.srchInstCd = $("#sInstCd").val();
                                    }
                                }else{
                                    data.srchInstCd = $("#srchInstTree").val();
                                }
                                data.srchWsisIp = $("srchWsisIp").val();
                                data.srchDomain = $("#srchDomain").val();


                                data.date1 = HmDate.getDateStr($('#date1'));
                                data.time1 = HmDate.getTimeStr($('#date1'));
                                data.date2 = HmDate.getDateStr($('#date2'));
                                data.time2 = HmDate.getTimeStr($('#date2'));

                                // if($("#srchInstTree").val() == ""){
                                //
                                //     if($("#mainPageInstCd").val() != ''){
                                //         data.srchLastRes = -1;
                                //     }else{
                                //         data.srchLastRes = $("#srchLastRes").val();
                                //     }
                                // }else{
                                //     data.srchLastRes = $("#srchLastRes").val();
                                // }

                                // data.srchDelYn = $("#srchDelYn").val();
                                // data.srchCheckYn = $("#srchCheckYn").val();

                                return data;
                            }
                        }
				),
                pageable : true,
                pagermode: 'default',
                columns:
                    [
                        { text: 'No', width: '5%', pinned: true, editable: false , sortable: false, cellsalign: 'center', filterable: false,
                            cellsrenderer: function(row, column, value, rowData) {
                                return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row)*1 +"</div>";
                            }
                        },
                        { text : '시도',  datafield  : 'pLocalNm', width: '5%', editable: false, cellsalign: 'center'},
                        { text : '시군구',  datafield  : 'instNm', width: '5%', editable: false, cellsalign: 'center'},
                        { text : '도메인', datafield   : 'domain', width : '10%', editable: false, cellsalign: 'center'},
                        { text : 'URL', datafield     : 'url', width : '25%', editable: false, cellsalign: 'left'},
                        { text : '장애여부', datafield     : 'lastRes', width : '5%', editable: false, cellsalign: 'center',
                            cellsrenderer: function(row, column, value, rowData) {
                                var delYn = '장애';
                                if(value == 200){
                                    delYn = '정상';
                                }
                                return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + delYn +"</div>";
                            }
                        },
                        { text : '집중감시여부', datafield : 'checkYn', width : '10%', editable: false, cellsalign: 'center',
                            cellsrenderer: function(row, column, value, rowData) {
                                    var checkYn = '아니오';
                                    if(value == 'Y'){
                                        checkYn = '예';
                                    }
                                    return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + checkYn +"</div>";
                            }},
                        // { text : '삭제여부', datafield   : 'delYn', width : '10%', cellsalign: 'center',
                        //     cellsrenderer: function(row, column, value, rowData) {
                        //         var delYn = '아니오';
                        //         if(value == 'Y'){
                        //             delYn = '예';
                        //         }
                        //         return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + delYn +"</div>";
                        //     }
                        // },
                        // { text : '집중여부', datafield : 'checkYn', width : '10%', cellsalign: 'center',
                        //     cellsrenderer: function(row, column, value, rowData) {
                        //         var checkYn = '아니오';
                        //         if(value == 'Y'){
                        //             checkYn = '예';
                        //         }
                        //         return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + checkYn +"</div>";
                        //     }
                        // },
                        { text : '예외여부', datafield : 'excpYn', width : '5%', cellsalign: 'center',
                            cellsrenderer: function(row, column, value, rowData) {
                                var excpYn = '아니오';
                                if(value == 'Y'){
                                    excpYn = '예';
                                }
                                return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + excpYn +"</div>";
                            }
                        },
                        { text : '탐지시간',  datafield  : 'detectTime', width: '10%', editable: false, cellsalign: 'center'},
                        { text : '탐지결과',  datafield  : 'evtName', width: '5%', editable: false, cellsalign: 'center'},
                        { text : '상세',  datafield  : 'depthRes', width: 'auto', editable: false, cellsalign: 'left'}
                    ],
                editable: false,
				editmode : 'selectedcell'
			});
            /*$grid.on('celldoubleclick', function (event) {
                var rowIdx = HmGrid.getRowIdx($grid);
                var rowdata = HmGrid.getRowData($grid, rowIdx);
                var url = "";
                var popupTile = "상세";
                $.post(ctxPath + '/main/popup/env/pUserConfEdit.do',
                    function (result) {
                        HmWindow.open($('#pwindow'), '사용자관리 수정', result, 900, 500, 'pwindow_init', rowdata);
                    }
                );
			     
			 });*/
		},
		
		/** init data */
		initData: function() {
            //Main.search();
		},

		search : function() {
			HmGrid.updateBoundData($grid, ctxPath + '/api/main/home/forgeryUrl/getForgeryUrlHist');
		},

        sendSms: function () {
		    var rowIdx = HmGrid.getRowIdx($grid, '데이터를 선택해주세요.');
            if (rowIdx === false) return;

            var rowdata = HmGrid.getRowData($grid, rowIdx);
            var errorCode = rowdata.lastRes;
            var domain  = rowdata.domain;

            if(errorCode == 200){
                alert("정상 URL 입니다.");
                return;
            }
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

            var params = {
                smsType : 'forgery',
                smsForgeryCont : '[LCSC]' + domain + ' 위변조 점검 요망. 확인 부탁 드립니다.',
                instCd : $("#sInstCd").val()
            }
            $.get(ctxPath + '/main/popup/sys/pCustUserSms.do',
                function(result) {
                    HmWindow.open(pwin, 'SMS 전송', result, 930, 510,'smsPop_init',params);
                }
            );
        }
};


$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});