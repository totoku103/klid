<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="com.klid.webapp.common.SessionManager" %>
<%@ page import="com.klid.webapp.common.dto.UserDto" %>
<%
    UserDto user = SessionManager.getUser();
    String authMain = user != null ? user.getAuthMain() : "";
    String authSub = user != null ? user.getAuthSub() : "";

    boolean isAdmin = "AUTH_MAIN_1".equalsIgnoreCase(authMain);
    boolean canCancel = "AUTH_MAIN_2".equalsIgnoreCase(authMain) && "AUTH_SUB_3".equalsIgnoreCase(authSub);
%>
<html>
<head>
    <title>사용자 관리 요청 확인</title>
    <style>
        .grid-container span {
            margin: 3px;
        }

        .compare-table {
            table-layout: fixed;
            width: 100%;
            border-collapse: collapse;
        }

        .compare-table th, .compare-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .compare-table th {
            background-color: #f2f2f2;
            font-weight: bold;
        }

        .changed {
            background-color: #ffffcc;
        }

        .unchanged {
            background-color: #f9f9f9;
        }

        .loading {
            text-align: center;
            padding: 20px;
        }

        .error {
            color: red;
            text-align: center;
            padding: 20px;
        }

        .button-container {
            margin-top: 20px;
            text-align: center;
        }

        .button-container button {
            margin: 0 10px;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }

        .btn-approve {
            background-color: #28a745;
            color: white;
        }

        .btn-reject {
            background-color: #dc3545;
            color: white;
        }

        .btn-cancel {
            background-color: #6c757d;
            color: white;
        }

        .btn-approve:hover {
            background-color: #218838;
        }

        .btn-reject:hover {
            background-color: #c82333;
        }

        .btn-cancel:hover {
            background-color: #5a6268;
        }
    </style>
</head>
<body>
<div class="grid-container">
    <span>
        요청 데이터 비교
    </span>
    <div id="loading" class="loading" style="display: none;">
        데이터를 로드 중입니다...
    </div>
    <div id="error" class="error" style="display: none;">
        데이터를 불러오는 중 오류가 발생했습니다.
    </div>
    <table id="compareTable" class="compare-table" style="display: none; margin-top: 5px;">
        <thead>
        <tr>
            <th>항목</th>
            <th>기존값</th>
            <th>변경값</th>
        </tr>
        </thead>
        <tbody id="compareTableBody">
        </tbody>
    </table>

    <div style="margin-top: 5px;">
        <div>
            <span>요청 사유</span>
        </div>
        <textarea id="request-reason" style="width: 100%; height: 100px; resize: none; margin-top: 5px;"
                  readonly></textarea>
    </div>

    <!-- 프로세스 상태에 따른 버튼 표시 -->
    <div id="button-container" class="button-container">
        <% if (isAdmin) { %>
        <button type="button" id="btn-cancel" class="btn-new" onclick="approveRequest()" style="width: 100px;">
            <svg>
                <use href="#icon-save"></use>
            </svg>
            승인
        </button>
        <button type="button" id="btn-cancel" class="btn-new" onclick="rejectRequest()" style="width: 100px;">
            <svg>
                <use href="#icon-delete"></use>
            </svg>
            반려
        </button>
        <% } %>
        <% if (canCancel) { %>
        <button type="button" id="btn-cancel" class="btn-new" onclick="cancelRequest()" style="width: 100px;">
            <svg>
                <use href="#icon-delete"></use>
            </svg>
            요청 취소
        </button>
        <% } %>
    </div>
</div>

