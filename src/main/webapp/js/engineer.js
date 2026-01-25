var Engineer = {
		/** variable */
		initVariable: function() {
			$('#content').css('display', 'block');
		},
		
		/** add event */
		observe: function() {
			$('button').bind('click', function(event) { Engineer.eventControl(event); });
		},
		
		/** event handler */
		eventControl: function(event) {
			var curTarget = event.currentTarget;
			switch(curTarget.id) {
			
			}
		},
		
		/** init design */
		initDesign: function() {
			$('#menu').jqxMenu({ width: '100%', height: 30, theme: jqxTheme });	
		},
		
		/** init data */
		initData: function() {
			this.gotoPage('menuMgmt.do', '메뉴설정');
            //this.gotoPage('menuGrpMgmt.do', '메뉴권한설정')
		},
		
		gotoPage: function(page, menuNm) {
			$('#contents').load(ctxPath + '/engineer/' + page, function(response, status, xhr) {
				if(status == 'error') {
					$('#contents').html('페이지를 불러 올 수 없습니다.');
					return;
				}
				$('#menuTxt').text(menuNm);
			});
		}
		
};

$(function() {
	Engineer.initVariable();
	Engineer.observe();
	Engineer.initDesign();
	Engineer.initData();
});