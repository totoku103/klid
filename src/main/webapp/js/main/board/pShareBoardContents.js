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
    initVariable : function() {
		/* 부모창이 메인페이지면 목록보기 버튼 보이게 */
        url = $(opener.document).find("#parentPage").val();
        var lastIndex = url.lastIndexOf("/");
        url = url.substring(lastIndex + 1, url.length - 4);
    },

    /** add event */
    observe : function() {
        $('button').bind('click', function(event) {
            Main.eventControl(event);
        });
        $('img').bind('click', function(event) {
            Main.eventControl(event);
        });
    },

    /** event handler */
    eventControl : function(event) {
        var curTarget = event.currentTarget;
        switch (curTarget.id) {
            case 'btnUpgrade':
                this.upgradeBoard();
                break;
            case 'btnDelete':
                this.deleteBoard();
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
        $('#editor').jqxEditor({ height : "420px", editable : false, tools : '' });
        $.ajax({ type : "post", url : $('#ctxPath').val() + '/api/main/sec/shareBoard/getBoardContents', data : "boardNo=" + $('#boardNo').val(), dataType : "json", success : function(jsonData) {
            var contents = jsonData.resultData.contents;
            var regDate = HmUtil.parseDate(contents.regDate);
            var endDt = HmUtil.parseDate(contents.endDt).replace("::", "")
            $('#userName').val(contents.userName);
            $('#instNm').val(contents.instNm);
            $('#boardHits').val(contents.readCnt);
            $('#boardTitle').val(contents.bultnTitle);
            $('#regDate').val(regDate);
            $('#endDt').val(endDt);

            $('#editor').val(DOMPurify.sanitize(contents.bultnCont.htmlCharacterUnescapes()));

            if(contents.userId==$('#sUserId').val()){
                var btnUpgradeHtml = '<button id="btnUpgrade" type="button" class="p_btnAdj"></button>';
                var btnDeleteHtml = '<button id="btnDelete" type="button" class="p_btnDel"></button>';

                if ($('#authSha02').val() == 'Y') {
                    $(".p_btnPos").append(btnUpgradeHtml);
                    $("#btnUpgrade").attr("onclick", "Main.rhddbtnwjd()")
                };
                if ($('#authSha03').val() == 'Y') {
                    $(".p_btnPos").append(btnDeleteHtml);
                    $("#btnDelete").attr("onclick", "Main.rhddbtkrwp()")
                };
            }

            HmUtil.attachFileList(jsonData.resultData.attachFile, false);
            window.opener.Main.searchNBoard();
        } });

    },

    /** init data */
    initData : function() {

    },

    rhddbtnwjd : function() {
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
                    window.location.href = $('#ctxPath').val() + "/main/board/pShareBoardEdit.do?boardNo=" + $('#boardNo').val();
                }
            }
        });
    },

    rhddbtkrwp : function() {
        if (confirm("삭제 하시겠습니까?") != true)
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
                    $.ajax({ type : "post", url : $('#ctxPath').val() + '/api/main/sec/shareBoard/delBoard', data : "boardNo=" + $('#boardNo').val(), dataType : "json", success : function(jsonData) {
                    } });

                    $.ajax({ type : "post", url : $('#ctxPath').val() + '/api/file/delete', data : { boardNo : $('#boardNo').val() }, dataType : "json", success : function(jsonData) {

                        window.opener.Main.sidoCnt();
                        window.opener.Main.searchNBoard('reload');
                        if (url == "main") {
                            window.location.href = $('#ctxPath').val() + "/main/board/pShareBoardList.do";
                        } else {
                            self.close();
                        }
                        alert("삭제 되었습니다");
                    } });
                }
            }
        });


    },

    boardList : function() {
        window.location.href = $('#ctxPath').val() + "/main/board/pShareBoardList.do";
    },

    boardClose : function() {
        self.close();
    }

};