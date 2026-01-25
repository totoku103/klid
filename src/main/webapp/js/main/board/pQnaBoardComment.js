var url;

$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});

var Main = {
		/** variable */
		initVariable: function() {
			/*부모창이 메인페이지면 목록보기 버튼 보이게*/
			url=$(opener.document).find("#parentPage").val();
			var lastIndex=url.lastIndexOf("/");
			url=url.substring(lastIndex+1, url.length-4);
			if(url=="main"||url=="tchMain"){
				$("#btnBoardList").css("display","inline");
			}

			$("#boardTitle") .val('[RE]');
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
			case 'btnComment': this.commentBoard(); break;
			//case 'btnBoardList': this.boardList(); break;
			case 'btnClose': this.boardClose(); break;
			}
		},
		
		/** init design */
		initDesign: function() {
			 $('#editor').jqxEditor({
	             height: "470"
	         });
			$.ajax({
				type : "post",
				url :$('#ctxPath').val() + '/api/main/sec/qnaBoard/getBoardContents',
				data : "boardNo="+$('#boardNo').val(),
				dataType : "json",
				success : function(jsonData) {
					$("#cateNo").val(jsonData.resultData.contents.cateNo);
                    $("#groupItemNo").val(jsonData.resultData.contents.groupItemNo);
					var  reContente=	"<br>------------------Original Message------------------<br>"
											+"작성자 : "+jsonData.resultData.contents.userId +"<br>" 
											+"작성일 : "+jsonData.resultData.contents.regDate+"<br>"
											+"제목 : "+jsonData.resultData.contents.bultnTitle+"<br>"
											+"내용: "+jsonData.resultData.contents.bultnCont.htmlCharacterUnescapes()+
											"<br>------------------------------------------------------<br><br>" ;
					$('.boardContent').val(reContente);
				} 
			});
			
		},
		
		/** init data */
		initData: function() {
			
		},
		
		
		commentBoard: function() {
			if(!this.validateForm()) return;
			var title = $('#boardTitle').val();
			var params={
					boardNo: $('#boardNo').val(),
					boardParentNo: $('#boardParentNo').val(),
					boardTitle: title,
					boardContent: $('#editor').val(),
                	cateNo: $("#cateNo").val(),
                	groupItemNo: $("#groupItemNo").val(),
                	userId: $('#sUserId').val(),
					levelNo : parseInt($('#levelNo').val()) + 1,
					userName : $('#sUserName').val(),
                	organCode: $('#sInstCd').val()
			};
			Server.post('/api/main/sec/qnaBoard/addComment', {
				data: params,
				success: function(result) {
					location.href = $('#ctxPath').val() + '/main/board/pQnaBoardContents.do?boardNo=' + result;
					if(url=="main"){
						
					}else{
						window.opener.Main.searchBoard();
					}
					alert("등록 되었습니다");
				}
			});
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
	    	}else if(text.length > 2000 ){
	    		alert("내용을 2000자 이내로 입력해주세요.");
	    		return false;
	    	}
	    	return true;
	    },
		
		boardClose: function() {
			self.close();
		}
};