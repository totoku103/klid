var uploadCnt = 0;
var boardNo;
var url;

$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});

var Main = {
/** variable */
initVariable : function() {
	/* 메인페이지면 목록보기 버튼 보이게 */
	var url = $(opener.document).find("#parentPage").val();
	var lastIndex = url.lastIndexOf("/");
	url = url.substring(lastIndex + 1, url.length - 4);
	if (url == "main" || url == "tchMain") {
		$("#btnBoardList").css("display", "inline");
	}

    //게시자명 session에서 세팅
    var userName = $("#sUserName").val();
    $("#userName").val(userName);

    var date = new Date();
    var year = date.getFullYear();
    var month = new String(date.getMonth()+1);
    var day = new String(date.getDate());

    if(month.length == 1){
        month = "0" + month;
    }
    if(day.length == 1){
        day = "0" + day;
    }

    //등록일 세팅
    $("#regDate").val(year + "-" + month + "-" + day)
},

/** add event */
observe : function() {
	$('button').bind('click', function(event) {
		Main.eventControl(event);
	});
	$('img').bind('click', function(event) {
		Main.eventControl(event);
	});

	$('#fileUpload').on('uploadEnd', function(event) {
		if (--uploadCnt == 0) {
			location.href = $('#ctxPath').val() + '/main/board/pShareBoardContents.do?boardNo=' + boardNo;
            window.opener.Main.searchNBoard();
		}
	});

	$('#fileUpload').on('select', function(event) {
		var totallength = event.args.owner._fileRows.length + $('#attachFileList > li').length;
		var fileLength = event.args.owner._fileRows.length;
        var attFileSize = $('.jqx-file-upload-file-input')[fileLength - 1].files[0].size; //읽어오는 첨부파일 이름
        var attFullName  = $('.jqx-file-upload-file-input')[fileLength - 1].files[0].name;
        var attName = attFullName.substring(0, attFullName.lastIndexOf('.'));

        Server.get('/api/main/sys/getDetailBoardMgmtList', {
            data: { guid: '11B3C551-A9E2-4361-AC5C-D45751AD5E64'}, //보안자료실 설정 키값
            success: function(result) {
                if(result.fileSize != null){ //DB에서 설정된 파일 크기 비교는 byte , 저장된 값 -> mbyte
                    var limitFileSize = result.fileSize * 1024 * 1024;
                    if(attFileSize > limitFileSize){
                        alert(limitFileSize + "Byte로 용량이 제한되어있습니다.");
                        $('#fileUpload').jqxFileUpload('cancelFile', fileLength - 1);
                        return;
                    }
                }
                if(result.fileExt != null){ //DB에서 설정된 파일 확장자 (,구분자 복수개)
                    var fileExtName = $('.jqx-file-upload-file-input')[fileLength - 1].files[0].name.toLowerCase();
                    var banList = result.fileExt.split(',');
                    var allowCnt = 0;

                    for(var i in banList){
                        var checkOnt = fileExtName.indexOf(banList[i].toLowerCase());
                        if(checkOnt > 0){
                            allowCnt +=  1;
                        }
                    };
                    if(allowCnt == 0){
                        alert("제한된 확장자 입니다.")
                        $('#fileUpload').jqxFileUpload('cancelFile', fileLength - 1);
                        return;
                    }
                }
            }
        });

		/*if ($('.jqx-file-upload-file-input')[fileLength - 1].files[0].size > $('#uploadFileLength').val()) {
			alert($('#uploadFileLength').val() + "Byte로 용량이 제한되어있습니다.");
			$('#fileUpload').jqxFileUpload('cancelFile', fileLength - 1);
			return;
		}*/

		if (totallength > 2) {
			$('#fileUpload').jqxFileUpload('cancelFile', fileLength - 1);
			alert('첨부파일 최대 개수는 2개 입니다.');
		}
	});
},

/** event handler */
eventControl : function(event) {
	var curTarget = event.currentTarget;
	switch (curTarget.id) {
	case 'btnUpgrade':
		this.upgradeBoard();
		break;
	case 'btnBoardList':
		this.boardList();
		break;
	case 'btnClose':
		this.boardClose();
		break;
	}
},

/** init design */
initDesign : function() {
	$('#editor').jqxEditor({ height : "380px" });
	$('#fileUpload').jqxFileUpload({ width : '100%', fileInputName : 'fileinput' });

    $('#editor').on('change', function (event) {
        if(event.args.args != undefined){
            var linkVal = event.args.args;
            var start = (linkVal.indexOf('http://') + 7)*1
            var linkVal = linkVal.substring(start,linkVal.indexOf('\">'));
            var checkFlag = 0;

            if(linkVal.indexOf('/\</g') > -1){
                checkFlag = checkFlag + 1;
            }
            if(linkVal.indexOf('/\>/g') > -1){
                checkFlag = checkFlag + 1;
            }
            if(linkVal.indexOf('<script') > -1){
                checkFlag = checkFlag + 1;
            }
            if(linkVal.indexOf('<img') > -1){
                checkFlag = checkFlag + 1;
            }
			
			if(linkVal.indexOf('&lt;') > -1){
                checkFlag = checkFlag + 1;
            }
            if(linkVal.indexOf('&gt;') > -1){
                checkFlag = checkFlag + 1;
            }
            if(linkVal.indexOf('script') > -1){
                checkFlag = checkFlag + 1;
            }
            if(linkVal.indexOf('&lt;img') > -1){
                checkFlag = checkFlag + 1;
            }
			
            if(checkFlag > 0){
                alert("잘못된 접근 입니다.");
                self.close()
            }
        }
    });

	$.ajax({ type : "post", url : $('#ctxPath').val() + '/api/main/sec/shareBoard/getBoardContents', data : "boardNo=" + $('#boardNo').val(), dataType : "json", success : function(jsonData) {
		$('#userName').val(jsonData.resultData.contents.userName);
        $('#instNm').val(jsonData.resultData.contents.instNm);

		$('#fullTimeFormat').val(jsonData.resultData.contents.fullTimeFormat);

		$('#boardTitle').val(jsonData.resultData.contents.bultnTitle);
        $('.boardContent').val(DOMPurify.sanitize(jsonData.resultData.contents.bultnCont.htmlCharacterUnescapes()));
		// true : 수정 페이지에서만 첨부파일 옆에 삭제버튼 생성
		HmUtil.attachFileList(jsonData.resultData.attachFile, true, "fileUpload");

	} });

},

/** init data */
initData : function() {
	$('#fileUploadBrowseButton').val("첨부파일");

},

upgradeBoard : function() {
	if (!this.validateForm())
		return;

    $.ajax({
        type : "post",
        url : $('#ctxPath').val() + '/api/main/sec/shareBoard/checkAuth',
        data: {boardNo: $('#boardNo').val()},
        dataType : "json",
        success : function(jsonData) {
            console.log(jsonData.resultData)
            if(jsonData.resultData == 'N'){
                alert("잘못된 접근 입니다.");
                return
            }else{
                Server.post('/api/main/sec/shareBoard/editBoard', { data : /* $('#writeForm').serializeObject(), */
                    { boardNo : document.writeForm.boardNo.value, boardTitle : document.writeForm.boardTitle.value, boardContent : $('.boardContent').val(), cateNo: $('#groupType').val() },
                    success : function(result) {
                        alert("수정되었습니다.");
                        window.opener.Main.searchNBoard('reload');
                        $('#fileUpload').jqxFileUpload({ uploadUrl : ctxPath + '/api/file/upload?boardNo=' + result.boardNo });
                        if ($('.jqx-file-upload-file-row').length == 0) {
                            location.href = $('#ctxPath').val() + '/main/board/pShareBoardContents.do?boardNo=' + result.boardNo;
                        } else {
                            try {
                                $('#fileUpload').jqxFileUpload('uploadAll');
                            } catch (e) {
                                console.log(e);
                            }
                            boardNo = result.boardNo;
                            uploadCnt = $('.jqx-file-upload-file-row').length;
                        }
                        //self.close();
                    } });
            }
        }
    });
},

boardList : function() {
	window.location.href = $('#ctxPath').val() + "/main/board/pShareBoardList.do";
},

validateForm : function() {
	var text = $('#boardTitle').val().length;
	if (text == 0) {
		alert("제목을 입력해주세요.");
		$("#boardTitle").focus();
		return false;
	} else if (text > 100) {
		alert("제목을 100자 이내로 입력해주세요.");
		$("#boardTitle").focus();
		return false;
	}
	text = $('#editor').val();
	if (text == '<br>' || text == '' || text == null) {
		alert("내용을 입력해주세요.");
		$('#editor').focus();
		return false;
	}
	return true;
},

boardClose : function() {
	self.close();
} };