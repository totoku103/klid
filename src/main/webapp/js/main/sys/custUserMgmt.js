var $custUsergGrid;
var userId = '';
var instCd = '';

var totalCnt = 0;
var $dGrpTreeGrid;
var Main = {
    /** variable */
    initVariable: function() {
        $custUsergGrid = $('#custUsergGrid');
        userId = $('#sUserId').val();
        instCd = $('#sInstCd').val();
        $dGrpTreeGrid = $('#dGrpTreeGrid');
    },

    /** add event */
    observe: function() {
        $('button').bind('click', function (event) {
            Main.eventControl(event);
        });
    },

    /** event handler */
    eventControl: function(event) {
        var curTarget = event.currentTarget;
        switch(curTarget.id) {
            case 'btnAdd':
                this.addCustUser();
                break;
            case 'btnEdit':
                this.editCustUser();
                break;
            case 'btnDel':
                this.delCustUser();
                break;
            case 'btnSend':
                this.sendSms();
                break;
            case 'btnAdd_grp':
                this.addSmsGrp();
                break;
            case 'btnEdit_grp':
                this.editSmsGrp();
                break;
        }
    },

    /** init design */
    initDesign: function() {
        $('#mainSplitter').jqxSplitter({ width: '99.8%', height: '99.8%', orientation: 'vertical', theme: jqxTheme, panels: [{ size: 254, collapsible: true }, { size: '100%' }] });
        // 좌측 탭영역
        HmTreeGrid.create($dGrpTreeGrid, HmTree.T_GRP_SMS, Main.search, {}, ['smsNm']);

        HmGrid.create($custUsergGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: "json",
                    url: ctxPath + '/api/main/sys/getCustUserList',
                    beforeprocessing: function(data) {
                        if(data != null){
                            totalCnt = data.resultData.length;
                        }
                    },
                    data: {userId : userId}
                },{
                    formatData: function(data) {
                        var treeItem = HmTreeGrid.getSelectedItem($dGrpTreeGrid);
                        var smsGroupSeq = 1;

                        if(treeItem != null){
                            smsGroupSeq = treeItem.grpNo
                        }

                        $.extend(data, {
                            smsGroupSeq: smsGroupSeq
                        });
                        return data;
                    }
                }
            ),
            height: '100%',
            pageable : true,
            pagermode: 'default',
            columns: [
                { text : 'NO', 	datafield : '', cellsalign:'center', width : '5%' ,
                    cellsrenderer: function(row, column, value, rowData) {
                        return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row)*1 +"</div>";
                    }
                },
                { text: '그룹',	datafield: 'smsGroupName', cellsalign:'center', width:'15%'},
                { text: '이름',	datafield: 'custNm', cellsalign:'center', width:'30%'},
                { text: '전화번호', datafield: 'custCellNo', cellsalign:'center', width:'20%'  },
                { text: '이메일', datafield: 'custMailAddr', cellsalign:'center', width: 'auto'  }
            ]
        });
    },

    /** init data */
    initData: function() {
    },

    addCustUser: function () {
        var params = {
            userId:userId,
            custUserList:$custUsergGrid.jqxGrid('source').originaldata
        }

        $.get(ctxPath + '/main/popup/sys/pCustUserAdd.do',
            function(result) {
                HmWindow.open($('#pwindow'), '사용자 등록', result, 380, 230,'pwindow_init',params);
            }
        );
    },

    editCustUser: function () {

        var rowIdx = HmGrid.getRowIdx($custUsergGrid, '데이터를 선택해주세요.');
        if (rowIdx === false) return;
        var rowdata = HmGrid.getRowData($custUsergGrid, rowIdx);

        $.extend(rowdata,{custUserList:$custUsergGrid.jqxGrid('source').originaldata});
        $.get(ctxPath + '/main/popup/sys/pCustUserEdit.do',
            function (result) {
                HmWindow.open($('#pwindow'), '사용자 수정', result, 380, 230, 'pwindow_init', rowdata);

            }
        );
    },

    delCustUser: function () {

        var rowIdx = HmGrid.getRowIdx($custUsergGrid, '데이터를 선택해주세요.');
        if (rowIdx === false) return;
        var rowdata = HmGrid.getRowData($custUsergGrid, rowIdx);

        if(!confirm("선택한 사용자를 지우시겠습니까?")) return;

        Server.post('/api/main/sys/delCustUser', {
            data: rowdata,
            success: function (result) {
                alert("삭제되었습니다.");
                HmGrid.updateBoundData($custUsergGrid);
            }
        });

    },
    sendSms: function () {
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
        }
        $.get(ctxPath + '/main/popup/sys/pCustUserSms.do',
            function(result) {
                HmWindow.open(pwin, 'SMS 전송', result, 800, 570,'smsPop_init',params);
            }
        );
    },
    addSmsGrp: function () {
        var pwin = $('#pSmsGrpWindow');
        try {
            if(pwin.length == 0) {
                pwin = $('<div id="pSmsGrpWindow" style="position: absolute;"></div>')
                pwin.append($('<div></div>'));
                pwin.append($('<div></div>'));
                $('body').append(pwin);
            }
            HmWindow.create(pwin);
        } catch(e) {}

        var params = {
        }
        $.get(ctxPath + '/main/popup/sys/pSmsGrpAdd.do',
            function(result) {
                HmWindow.open(pwin, 'SMS 그룹 추가', result, 400, 180,'pwindow_init',params);
            }
        );
    },

    editSmsGrp: function () {
        var pwin = $('#pSmsGrpWindow');
        try {
            if(pwin.length == 0) {
                pwin = $('<div id="pSmsGrpWindow" style="position: absolute;"></div>')
                pwin.append($('<div></div>'));
                pwin.append($('<div></div>'));
                $('body').append(pwin);
            }
            HmWindow.create(pwin);
        } catch(e) {}

        var grpSelection = $dGrpTreeGrid.jqxTreeGrid('getSelection');
        if(grpSelection.length == 0) {
            alert('그룹을 선택해주세요.');
            return;
        }
        var treeItem = grpSelection[0];
        if(treeItem.grpNo == 1){
            alert("최상위 그룹은 수정이 불가능 합니다.");
            return;
        }
        $.get(ctxPath + '/main/popup/sys/pSmsGrpEdit.do',
            function(result) {
                HmWindow.open(pwin, 'SMS 그룹 수정', result, 400, 150,'pwindow_init',treeItem);
            }
        );
    },

    search: function () {
        HmGrid.updateBoundData($custUsergGrid);
    }
};

$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});