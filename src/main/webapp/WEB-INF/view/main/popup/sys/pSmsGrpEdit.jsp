<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<form id="pForm" method="post">
    <div class="tableBorder">
        <table>
            <colgroup>
                <col width="30%">
                <col width="70%">
            </colgroup>
            <tr class="pop_grid">
                <td class="pop_gridSub">그룹명<span style="color: red;">*</span></td>
                <td>
                    <input type="text" id="smsGroupName" class="pop_input" width="120" maxlength="20"/>
                    <input type="hidden" id="smsGroupSeq"/>
                </td>
            </tr>
        </table>
    </div>

    <div style="text-align: center; margin-top: 10px;">
        <button id="pbtnSave_grpEdit" type="button" class="p_btnSave"></button>
        <button id="btnDel_grpEdit" type="button" class="p_btnDel"></button>
        <button id="pbtnClose_grpEdit" type="button" class="p_btnClose"></button>
    </div>
</form>
<script>
    function pwindow_init(params) {
        $("#smsGroupSeq").val(params.grpNo)
		$("#smsGroupName").val(params.grpName.replace(/ /g,''))

        // Button 이벤트 처리
        $('#pbtnClose_grpEdit').click(function () {
            $('#pSmsGrpWindow').jqxWindow('close');
        });

    }

    $('#pbtnSave_grpEdit').click(function () {
        var params = {
            smsGroupSeq : $("#smsGroupSeq").val(),
            smsGroupName: $("#smsGroupName").val()
        }
        Server.post(ctxPath + '/api/main/sys/custUserMgmt/editSmsGroup',{
            data: params,
            success: function(result){
                alert("저장되었습니다.");
                location.reload();
            }
        });

    });

    $('#btnDel_grpEdit').click(function () {
        if(!confirm('해당 그룹에 포함된 모든 사용자는 \n전체그룹으로 이동됩니다. 삭제하시겠습니까?')) return;

        var params = {
            smsGroupSeq : $("#smsGroupSeq").val()
        };

        Server.post(ctxPath + '/api/main/sys/custUserMgmt/delSmsGroup',{
            data: params,
            success: function(result){
                alert("삭제되었습니다.");
                location.reload();
            }
        });
    });
    
</script>