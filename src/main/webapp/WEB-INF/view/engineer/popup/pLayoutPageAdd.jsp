<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<form id="p2Form">
	<input type="hidden" id="p2_code" name="code" />
	<table>
		<tr class="pop_grid">
			<td class="pop_gridSub">메뉴명</td>
			<td>
				<input type="text" id="p2_menuName" name="menuName" class="pop_inputWrite" />
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">GRP TYPE</td>
			<td>
				<div id="p2_grpType" class="pop_combo1"></div>
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">COND TYPE</td>
			<td>
				<div id="p2_condType" class="pop_combo1"></div>
			</td>
		</tr>
	</table>
	<div style="text-align:center; margin-top:10px;">
		<button id="p2btnSave" type="button" class="p_btnPlus"></button>
		<button id="p2btnClose" type="button" class="p_btnClose"></button>
	</div>
</form>

<script>
    function p2window_init(rowdata) {

        $('#p2_grpType').jqxDropDownList({ width: '95%', height: 21,
            source: new $.jqx.dataAdapter({
                type: 'POST',
                datatype: 'json',
                    contentType: 'application/json; charset=UTF-8',
                    url: ctxPath + '/layout/getGrpTypeEnumList.do'
                },
                {
                    formatData: function(data) {
                        $.extend(data, {

                        });
                        return JSON.stringify(data);
                    }
                }
            ),
            autoDropDownHeight: true, displayMember: 'display', valueMember: 'value', theme: jqxTheme, selectedIndex: 0
        });


        $('#p2_condType').jqxDropDownList({ width: '95%', height: 21,
            source: new $.jqx.dataAdapter({
                    type: 'POST',
                    datatype: 'json',
                    contentType: 'application/json; charset=UTF-8',
                    url: ctxPath + '/layout/getControlTypeEnumList.do'
                },
                {
                    formatData: function(data) {
                        $.extend(data, {

                        });
                        return JSON.stringify(data);
                    }
                }
            ),
            checkboxes: true,
            autoDropDownHeight: true, displayMember: 'display', valueMember: 'value', theme: jqxTheme
        }).on('bindingComplete', function (event) {
            $('#p2_condType').jqxDropDownList('checkAll');
		});


        $('#p2btnSave').click(function() {
            p2window_save();
        });

        $('#p2btnClose').click(function() {
            HmWindow.close($('#pLayoutPageAddWindow'));
        });
    }


    function p2window_save() {
        var obj = $('#p2Form').serializeObject();
        if($.isBlank(obj.menuName)) {
            alert("메뉴명을 입력해주세요.");
            $('#p2_menuName').focus();
            return;
        }
        var items = $("#p2_condType").jqxDropDownList('getCheckedItems');
        var condType = [];
        items.forEach(function (data, index) {
			condType.push(data.value);
        });
        
        var param = {
            menuName:obj.menuName,
			grpType: $('#p2_grpType').val(),
			condType: condType
		};

        Server.post('/api/engineer/popup/addLayoutMenuPage', {
            data: param,
            success: function(result) {
                alert('추가되었습니다.');
                pMain.search();
                $('#p2btnClose').click();
            }
        });
    }
</script>