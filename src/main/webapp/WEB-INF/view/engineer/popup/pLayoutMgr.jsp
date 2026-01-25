<%--
  Created by IntelliJ IDEA.
  User: freehan
  Date: 2017-11-01
  Time: 오후 3:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<div style="width:100%;height: 100%">
    <div class="searchBox">
        <div class="searchBtn" >
            <button id="btnLayoutPageAdd" type="button" class="p_btnPlus"></button>
            <button id="btnLauoutPageMod" type="button" class="p_btnAdj"></button>
            <button id="btnLauoutPageDel" type="button" class="p_btnDel"></button>
        </div>
    </div>
    <div class="contents" style="width:100%;height: 92%">
        <div id="layoutSettingGrid" style="width:100%;"></div>
    </div>
</div>
<div id="pLayoutPageAddWindow" style="position: absolute;">
    <div></div>
    <div></div>
</div>
    <script>
        var $layoutSettingGrid;
        var pMain = {
            /** variable */
            initVariable: function() {
                $layoutSettingGrid = $('#layoutSettingGrid');
                HmWindow.create($('#pLayoutPageAddWindow'));

            },
            /** add event */
            observe: function () {
                $('button').bind('click', function(event) { pMain.eventControl(event); });
            },

            /** event handler */
            eventControl: function(event) {
                var curTarget = event.currentTarget;
                switch(curTarget.id) {
                    case 'btnLayoutPageAdd': this.layoutPageAdd(); break;
                    case  'btnLauoutPageMod': this.modify(); break;
                    case  'btnLauoutPageDel' : this.delPage(); break;
                }
            },
            /** init design */
            initDesign: function() {
                HmGrid.create($layoutSettingGrid, {
                    source : new $.jqx.dataAdapter(
                        {
                            type: 'POST',
                            datatype : 'json',
                            url: ctxPath + '/engineer/popup/getLayoutMenuPage.do'
                        }
                    ),
                    pageable : true,
                    editable: true,
                    selectionmode: 'selectedrow',
                    columns : [
                        {text: 'GUID', datafield: 'guid', cellsalign: 'center', width: 300, editable: false},
                        {text: '메뉴명', datafield: 'menuName', minwidth: 70, cellsalign: 'left', editable: false},
                        {text: '그룹표현', datafield: 'grpType', width: 150, editable: false}
                    ]
                }, CtxMenu.NONE);
            },
            /** init data */
            initData: function() {
                pMain.search();
            },

            layoutPageAdd: function() {
                $.post(ctxPath + '/engineer/popup/pLayoutPageAdd.do', function(result) {
                        HmWindow.open($('#pLayoutPageAddWindow'), '메뉴 추가', result, 400, 180, 'p2window_init');
                    }
                );
            },
            search: function () {
                HmGrid.updateBoundData($layoutSettingGrid);
            },
            modify: function () {
                var rowIdxes = HmGrid.getRowIdx($layoutSettingGrid);
                if(rowIdxes === false) return;
                var rowdata = $layoutSettingGrid.jqxGrid('getrowdata', rowIdxes);

                $.post(ctxPath + '/engineer/popup/pLayoutPageEdit.do', function(result) {
                        HmWindow.open($('#pLayoutPageAddWindow'), '메뉴 수정', result, 400, 180, 'p2window_init', rowdata);
                    }
                );
            },
            delPage: function () {
                var rowIdxes = HmGrid.getRowIdx($layoutSettingGrid);
                if(rowIdxes === false) return;
                var rowdata = $layoutSettingGrid.jqxGrid('getrowdata', rowIdxes);

                if(!confirm('[' + rowdata.menuName + '] 를 삭제하시겠습니까?\r\n메뉴에 추가된 경우 해당 메뉴도 삭제됩니다.')) return;

                Server.post('/api/engineer/popup/delLayoutMenuPage', {
                    data: { guid: rowdata.guid },
                    success: function(result) {
                        $layoutSettingGrid.jqxGrid('deleterow', rowdata.uid);
                        alert('삭제되었습니다.');
                    }
            });
            }
        };
        $(function () {
            pMain.initVariable();
            pMain.observe();
            pMain.initDesign();
            pMain.initData();
        });
    </script>
</body>
</html>
