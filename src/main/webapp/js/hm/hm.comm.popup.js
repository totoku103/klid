var HmAccProcPopup = {
    /**
     * 사고신고 프로세스 변경 공통 팝업
     * @param
     * 각 팝업형태에 따라 파라메터 변경
     * 팝업타이틀 명
     */
    callProcessPopup: function(params) {
        $.ajax({
            type: "post",
            url: $('#ctxPath').val() + '/api/main/env/userConf/checkUserAuth',
            data: {boardNo: $('#boardNo').val()},
            dataType: "json",
            success: function (jsonData) {
                console.log(jsonData.resultData)
                if(jsonData.resultData == 0){
                    alert("잘못된 접근 입니다.");
                    return
                }else{
                    //정상권한

                    var pwin = $('#pCommonWindow');
                    var pHeight = 280;

                    if(params.type == 'sidoCont'){
                        pHeight = 450;
                    }
                    try {
                        if(pwin.length == 0) {
                            pwin = $('<div id="pCommonWindow" style="position: absolute;"></div>')
                            pwin.append($('<div></div>'));
                            pwin.append($('<div></div>'));
                            $('body').append(pwin);
                        }
                        HmWindow.create(pwin);
                    } catch(e) {}

                    $.post(ctxPath + '/main/popup/acc/pAccidentProcess.do',
                        function(result) {
                            HmWindow.popOpen(pwin, params.popupTitle, result, 500, pHeight, 'pCommonWindow_init', params, 810);

                        }
                    );

                }
            }
        })


    }


};