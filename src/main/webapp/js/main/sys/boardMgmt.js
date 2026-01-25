var $boardSettingGrid;

var Main = {
    /** variable */
    initVariable: function() {
        $boardSettingGrid = $('#boardSettingGrid');
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
            case 'btnEdit':
                var rowdata = HmGrid.getRowData($boardSettingGrid);
                if(rowdata==null){
                    alert('선택된 데이터가 없습니다.');
                    return;
                }

                $.get(ctxPath + '/main/popup/sys/pBoardMgmtEdit.do',
                    function(result) {
                        HmWindow.open($('#pwindow'), '게시판 수정', result, 300, 185);
                    }
                );
                
                break;
        }
    },

    /** init design */
    initDesign: function() {
        HmGrid.create($boardSettingGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: "json",
                    url: ctxPath + '/api/main/sys/getBoardMgmtList',
                }
            ),
            height: '100%',
            pageable: false,
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '게시판 관리');
            },
            columns: [
                { text: '게시판고유번호',datafield: 'guid',  hidden: true},
                { text: '게시판명',			datafield: 'menuName',	 minwidth:'40%'  },
                { text: '허용확장자',			datafield: 'fileExt',	width:250, cellsalign: 'center'   },
                { text: 'Upload용량(MByte)',	datafield: 'fileSize',	width:250, cellsalign: 'center' }
            ]
        });
    },
    /** init data */
    initData: function() {
    },
};

$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});