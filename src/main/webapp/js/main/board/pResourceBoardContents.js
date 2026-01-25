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
        // url = $(opener.document).find("#parentPage").val();
        // var lastIndex = url.lastIndexOf("/");
        // url = url.substring(lastIndex + 1, url.length - 4);
        //
        // if (url == "main" || url == "tchMain") {
        // 	$("#btnBoardList").css("display", "inline");
        // }

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


        $("#instNm").val($("#sInstName").val());

        $('#editor').jqxEditor({ height : "420px", editable : false, tools : '' });
        $.ajax({ type : "post", url : $('#ctxPath').val() + '/api/main/sec/resourceBoard/getBoardContents', data : "boardNo=" + $('#boardNo').val(), dataType : "json", success : function(jsonData) {
            var contents = jsonData.resultData.contents;
            var regDate = HmUtil.parseDate(contents.regDate);
            var endDt = HmUtil.parseDate(contents.endDt).replace("::", "")
            $('#userName').val(contents.userName);
            $('#boardHits').val(contents.readCnt);
            $('#boardTitle').val(contents.bultnTitle);
            $('#regDate').val(regDate);
            $('#endDt').val(endDt);

            $('#editor').val(contents.bultnCont.htmlCharacterUnescapes());
            if ($('#sUserId').val() == contents.userId) {
                var btnUpgradeHtml = '<button id="btnUpgrade" type="button" class="p_btnAdj"></button>';
                var btnDeleteHtml = '<button id="btnDelete" type="button" class="p_btnDel"></button>';

                if ($('#authRes02').val() == 'Y') {
                    $(".p_btnPos").append(btnUpgradeHtml);
                    $("#btnUpgrade").attr("onclick", "Main.wkfytlftnwjd()")
                };

                if ($('#authRes03').val() == 'Y') {
                    $(".p_btnPos").append(btnDeleteHtml);
                    $("#btnDelete").attr("onclick", "Main.wkfytlftkrwp()")
                };
            }

            HmUtil.attachFileList(jsonData.resultData.attachFile, false);

            //window.opener.Main.searchNBoard();
        } });

    },

    /** init data */
    initData : function() {

    },

    wkfytlftnwjd : function() {
        $.ajax({
            type : "post",
            url : $('#ctxPath').val() + '/api/main/sec/resourceBoard/checkAuth',
            data: {boardNo: $('#boardNo').val()},
            dataType : "json",
            success : function(jsonData) {
                console.log(jsonData.resultData)
                if(jsonData.resultData == 'N'){
                    alert("잘못된 접근 입니다.");
                    return
                }else{
                    window.location.href = $('#ctxPath').val() + "/main/board/pResourceBoardEdit.do?boardNo=" + $('#boardNo').val();
                }
            }
        });
    },

    wkfytlftkrwp : function() {
        if (confirm("삭제 하시겠습니까?") != true)
            return;

        $.ajax({
            type: "post",
            url: $('#ctxPath').val() + '/api/main/sec/resourceBoard/checkAuth',
            data: {boardNo: $('#boardNo').val()},
            dataType: "json",
            success: function (jsonData) {
                if(jsonData.resultData == 'N'){
                    alert("잘못된 접근 입니다.");
                    return
                }else{
                    $.ajax({ type : "post", url : $('#ctxPath').val() + '/api/main/sec/resourceBoard/delBoard', data : "boardNo=" + $('#boardNo').val(), dataType : "json", success : function(jsonData) {
                    } });

                    $.ajax({ type : "post", url : $('#ctxPath').val() + '/api/file/delete', data : { boardNo : $('#boardNo').val() }, dataType : "json", success : function(jsonData) {
                        window.opener.Main.searchNBoard();
                        if (url == "main") {
                            window.location.href = $('#ctxPath').val() + "/main/board/pResourceBoardList.do";
                        } else {
                            self.close();
                        }
                        alert("삭제 되었습니다");
                    } });
                }
            }
        })

    },

    boardList : function() {
        window.location.href = $('#ctxPath').val() + "/main/board/pResourceBoardList.do";
    },

    boardClose : function() {
        self.close();
    }

};