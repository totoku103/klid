var Main = {
    userHistoryGrid: null,
    userHistoryGridHeaders: null,
    userHistoryGridGroupHeaders: null,
    /** 변수 초기화 */
    initVariable: function () {
        Main.userHistoryGrid = $('#user-history-grid');
    },

    /** 이벤트 바인딩 */
    observe: function () {
        // 버튼 클릭 이벤트
        $('button').bind('click', function (event) {
            Main.handleButtonClick(event);
        });

        // 검색 영역 키업 이벤트 (엔터키)
        $('.searchBox').bind('keyup', function (event) {
            Main.handleKeyUp(event);
        });

        this.bindGridRowDoubleClickEvent();
    },

    /** 버튼 클릭 이벤트 핸들러 */
    handleButtonClick: function (event) {
        var targetId = event.currentTarget.id;

        switch (targetId) {
            case 'btn-search':
                this.searchUserHistory();
                break;
            case 'button-export-excel':
                this.downloadExcel();
                break;
            default:
                break;
        }
    },

    downloadExcel: function () {
        // 엑셀 다운로드 팝업 열기
        const popupData = {
            onConfirm: function (result) {
                Main.performExcelDownload(result.reason, result.password);
            }
        };

        $.post(ctxPath + '/main/popup/env/pUserHistoryExcelDownload.do', {},
            function (html) {
                HmWindow.open($('#pwindow'), '엑셀 다운로드', html, 500, 315, 'pwindow_init', popupData);
                $('.jqx-window-modal').css("z-index", "799");
                $('#pwindow').css("z-index", "800");
            }
        );
    },

    toHumanFormat: function (ymdhms) {
        const yyyy = ymdhms.substring(0, 4);
        const month = ymdhms.substring(4, 6);
        const day = ymdhms.substring(6, 8);
        const hour = ymdhms.substring(8, 10);
        const minute = ymdhms.substring(10, 12);
        const second = ymdhms.substring(12, 14);

        return `${yyyy}-${month}-${day} ${hour}:${minute}:${second}`;
    },

    performExcelDownload: function (reason, password) {
        const groupMaps = new Map(Main.userHistoryGridGroupHeaders.map(d => [d.name, d.text]))
        const groupHeaderRow1 = Main.userHistoryGridHeaders.filter(d => d.hidden !== true)
            .map(d => d.hasOwnProperty('columngroup') ? d.columngroup : null)
            .map(d => groupMaps.get(d))

        // headers를 List<Map<String, String>> 형태로 변환
        const headersList = Main.userHistoryGridHeaders
            .filter(d => d.hidden !== true)
            .map(d => {
                const headerMap = {};
                headerMap[d.datafield] = d.text;
                return headerMap;
            });

        const rows = Main.userHistoryGrid.jqxGrid('getRows')
        const data = {
            fileName: "사용자_정보_변경_이력",
            sheetName: "사용자_정보_변경_이력",
            groupHeaders: groupHeaderRow1,
            headers: headersList,
            rows: rows,
            reason: reason,
            password: password,
            searchOptions: JSON.stringify(Main.getSearchParams())
        }
        const url = "/api/main/env/user-management/history/excel/download"
        fetch(url, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.headers.get("Content-Type").indexOf('application/json') > -1) {
                    const data = response.json();
                    if (data.hasError) {
                        const info = data.errorInfo;
                        throw new Error(info.message);
                    }
                    return;
                }
                return response;
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('파일 다운로드 실패: ' + response.statusText);
                }

                // Content-Disposition 헤더에서 파일명 추출
                const contentDisposition = response.headers.get('Content-Disposition');
                let fileName = data.fileName + '.xlsx';

                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';]+)["']?/i);
                    if (fileNameMatch && fileNameMatch[1]) {
                        fileName = decodeURIComponent(fileNameMatch[1]);
                    }
                }

                return response.blob().then(blob => ({blob, fileName}));
            })
            .then(({blob, fileName}) => {
                // Blob을 사용하여 파일 다운로드
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();

                // 메모리 정리
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('Excel 다운로드 중 오류 발생:', error);
                alert('엑셀 파일 다운로드 중 오류가 발생했습니다: ' + error.message);
            });
    },

    /** 키업 이벤트 핸들러 */
    handleKeyUp: function (event) {
        if (event.keyCode === 13) { // Enter key
            Main.searchUserHistory();
        }
    },

    /** UI 컴포넌트 초기화 */
    initDesign: function () {
        HmDropDownBtn.createDeptTreeGrid($('#search-institution-container'), $('#tree-grid-search-institution'), 'area', '15%', 22, '98%', 350, null);
        $('#tree-grid-search-institution').on('rowSelect', function (event) {
            const args = event?.args;
            if (!args) {
                console.error("그리드 선택 대상 없음")
                return
            }

            const selectedInstCd = args.row.instCd;
            const elementById = document.getElementById('search-institution-cd');
            if (elementById) elementById.value = selectedInstCd;
        });

        // 변경유형 드롭다운 생성
        $('#search-request-type').jqxDropDownList({
            source: [
                {label: '전체', value: ''},
                {label: '등록 요청', value: 'REGISTRATION_REQUEST'},
                {label: '삭제 요청', value: 'DELETION_REQUEST'},
                {label: '수정 요청', value: 'MODIFICATION_REQUEST'},
                {label: '비밀번호 초기화 요청', value: 'PASSWORD_RESET_REQUEST'},
                {label: 'OTP 초기화 요청', value: 'OTP_SECRET_KEY_RESET_REQUEST'},
                {label: '인증서 초기화 요청', value: 'GPKI_SERIAL_NO_RESET_REQUEST'},
                {label: '계정 잠김 초기화 요청', value: 'ACCOUNT_LOCK_RESET_REQUEST'},
                {label: '장기 미접속자 초기화 요청', value: 'INACTIVE_RESET_REQUEST'}
            ],
            width: '200px',
            height: '23px',
            selectedIndex: 0
        });

        // 처리상태 드롭다운 생성
        $('#search-process-state').jqxDropDownList({
            source: [
                {label: '전체', value: ''},
                {label: '요청', value: 'REQUEST'},
                {label: '요청 취소', value: 'CANCELLATION_REQUEST'},
                {label: '검토', value: 'REVIEWING'},
                {label: '승인', value: 'APPROVAL'},
                {label: '반려', value: 'REJECTION'}
            ],
            width: '150px',
            height: '23px',
            selectedIndex: 0
        });

        // 날짜 피커 초기화
        this.initDatePicker();

        // 그리드 초기화
        this.initGrid();

        //
        this.bindKeyEvent();
    },

    /** 날짜 피커 초기화 */
    initDatePicker: function () {
        // 현재 날짜
        var today = new Date();
        var todayStr = today.getFullYear() + '-' +
            String(today.getMonth() + 1).padStart(2, '0') + '-' +
            String(today.getDate()).padStart(2, '0');

        // 7일 전 날짜
        var weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        var weekAgoStr = weekAgo.getFullYear() + '-' +
            String(weekAgo.getMonth() + 1).padStart(2, '0') + '-' +
            String(weekAgo.getDate()).padStart(2, '0');

        $('#search-date-from').val(weekAgoStr);
        $('#search-date-to').val(todayStr);

        // 날짜 피커 적용 (jqxDateTimeInput 사용 시)
        if ($.fn.jqxDateTimeInput) {
            $('#search-date-from, #search-date-to').jqxDateTimeInput({
                width: '100px',
                height: '23px',
                formatString: 'yyyy-MM-dd'
            });
        }
    },
    strToDateHumanFormat: function (row, column, value) {
        if (!value) return '';
        const year = value.substring(0, 4);
        const month = value.substring(4, 6);
        const day = value.substring(6, 8);
        const hour = value.substring(8, 10);
        const minute = value.substring(10, 12);
        const second = value.substring(12, 14);
        return `<div style="margin-top: 6px; text-align:center;">${year}-${month}-${day} ${hour}:${minute}:${second}</div>`;
    },

    /** 그리드 초기화 */
    initGrid: function () {
        Main.userHistoryGridHeaders = [
            {
                text: '변경 요쳥 일자',
                datafield: 'requestRegDt',
                columngroup: 'req',
                align: 'center',
                cellsalign: 'center',
                width: 150,
                cellsrenderer: this.strToDateHumanFormat
            },
            {
                text: '처리 상태',
                datafield: 'processStateMessage',
                columngroup: 'req',
                align: 'center',
                cellsalign: 'center',
                width: 100
            },
            {
                text: '유형',
                datafield: 'requestTypeMessage',
                columngroup: 'req',
                align: 'center',
                cellsalign: 'center',
                width: 140
            },
            {
                text: '사유',
                datafield: 'requestReason',
                columngroup: 'req',
                align: 'center',
                cellsalign: 'left',
                minwidth: 200
            },
            {
                text: 'seq',
                datafield: 'commUserRequestSeq',
                align: 'center',
                cellsalign: 'left',
                minwidth: 150,
                hidden: true
            },
            {
                text: 'latestSeq',
                datafield: 'latestCommUserRequestSeq',
                align: 'center',
                cellsalign: 'left',
                minwidth: 150,
                hidden: true
            },
            //
            {
                text: 'commUserSeq',
                datafield: 'originUserSeq',
                columngroup: 'user',
                align: 'center',
                cellsalign: 'left',
                minwidth: 150,
                hidden: true
            },
            {
                text: 'instCd',
                datafield: 'originUserInstCode',
                columngroup: 'user',
                align: 'center',
                cellsalign: 'left',
                minwidth: 150,
                hidden: true
            },
            {
                text: 'ID',
                datafield: 'originUserId',
                columngroup: 'user',
                align: 'center',
                cellsalign: 'left',
                width: 150
            },
            {
                text: '이름',
                datafield: 'originUserName',
                columngroup: 'user',
                align: 'center',
                cellsalign: 'left',
                width: 100
            },
            {
                text: '기관명',
                datafield: 'originUserInstName',
                columngroup: 'user',
                align: 'center',
                cellsalign: 'left',
                width: 130
            },

            {
                text: 'requestUserSeq',
                datafield: 'requestUserSeq',
                columngroup: 'requester',
                align: 'center',
                cellsalign: 'left',
                hidden: true
            },
            {
                text: '이름',
                datafield: 'requestUserName',
                columngroup: 'requester',
                align: 'center',
                cellsalign: 'left',
                width: 100
            },
            {
                text: '기관명',
                datafield: 'requestUserInstName',
                columngroup: 'requester',
                align: 'center',
                cellsalign: 'left',
                width: 130
            },
            {
                text: 'requestInstCd',
                datafield: 'requestUserInstCode',
                columngroup: 'requester',
                align: 'center',
                cellsalign: 'left',
                hidden: true
            },

            {
                text: 'requestType',
                datafield: 'requestType',
                columngroup: 'requester',
                align: 'center',
                cellsalign: 'left',
                hidden: true,
                minwidth: 100
            },


            {
                text: 'requestProcessState',
                datafield: 'requestProcessState',
                align: 'center',
                cellsalign: 'left',
                hidden: true
            },

            {text: 'parentSeq', datafield: 'parentSeq', align: 'center', cellsalign: 'left', hidden: true},

            {
                text: 'approveUserSeq',
                datafield: 'approveUserSeq',
                columngroup: 'approver',
                align: 'center',
                cellsalign: 'left',
                hidden: true
            },
            {
                text: '이름',
                datafield: 'approveUserName',
                columngroup: 'approver',
                align: 'center',
                cellsalign: 'left',
                width: 100
            },
            {
                text: '기관명',
                datafield: 'approveUserInstName',
                columngroup: 'approver',
                align: 'center',
                cellsalign: 'left',
                width: 130
            },
            {
                text: '사유',
                datafield: 'approveReason',
                columngroup: 'approver',
                align: 'center',
                cellsalign: 'left',
                minwidth: 200,
                maxwidth: 250
            },
            {
                text: '일시',
                datafield: 'approveRegDt',
                columngroup: 'approver',
                align: 'center',
                cellsalign: 'left',
                cellsrenderer: this.strToDateHumanFormat,
                width: 150
            },
            {
                text: 'approveInstCd',
                datafield: 'approveUserInstCode',
                columngroup: 'approver',
                align: 'center',
                cellsalign: 'left',
                hidden: true
            },
        ];

        Main.userHistoryGridGroupHeaders = [
            {text: '요청', align: 'center', name: 'req'},
            {text: '사용자', align: 'center', name: 'user'},
            {text: '요청자', align: 'center', name: 'requester'},
            {text: '승인자', align: 'center', name: 'approver'}
        ];

        Main.userHistoryGrid.jqxGrid({
            width: '100%',
            height: '100%',
            columns: Main.userHistoryGridHeaders,
            columngroups: Main.userHistoryGridGroupHeaders,
            sortable: true,
            filterable: true,
            showfilterrow: false,
            pageable: true,
            pagesize: 20,
            pagesizeoptions: ['10', '20', '50', '100'],
            altrows: true,
            enabletooltips: true,
            editable: false,
            selectionmode: 'singlerow',
            theme: 'ui-hamon'
        });
    },

    requestPopupPage: function () {
        const rowIdx = HmGrid.getRowIdx(Main.userHistoryGrid);
        const rowdata = HmGrid.getRowData(Main.userHistoryGrid, rowIdx);

        // rowdata에 프로세스 상태 정보 추가
        const popupData = {
            commUserRequestSeq: rowdata.commUserRequestSeq,
            originUserSeq: rowdata.originUserSeq,
            processState: rowdata.processState,
            requestReason: rowdata.requestReason,
            search: Main.searchUserHistory
        };

        $.post(ctxPath + '/main/popup/env/pUserManagementRequestConfirm.do', {
                commUserRequestSeq: rowdata.commUserRequestSeq,
                originUserSeq: rowdata.originUserSeq
            },
            function (result) {
                if (result?.hasError) {
                    alert(result.errorInfo.message);
                    return;
                }

                HmWindow.open($('#pwindow'), rowdata.requestTypeMessage, result, 900, 790, 'pwindow_init', popupData);
                $('.jqx-window-modal').css("z-index", "799");
                $('#pwindow').css("z-index", "800");
            }
        );
    },

    bindKeyEvent: function () {
        const searchContainer = document.getElementById('user-search-fields');
        searchContainer.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.searchUserHistory();
            }
        })
    },

    bindGridRowDoubleClickEvent: function () {
        Main.userHistoryGrid.on('rowdoubleclick', () => Main.requestPopupPage())
    },

    /** 사용자 이력 검색 */
    searchUserHistory: function () {
        var searchParams = this.getSearchParams();

        console.log(searchParams);
        // 그리드 데이터 소스 업데이트
        var source = {
            type: "POST",
            datatype: 'json',
            // contentType: "application/json; charset=UTF-8",
            url: '/api/main/env/user-management/history/grid',
            data: searchParams
        };

        let processFunction = {
            downloadComplete: function (data) {
                try {
                    if (data && (data.hasError || data.errorInfo)) {
                        const msg = (data.errorInfo && data.errorInfo.message) ? data.errorInfo.message : "알 수 없는 오류가 발생했습니다.";
                        alert(msg);
                        return [];
                    }
                } catch (e) {
                    alert("그리드 응답 처리 중 예외가 발생했습니다.\n\n" + e.message);
                    return [];
                }
                return data;
            },
        }

        Main.userHistoryGrid.jqxGrid('source', new $.jqx.dataAdapter(source, processFunction));
    },

    /** 검색 파라미터 수집 */
    getSearchParams: function () {
        return {
            // instCd: $('#search-institution-code').val() || '',
            searchInstitutionCode: Number($('#search-institution-cd').val()),
            searchUserName: $('#search-user-name').val().trim() || '',
            searchDateFrom: $('#search-date-from').val() || '',
            searchDateTo: $('#search-date-to').val() || '',
            searchRequestType: $('#search-request-type').jqxDropDownList('getSelectedItem')?.value || '',
            searchProcessState: $('#search-process-state').jqxDropDownList('getSelectedItem')?.value || ''
        };
    },

    /** 폼 초기화 */
    resetForm: function () {
        $('#search-user-name').val('');
        $('#search-user-id').val('');
        $('#search-request-type').jqxDropDownList('selectIndex', 0);
        $('#search-process-state').jqxDropDownList('selectIndex', 0);
        this.initDatePicker();
    }
};

// 문서 준비 완료 시 초기화
$(document).ready(function () {
    Main.initVariable();
    Main.initDesign();
    Main.observe();

    // 초기 검색 실행
    Main.searchUserHistory();
});