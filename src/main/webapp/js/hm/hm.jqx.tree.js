var HmTree = {
		T_GRP_DEFAULT: 1,
		T_GRP_DEFAULT2: 101,
		T_AP_GRP_DEFAULT: 201,
		T_L4_GRP_DEFAULT: 301,
		T_GRP_SERVICE: 2,
		T_GRP_MANG: 3,
		T_GRP_MANG2: 103,
		T_GRP_MANGFLOW: 5,
		T_GRP_MANGFLOW2: 105,
		T_GRP_SERVER: 7,
		T_GRP_SERVER2: 107,
		T_GRP_IF: 8,
		T_GRP_SEARCH: 11,
		T_GRP_SEARCH2: 111,
		T_GRP_AUTHCONF: 12,
		T_GRP_DEF_ALL: 13,
		T_GRP_NETWORK: 99,
		T_GRP_NETWORKFLOW: 98, 
		T_GRP_AS: 4, 
		T_GRP_APP: 6, 
		T_SVR_PERF: 'SVR_PERF',
    	T_GRP_SVCPORT: 222,
    	T_GRP_TOPO: 11111,
		T_GRP_D3TOPO: 3333,
		T_GRP_SVC: 20,
		T_GRP_TOPO_AUTHCONF: 14,
    	T_GRP_TMS: 30,
    	T_GRP_INST: 9,
    	T_GRP_SMS: 100,

    /**
		 * 트리생성시 명칭옆에 장비대수 카운팅 표시
		 * @param $tree
		 * @param type
		 * @param fnSelect
		 * @param params
		 */
		create: function($tree, type, fnSelect, params, theme) {
			var url = undefined;
			if(theme === undefined) theme = jqxTheme;
			if($.isEmpty(params)) params = {};
			switch(type) {
			case HmTree.T_GRP_DEFAULT: url = '/api/grp/getDefaultGrpTreeList'; break;
			case HmTree.T_GRP_SEARCH: url = '/api/grp/getSearchGrpTreeList'; break;
			case HmTree.T_GRP_AUTHCONF: url = '/api/grp/getAuthConfDefaultGrpTreeListAll'; break;
			case HmTree.T_GRP_DEF_ALL: url = '/api/grp/getDefaultGrpTreeListAll'; break;
			case HmTree.T_GRP_IF: url = '/api/grp/getIfGrpTreeList'; break;
			case HmTree.T_GRP_SERVER: url = '/api/grp/getServerGrpTreeList'; break;
			case HmTree.T_GRP_MANG: url = '/api/grp/getMangGrpTreeList'; break;
			case HmTree.T_GRP_MANGFLOW: url = '/api/grp/getMangFlowGrpTreeList'; break;
			case HmTree.T_GRP_SERVICE: url = '/api/grp/getServiceGrpTreeList'; break;
			default: return;
			}
			var adapter = new $.jqx.dataAdapter(
					{
						datatype: 'json',
						root: 'resultData',
						url: null
					},
					{
						autoBind: false,
						async: false,
						formatData: function(data) {
							$.extend(data, params);
							return data;
						},
						loadComplete: function(records) {
							// set icon img
							$.each(records.resultData, function(idx, obj) {
								obj.icon = ctxPath + '/img/folder.png';
							});
							adapter.records = records.resultData;
						}
					}
			);
			adapter._source.url = ctxPath + url;
			adapter.dataBind();
			var records = adapter.getRecordsHierarchy('grpNo', 'grpParent', 'items', [{ name: 'grpName', map: 'label' }, { name: 'grpNo', map: 'value' }]);
			$tree.on('initialized', function (event) {
				$(this).jqxTree('expandItem', $(this).jqxTree('getItems')[0]);
	        	$(this).jqxTree('selectItem', $(this).jqxTree('getItems')[0]);
	        })
	        .on('select', function(event) {
	        	if(fnSelect !== undefined && fnSelect !== null) fnSelect(event);
	        });
			
			if(type == HmTree.T_GRP_AUTHCONF) 
				$tree.jqxTree({ source: records, width: '100%', height: '99.8%', theme: theme, allowDrag: false, hasThreeStates: true, checkboxes: true });
			else
				$tree.jqxTree({ source: records, width: '100%', height: '99.8%', theme: theme, allowDrag: false });
		},
		
		/**
		 * 트리데이터 갱신
		 * @param $tree
		 * @param type
		 * @param boolean selectClear < 초기화시 트리 선택을 최상위로 바꿀것인지
		 */
		updateData: function($tree, type, isClearSelection) {
			var url = undefined;
			if(isClearSelection === undefined) isClearSelection = false;
			var params = {};
			var selectItem = $tree.jqxTree('getSelectedItem');
			switch(type) {
			case HmTree.T_GRP_DEFAULT: url = '/api/grp/getDefaultGrpTreeList'; break;
			case HmTree.T_GRP_SEARCH: url = '/api/grp/getSearchGrpTreeList'; break;
			case HmTree.T_GRP_AUTHCONF: url = '/api/grp/getAuthConfDefaultGrpTreeListAll'; break;
			case HmTree.T_GRP_DEF_ALL: url = '/api/grp/getDefaultGrpTreeListAll'; break;
			case HmTree.T_GRP_IF: url = '/api/grp/getIfGrpTreeList'; break;
			case HmTree.T_GRP_SERVER: url = '/api/grp/getServerGrpTreeList'; break;
			case HmTree.T_GRP_MANG: url = '/api/grp/getMangGrpTreeList'; break;
			case HmTree.T_GRP_MANGFLOW: url = '/api/grp/getMangFlowGrpTreeList'; break;
			case HmTree.T_GRP_SERVICE: url = '/api/grp/getServiceGrpTreeList'; break;
			default: return;
			}
			var adapter = new $.jqx.dataAdapter(
					{
						datatype: 'json',
						root: 'resultData',
						url: null
					},
					{
						autoBind: false,
						async: false,
						formatData: function(data) {
							$.extend(data, params);
							return data;
						},
						loadComplete: function(records) {
							// set icon img
							$.each(records.resultData, function(idx, obj) {
								obj.icon = ctxPath + '/img/folder.png';
							});
							adapter.records = records.resultData;
						}
					}
			);
			adapter._source.url = ctxPath + url;
			adapter.dataBind();
			var records = adapter.getRecordsHierarchy('grpNo', 'grpParent', 'items', [{ name: 'grpName', map: 'label' }, { name: 'grpNo', map: 'value' }]);
			$tree.jqxTree({ source: records });
			if(isClearSelection){
				$tree.jqxTree('expandItem', $tree.jqxTree('getItems')[0]);
				$tree.jqxTree('selectItem', $tree.jqxTree('getItems')[0]);
			} 
			else {
				var itemList = $tree.jqxTree('getItems');
				for(var i in itemList){
					if(itemList[i].value == selectItem.value){
						$tree.jqxTree('selectItem', $tree.jqxTree('getItems')[i]);
						break;
					} 
				}
			}
		}
};