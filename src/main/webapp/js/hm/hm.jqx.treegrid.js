var HmTreeGrid = {

	/**
	 * 트리그리드 생성시 명칭옆에 장비대수 카운팅 표시
	 * 
	 * @param $tree
	 * @param type
	 * @param fnSelect
	 * @param params 조건 설정 ( 프로퍼티당 ','로 구분 -> (프로퍼티) devKind1, devKind2 )
	 * @param filterArray  검색조건 설정  ( null: 전체, grpName, devIp)  ex) ['grpName']
	 */
	create : function($treeGrid, type, fnSelect, params, filterArray, theme) {
		var url = undefined;
		if (theme === undefined) theme = jqxTheme;
		if ($.isEmpty(params)) params = {};

		var cols = [];
		if (filterArray === undefined || filterArray.length == 0) {
            cols = [
                { text: '명칭', dataField: 'grpName' },
                { text: 'IP', datafield: 'devIp', hidden: true }
            ]
		} else {
            filterArray.forEach(function (entry) {
            	switch (entry) {
					case  "grpName" :
						cols.push({ text: '명칭', dataField: 'grpName' });
						break;
					case  "devIp" :
                        cols.push({ text: 'IP', datafield: 'devIp' });
                        break;
					case  "instNm" :
                        cols.push({ text: '기관명', datafield: 'grpName' });
                        break;
                    case  "smsNm" :
                        cols.push({ text: '그룹명', datafield: 'grpName' });
                        break;
				}
			});
		}

		switch (type) {
			case HmTree.T_GRP_DEFAULT: case HmTree.T_GRP_DEFAULT2:
				url = '/api/grp/getDefaultGrpTreeList';
				break;
			case HmTree.T_L4_GRP_DEFAULT: //L4
				url = '/api/grp/getL4DefaultGrpTreeList';
				break;
			case HmTree.T_AP_GRP_DEFAULT: // AP건수를 표시
				url = '/api/grp/getApDefaultGrpTreeList';
				break;
			case HmTree.T_GRP_SEARCH: case HmTree.T_GRP_SEARCH2:
				url = '/api/grp/getSearchGrpTreeList';
				break;
			case HmTree.T_GRP_AUTHCONF:
				url = '/api/grp/getAuthConfDefaultGrpTreeListAll';
				break;
			case HmTree.T_GRP_DEF_ALL:
				url = '/api/grp/getDefaultGrpTreeListAll';
				break;
			case HmTree.T_GRP_IF:
				url = '/api/grp/getIfGrpTreeList';
				break;
			case HmTree.T_GRP_SERVER: case HmTree.T_GRP_SERVER2:
				url = '/api/grp/getServerGrpTreeList';
				break;
			case HmTree.T_GRP_MANG: case HmTree.T_GRP_MANG2:
				url = '/api/grp/getMangGrpTreeList';
				break;
			case HmTree.T_GRP_MANGFLOW: case HmTree.T_GRP_MANGFLOW2:
				url = '/api/grp/getMangFlowGrpTreeList';
				break;
			case HmTree.T_GRP_NETWORK: // auth group
				url = '/api/grp/getNetworkGrpAuthTreeList';
				break;
			case HmTree.T_GRP_SERVICE:
				url = '/api/grp/getServiceGrpTreeList';
				break;
			case HmTree.T_GRP_AS:
				url = '/api/grp/getAsGrpTreeList';
				break;
			case HmTree.T_GRP_APP:
				url = '/api/grp/getAppGrpTreeList';
				break;
			case HmTree.T_SVR_PERF:
				url = '/api/grp/getServerPerfTreeList';
				break;
			case HmTree.T_GRP_TOPO:
				url = '/api/grp/getTopoGrpTreeList';
				break;
            case HmTree.T_GRP_D3TOPO:
                url = '/api/grp/getD3TopoGrpTreeList';
                break;
			case HmTree.T_GRP_SVC:
				url = "/api/grp/getSvcPortGrpList";
				break;
			case HmTree.T_GRP_TOPO_AUTHCONF:
				url = "/api/grp/getTopoAuthGrpConfListAll";
				break;
			case HmTree.T_GRP_TMS:
				url = '/api/grp/getTmsGrpTreeList';
				break;
			case HmTree.T_GRP_INST: 
				url = '/api/grp/getInstGrpTreeList'; 
				break;
            case HmTree.T_GRP_SMS:
                url = '/api/main/sys/custUserMgmt/getSmsGroup';
                break;
			default:
				return;
		}

		// 장비까지 조회하는 파라미터 추가
		if(type == HmTree.T_GRP_DEFAULT2 
				|| type == HmTree.T_GRP_SEARCH2 
				|| type == HmTree.T_GRP_SERVER2 
				|| type == HmTree.T_GRP_MANG2
				|| type == HmTree.T_GRP_MANGFLOW2
				|| type == HmTree.T_AP_GRP_DEFAULT
				|| type == HmTree.T_L4_GRP_DEFAULT
				|| type == HmTree.T_GRP_TMS) {
			params.isContainDev = true
		}

		var adapter = new $.jqx.dataAdapter({
			datatype : 'json',
			root : 'resultData',
			url : ctxPath + url,
			dataFields: [
				{ name: 'grpNo', type: 'string' },
				{ name: 'grpParent', type: 'number' },
                { name: 'strGrpParent', type: 'string' },
				{ name: 'grpName', type: 'string' },
				{ name: 'devKind2', type: 'string' },
				{ name: 'devIp', type: 'string' },
				{ name: 'grpCode', type: 'string' }
			],
			hierarchy : {
				keyDataField : { name : 'grpNo' },
				parentDataField : { name : type == HmTree.T_GRP_TMS? 'strGrpParent' : 'grpParent' }
			},
			id : 'grpNo'
		}, {
			async : true,
			formatData : function(data) {
				$.extend(data, params);
				return data;
			}
		});

		$treeGrid.jqxTreeGrid({
			source : adapter,
			width : '100%',
			height : '99.8%',
			theme : jqxTheme,
			altRows : false,
			filterable : true,
			// filterMode: 'simple',
			autoRowHeight : false,
			pageable : false,
			showHeader : false,
			selectionMode : 'singleRow',
			icons : function(rowKey, rowData) {
				try {
					if(rowData.hasOwnProperty('devKind2')) {
						switch(rowData.devKind2) {
						case 'GROUP':
							if (type === HmTree.T_GRP_SEARCH && rowData.grpParent === 0) {
								return ctxPath + '/img/tree/SearchGrpGategory.png';
							} else {
								return ctxPath + '/img/tree/p_tree.png';
							}
						case 'BACKBONE': case 'FIREWALL': case 'IPS': case 'L3SWITCH': case 'L4SWITCH':
						case 'NAC': case 'QOS': case 'ROUTER': case 'SERVER': case 'SWITCH': case 'VPN': case 'WIPS':
							return ctxPath + '/img/tree/' + rowData.devKind2 + '.png'; 
						default: 
							return ctxPath + '/img/tree/p_tree.png';
						}
					}
					else {
						return ctxPath + '/img/tree/p_tree.png';
					}
				} catch (e) {
					return ctxPath + '/img/tree/p_tree.png';
				}
			},
			ready : function() {
				var uid = null;
				var rows = $treeGrid.jqxTreeGrid('getRows');
				if (rows != null && rows.length > 0) {
					if(params.hasOwnProperty('isRootSelect') && params.isRootSelect == false) {
						if(type == HmTree.T_GRP_MANG || type == HmTree.T_GRP_MANG2) {
							var tmp = rows[0];
							if(tmp.records != null && tmp.records.length > 0) {
								uid = tmp.records[0].uid;
							}
						}
					}
					else {
						uid = $treeGrid.jqxTreeGrid('getKey', rows[0]);
					}
				}
				if (uid != null) {
					$treeGrid.jqxTreeGrid('expandRow', $treeGrid.jqxTreeGrid('getKey', rows[0]));
					$treeGrid.jqxTreeGrid('selectRow', uid);
				}
			},
			columns : cols
		}).on('rowSelect', function(event) {
			if (fnSelect !== undefined && fnSelect !== null)
				fnSelect(event);
		});
	},

	updateData : function($treeGrid, type, params, isExpandAll) {
		var url = undefined;
		if(isExpandAll === undefined) isExpandAll = false;
		if ($.isEmpty(params))
			params = {};
		switch (type) {
		case HmTree.T_GRP_DEFAULT: case HmTree.T_GRP_DEFAULT2:
			url = '/api/grp/getDefaultGrpTreeList';
			break;
		case HmTree.T_GRP_SEARCH:
			url = '/api/grp/getSearchGrpTreeList';
			break;
		case HmTree.T_GRP_AUTHCONF:
			url = '/api/grp/getAuthConfDefaultGrpTreeListAll';
			break;
		case HmTree.T_GRP_DEF_ALL:
			url = '/api/grp/getDefaultGrpTreeListAll';
			break;
		case HmTree.T_GRP_IF:
			url = '/api/grp/getIfGrpTreeList';
			break;
		case HmTree.T_GRP_SERVER:
			url = '/api/grp/getServerGrpTreeList';
			break;
		case HmTree.T_GRP_MANG:
			url = '/api/grp/getMangGrpTreeList';
			break;
		case HmTree.T_GRP_MANGFLOW:
			url = '/api/grp/getMangFlowGrpTreeList';
			break;
		case HmTree.T_GRP_SERVICE:
			url = '/api/grp/getServiceGrpTreeList';
			break;
		case HmTree.T_GRP_AS:
			url = '/api/grp/getAsGrpTreeList';
			break;
		case HmTree.T_GRP_APP:
			url = '/api/grp/getAppGrpTreeList';
			break;
		case HmTree.T_GRP_TOPO_AUTHCONF:
			url = "/api/grp/getTopoAuthGrpConfListAll";
			break;
		case HmTree.T_GRP_INST: 
			url = '/api/grp/getInstGrpTreeList'; 
			break;
		case HmTree.T_GRP_SMS:
			url = '/api/main/sys/custUserMgmt/getSmsGroup';
			break;
		default:
			return;
		}

		// 장비까지 조회하는 파라미터 추가
		if(type == HmTree.T_GRP_DEFAULT2 
				|| type == HmTree.T_GRP_SEARCH2 
				|| type == HmTree.T_GRP_SERVER2 
				|| type == HmTree.T_GRP_MANG2
				|| type == HmTree.T_GRP_MANGFLOW2) {
			params.isContainDev = true
		}

		var adapter = new $.jqx.dataAdapter({
			datatype : 'json',
			root : 'resultData',
			url : ctxPath + url,
			hierarchy : {
				keyDataField : {
					name : 'grpNo'
				},
				parentDataField : {
					name : 'grpParent'
				}
			},
			id : 'grpNo'
		}, {
			async : true,
			formatData : function(data) {
				$.extend(data, params);
				return data;
			}
		});
		
		var curTreeItem = HmTreeGrid.getSelectedItem($treeGrid);
		$treeGrid.on('bindingComplete', function(event) {
			if(isExpandAll && curTreeItem != null) {
				$treeGrid.jqxTreeGrid('expandAll');
				$treeGrid.jqxTreeGrid('selectRow', curTreeItem.uid);
			}
			else {
				var rows = $treeGrid.jqxTreeGrid('getRows');
				if (rows != null && rows.length > 0) {
					$treeGrid.jqxTreeGrid('expandRow', $treeGrid.jqxTreeGrid('getKey', rows[0]));
					var _uid = $treeGrid.jqxTreeGrid('getKey', rows[0]);
					$treeGrid.jqxTreeGrid('selectRow', _uid);
				}
			}
			
			$treeGrid.off('bindingComplete');
		});

		if(type == HmTree.T_GRP_TOPO_AUTHCONF) {
            // $treeGrid.jqxTreeGrid('source', adapter);
            $treeGrid.jqxTreeGrid('source')._options.formatData =
				function(data) {
                    $.extend(data, params);
					return data;
				};
		}
        // else {
            $treeGrid.jqxTreeGrid('source')._source.url = ctxPath + url;
		// }
		$treeGrid.jqxTreeGrid('updateBoundData');
	},

	/** 선택된 트리아이템 리턴 */
	getSelectedItem : function($treeGrid) {
		var selection = $treeGrid.jqxTreeGrid('getSelection');
		if (selection != null && selection.length > 0) {
			return selection[0];
		}
		return null;
	},
	
	/** 트리노드 오픈 */
	expandParentRow: function($treeGrid, rowKey) {
		var nodeItem = $treeGrid.jqxTreeGrid('getRow', rowKey);
		if(nodeItem == null || nodeItem.level == 0) return;
		$treeGrid.jqxTreeGrid('expandRow', nodeItem.uid);
		HmTreeGrid.expandParentRow($treeGrid, nodeItem.parent.uid);
	},


    /** 게시판 상태 */
    boardStatusrenderer: function(row, datafield, value) {
        if (value == null)
            return;
        var cell;
        switch (value.toString()) {
            case "요청":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px;'  class='jqx-center-align'>";
                cell += "<img src='" + ctxPath + "/img/Grid/apply.png' alt='" + value + "' />";

            	if ($('#gSiteName').val() === 'Samsung') {
                    cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt request'>REQUEST";
				}
                break;
            case "처리":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px;'  class='jqx-center-align'>";
                cell += "<img src='" + ctxPath + "/img/Grid/check.png' alt='" + value + "' />";

                if ($('#gSiteName').val() === 'Samsung') {
                    cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt cleared'>CLEARED";
                }
                break;
            default:
                return value.toString();
        }
        cell += "</div>";
        return cell;
    },

    /** 장애등급 */
    evtLevelrenderer: function(row, datafield, value) {
        if (value == null)
            return;
        var cell;
        switch (value.toString()) {
            case "-1":
            case "조치중":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt processing'>" + $('#sEvtLevelMeasure').val();
            case "0":
			case "정상":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt normal'>" + $('#sEvtLevel0').val();
                break;
            case "1":
            case "정보":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt info'>" + $('#sEvtLevel1').val();
                break;
            case "2":
            case "주의":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt warning'>" + $('#sEvtLevel2').val();
                break;
            case "3":
            case "알람":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt minor'>" + $('#sEvtLevel3').val();
                break;
            case "4":
            case "경보":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt major'>" + $('#sEvtLevel4').val();
                break;
            case "5":
            case "장애":
                cell = "<div style='margin-top: 2px; margin-bottom: 2px; width: 92%'  class='jqx-center-align evtName evt critical'>" + $('#sEvtLevel5').val();
                break;
            default:
                return value.toString();
        }
        cell += "</div>";
        return cell;
    }
};