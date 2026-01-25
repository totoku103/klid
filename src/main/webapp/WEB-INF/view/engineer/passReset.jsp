<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="contentsP10">
    <div class="searchBox">
        <label style="font-weight: bold; color: #ff0000;"></label>
        <div>
            <label>COMM_USER 전체 비밀번호 리셋</label>
            <button id="btnApply" type="button" class="p_btnApply"></button>
        </div>
        <%--<div class="searchBtn">
            <button id="btnApply" type="button" class="p_btnApply"></button>
        </div>--%>
    </div>
    <div class="content" style="top: 40px">
        <div id="grid"></div>
    </div>
    <div id="pwindow" style="position: absolute;">
        <div></div>
        <div></div>
    </div>
</div>

<script>
    $('#btnApply').click(function() {
        if(!confirm('사용자 비밀번호 일괄 초기화: 비밀번호-> 사용자ID \n PASS_RESET_YN -> Y')) return;

        Server.post('/api/main/env/userConf/getAllUserPassReset', {
            data : {},
            success : function() {
                alert("처리되었습니다.")
                //Main.search();
            }
        });

    });

</script>