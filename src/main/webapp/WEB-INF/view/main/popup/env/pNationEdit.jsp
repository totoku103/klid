<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div style="position: relative;">
    <div class="tableBorder">
        <table>
            <colgroup>
                <col width="30%">
                <col width="70%">
            </colgroup>
            <tr class="pop_grid">
                <td class="pop_gridSub">국가명</td>
                <td>
                	<input type="text" id="p_nationNm2" class="pop_input" maxlength="50" />
                </td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">대륙명</td>
                <td>
                    <select name="result" id="p_continental2" style="margin-left:3px;">
                        <option value="1">아시아</option>
                        <option value="2">유럽</option>
                        <option value="3">북아메리카</option>
                        <option value="4">남아메리카</option>
                        <option value="5">아프리카</option>
                        <option value="6">오세아니아</option>
                        <option value="7"></option>
                    </select>
                </td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">한글명</td>
                <td><input type="text" id="p_krNm2" class="pop_input" maxlength="50" /></td>
            </tr>
        </table>
    </div>

    <div style="text-align: center; margin-top: 10px;">
        <button id="pbtnSave2" type="button" class="p_btnSave"></button>
        <button id="pbtnClose2" type="button" class="p_btnClose"></button>
    </div>
</div>
<script>
    var pnationCd = "";
    function pwindow_init(params) {
        pnationCd = params.nationCd;
        //국가정보 가져오기.
        $.ajax({
            type: 'POST',
            url: ctxPath + '/main/env/nationIPMgmt/getNationDetail.do',
            data: {nationCd : params.nationCd},
            success: function (data) {
               $("#p_nationNm2").val(data.resultData.nationNm);
               $("#p_krNm2").val(data.resultData.krNm);
               $("#p_continental2").val(data.resultData.continental);
            }
        });
    }

    $('#pbtnSave2').click(function() {
        if($("#p_nationNm2").val() == ""){
            alert("국가명을 입력해주세요.");
            return false;
        }
        var params={
            nationCd: pnationCd,
            nationNm: $("#p_nationNm2").val(),
            continental: $("#p_continental2").val(),
            krNm: $("#p_krNm2").val()
        };

        $.ajax({
            type: 'POST',
            url: ctxPath + '/main/env/nationIPMgmt/editNation.do',
            data: params,
            success: function (data) {
                alert("수정완료되었습니다.");
                $('#pwindow').jqxWindow('close');
                Main.search();
            }
        });
    });

    $('#pbtnClose2').click(function() {
        $('#pwindow').jqxWindow('close');
    });

</script>