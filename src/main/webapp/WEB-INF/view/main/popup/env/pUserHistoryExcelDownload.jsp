<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/button-new.css">
<%@include file="/icons/icons.html" %>

<form id="excelDownloadForm" name="excelDownloadForm" style="margin-bottom: 0px;">
    <div class="pop_gridTitle">
        <img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 다운로드 사유
    </div>
    <table style="border: 1px solid #989898;">
        <colgroup>
            <col width="90px">
            <col>
        </colgroup>
        <tr class="pop_grid">
            <td class="pop_gridSub">사유(*)</td>
            <td>
                <textarea id="downloadReason" name="downloadReason" style="width: 100%; height: 100px; resize: none;" maxlength="2000" placeholder="엑셀 다운로드 사유를 입력해주세요."></textarea>
            </td>
        </tr>
    </table>

    <div class="pop_gridTitle">
        <img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 엑셀 파일 비밀번호 설정
    </div>
    <table style="border: 1px solid #989898;">
        <colgroup>
            <col width="90px">
        </colgroup>
        <tr class="pop_grid">
            <td class="pop_gridSub">비밀번호(*)</td>
            <td>
                <input type="password" id="excelPassword" name="excelPassword" class="pop_inputWrite4" style="width: 100%;" placeholder="비밀번호 입력" autocomplete="off">
            </td>
        </tr>
        <tr class="pop_grid">
            <td class="pop_gridSub">비밀번호 확인(*)</td>
            <td>
                <input type="password" id="excelPasswordConfirm" name="excelPasswordConfirm" class="pop_inputWrite4" style="width: 100%;" placeholder="비밀번호 재입력" autocomplete="off">
            </td>
        </tr>
    </table>

    <div style="width: 100%; height: 30px; display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 10px;">
        <div style="display: flex; flex-direction: row; align-items: center; gap: 5px;">
            <button id="btnExcelDownload" type="button" class="btn-new">
                <svg>
                    <use href="#icon-download"></use>
                </svg>
                다운로드
            </button>

            <button id="btnExcelCancel" type="button" class="btn-new">
                <svg>
                    <use href="#icon-close"></use>
                </svg>
                취소
            </button>
        </div>
    </div>
</form>

<script>
    function pwindow_init(params) {
        initEventHandlers(params);
    }

    function initEventHandlers(params) {
        // 다운로드 버튼 클릭
        $('#btnExcelDownload').click(function() {
            handleExcelDownload(params);
        });

        // 취소 버튼 클릭
        $('#btnExcelCancel').click(function() {
            $('#pwindow').jqxWindow('close');
        });

        // 엔터키 이벤트 (비밀번호 확인 필드에서)
        $('#excelPasswordConfirm').on('keypress', function(e) {
            if (e.which === 13) {
                handleExcelDownload(params);
            }
        });
    }

    function handleExcelDownload(params) {
        var reason = $('#downloadReason').val().trim();
        var password = $('#excelPassword').val();
        var passwordConfirm = $('#excelPasswordConfirm').val();

        // 유효성 검사
        if (!reason) {
            alert('사유를 입력해주세요.');
            $('#downloadReason').focus();
            return;
        }

        if (reason.length > 2000) {
            alert('사유는 2000자를 초과할 수 없습니다.');
            $('#downloadReason').focus();
            return;
        }

        if (!password) {
            alert('엑셀 파일 비밀번호를 입력해주세요.');
            $('#excelPassword').focus();
            return;
        }

        if (!passwordConfirm) {
            alert('비밀번호 확인을 입력해주세요.');
            $('#excelPasswordConfirm').focus();
            return;
        }

        if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            $('#excelPasswordConfirm').focus();
            return;
        }

        // 팝업 닫기
        $('#pwindow').jqxWindow('close');

        // 콜백 함수 호출 (부모 창에서 실제 다운로드 수행)
        if (params && typeof params.onConfirm === 'function') {
            params.onConfirm({
                reason: reason,
                password: password
            });
        }
    }
</script>
