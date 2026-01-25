var $grid;
var totalCnt = 0;
var Main = {
    /** variable */
    initVariable: function() {
        $grid = $('#grid');
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
            case 'btnSync': this.sync(); break;
            case 'btnApply': this.apply(); break;
        }
    },

    /** init design */
    initDesign: function() {
        HmGrid.create($grid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: ctxPath + '/api/main/acc/accidentApply/getEncrySyncList',
                    updaterow: function(rowid, rowdata, commit) {
                        if(editUserIds.indexOf(rowid) == -1)
                            editUserIds.push(rowid);
                        commit(true);
                    }
                    ,beforeprocessing: function(data) {
                        if(data != null){
                            totalCnt = data.resultData.length;
                        }
                    }
                }
            ),
            columns:
                [
                    { text : '접수번호',   datafield : 'inciNo', align : 'center', width : 150 },
                    { text : 'DCL_EMAIL', datafield : 'dclEmail', align : 'left', cellsalign : 'left', minwidth : 200 },
                    { text : 'DMG_EMAIL', datafield : 'dmgEmail', align : 'left', cellsalign : 'left', minwidth : 200 }
                ],
            editable: false,
            editmode : 'selectedcell',
            pageable : true,
            pageSize : 100
        });

    },

    /** init data */
    initData: function() {
        //this.search();
    },

    search: function() {
        //HmGrid.updateBoundData($grid, ctxPath + '/main/env/userConf/getUserConfList.do');
        HmGrid.updateBoundData($grid);
    },

    sync: function() {
        if(totalCnt == 0){
            alert("암호화 대상 데이터가 없습니다.")
            return false
        };
        if (!confirm("암호화 수동 동기화를 진행 합니다.")) {
            return false
        };
        Server.post('/api/main/acc/accidentApply/updateEncrySync', {
            data : {},
            success : function() {
                alert("완료")
                Main.search();
            }
        });
    },

    apply :  function() {
        var checkText = $("#checkText").val();
        if(checkText == ''){
            alert("암호화 문자열을 입력하세요");
            return;
        }
        Server.post('/api/main/acc/accidentApply/checkEncryText', {
            data : {checkText : checkText},
            success : function(data) {
                alert(data)
            }
        });
    }

};

$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});