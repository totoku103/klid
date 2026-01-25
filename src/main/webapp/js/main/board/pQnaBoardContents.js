var url;
var isAdmin = false;
$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});

var Main = {
    /** variable */
    initVariable: function() {
        // /*부모창이 메인페이지면 목록보기 버튼 보이게*/
        // url=$(opener.document).find("#parentPage").val();
        // var lastIndex=url.lastIndexOf("/");
        // url=url.substring(lastIndex+1, url.length-4);
        // if(url=="main"||url=="tchMain"){
        // 	//$("#btnBoardList").css("display","inline");
        // }
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
            //case 'btnAppr': this.editAppr(); break;
            case 'btnComment': this.commentBoard(); break;
            case 'btnUpgrade': this.upgradeBoard(); break;
            case 'btnDelete': this.deleteBoard(); break;
            case 'btnBoardList': this.boardList(); break;
            case 'btnClose': this.boardClose(); break;
        }
    },

    /** init design */
    initDesign: function() {



        $('#editor').jqxEditor({ height : "420px", editable : false, tools : '' });

        $.ajax({
            type : "post",
            url :$('#ctxPath').val() + '/api/main/sec/qnaBoard/getBoardContents',
            data : "boardNo="+$('#boardNo').val(),
            dataType : "json",
            success : function(jsonData) {

                var resultData = jsonData.resultData.contents;
                // console.log(resultData);
				/*$('#userName').html(resultData.userName+"("+resultData.userId+")"+_grpName);*/
                $('#userName').val(resultData.userName);
                $('#boardHits').val(resultData.readCnt);
                $('#boardTitle').val(resultData.bultnTitle);

                var regDate = HmUtil.parseDate(resultData.regDate);

                // if(resultData.levelNo==0){
                // 	if ($('#authQna04').val() == 'Y') {
                $('#btnComment').css("display", "inline");
                // };
                // }

                if($('#sUserId').val()==resultData.userId){
                    var btnUpgradeHtml = '<button id="btnUpgrade" type="button" class="p_btnAdj"></button>';
                    var btnDeleteHtml = '<button id="btnDelete" type="button" class="p_btnDel"></button>';

                    if ($('#authQna03').val() == 'Y') {
                        $(".p_btnPos").append(btnDeleteHtml);
                        $("#btnDelete").attr("onclick", "Main.ansdmltkrwp()")
                    };
                    //20190103 유성준 선임 요청에 의한 문의/의견 게시판 본인 여부만 맞으면 권한에 상관없이 본인글 수정 가능하도록 수정
                    //if ($('#authQna02').val() == 'Y') {

                    //};

                    $(".p_btnPos").append(btnUpgradeHtml);
                    $("#btnUpgrade").attr("onclick", "Main.ansdmltnwjd()")
                }

                $('#regDate').val(regDate);
                $('#editor').val(resultData.bultnCont.htmlCharacterUnescapes());

                HmUtil.attachFileList(jsonData.resultData.attachFile, false);
                window.opener.Main.reload();
            }
        });

    },

    /** init data */
    initData: function() {

    },


    ansdmltnwjd: function() {
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
                    window.location.href=$('#ctxPath').val() +"/main/board/pQnaBoardEdit.do?boardNo="+$('#boardNo').val();
                }
            }
        })
    },

    ansdmltkrwp: function() {
        if (confirm("삭제 하시겠습니까?") != true) return;

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
                    $.ajax({
                        type : "post",
                        url :$('#ctxPath').val() + '/api/main/sec/qnaBoard/delBoard',
                        data : "boardNo="+$('#boardNo').val(),
                        dataType : "json",
                        success : function(jsonData) {
                            window.opener.Main.searchBoard();
                            if(url=="main"){
                                window.location.href=$('#ctxPath').val() +"/main/board/pQnaBoardList.do";
                            }else{
                                self.close();
                            }
                            alert("삭제 되었습니다");
                        }
                    });
                }
            }
        })
    },

    boardList: function() {
        window.location.href=$('#ctxPath').val() +"/main/board/pQnaBoardList.do";
    },

    commentBoard: function() {
        window.location.href=$('#ctxPath').val() +"/main/board/pQnaBoardComment.do?boardNo="+$('#boardNo').val() +'&levelNo='+$('#levelNo').val();
        //var params={boardNo: $('#boardNo').val() , levelNo: $('#levelNo').val()};
        //HmUtil.createPopup('/main/board/pQnaBoardComment.do', $('#hForm'), 'pQnaBoardContents', 1000, 650, params);
    },

    boardClose: function() {
        self.close();
    },

    /** 게시판 번호로 게시판 글 승인  */
    // TODO: 레거시 코드 - /scn/oms/errorBoard/editAppr.do 컨트롤러가 존재하지 않음
    editAppr: function() {
        if(!confirm('처리 현황을 확인으로 변경합니다.')) return;
        // Server.post('/scn/oms/errorBoard/editAppr.do', {
        //     data: { boardNo: $('#boardNo').val() },
        //     success: function(result) {
        //         window.opener.Main.searchBoard();
        //         alert('처리 완료되었습니다.');
        //     }
        // });
        alert('해당 기능은 현재 지원되지 않습니다.');
    }
};