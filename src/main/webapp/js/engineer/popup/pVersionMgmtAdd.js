var pMain = {
        /** variable */
        initVariable : function() {

        },

        /** add event */
        observe : function() {
            $('button').bind('click', function(event) { pMain.eventControl(event); });
            $('img').bind('click', function(event) { pMain.eventControl(event); });
        },

        /** event handler */
        eventControl : function(event) {
            var curTarget = event.currentTarget;
            switch (curTarget.id) {
                case 'btnSave': this.saveContents(); break;
                case 'btnClose': this.boardClose(); break;
            }
        },

        /** init design */
        initDesign : function() {
            $('#editor').jqxEditor({
                height : "470"
            });
        },

        /** init data */
        initData : function() {
            $('.boardContent').val("");
        },

        saveContents : function() {
            if(!this.validateForm()) return;
            var params={
                boardTitle: $('#boardTitle').val() ,
                boardContent: $('#editor').val()
            };
            /*
            Server.post('/api/main/oms/supportBoard/addBoard', {
                data : params,
                success : function(result) {
                    window.opener.Main.searchSBoard();
                    location.href = $('#ctxPath').val() + '/main/board/pSupportBoardContents.do?boardNo=' + result;
                }
            });
            */
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
            }else if(text.length > 40000 ){
                alert("내용을 40000자 이내로 입력해주세요.");
                return false;
            }
            return true;
        },

        boardClose: function() {
            self.close();
        }
};


$(function() {
    pMain.initVariable();
    pMain.observe();
    pMain.initDesign();
    pMain.initData();
});
