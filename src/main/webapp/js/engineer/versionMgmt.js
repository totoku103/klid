var $treeGrid;

var Main = {
    /** variable */
    initVariable: function() {
        $treeGrid = $('#treeGrid');
    },

    /** add event */
    observe: function() {
        $('button').bind('click', function(event) { Main.eventControl(event); });
    },

    /** event handler */
    eventControl: function(event) {
        var curTarget = event.currentTarget;
        switch(curTarget.id) {
            case 'btnSearch': this.search(); break;
            case 'btnAdd': this.addBoard(); break;
        }
    },

    /** init design */
    initDesign: function() {
        var source = { dataType : "json",
            hierarchy : { keyDataField : { name : 'boardNo' }, parentDataField : { name : 'boardParentNo' } }, id : 'boardNo',
            url : $('#ctxPath').val() + '/api/engineer/versionMgmt/getBoardList' };
        var dataAdapter = new $.jqx.dataAdapter(source);

        $treeGrid.jqxTreeGrid(
            {
                width : '100%',
                height : '100%',
                source : dataAdapter,
                theme : jqxTheme,
                pageable : true,
                pageSize : 100,
                pageSizeOptions : [
                    "100", "500", "1000"
                ],
                pagerHeight : 22,
                columnsResize : true,
                columnsHeight : 26,
                sortable : true,
                selectionMode : "singlerow",
                altRows : true,
                columns : [
                    { text : '번호', datafield : 'boardNo', align : 'center', width : 100 },
                    { text : '제목', datafield : 'boardTitle', align : 'center', cellsrenderer : function(row, column, value, rowData) {
                            var marginLeft = 0;
                            var marginImg = "";
                            if (rowData.level > 0) {
                                marginLeft = 10 * rowData.level;
                                marginImg = "<img src='../../img/popup/answer_icon.png' >";
                            }
                            return "<div style='margin-top: 2px; margin-bottom: 2px; margin-left: " + marginLeft + "px;'>" + marginImg + value + "</div>";
                        } },
                    { text : '작성자', datafield : 'userName', align : 'center', width : 100 },
                    { text : '작성시간', datafield : 'printTime', align : 'center', cellsalign : 'center', width : 100 },
                    { text : '조회수', datafield : 'boardHits', align : 'center', cellsalign : 'center', width : 50 }
                ] }).on('bindingComplete', function(event) {
            $treeGrid.jqxTreeGrid('expandAll');
        });
    },

    /** init data */
    initData: function() {
        this.search();
    },

    search: function() {
        $treeGrid.jqxTreeGrid('updateBoundData');
    },

    addBoard: function () {
        HmUtil.createPopup('/engineer/popup/pVersionMgmtAdd.do', $('#hForm'), 'pVersionMgmtAdd', 1000, 600);
    },
    
    delBoard: function () {

    }
};

$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});