<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<form id="pForm" method="post">
	<div class="scontent">
		<div class="menuContents">
			<div style="float: left; width: 100%; height: 90%; margin-bottom: 10px;">
				<div id="menuListGrid"></div>
			</div>
	<div style="text-align: center; margin-top: 10px;">
		<button id="pbtnSave" type="button" class="p_btnPlus"></button>
		<button id="pbtnClose" type="button" class="p_btnClose"></button>
	</div>
		</div>
	</div>

</form>
<script>
		var menuDataIds = [];

		function pwindow_init() {
			HmGrid.create($('#menuListGrid'), {
				source : new $.jqx.dataAdapter(
						{
                            url: ctxPath + '/engineer/popup/getDefineMenuList.do',
						    datatype: 'json' ,
 							updaterow: function(rowid, rowdata, commit) {
								if(menuDataIds.indexOf(rowid) == -1)
									menuDataIds.push(rowid);
				            	commit(true);
				            },
				            addrow: function(rowid, rowdata, position, commit) {
				            	$.each(rowid, function(idx, value) {
				            		menuDataIds.push(value);
				            	});
				            	commit(true);
				            }
						},
						{
							loadComplete: function(records) {
								menuDataIds = [];
							}
						}
				),
				height: '100%',
				columnsheight: 30,
				rowsheight: 25,
				altrows: false,
				theme : jqxTheme,
				pageable : false,
				editable: true,
				columns : [
					{ text : '메뉴번호', datafield : 'menuNo', width : 80 , hidden: true },
					{ text : '메뉴명', datafield : 'menuNm', minwidth : 150 , editable: false },
					{ text : '설명', datafield : 'menuDesc', minwidth : 150 , editable: false },
					{ text : 'guid', datafield : 'guid', minwidth : 100 , hidden : true},
					{ text : '권한', datafield : 'menuAuth', width : 80 , columntype: 'dropdownlist',
						createeditor: function(row, value, editor) {
							var s = [
							         	{ label: 'User',	value: 1 },
							         	{ label: 'Admin',	value: 2 },
							         	{ label: 'System',	value: 3 }
							         ];
							editor.jqxDropDownList({ source: s, autoDropDownHeight: true, displayMember: 'label', valueMember: 'value'});
						}
					},
					{ text : '순서', datafield : 'visibleOrder', width : 60, columntype: 'numberinput'},
					{ text : '추가여부', datafield : 'addYn', width : 60 , columntype: 'checkbox'},
					{ text : '웹 사용', datafield : 'isWebuse', width : 60 , columntype: 'checkbox'},
				]

			});

			var datarow1 = $pageGrid.jqxGrid('getrowdata', 0);
			var datarow2 = $pageGroupGrid.jqxGrid('getrowdata', 0);
			var datarow3 = $menuGrid.jqxGrid('getrowdata', 0);

//			var rowIdx = HmGrid.getRowIdx($menuGrid);
			var getMenuList = $menuGrid.jqxGrid('getrows');
			var menuList = $('#menuListGrid').jqxGrid('getrows');


 			$.each(getMenuList, function(idx, value) {
				var getGuid = value.guid;
				var getMenuAuth= value.menuAuth;
				var getMenuAuthNM= value.menuAuthNM;
				var getVisibleOrder = value.visibleOrder;
				var getIsWebuse = value.isWebuse;
				var getMenuNo = value.menuNo;
				$.each(menuList, function(index, getValue) {
						if(getGuid.toUpperCase() == getValue.guid){
							$('#menuListGrid').jqxGrid('setcellvalue',getValue.uid,'menuNo',getMenuNo);
							$('#menuListGrid').jqxGrid('setcellvalue',getValue.uid,'menuAuth',getMenuAuthNM);
							$('#menuListGrid').jqxGrid('setcellvalue',getValue.uid,'visibleOrder',getVisibleOrder);
							$('#menuListGrid').jqxGrid('setcellvalue',getValue.uid,'addYn',true);
							$('#menuListGrid').jqxGrid('setcellvalue',getValue.uid,'isWebuse',getIsWebuse);
							return false;
						}
				});
			});
		}

		// Button 이벤트 처리
		$('#pbtnClose').click(function() {
			$('#pwindow').jqxWindow('close');
		});

		$('#pbtnSave').click(function() {

			HmGrid.endRowEdit($('#menuListGrid'));

			var menuList = $('#menuListGrid').jqxGrid('getrows');
			var getMenuList = $menuGrid.jqxGrid('getrows');

			var _list = [];

			$.each(menuDataIds, function(index, value) {

				var temp = $('#menuListGrid').jqxGrid('getrowdatabyid', value);
				console.log(JSON.stringify(temp));
				_list.push($('#menuListGrid').jqxGrid('getrowdatabyid', value));
				if(temp.addYn == 1){
				if(temp.menuAuth == null || temp.menuAuth.length < 4){
					alert("["+ temp.menuNm + "] 권한을 입력하세요.");
					_list = [];
					return;
				}
				if(temp.visibleOrder == null){
					alert("["+ temp.menuNm + "] 순서를 입력하세요.");
					_list = [];
					return;
				}
				}
			});
			if(_list.length != 0){
	 			Server.post('/api/engineer/popup/addMenu', {
					data: { list: _list ,
						menuPageGrpNo: curMenuPageGrpNo,
						menuPageNo: curMenuNo
						},
					success: function(result) {
						alert('저장되었습니다.');
						menuDataIds = [];
						refreshMenu();
						$('#pwindow').jqxWindow('close');
					}
				});
				}
		});

</script>