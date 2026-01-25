var HmDropDownBtn = {
		/** DropDownTree */
		createTree: function($btn, $tree, type, btnW, btnH, treeW, treeH, fnSelect, params, theme) {
			var url = undefined;
			if(theme === undefined) theme = jqxTheme;
			if($.isEmpty(params)) params = {};

			// dropDownButton
			$btn.jqxDropDownButton({ width: btnW, height: btnH, theme: theme, enableBrowserBoundsDetection: true });

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
	        	var item = $(this).jqxTree('getItem', event.args.element);
				var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px;">' + item.label + '</div>';
				$btn.jqxDropDownButton('setContent', content);
				if(fnSelect !== undefined && fnSelect !== null) fnSelect(event);
				$btn.jqxDropDownButton('close');
	        });
			
			if(type == HmTree.T_GRP_AUTHCONF) 
				$tree.jqxTree({ source: records, width: treeW, height: treeH, theme: theme, allowDrag: false, hasThreeStates: true, checkboxes: true });
			else
				$tree.jqxTree({ source: records, width: treeW, height: treeH, theme: theme, allowDrag: false });
		},
		
		/** DropDownTreeGrid */
		createTreeGrid: function($btn, $treeGrid, type, btnW, btnH, treeW, treeH, fnSelect, params, theme) {
			var url = undefined;
			if(theme === undefined) theme = jqxTheme;
			if($.isEmpty(params)) params = {};

			// dropDownButton
			$btn.jqxDropDownButton({ width: btnW, height: btnH, theme: theme, enableBrowserBoundsDetection: true, autoOpen: false })
				.on('open', function(event) {
					$treeGrid.css('display', 'block');
				});
			
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
			case HmTree.T_GRP_SVCPORT: url = '/api/grp/getSvcPortGrpList'; break;
			case HmTree.T_GRP_TOPO: url = '/api/grp/getTopoGrpTreeList'; break;
			case HmTree.T_GRP_D3TOPO: url = "/api/grp/getD3TopoGrpTreeList"; break;
			default: return;
			}

			var adapter = new $.jqx.dataAdapter(
					{
						datatype: 'json',
						root: 'resultData',
						url: ctxPath + url,
						hierarchy: {
							keyDataField: { name: 'grpNo' },
							parentDataField: { name: 'grpParent' }
						},
						id: 'grpNo'
					},
					{
						async: true,
						formatData: function(data) {
							$.extend(data, params);
							return data;
						}
					}
			);
			$treeGrid.jqxTreeGrid({
				source: adapter,
				width: treeW,
				height: treeH,
				theme: theme,
				altRows: false,
				pageable: false,
				showHeader: false,
				selectionMode: 'singleRow',
				icons: function(rowKey, rowData) {
					 return ctxPath + '/img/folder.png';
				},
//				ready: function() {
//					var uid = null;
//					var rows = $treeGrid.jqxTreeGrid('getRows');
//					if(rows != null && rows.length > 0) {
//						uid = $treeGrid.jqxTreeGrid('getKey', rows[0]);
//					}
//					if(uid != null) {
//						$treeGrid.jqxTreeGrid('expandRow', uid);
//						$treeGrid.jqxTreeGrid('selectRow', uid);
//						var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px;">' + rows[0].grpName + '</div>';
//						$btn.jqxDropDownButton('setContent', content);
//						if(fnSelect !== undefined && fnSelect !== null) fnSelect(event);
//					}	
//				},
				columns: 
				[
				 	{ text: '그룹', dataField: 'grpName' }
				]
			})
			.on('bindingComplete', function(event) {
				var uid = null;
				var rows = $treeGrid.jqxTreeGrid('getRows');
				if(rows != null && rows.length > 0) {
					uid = $treeGrid.jqxTreeGrid('getKey', rows[0]);
				}
				if(uid != null) {
					$treeGrid.jqxTreeGrid('expandRow', uid);
					$treeGrid.jqxTreeGrid('selectRow', uid);
					var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px;">' + rows[0].grpName + '</div>';
					$btn.jqxDropDownButton('setContent', content);
					if(fnSelect !== undefined && fnSelect !== null) fnSelect(event);
				}
			})
			.on('rowSelect', function(event) {
				var rowdata = event.args.row;
				var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px;">' + rowdata.grpName + '</div>';
				$btn.jqxDropDownButton('setContent', content);
				if(fnSelect !== undefined && fnSelect !== null) fnSelect(event);
				$btn.jqxDropDownButton('close');
			});
		},
		
		/** DropDownGrid */
		createGrid: function($btn, $grid, type, btnW, btnH, gridW, gridH, params, theme) {
			var _url = undefined;
			if(theme === undefined) theme = jqxTheme;
			if($.isEmpty(params)) params = {};

			// dropDownButton
			$btn.jqxDropDownButton({ width: btnW, height: btnH, theme: theme, enableBrowserBoundsDetection: true })
				.on('open', function(event) {
					$grid.css('display', 'block');
				});

			var _columns = null;
			switch(type) {
			case 'DEV': 
				_url = '/api/dev/getDevList';
				_columns = [
		            { text: '장비명', datafield: 'devName', width: 150 },
		            { text: '사용자장비명', datafield: 'userDevName', width: 150 },
		            { text: 'IP', datafield: 'devIp', width: 120 },
		            { text: '모델', datafield: 'model', width: 130 },
		            { text: '제조사', datafield: 'vendor', width: 130 }
	            ];
				break;
			default: return;
			}
			
			HmGrid.create($grid, {
				source: new $.jqx.dataAdapter(
						{
							datatype: 'json',
							url: _url
						},
						{
							formatData: function(data) {
								$.extend(data, params);
								return data;
							}
						}
				),
				columns: _columns
			});
			$grid.on('rowselect', function(event) {
				var rowdata = $(this).jqxGrid('getrowdata', event.args.rowindex);
				var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px">' + rowdata.devName + '</div>';
				$btn.jqxDropDownButton('setContent', content);
			}).on('bindingcomplete', function(event) {
				$grid.jqxGrid('selectrow', 0);
			}).on('rowdoubleclick', function(event){
				$btn.jqxDropDownButton('close'); 
			});
		},


	//Klid 기관코드 트리
    createDeptTreeGrid: function($btn, $treeGrid, type, btnW, btnH, treeW, treeH, fnSelect, params, theme) {
        var url = '/api/main/acc/accidentApply/getAccidenDeptList';
        if(theme === undefined) theme = jqxTheme;
        //params 유무에 따라 기관코드 트리가 기본설정 OR 이미 선택했던거 자동 선택

		var type = type; //기관검색이 신고기관 인지 피해기관 인지 구분 (신고 : dcl, 피해 : dmg)

		// dropDownButton
        $btn.jqxDropDownButton({ width: btnW, height: btnH, theme: theme, enableBrowserBoundsDetection: true, autoOpen: false })
            .on('open', function(event) {
                $treeGrid.css('display', 'block');
            });

        var adapter = new $.jqx.dataAdapter(
            {
                datatype: 'json',
                root: 'resultData',
				data: {type: type},
                url: ctxPath + url,
                hierarchy: {
                    keyDataField: { name: 'instCd' },
                    parentDataField: { name: 'pntInstCd' }
                },
                id: 'instCd'
            },
            {
                async: true,
                formatData: function(data) {
                    $.extend(data, params);
                    return data;
                }
            }
        );
        $treeGrid.jqxTreeGrid({
            source: adapter,
            width: treeW,
            height: treeH,
            theme: theme,
            altRows: false,
            filterable : true,
            pageable: false,
            showHeader: false,
            selectionMode: 'singleRow',
            icons: function(rowKey, rowData) {
                return ctxPath + '/img/folder.png';
            },
            columns:
                [
                    { text: '기관', dataField: 'instNm' }
                ]
        })
            .on('bindingComplete', function(event) {
                var uid = null;
                var rows = $treeGrid.jqxTreeGrid('getRows');

                if(rows != null && rows.length > 0) {
                    uid = $treeGrid.jqxTreeGrid('getKey', rows[0]);
                    if(type == 'dcl'){
                    	$("#dclInstCd").val(uid)
					}else if(type == 'dmg'){
                        $("#dmgInstCd").val(uid)
                    }else if(type == 'share'){
                        $('#srchInstTree').val(uid)
					}else{
                        $("#dmgInstCd").val(uid)
                        $("#srchInstCd").val(uid)
					}
                }
                if(uid != null) {
                    $treeGrid.jqxTreeGrid('expandRow', uid);
                    if($.isEmpty(params)){ //없을 경우 초기 기본 트리
                        $treeGrid.jqxTreeGrid('selectRow', uid);
                        var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px;">' + rows[0].instNm + '</div>';
                    }else{ //이미 트리 선택 값이 있을 경우 해당 선택값
                        $treeGrid.jqxTreeGrid('selectRow', params.instCd);
                        var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px;">' + params.instNm + '</div>';
                    }
                    //var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px;">' + rows[0].instNm + '</div>';
                    $btn.jqxDropDownButton('setContent', content);
                    if(fnSelect !== undefined && fnSelect !== null) fnSelect(event);
                }
            })
            .on('rowSelect', function(event) {
                var rowdata = event.args.row;

                if(type == 'dcl'){
                    $("#dclInstCd").val(rowdata.instCd);
                }else if(type=='dmg'){
                    $("#dmgInstCd").val(rowdata.instCd);
                }else if(type=='share'){
                    $('#srchInstTree').val(rowdata.instCd)
				}else{
                    $("#dmgInstCd").val(rowdata.instCd);
                    $("#srchInstCd").val(rowdata.instCd);
				}

                var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px;">' + rowdata.instNm + '</div>';
                $btn.jqxDropDownButton('setContent', content);
                if(fnSelect !== undefined && fnSelect !== null) fnSelect(event);
                $btn.jqxDropDownButton('close');
            });
    },
    createInstitutionCodeTreeGrid: function ($btn, $treeGrid, $selectedValue, systemType = 'CTRS') {
        const _systemType = systemType.toUpperCase();
        switch (_systemType) {
            case 'VMS':
            case 'CTSS':
            case 'CTRS':
                break;
            default:
                throw new Error("systemType is not supported");
        }

        const url = '/api/main/logs/institution-code/list';
        $btn.jqxDropDownButton({width: '100%', height: 25, theme: jqxTheme, enableBrowserBoundsDetection: true, autoOpen: false})
            .on('open', function (event) {
                $treeGrid.css('display', 'block');
            });
        const adapter = new $.jqx.dataAdapter(
            {
                datatype: 'json',
                root: 'resultData',
                url: ctxPath + url,
                hierarchy: {
                    keyDataField: {name: 'institutionCode'},
                    parentDataField: {name: 'parentInstitutionCode'}
                },
                id: 'institutionCode'
            },
            {
                async: true,
                formatData: function (data) {
                    $.extend(data, {systemType: _systemType});
                    return data;
                }
            }
        );
        $treeGrid.jqxTreeGrid({
            source: adapter,
            width: '100%',
            height: 400,
            theme: jqxTheme,
            altRows: false,
            filterable: true,
            pageable: false,
            showHeader: false,
            selectionMode: 'singleRow',
            icons: () => ctxPath + '/img/folder.png',
            columns: [{text: '기관', dataField: 'institutionName'}]
        }).on('bindingComplete', function () {
            const _rows = $treeGrid.jqxTreeGrid('getRows');
            if (!_rows) return;

            const _u = _rows[0].uid;
            $treeGrid.jqxTreeGrid('expandRow', _u);
            $treeGrid.jqxTreeGrid('selectRow', _u);
        })
            .on('rowSelect', function (event) {
                const rowData = event.args.row;
                $selectedValue.val(rowData.institutionCode);
                $selectedValue.data('level', Number(rowData.level || 1));
                const content = '<div style="height: 100%; width: 100%; display: flex; align-items: center">' + rowData.institutionName + '</div>';
                $btn.jqxDropDownButton('setContent', content);
                $btn.jqxDropDownButton('close');
            });
    }
};