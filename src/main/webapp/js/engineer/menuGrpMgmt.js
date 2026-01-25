var $authGrpGrid, $menuGrid;

var Main = {
		/** variable */
		initVariable: function() {
			$authGrpGrid = $('#authGrpGrid'), $menuGrid = $('#menuGrid');
		},
		
		/** add event */
		observe: function() {
			$authGrpGrid.on('click', function (event) {
				Main.searchMenu();
			});

            $menuGrid.on("bindingcomplete", function (event) {
                $menuGrid.jqxGrid('selectallrows');
                Main.searchMenu();
            });
			$('button').bind('click', function(event) { Main.eventControl(event); });
		},
		
		/** event handler */
		eventControl: function(event) {
			var curTarget = event.currentTarget;
			switch(curTarget.id) {
				case 'btnSave': this.save(); break;
			}
		},
		
		/** init design */
		initDesign: function() {
			$('#splitter').jqxSplitter({ width: '100%', height: '100%', theme: jqxTheme, orientation: 'vertical' , panels: [{ size: '50%' }, { size: '50%' }] });

			var a = new $.jqx.dataAdapter({ datatype: 'json', url: ctxPath + '/api/grp/getAuthGrpList' });

			HmGrid.create($authGrpGrid, {
				source: new $.jqx.dataAdapter(
						{
							datatype: 'json',
							url: ctxPath + '/api/grp/getAuthGrpList',
						}
				),
				pageable: false,
				ready: function () {
	                $authGrpGrid.jqxGrid('selectrow', 0);
	                
	            },
				columns: 
				[
			 		{ text : '그룹명', datafield : 'authMain',
                        cellsrenderer: function(row, column, value, rowData){
                            var authName = '';
                            if(value == 'AUTH_MAIN_1'){
                                authName = '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">관리자</div>';
                            }else if(value == 'AUTH_MAIN_2'){
                                authName = '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">중앙지원센터</div>';
							}else if(value == 'AUTH_MAIN_3'){
                                authName = '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">시도</div>';
                            }
                            else{
                                authName = '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">시군구</div>';
                            }
                            return authName
                        }
					}
				]
			});

			HmGrid.create($menuGrid, {
	            source: new $.jqx.dataAdapter({
	                dataType: 'json'
	                , url: ctxPath + '/api/menu/getSimpleMenuList'
	            }),
	            columns: [
	                {text: '페이지 그룹', width: 120, datafield: 'pageGrpName'},
	                {text: '메뉴명', datafield: 'menuName'}
	            ]
	            , pageable: false
	            , groupsexpandedbydefault: true
	            , groupable: true
	            , selectionmode: 'checkbox'
	            , groups: ['pageGrpName']
				, showgroupsheader: false
				, sortable :false
			
	        });
	        //$authGrpGrid.jqxTreeGrid({hierarchicalCheckboxes: true, checkboxes: true, filterable: false});
		},
		
		/** init data */
		initData: function() {
			
		},
		
		save: function() {
			var selectedList = $menuGrid.jqxGrid('getselectedrowindexes').sort();
	        var allList = $menuGrid.jqxGrid('getrows').map(function (a) {
	            return a.uid;
	        }).sort();

	        var unSelectedList = allList.filter(function (a) {
	            if (selectedList.indexOf(a) == -1) return true;
	        });
	        
	        var param = new Array();
	        $.each(unSelectedList, function (index, data) {
	            param.push($menuGrid.jqxGrid('getrowdatabyid', data).guid);
	        });
	        jQuery.ajaxSettings.traditional = true;

	        $.ajax({
	            type: 'POST',
	            url: ctxPath + '/api/menu/saveExcludeMenuList',
	            data: {
	                authGrpNo: $authGrpGrid.jqxGrid('getrowdata', $authGrpGrid.jqxGrid('getselectedrowindex')).authMain,
	                guids: param
	            }
	            , success: function (data) {
	                alert("저장 되었습니다.");
	            }
	        });
		},
		
		searchMenu: function () {
	    	var rowIdx = HmGrid.getRowIdx($authGrpGrid);

	        if (rowIdx === false) return;
	        var authGrpNo = $authGrpGrid.jqxGrid('getrowdata', rowIdx).authMain;

	        $menuGrid.jqxGrid('selectallrows');
	        $.ajax({
	            type: 'POST',
	            url: ctxPath + '/api/menu/getExcludeMenuList',
	            data: {authGrpNo: authGrpNo},
	            success: function (data) {
	                if (data.length == 0)
	                    return;

	                var excludeList = $menuGrid.jqxGrid('getrows').filter(function (a) {
	                    var inz = null;
	                    $.each(data, function (index, guid) {
	                        if (a.guid == guid.guid)
	                            inz = a;
	                    });
	                    if (inz != null)
	                        return true;
	                });
	                $.each(excludeList, function (index, data) {
	                    $menuGrid.jqxGrid('unselectrow', data.uid);
	                });
	            }
	        });
	    },
		
};

$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});