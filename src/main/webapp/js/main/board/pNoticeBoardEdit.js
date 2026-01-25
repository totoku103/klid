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
			location.href = $('#ctxPath').val() + '/main/board/pNoticeBoardContents.do?boardNo=' + boardNo;
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
            data: { guid: 'B4529762-C067-4731-9129-B84FF840063A'}, //공지사항 설정 키값
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
                            //$('#fileUpload').jqxFileUpload('cancelFile', fileLength - 1);
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

    $('#noticeScopeDiv').jqxComboBox({ checkboxes: true,  width: 160, height: 21, autoDropDownHeight: true, selectedIndex: 0,
        source: [
            { label: '개발원',  value: '2' },
            { label: '시도', 	value: '3' },
            { label: '시군구',  value: '4' }
        ]
    }).on('checkChange', function (event) {
        $("#noticeScope").val(null);
        if (event.args) {
            var item = event.args.item;
            if (item) {
                var items = $("#noticeScopeDiv").jqxComboBox('getCheckedItems');
                var checkedValues = '';
                $.each(items, function (index) {
                    checkedValues += this.originalItem.value;
                	if(index < items.length - 1) {
                        checkedValues += ",";
                    }
                });

                $("#noticeScope").val(checkedValues);
            }

        }
    });

    var toDate = new Date();
    toDate.setDate(toDate.getDate() );
    //$('#endDt').jqxDateTimeInput({ width: '120px', height: '21px', formatString: 'yyyy-MM-dd', theme: jqxTheme, min: toDate });
	$.ajax({
			type : "post",
			url : $('#ctxPath').val() + '/api/main/sec/noticeBoard/getBoardContents',
			data : "boardNo=" + $('#boardNo').val(),
			dataType : "json",
			success : function(jsonData) {
				console.log(jsonData);
				$('#userName').val(jsonData.resultData.contents.userName);
				$('#fullTimeFormat').val(jsonData.resultData.contents.fullTimeFormat);

				//$('#endDt').jqxDateTimeInput('setDate', jsonData.resultData.contents.endDt);

				$('#boardTitle').val(jsonData.resultData.contents.bultnTitle);
                let originStr = jsonData.resultData.contents.bultnCont.htmlCharacterUnescapes();
				$('.boardContent').val(DOMPurify.sanitize(originStr));
				// true : 수정 페이지에서만 첨부파일 옆에 삭제버튼 생성
				HmUtil.attachFileList(jsonData.resultData.attachFile, true, "fileUpload");

				$('#noticeType').val(jsonData.resultData.contents.cateNo);
				$('#groupType').val(jsonData.resultData.contents.groupItemNo);
                $('#instNm').val(jsonData.resultData.contents.instNm);

				var openScopes = jsonData.resultData.contents.openScope;

				if(openScopes != null){
					var openScope = openScopes.split(',');
					for(var i in openScope){
						$('#noticeScopeDiv').jqxComboBox('checkItem', openScope[i])
					};
				}else{
					$('#noticeScopeDiv').jqxComboBox('checkIndex', 0);
				}

                $("#noticeScopeDiv").jqxComboBox({ disabled: true });

                /*if($("#sAuthMain").val() == 'AUTH_MAIN_3'){ 			//권한이 시도 일경우 상위(개발원) 불가, 하위(시도, 시군구) 까지만 가능
                    $('#noticeScopeDiv').jqxComboBox('disableAt',0)
                    //$('#noticeScopeDiv').jqxComboBox('checkIndex', 1);
                }else if($("#sAuthMain").val() == 'AUTH_MAIN_4'){		//권한이 시군구 일경우 상위(개발원,시) 불가 하위(시군구)까지만 가능
                    $('#noticeScopeDiv').jqxComboBox('disableAt',0)
                    $('#noticeScopeDiv').jqxComboBox('disableAt',1)
                    //$('#noticeScopeDiv').jqxComboBox('checkIndex', 2);
                }else{													//그 외 (개발원, 관리자)는 전부 허용
                    //$('#noticeScopeDiv').jqxComboBox('checkIndex', 0);
                }*/

                $('#control').val(jsonData.resultData.contents.control);

			}
	});

},

/** init data */
initData : function() {
	$('#fileUploadBrowseButton').val("첨부파일");

    //게시판 분류
    var sourceNotice = new Array();
    $.ajax({
        type: 'GET',
        url: ctxPath + '/api/main/sec/noticeBoard/getBoardTypeList',
        data: {groupType : 'notice'},
        async: false,
        success: function (data) {
            $.each(data.resultData, function (index, data) {
                sourceNotice.push({label: data.cateName, value: data.cateNo})
            });
        }
    });
    $('#noticeType').jqxDropDownList({source: sourceNotice, width: 160, dropDownHeight: 90});

    //그룹 분류
    var sourceGroup = new Array();
    $.ajax({
        type: 'GET',
        url: ctxPath + '/api/main/sec/noticeBoard/getBoardTypeList',
        data: {groupType : 'group'},
        async: false,
        success: function (data) {
            $.each(data.resultData, function (index, data) {
                sourceGroup.push({label: data.cateName, value: data.cateNo})
            });
        }
    });
    $('#groupType').jqxDropDownList({source: sourceGroup, width: 100, dropDownHeight: 130 });

    var noticeSrcType = [];
    $.ajax({
        type: 'GET',
        url: ctxPath + '/api/code/getNoticeSrcType',
        data: {},
        async: false,
        success: function (data) {
            noticeSrcType.push({label: '없음', value: 'none'});
            $.each(data.resultData, function (index, data) {
                noticeSrcType.push({label: data.codeName, value: data.comCode2})
            });
        }
    });
    $('#control').jqxDropDownList({source: noticeSrcType, width: 160, dropDownHeight: 130, selectedIndex : 0 })
},

upgradeBoard : function() {
	if (!this.validateForm())
		return;

    $.ajax({
        type: "post",
        url: $('#ctxPath').val() + '/api/main/sec/noticeBoard/checkAuth',
        data: {boardNo: $('#boardNo').val()},
        dataType: "json",
        success: function (jsonData) {
            if(jsonData.resultData == 'N'){
                alert("잘못된 접근 입니다.");
                return
            }else{
                Server.post('/api/main/sec/noticeBoard/editBoard', { data : /* $('#writeForm').serializeObject(), */
                    {	boardNo : document.writeForm.boardNo.value,
                        boardTitle : document.writeForm.boardTitle.value,
                        boardContent : $('.boardContent').val(),
                        noticeScope : $('#noticeScope').val(),
                        control: $('#control').val(),
                        cateNo:	$('#noticeType').val(),
                        groupItemNo:$('#groupType').val()
                    },
                    success : function(result) {
                        alert("수정되었습니다.")
                        window.opener.Main.searchNBoard();
                        $('#fileUpload').jqxFileUpload({ uploadUrl : ctxPath + '/api/file/upload?boardNo=' + result.boardNo });
                        if ($('.jqx-file-upload-file-row').length == 0) {
                            location.href = $('#ctxPath').val() + '/main/board/pNoticeBoardContents.do?boardNo=' + result.boardNo;
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
	window.location.href = $('#ctxPath').val() + "/main/board/pNoticeBoardList.do";
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