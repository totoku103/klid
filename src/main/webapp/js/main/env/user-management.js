var $userGrid
var editUserIds = [];
var userId;
var totalCnt = 0;
var Main = {
    /** variable */
    initVariable: function () {
        $userGrid = $('#userGrid');
    },

    /** add event */
    observe: function () {
        $('button').bind('click', function (event) {
            Main.eventControl(event);
        });
        $('.searchBox').bind('keyup', function (event) {
            Main.keyupEventControl(event);
        });
    },

    /** event handler */
    eventControl: function (event) {
        var curTarget = event.currentTarget;
        switch (curTarget.id) {
            case 'btnSearch':
                this.search();
                break;
            case 'btnAdd':
                this.add();
                break;
            case 'btnDel':
                this.del();
                break;
        }

    },

    keyupEventControl: function (event) {
        if (event.keyCode === 13) {
            Main.search();
        }
    },
    /** init design */
    initDesign: function () {
        HmDropDownBtn.createDeptTreeGrid($('#srchInstCdArea'), $('#srchInstTree'), 'area', '15%', 22, '98%', 350, null);

        $('#srchUseYn').jqxDropDownList({
            source: [
                {label: '예', value: 'Y'},
                {label: '아니오', value: 'N'},
            ],
            displayMember: 'label',
            valueMember: 'value',
            width: 80,
            height: 19,
            theme: jqxTheme,
            selectedIndex: 0,
            autoDropDownHeight: true
        });

        $('#checkbox-inactive-user-option').jqxDropDownList({
            source: [
                {label: '전체', value: null},
                {label: '예', value: 'Y'},
                {label: '아니오', value: 'N'},
            ],
            displayMember: 'label',
            valueMember: 'value',
            width: 80,
            height: 19,
            theme: jqxTheme,
            selectedIndex: 0,
            autoDropDownHeight: true
        });

        HmWindow.create($('#pwindow'), 100, 100);
        HmGrid.create($userGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: ctxPath + '/api/main/env/user-management/request/users',
                    datafields: [
                        {name: 'seq', type: 'number'},
                        {name: 'userId', type: 'string'},
                        {name: 'instCd', type: 'string'},
                        {name: 'userName', type: 'string'},
                        {name: 'grade', type: 'string'},
                        {name: 'moblPhnNo', type: 'string'},
                        {name: 'homeTelNo', type: 'string'},
                        {name: 'offcTelNo', type: 'string'},
                        {name: 'offcFaxNo', type: 'string'},
                        {name: 'emailAddr', type: 'string'},
                        {name: 'smsYn', type: 'string'},
                        {name: 'emailYn', type: 'string'},
                        {name: 'useYn', type: 'string'},
                        {name: 'centerUserYn', type: 'string'},
                        {name: 'regDt', type: 'string'},
                        {name: 'instNm', type: 'string'},
                        {name: 'authMain', type: 'string'},
                        {name: 'authSub', type: 'string'}

                    ],
                },
                {
                    formatData: function (data) {
                        if ($("#srchInstCd").val() === '') {
                            data.instCd = '1100000';
                        } else {
                            data.instCd = $("#srchInstCd").val();
                        }
                        data.useYn = $("#srchUseYn").val();
                        data.userId = $("#srchUserId").val();
                        data.userName = $("#srchUserName").val();
                        data.inactiveUserOption = $('#checkbox-inactive-user-option').val() === '' ? null : $('#checkbox-inactive-user-option').val();
                        return data;
                    },
                    loadError: function (xhr, status, error) {
                        alert("그리드 조회 중 오류가 발생했습니다.\n\n" + error);
                    },
                    downloadComplete: function (data/*, status, xhr*/) {
                        try {
                            if (data && (data.hasError || data.errorInfo)) {
                                const msg = (data.errorInfo && data.errorInfo.message) ? data.errorInfo.message : "알 수 없는 오류가 발생했습니다.";
                                alert( msg);
                                return [];
                            }
                        } catch (e) {
                            alert("그리드 응답 처리 중 예외가 발생했습니다.\n\n" + e.message);
                            return [];
                        }
                        return data;
                    },
                },
            ),
            pageable: true,
            pagermode: 'default',
            columns:
                [
                    {
                        text: 'No',
                        width: '5%',
                        pinned: true,
                        editable: false,
                        sortable: false,
                        cellsalign: 'center',
                        filterable: false,
                        cellsrenderer: function (row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (row + 1) * 1 + "</div>";
                        }
                    },
                    {text: 'SEQ', datafield: 'seq', editable: false, cellsalign: 'left', hidden: true},
                    {text: '이름', datafield: 'userName', width: 'auto', editable: false, cellsalign: 'left'},
                    {text: '아이디', datafield: 'userId', width: '10%', editable: false, cellsalign: 'left'},
                    {text: '직급', datafield: 'grade', width: '10%', editable: false, cellsalign: 'center', hidden: true},
                    {text: '소속기관', datafield: 'instNm', width: '10%', editable: false, cellsalign: 'left'},
                    {text: '사무실 전화번호', datafield: 'offcTelNo', width: '8%', cellsalign: 'left'},
                    {
                        text: '휴대폰 번호', datafield: 'moblPhnNo', width: '8%', cellsalign: 'left',
                        validation: function (cell, value) {
                            if (!$.isBlank(value)) {
                                if (/[^0-9\-]/.test(value)) {
                                    return {result: false, message: '숫자와 특수문자[-]만 입력가능합니다.'};
                                }
                            }
                            return true;
                        }
                    },
                    {text: 'E-Mail', datafield: 'emailAddr', width: '10%'},
                    {
                        text: '메인권한', datafield: 'authMain', width: '8%',
                        cellsrenderer: function (row, column, value, rowData) {
                            var authMain = "";
                            if (value === 'AUTH_MAIN_1') {
                                authMain = '관리자';
                            } else if (value === 'AUTH_MAIN_2') {
                                authMain = '중앙지원센터';
                            } else if (value === 'AUTH_MAIN_3') {
                                authMain = '시도';
                            } else if (value === 'AUTH_MAIN_4') {
                                authMain = '시군구';
                            } else {
                                authMain = '-';
                            }
                            return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">' + authMain + '</div>';
                        }
                    },
                    {
                        text: '서브권한', datafield: 'authSub', width: '8%',
                        cellsrenderer: function (row, column, value, rowData) {
                            var authSub = "";
                            if (value === 'AUTH_SUB_1') {
                                authSub = '관리자';
                            } else if (value === 'AUTH_SUB_2') {
                                authSub = '담당자';
                            } else if (value === 'AUTH_SUB_3') {
                                authSub = '운영자';
                            } else {
                                authSub = '-';
                            }
                            return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">' + authSub + '</div>';
                        }
                    },
                    {
                        text: '등록일', width: '10%', datafield: 'regDt',
                        cellsrenderer: function (row, column, value, rowData) {
                            var parseDate = "";
                            parseDate = HmUtil.parseDate(value);
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">' + parseDate + '</div>';
                        }
                    }
                ],
            editable: false,
            editmode: 'selectedcell'
        });
        $userGrid.on('celldoubleclick', function (event) {
            var rowIdx = HmGrid.getRowIdx($userGrid);
            var rowdata = HmGrid.getRowData($userGrid, rowIdx);
            console.log('rowdata', rowdata);
            $.post(ctxPath + '/main/popup/env/pUserManagementEdit.do',
                function (result) {
                    HmWindow.open($('#pwindow'), '사용자 수정 요청', result, 900, 510, 'pwindow_init', rowdata);
                    $('.jqx-window-modal').css("z-index", "799");
                    $('#pwindow').css("z-index", "800");
                }
            );

        });
    },

    /** init data */
    initData: function () {

    },

    search: function () {
        HmGrid.updateBoundData($userGrid, ctxPath + '/api/main/env/user-management/request/users');
    },

    add: function () {
        $.post(ctxPath + '/main/popup/env/pUserManagementAdd.do',
            function (result) {
                if(result?.hasError) {
                    alert(result?.errorInfo?.message)
                    return;
                }
                HmWindow.open($('#pwindow'), '사용자 등록 요청', result, 900, 510, 'pwindow_init');
                $('.jqx-window-modal').css("z-index", "799");
                $('#pwindow').css("z-index", "800");
            }
        );
    },

    del: function () {
        var rowIdx = HmGrid.getRowIdx($userGrid, '데이터를 선택해주세요.');

        if (rowIdx === false) return;
        var rowdata = HmGrid.getRowData($userGrid, rowIdx);

        if (rowdata.seq === null || rowdata.seq === undefined || rowdata.seq === 0) {
            alert("사용자 정보가 없습니다.");
            return;
        }

        const reason = prompt("선택된 데이터를 삭제하시겠습니까?\n사유를 입력하세요", "");
        if (!reason) {
            return;
        }

        const url = "/api/main/env/user-management/request/delete"
        const params = {
            commUserSeq: rowdata.seq,
            requestReason: reason
        }
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(params)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.hasError) {
                    if (data.errorInfo.code === '200') {
                        alert(data.errorInfo.message);
                        return false;
                    } else throw new Error(data.errorInfo.message);
                } else {
                    alert("요청이 완료되었습니다.");
                }
                return true;
            })
            .then(result => {
                if (result) {
                    HmGrid.updateBoundData($userGrid, ctxPath + '/api/main/env/user-management/request/users');
                }
            })
            .catch(err => alert(err.message));
    }
};


$(function () {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});