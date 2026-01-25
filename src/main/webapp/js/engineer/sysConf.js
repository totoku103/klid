var Main = {
		/** variable */
		initVariable: function() {
		
		},
		
		/** add event */
		observe: function() {
			$('button').bind('click', function(event) { Main.eventControl(event); });
		},
		
		/** event handler */
		eventControl: function(event) {
			var curTarget = event.currentTarget;
			switch(curTarget.id) {
			case 'btnRefresh': this.search(); break;
			case 'btnSave': this.save(); break;
			}
		},
		
		/** init design */
		initDesign: function() {
			$('#appWin').jqxExpander({ width: '100%', showArrow: false, toggleMode: 'none', theme: jqxTheme,
				initContent: function() {
					$('#SITE_NAME').html('내부자 위협행위 분석시스템');
                    $('#WEB_SITE_NAME').html('내부자 위협행위 분석시스템');
					// $('#SITE_NAME').jqxComboBox({
					// 	source: [
					//          { label: 'Netis.v3.1', value: 'Netis.v3.1' }
					// 	]
					// });
					// $('#WEB_SITE_NAME').jqxComboBox({
					// 	source: [
					//          { label: 'Netis.v3', value: 'Netis3' }
					// 	]
					// });
					$('#PWD_ENCR_USE').jqxCheckBox({width: 50, height: 21});
					// $('#ORACLE_VER').jqxComboBox({ width: 100, height: 21, autoDropDownHeight: true,
					// 	source: [
					// 	         { label: 'Standard', value: 'standard' },
					// 	         { label: 'Enterprise', value: 'enterprise' }
					// 	]
					// });
					$('#TOPO_AUTH_USE').jqxCheckBox({width: 50, height: 21});
					$('#APP_NETIS_POPUP').jqxCheckBox({width: 50, height: 21});
				}
			});
			/*
			$('#delegateWin').jqxExpander({ width: '100%', showArrow: false, toggleMode: 'none', theme: jqxTheme,
				initContent: function() {
				}
			});
			$('#itmonWin').jqxExpander({ width: '100%', showArrow: false, toggleMode: 'none', theme: jqxTheme,
				initContent: function() {
					$('#STARCELL_USE').jqxCheckBox({width: 50, height: 21});
				}
			});	
			*/		
		},
		
		/** init data */
		initData: function() {
			this.search();
		},
		
		search: function() {
			Server.get('/api/common/code/getCodeListByCodeKind', {
				data: { codeKind: 'WEB_CONF' },
				success: function(result) {
					$.each(result, function(idx, value) {
						try {
							switch(value.codeId) {
							case 'PWD_ENCR_USE': case 'TOPO_AUTH_USE': case 'APP_NETIS_POPUP': case 'STARCELL_USE':
								$('#' + value.codeId).val(value.codeValue1 == 'Y');
								break;
							default:
								$('#' + value.codeId).val(value.codeValue1);
								break;
							}
						} catch(e) {}
					});
				}
			});
		},
		
		save: function() {
			var _list = [
		             { codeId: 'SITE_NAME', codeValue1: $('#SITE_NAME').val(), useFlag: 1 },
		             { codeId: 'WEB_SITE_NAME', codeValue1: $('#WEB_SITE_NAME').val(), useFlag: 1 },
		             { codeId: 'DASH_PORT', codeValue1: $('#DASH_PORT').val(), useFlag: 1 },
		             { codeId: 'PWD_ENCR_USE', codeValue1: $('#PWD_ENCR_USE').val()? 'Y' : 'N', useFlag: 1 },
		             //{ codeId: 'ORACLE_VER', codeValue1: $('#ORACLE_VER').val(), useFlag: 1 },
		             { codeId: 'TOPO_AUTH_USE', codeValue1: $('#TOPO_AUTH_USE').val()? 'Y' : 'N', useFlag: 1 },
		             { codeId: 'APP_NETIS_POPUP', codeValue1: $('#APP_NETIS_POPUP').val()? 'Y' : 'N', useFlag: 1 },
		             { codeId: 'UPLOAD_PATH', codeValue1: $('#UPLOAD_PATH').val(), useFlag: 1 },
		             { codeId: 'UPLOAD_SIZE_LIMIT', codeValue1: $('#UPLOAD_SIZE_LIMIT').val(), useFlag: 1 },
		             { codeId: 'DELEGATE_IP', codeValue1: $('#DELEGATE_IP').val(), useFlag: 1 },
		             { codeId: 'DELEGATE_PORT', codeValue1: $('#DELEGATE_PORT').val(), useFlag: 1 },
		             { codeId: 'STARCELL_USE', codeValue1: $('#STARCELL_USE').val()? 'Y' : 'N', useFlag: 1 },
		             { codeId: 'STARCELL_SVC_URL', codeValue1: $('#STARCELL_SVC_URL').val(), useFlag: 1 },
		             { codeId: 'EVT_LEVEL', codeValue1: $('#EVT_LEVEL').val(), useFlag: 1 },
		             { codeId: 'EVT_LEVEL_0', codeValue1: $('#EVT_LEVEL_0').val(), useFlag: 1 },
		             { codeId: 'EVT_LEVEL_1', codeValue1: $('#EVT_LEVEL_1').val(), useFlag: 1 },
		             { codeId: 'EVT_LEVEL_2', codeValue1: $('#EVT_LEVEL_2').val(), useFlag: 1 },
		             { codeId: 'EVT_LEVEL_3', codeValue1: $('#EVT_LEVEL_3').val(), useFlag: 1 },
		             { codeId: 'EVT_LEVEL_4', codeValue1: $('#EVT_LEVEL_4').val(), useFlag: 1 },
		             { codeId: 'EVT_LEVEL_5', codeValue1: $('#EVT_LEVEL_5').val(), useFlag: 1 }
         	];
			
			Server.post('/api/common/code/saveCodeInfo', {
				data: { codeKind: 'WEB_CONF', list: _list },
				success: function(result) {
					alert(result);
				}
			});
			
		}
		
};

$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});