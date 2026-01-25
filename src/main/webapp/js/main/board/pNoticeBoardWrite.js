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
	/* 부모창이 메인페이지면 목록보기 버튼 보이게 */
	url = $(opener.document).find("#parentPage").val();
	var lastIndex = url.lastIndexOf("/");
	url = url.substring(lastIndex + 1, url.length - 4);
	if (url == "main" || url == "tchMain") {
		$("#btnBoardList").css("display", "inline");
	}
    //게시자명 session에서 세팅
    var userName = $("#sUserName").val();
    $("#userName").val(userName);
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
        //self.close();
	});

	$('#fileUpload').on('select', function(event) {
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

		if (fileLength > 2) {
			$('#fileUpload').jqxFileUpload('cancelFile', fileLength - 1);
			alert('첨부파일 최대 개수는 2개 입니다.');
		}
	});
},

/** event handler */
eventControl : function(event) {
	var curTarget = event.currentTarget;
	switch (curTarget.id) {
	case 'btnSave':
		this.saveContents();
		break;
	case 'btnBoardList':
		this.boardList();
		break;
	case 'btnCancel':
		this.boardClose();
		break;
	}
},

/** init design */
initDesign : function() {
	$('#editor').jqxEditor({ height : "400" });

	$('#fileUpload').jqxFileUpload({ width : '100%', fileInputName : 'fileinput' });

    $('#editor').on('change', function (event) {
    	if(event.args.args != undefined){
            var linkVal = event.args.args;
            console.log(linkVal)
            console.log(linkVal.indexOf('http://'))
            console.log(linkVal.indexOf('\">'));
            var start = (linkVal.indexOf('http://') + 7)*1
            console.log(start);
			var linkVal = linkVal.substring(start,linkVal.indexOf('\">'));
			console.log(linkVal)
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
			console.log("checkFlag:: ", checkFlag);
            if(checkFlag > 0){
            	alert("잘못된 접근 입니다.");
                self.close()
                /*$('#editor').jqxEditor({
                    localization: {
                        "Go to link" : 111111
                    }
                });*/
			}

            //	<img src=x onerror=alert(1)>
		}
    });

    var toDate = new Date();
    toDate.setDate(toDate.getDate() );
    //$('#endDt').jqxDateTimeInput({ width: '120px', height: '21px', formatString: 'yyyy-MM-dd', theme: jqxTheme, min: toDate });
},

/** init data */
initData : function() {
	$('#fileUploadBrowseButton').val("첨부파일");
	$('.boardContent').val("");


    $('#noticeScopeDiv').jqxComboBox({ checkboxes: true,  width: 100, height: 21, autoDropDownHeight: true, selectedIndex: 0,
         	source: [
         	         { label: '개발원',  value: '2' },
         	         { label: '시도', 	value: '3' },
                	 { label: '시군구',  value: '4' }
         	]
	}).on('checkChange', function (event) {
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

    if($("#sAuthMain").val() == 'AUTH_MAIN_3'){ 			//권한이 시도 일경우 상위(개발원) 불가, 하위(시도, 시군구) 까지만 가능
        $('#noticeScopeDiv').jqxComboBox('disableAt',0);
        $('#noticeScopeDiv').jqxComboBox('checkIndex', 1);
        $('#noticeScopeDiv').jqxComboBox('checkIndex', 2);

        $('#noticeScopeDiv').jqxComboBox('disableAt',1);
	}else if($("#sAuthMain").val() == 'AUTH_MAIN_4'){		//권한이 시군구 일경우 상위(개발원,시) 불가 하위(시군구)까지만 가능
        $('#noticeScopeDiv').jqxComboBox('disableAt',0)
        $('#noticeScopeDiv').jqxComboBox('disableAt',1)
        $('#noticeScopeDiv').jqxComboBox('checkIndex', 2);
        $('#noticeScopeDiv').jqxComboBox('disableAt',2)
    }else{													//그 외 (개발원, 관리자)는 전부 허용
        $('#noticeScopeDiv').jqxComboBox('checkIndex', 0);
        $('#noticeScopeDiv').jqxComboBox('checkIndex', 1);
        $('#noticeScopeDiv').jqxComboBox('checkIndex', 2);
        $('#noticeScopeDiv').jqxComboBox('disableAt',0)
	}
	;

    var sInstName = $("#sInstName").val();
	$("#instNm").val(sInstName); //세션의 기관명 노출

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
    $('#noticeType').jqxDropDownList({source: sourceNotice, width: 160, dropDownHeight: 90, selectedIndex : 0 });

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
    $('#groupType').jqxDropDownList({source: sourceGroup, width: 100, dropDownHeight: 130, selectedIndex : 0 })

    //설문 타입 목록
    var surveyType = new Array();
    $.ajax({
        type: 'GET',
        url: ctxPath + '/api/code/getSurveyType',
        data: {},
        async: false,
        success: function (data) {
            surveyType.push({label: '미사용', value: 'none'})
            $.each(data.resultData, function (index, data) {
                surveyType.push({label: data.codeName, value: data.comCode2})
            });
        }
    });
    $('#surveyType').jqxDropDownList({source: surveyType, width: 100, autoDropDownHeight: true, selectedIndex : 0 })


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
    $('#control').jqxDropDownList({source: noticeSrcType, width: 100, autoDropDownHeight: true, selectedIndex : 0 })

},

saveContents : function() {
	if (!this.validateForm())
		return;

	var params={
			boardTitle: $('#boardTitle').val(),
			boardContent: $('#editor').val(),
        	userId: $('#sUserId').val(),
        	cateNo:	$('#noticeType').val(),
        	groupItemNo:$('#groupType').val(),
        	organCode : $('#sInstCd').val(),
        	noticeScope : $('#noticeScope').val(),
			control: $('#control').val(),
			//endDt : $('#endDt').val().replace(/-/gi, "")
	};
	if($('#surveyType').val() != 'none'){
        params.surveyTypeCode = $('#surveyType').val();
	}

	Server.post('/api/main/sec/noticeBoard/addBoard', {
		data : params,
		success : function(result) {
            alert("저장되었습니다.");
            window.opener.Main.searchNBoard();
			$('#fileUpload').jqxFileUpload({
				uploadUrl : ctxPath + '/api/file/upload?boardNo=' + result
			});
			if ($('.jqx-file-upload-file-row').length == 0) {
                //window.opener.Main.reload();
                location.href = $('#ctxPath').val() + '/main/board/pNoticeBoardContents.do?boardNo=' + result;
            } else {
				try{
					$('#fileUpload').jqxFileUpload('uploadAll');

				}catch (e) {
					console.log(e);
				}
				boardNo = result;
				uploadCnt = $('.jqx-file-upload-file-row').length;
			}
            //location.href = $('#ctxPath').val() + '/main/board/pQnaBoardContents.do?boardNo=' + result;
		}
	});
},

boardList : function() {
	window.location.href = $('#ctxPath').val() + "/main/board/pNoticeBoardList.do";
},

validateForm : function() {
	if($('#noticeScope').val() == ''){
        alert("공지기관을 선택해주세요.");
        return false;
	}
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
    self.close()
}

};