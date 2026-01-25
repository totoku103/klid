<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<form id="pForm" method="post">
    <div class="tableBorder">
        <table>
            <colgroup>
                <col width="30%">
                <col width="70%">
            </colgroup>
            <tr class="pop_grid">
                <td class="pop_gridSub">상위그룹<span style="color: red;">*</span></td>
                <td>
                    <div id="ddbPntSInstCd" style="margin-left: 3px;">
                        <div id="pntSInstGrid" style="border: none; display: none"></div>
                    </div>
                </td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">그룹명<span style="color: red;">*</span></td>
                <td><input type="text" id="smsGroupName" class="pop_input" style="width: 200px;" maxlength="20"/></td>
            </tr>
        </table>
    </div>

    <div style="text-align: center; margin-top: 10px;">
        <button id="pbtnSave" type="button" class="p_btnPlus"></button>
        <button id="pbtnClose" type="button" class="p_btnClose"></button>
    </div>
</form>
<script>
    function pwindow_init(params) {


		// 상위그룹 -- drop/grid 형식에서 width를 % 줘버리면 grid가 이상하게 그려짐
        $('#ddbPntSInstCd').jqxDropDownButton({ width: 200, height: 22 })
        /*.on('open', function(event) {
            $('#pntSInstGrid').css('display', 'block');
        });*/
        var initContent = '<div style="position: relative; margin-left: 3px; margin-top: 2px">선택해 주세요</div>';
        $('#ddbPntSInstCd').jqxDropDownButton('setContent', initContent);

        HmGrid.create($('#pntSInstGrid'), {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: ctxPath + '/main/sys/custUserMgmt/getSmsGroup.do',
                },
                {
                    formatData: function(data) {
                        $.extend(data, {
                            useYn: 'Y'
                        });
                        return data;
                    }
                }
            ),
            pageable : false,
            sortable :false,
            columns:
            	[
					{ text : '기관코드', datafield : 'grpNo', width : 150, hidden: true },
                    { text: '그룹명', datafield: 'grpName', minwidth: 150 , sortable: false,
                        cellsrenderer: function(row, column, value, rowData) {
                            var dept = $('#pntSInstGrid').jqxGrid('getcellvalue', row, "groupDepth");
                            var dpthBlank = '';
                            if(dept != 1){
                                for(var i=0; i < dept; i++){
                                    dpthBlank = '&nbsp;' + dpthBlank;
                                }
                            }
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-left-align'>" + dpthBlank+value +"</div>";
                        }
                    },
                    { text: 'LEVEL', datafield: 'groupDepth', width: 120 , sortable: false},
                ],
            width: 300, height: 200
        });
        $('#pntSInstGrid').on('rowselect', function(event) {
            var rowdata = $(this).jqxGrid('getrowdata', event.args.rowindex);
            if(rowdata!=null){
	            var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px">' + rowdata.grpName + '</div>';
	            $('#ddbPntSInstCd').jqxDropDownButton('setContent', content);
                $('#ddbPntSInstCd').jqxDropDownButton('close');
            }
        }).on('bindingcomplete', function(event) {
            $('#pntSInstGrid').css('display', 'block');

        }).on('rowclick', function(event){
            /*var rowdata = event.args.row;
            var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px;">' + rowdata.grpName + '</div>';
            console.log(rowdata)
            $('#ddbPntSInstCd').jqxDropDownButton('setContent', content);
            $('#ddbPntSInstCd').jqxDropDownButton('close');*/
        });
        
        // Button 이벤트 처리
        $('#pbtnClose').click(function () {
            $('#pSmsGrpWindow').jqxWindow('close');
        });
        $('#pbtnSave').click(function () {
            var selected_idx = $('#pntSInstGrid').jqxGrid('getselectedrowindex');
            if(selected_idx == -1){
                alert('선택된 데이터가 없습니다.');
                return
            }
            var rowData = $('#pntSInstGrid').jqxGrid('getrowdata', selected_idx);

            var params = {
                smsParentGroupSeq: rowData.grpNo,
                smsGroupName: $("#smsGroupName").val(),
                groupDepth: (rowData.groupDepth + 1) * 1
            }

            Server.post(ctxPath + '/api/main/sys/custUserMgmt/addSmsGroup',{
                data: params,
                success: function(result){
                    alert("추가되었습니다.");
                    location.reload();
                }
            });

		});

        $('#pbtnDupl').click(function () {
			pInstAdd.duplicateChk();
		});
    }
    
</script>