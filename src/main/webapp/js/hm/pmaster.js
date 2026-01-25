var ctxPath = '';

$(function() {
	Master.observe();
	Master.initDesign();
	Master.initData();
	$(window).resize();
});

var Master = {
	observe: function() {
		$(window).bind('resize', function(event) { Master.eventControl(event); });
	},
	
	eventControl: function(event) {
		var curTarget = event.currentTarget;
		if(curTarget === window) {
			this.resizeWindow();
			return;
		}
	},
	
	initDesign: function() {
		ctxPath = $('#ctxPath').val();
		// set document title
        document.title = "Netis";
	},
	
	initData: function() {
		
	},
	
	/** window.resize이벤트 핸들러. view영역 리사이징 */
	resizeWindow: function() {
		
	},
	
	/** set images src */
	setImg: function() {
		if($.isBlank(ctxPath)) ctxPath = $('#ctxPath').val();
		this.setBtnImgSrc();
		this.setCommImgSrc();
	},
		
	//버튼이미지 설정
    setBtnImgSrc: function () {
    },
    
    // 공통이미지 설정
    setCommImgSrc: function() {
//    	var prefix = ctxPath + "/img/";
//    	var subfix = ".gif";
//        $("img.searchIcon").attr({ src: prefix + "topSearchIcon" + subfix, alt: "검색" });	
//        $("img.popupTitleIcon").attr({ src: prefix + "popupTitleIcon" + subfix, alt: "" });
    }
};
