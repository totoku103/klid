<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<form id="pForm" method="post" enctype="multipart/form-data">
	<input type="hidden" id="p_nationCd">
    <div class="tableBorder">
        <table>
            <colgroup>
                <col width="20%">
                <col width="30%">
                <col width="20%">
                <col width="30%">
            </colgroup>
            <tr class="pop_grid pop_borderline">
                <td class="pop_gridSub">대륙명</td>
                <td>
                	<span id="p_continental"></span>
                </td>
                <td class="pop_gridSub">국가명</td>
                <td>
                	<span id="p_nationNm"></span>
                </td>
            </tr>
        </table>
		<div style="margin-top: 10px;">
			<div id="pNationIPGrid"></div>
		</div>
    </div>
    <div style="text-align: center; margin-top: 10px;">
		<button id="pbtnExcel" type="button" class="p_btnExcel"></button>
        <button id="pbtnClose" type="button" class="p_btnClose"></button>
    </div>
</form>
<script>
    function pwindow_init(params) {
    	$("#p_nationNm").text(params.nationNm);
    	$("#p_continental").text(params.continental);
    	$("#p_nationCd").val(params.nationCd);
    	
        // Button 이벤트 처리
        $('#pbtnExcel').click(function () {
            pwindow_excel();
        });
        $('#pbtnClose').click(function () {
            $('#pwindow2').jqxWindow('close');
        });

        HmGrid.create($("#pNationIPGrid"), {
			height: 360,        	
			source: new $.jqx.dataAdapter(
					{
						datatype: 'json',
						url: ctxPath + '/main/env/nationIPMgmt/getNationIPList.do'
					}, {
						formatData : function(data) {
							try{
								$.extend(data, {
									nationCd : params.nationCd
								});
							}catch(err){}
							return data;
						}
					}
			),
			columns: 
			[
				{ text : '시작IP', datafield : 'sipStr', minwidth : 120,  cellsalign: 'center' },
				{ text : '종료IP', datafield : 'eipStr', minwidth: 120,  cellsalign: 'center' },
		    ]						
		});
        
    }
    
    function pwindow_excel(){
    	var params = {};
		
		$.extend(params, {
			nationCd : $("#p_nationCd").val(),
			nationNm : $("#p_nationNm").text(),
			continental : $("#p_continental").text()
		});
		
		HmUtil.exportExcel(ctxPath + '/main/env/nationIPMgmt/export_ip.do', params);
    }
    
</script>