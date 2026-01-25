<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="tableBorder">
	<table>
	    <tr class="pop_grid ">
	        <td class="pop_gridSub">게시판명</td>
			<td>
				<input type="text" id="p_boardType" name="boardType"  class="pop_inputWrite"  readonly="readonly" style="border: none;">
			</td>
	    </tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">허용확장자</td>
			<td>
				<%--<input type="text" id="p_fileExt" name="fileExt"  class="pop_inputWrite" >--%>
					<div id="p_fileExt"  class="pop_combo1"></div>
					<input type="hidden" id="fileExtScope">
			</td>
		</tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">Upload용량(Mbyte)</td>
			<td>
				<div id="p_fileSize" class="pop_combo1" style="margin-left: 6px;"></div>
			</td>
		</tr>
	</table>
</div>
<div style="text-align:center; margin-top:10px;">
	<button id="pbtnEdit" type="button" class="p_btnSave"></button>
	<button id="pbtnClose" type="button" class="p_btnClose"></button>
</div>

<script>
    var rowdata;
    function pwindow_init(data) {
        rowdata = HmGrid.getRowData($boardSettingGrid);

        $('#p_fileSize').jqxNumberInput({ inputMode: 'simple',  width: '95%', height: 21, min: 0, max: 200, decimalDigits: 0, spinButtons: true });
        $('#p_boardType').val(rowdata.menuName);
        $('#p_fileSize').val(rowdata.fileSize);

        var fileExt = new $.jqx.dataAdapter(
            { datatype: 'json', url: ctxPath + '/main/sys/getBoardMgmt.do' },
            { formatData : function(data) {$.extend(data, { comCode1: '4016' , codeLvl: '2'});  return data;		}}
        );
        $('#p_fileExt').jqxComboBox({ checkboxes: true,  width: 100, height: 21, autoDropDownHeight: true,
            source: fileExt
        }).on('bindingComplete', function (event) {
            	var fileExts = rowdata.fileExt.split(',');
				fileExts.forEach(function (v, i) {
                    $('#p_fileExt').jqxComboBox('checkItem',v);
                });
        }).on('checkChange', function (event) {
            if (event.args) {
                var item = event.args.item;
                if (item) {
                    var items = $("#p_fileExt").jqxComboBox('getCheckedItems');
                    var checkedValues = '';
                    $.each(items, function (index) {
                        checkedValues += this.originalItem.label;
                        if(index < items.length - 1) {
                            checkedValues += ",";
                        }
                    });

                    $("#fileExtScope").val(checkedValues);
                }
            }
        });
    }
	$('#pbtnClose').click(function() {
		$('#pwindow').jqxWindow('close');
	});
	$('#pbtnEdit').click(function() {
	    if(!confirm('수정하시겠습니까?')) return;

	    var params = {
			guid: rowdata.guid,
			fileExt :   $("#fileExtScope").val(),
			fileSize :  $('#p_fileSize').val()
		};

        Server.post('/api/main/sys/editBoardMgmt', {
            data: params,
            success: function(result) {

                alert("수정되었습니다.");
                $('#pwindow').jqxWindow('close');
                HmGrid.updateBoundData($boardSettingGrid, ctxPath + '/main/sys/getBoardMgmtList.do');
            }
        });
	});

</script>