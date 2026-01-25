var $collectorFrom = null;
var Main = {
		/** variable */
		initVariable: function() {
			$collectorFrom = $('#collectorForm').find('tbody').html();
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
			$('#collectorForm').jqxExpander({ width: '100%', showArrow: false, toggleMode: 'none', theme: jqxTheme,
				initContent: function() {
					$('.useFlag').jqxComboBox({autoDropDownHeight: true, selectedIndex: 0,
						source: [
					         { label: '사용', value: '1' },
					         { label: '미사용', value: '0' }
						]
					});
				}
			});
		},
		
		/** init data */
		initData: function() {
			this.search();
		},
		
		search: function() {
			Server.get('/api/common/code/getCodeListByCodeKind', {
				data: { codeKind: 'POLL_GRP_NO' },
				success: function(result) {
					$.each(result, function(idx, value) {
						if ($('.codeId').eq(idx).val() == undefined) {
							$('#collectorForm').find('tbody').append($collectorFrom);
							
							$('.useFlag').eq(idx).jqxComboBox({autoDropDownHeight: true, selectedIndex: 0,
								source: [
							         { label: '사용', value: '1' },
							         { label: '미사용', value: '0' }
								]
							});
						};
						
						$('.codeId').eq(idx).val(value.codeId);
						$('.codeValue1').eq(idx).val(value.codeValue1);
						$('.codeValue2').eq(idx).val(value.codeValue2);
						$('.codeValue3').eq(idx).val(value.codeValue3);
						$('.useFlag').eq(idx).val(value.useFlag);
					});
				}
			});
		},
		
		save: function() {
			var _list = [];
			
			$.each($('.codeId'), function(idx, value) {
				
				if ($('.codeId').eq(idx).val() != '') {
					var _map = {};
					_map.codeId = $('.codeId').eq(idx).val();
					_map.codeValue1 = $('.codeValue1').eq(idx).val();
					_map.codeValue2 = $('.codeValue2').eq(idx).val();
					_map.codeValue3 = $('.codeValue3').eq(idx).val();
					_map.useFlag = $('.useFlag').eq(idx).val();
					
					_list.push(_map);
				}
			});
			
			Server.post('/api/common/code/saveCollectorCode', {
				data: { codeKind: 'POLL_GRP_NO', list: _list },
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
	
	$('#collectorForm').on('click', '.p_btnPlus3', function() {
		$(this).parent().parent().parent().append($collectorFrom);
		$(this).parent().parent().parent().find('.useFlag:last').jqxComboBox({autoDropDownHeight: true, selectedIndex: 0,
			source: [
		         { label: '사용', value: '1' },
		         { label: '미사용', value: '0' }
			]
		});
	});
	
	$('#collectorForm').on('click', '.p_btnMinus', function() {
		$(this).parent().parent().remove();
		/*
		if (confirm("해당 수집기로 등록된 장비의 수집기정보 또한 삭제됩니다.\n삭제하시겠습니까?")) {
			alert($(this).parent().parent().find('.codeId').val());
			$(this).parent().parent().remove();
		}
		*/
	});
});