<script>
    $(document).ready(function () {
        // 팝업에서 호출될 때까지 대기
        if (typeof pwindow_init_data === 'undefined') {
            $('#loading').text('팝업 초기화 중...').show();
        } else {
            loadCompareUserInfo();
        }
    });

    function loadCompareUserInfo() {
        // requestPopupPage에서 전달받은 파라미터 사용
        if (typeof pwindow_init_data !== 'undefined' && pwindow_init_data) {
            const commUserSeq = pwindow_init_data.originUserSeq;
            const commUserRequestSeq = pwindow_init_data.commUserRequestSeq;
            const processState = pwindow_init_data.processState;

            $('#request-reason').val(pwindow_init_data.requestReason)

            if (!commUserRequestSeq || !processState) {
                $('#error').text('필수 파라미터가 누락되었습니다.').show();
                return;
            }

            $('#loading').show();
            $('#error').hide();
            $('#compareTable').hide();

            $.ajax({
                url: '/main/env/user-management/history/compare/user-info.do',
                type: 'POST',
                data: {
                    commUserSeq: commUserSeq,
                    commUserRequestSeq: commUserRequestSeq
                },
                dataType: 'json',
                success: function (data) {
                    $('#loading').hide();
                    if (data && data.length > 0) {
                        displayCompareData(data);
                        $('#compareTable').show();
                        parent.Main.searchUserHistory();
                    } else {
                        if (data.hasError) {
                            const message = data.errorInfo.message;
                            HmWindow.setSize($('#pwindow'), 900, 300);
                            if (message) {
                                $('#error').text(message).show();
                            } else {
                                $('#error').text('비교할 데이터가 없습니다.').show();
                            }
                        }
                    }
                },
                error: function (xhr, status, error) {
                    $('#loading').hide();
                    $('#error').text('데이터를 불러오는 중 오류가 발생했습니다: ' + error).show();
                    console.error('AJAX Error:', error);
                }
            });
        } else {
            $('#error').text('팝업 데이터를 찾을 수 없습니다.').show();
        }
    }

    // 팝업 초기화 함수 (requestPopupPage에서 호출됨)
    function pwindow_init(data) {
        window.pwindow_init_data = data;
        loadCompareUserInfo();
    }

    function formatYNValue(value) {
        if (value === 'Y') return '예';
        if (value === 'N') return '아니오';
        return value || '';
    }

    function displayCompareData(data) {
        const tbody = $('#compareTableBody');
        tbody.empty();

        data.forEach(function (item) {
            const isChanged = item.oldValue !== item.newValue;
            const rowClass = isChanged ? 'changed' : 'unchanged';

            const row = $('<tr>').addClass(rowClass);
            row.append($('<td>').text(item.key));
            row.append($('<td>').text(formatYNValue(item.oldValue)));
            row.append($('<td>').text(formatYNValue(item.newValue)));

            tbody.append(row);
        });
    }


    // 승인 처리
    function approveRequest() {
        if (pwindow_init_data.processState === 'APPROVAL') {
            alert("이미 처리 되었습니다.");
            return;
        }

        if (pwindow_init_data.processState !== 'REQUEST'
            && pwindow_init_data.processState !== 'REVIEWING') {
            alert("승인 처리할 수는 처리 상태입니다.");
            return;
        }

        if (!confirm('요청을 승인하시겠습니까?')) {
            return;
        }

        processRequest('APPROVAL', "");
    }

    // 반려 처리
    function rejectRequest() {
        if (pwindow_init_data.processState === 'REJECTION') {
            alert("이미 처리 되었습니다.");
            return;
        }

        if (pwindow_init_data.processState !== 'REQUEST'
            && pwindow_init_data.processState !== 'REVIEWING') {
            alert("반려로 처리할 수는 처리 상태입니다.");
            return;
        }

        if (!confirm('요청을 반려하시겠습니까?')) {
            return;
        }

        const reason = prompt('반려 사유를 입력하세요:');
        if (reason === null || reason.trim() === '') {
            alert('반려 사유는 필수입니다.');
            return;
        }

        processRequest('REJECTION', reason);
    }

    // 요청 취소
    function cancelRequest() {
        if (pwindow_init_data.processState === 'CANCELLATION_REQUEST') {
            alert("이미 요청이 취소 처리 되었습니다.");
            return;
        }

        if (pwindow_init_data.processState !== 'REQUEST') {
            alert("취소 요청을 처리할 수는 없는 상태입니다.");
            return;
        }

        if (!confirm('요청을 취소하시겠습니까?')) {
            return;
        }

        const reason = prompt('취소 사유를 입력하세요:');
        if (reason === null || reason.trim() === '') {
            alert('취소 사유는 필수입니다.');
            return;
        }

        if (typeof pwindow_init_data !== 'undefined' && pwindow_init_data) {
            $.ajax({
                url: '/main/env/user-management/history/request/cancel.do',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    commUserRequestSeq: pwindow_init_data.commUserRequestSeq,
                    requestReason: reason
                }),
                success: function (response) {
                    if (response?.hasError) {
                        alert(response.errorInfo.message);
                        return;
                    }
                    alert('요청이 취소되었습니다.');
                    parent.Main.searchUserHistory();
                    $('#pwindow').jqxWindow('close');
                },
                error: function (xhr, status, error) {
                    debugger;
                    alert('요청 취소 중 오류가 발생했습니다: ' + error);
                    console.error('Cancel request error:', error);
                }
            });
        }
    }

    // 승인/반려 공통 처리 함수
    function processRequest(action, reason) {
        if (typeof pwindow_init_data === 'undefined' || !pwindow_init_data.commUserRequestSeq) {
            alert('요청 데이터를 찾을 수 없습니다.');
            return;
        }

        $.ajax({
            url: '/main/env/user-management/history/request/approve.do',
            type: 'POST',
            data: {
                commUserRequestSeq: pwindow_init_data.commUserRequestSeq,
                approveReason: reason,
                approveType: action
            },
            success: function (response) {
                if (response?.hasError) {
                    alert(response.errorInfo.message);
                    return;
                }

                alert((action === 'APPROVAL' ? '승인' : '반려') + '작업이 처리되었습니다.');
                parent.Main.searchUserHistory();
                $('#pwindow').jqxWindow('close');
            },
            error: function (xhr, status, error) {
                alert('처리 중 오류가 발생했습니다: ' + error);
                console.error('Approve/Reject error:', error);
            }
        });
    }
</script>
</body>
</html>
