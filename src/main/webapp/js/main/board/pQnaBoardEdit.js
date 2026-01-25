$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});

var Main = {
		/** variable */
		initVariable: function() {
			/*메인페이지면 목록보기 버튼 보이게*/
			var url=$(opener.document).find("#parentPage").val();
			var lastIndex=url.lastIndexOf("/");
			url=url.substring(lastIndex+1, url.length-4);
			if(url=="main"||url=="tchMain"){
				$("#btnBoardList").css("display","inline");
			}
		},
		
		/** add event */
		observe: function() {
			$('button').bind('click', function(event) { Main.eventControl(event); });
			$('img').bind('click', function(event) { Main.eventControl(event); });
		},
		
		/** event handler */
		eventControl: function(event) {
			var curTarget = event.currentTarget;
			switch(curTarget.id) {
			case 'btnUpgrade': this.upgradeBoard(); break;
			case 'btnBoardList': this.boardList(); break;
			case 'btnClose': this.boardClose(); break;
			}
		},
		
		/** init design */
		initDesign: function() {
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
			
            //비밀글
            //$('#isSecret').jqxCheckBox({ width: 60, height: 30 })

            //등록일 세팅
            $("#regDate").val(year + "-" + month + "-" + day)

			 $('#editor').jqxEditor({
	             height: "440px"
	         });

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

			$.ajax({
				type : "post",
				url :$('#ctxPath').val() + '/api/main/sec/qnaBoard/getBoardContents',
				data : "boardNo="+$('#boardNo').val(),
				dataType : "json",
				success : function(jsonData) {
					$('#boardTitle').val(jsonData.resultData.contents.bultnTitle);
					$('.boardContent').val(jsonData.resultData.contents.bultnCont.htmlCharacterUnescapes());
                    $('#userName').val(jsonData.resultData.contents.userName);

                    /*if(jsonData.resultData.contents.isSecret != null){
                        if(jsonData.resultData.contents.isSecret == 'Y'){
                            $('#isSecret').jqxCheckBox({ checked: true });
                        }else{
                            $('#isSecret').jqxCheckBox({ checked: false });
						}
                    }*/
				}
			});

		},
		
		/** init data */
		initData: function() {
			
		},
		
		
		upgradeBoard: function() {
			if(!this.validateForm()) return;
			var params={
					boardNo: $('#boardNo').val() ,
					boardTitle: $('#boardTitle').val() ,
					boardContent: $('#editor').val()
			};

            $.ajax({
                type: "post",
                url: $('#ctxPath').val() + '/api/main/sec/qnaBoard/checkAuth',
                data: {boardNo: $('#boardNo').val()},
                dataType: "json",
                success: function (jsonData) {
                    if(jsonData.resultData == 'N'){
                        alert("잘못된 접근 입니다.");
                        return
                    }else{
                        Server.post('/api/main/sec/qnaBoard/editBoard', {
                            data: params,
                            success: function(result) {
                                window.opener.Main.searchBoard();
                                alert("수정 되었습니다");
                                location.href = $('#ctxPath').val() + '/main/board/pQnaBoardContents.do?boardNo=' +$('#boardNo').val();
                            }
                        });
                    }
                }
            })

		},
		
		boardList: function() {
			window.location.href=$('#ctxPath').val() +"/main/board/pQnaBoardList.do";
		},
		

		validateForm: function() {
			var text  = $('#boardTitle').val().length;
	    	if(text==0) {
	    		alert("제목을 입력해주세요.");
	    		$("#boardTitle").focus();
	    		return false;
	    	}else if(text > 100 ){
	    		alert("제목을 100자 이내로 입력해주세요.");
	    		$("#boardTitle").focus();
	    		return false;
	    	}
	    	text  = $('#editor').val();
	    	if(text=='<br>' || text=='' || text==null) {
	    		alert("내용을 입력해주세요.");
	    		$('#editor').focus();
	    		return false;
	    	}
	    	return true;
	    },
		
		boardClose: function() {
			self.close();
		}
};