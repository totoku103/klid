var ctxPath = '';

$(function () {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
    $('#userId').focus();
});

var Main = {
    /** variable */
    initVariable: function () {
        ctxPath = $("#ctxPath").val();
    },

    /** add event */
    observe: function () {
        $('#password').on('keypress', function (event) {
            if (event.keyCode == 13) {
                Main.login();
                return false;
            }
            return;
        });
        $('#btnLogin').bind('click', function (event) {
            Main.eventControl(event);
        });
        $('#btnAccount').bind('click', function (event) {
            Main.eventControl(event);
        });

        $('#otpBtn').bind('click', function (event) {
            Main.eventControl(event);
        });
        $('#otpBtn2').bind('click', function (event) {
            Main.eventControl(event);
        });

        $('#userCode').on('keypress', function (event) {
            if (event.keyCode == 13) {
                Main.otpCheck();
                return false;
            }
            return;
        });
    },

    /** event handler */
    eventControl: function (event) {
        var curTarget = event.currentTarget;
        switch (curTarget.id) {
            case 'btnLogin':
                this.login();
                break;
            case 'btnAccount':
                this.showAccount();
                break;
            case 'otpBtn':
                this.otpCheck();
                break;
        }
    },

    /** init design */
    initDesign: function () {
        var result = Main.getVersionOfBrowser();
        if (result.name == 'MSIE') {
            if (result.version < 9) {
                //TODO
                //if(!confirm("익스플로러 버전이 9보다 낮아 이용이 불가합니다.\n익스플로러 9버전을 다운받으시겠습니까?")) return;

            }
        }
    },

    /** init data */
    initData: function () {
        var srchResCd = new Array();
        //공통코드 개인정보정책 담당자/책임자 정보
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/code/getCommonCode',
            data: {comCode1: '4019', codeLvl: '2'},
            async: false,
            success: function (data) {
                for (var i = 0; i < data.resultData.length; i++) {
                    if (data.resultData[i].comCode2 == 1) {
                        $("#polName1").text(data.resultData[i].codeName)
                    }
                    if (data.resultData[i].comCode2 == 2) {
                        $("#polAdd1").text(data.resultData[i].codeName)
                    }
                    if (data.resultData[i].comCode2 == 3) {
                        $("#polName2").text(data.resultData[i].codeName)
                    }
                    if (data.resultData[i].comCode2 == 4) {
                        $("#polAdd2").text(data.resultData[i].codeName)
                    }
                }
                //srchResCd.push({label: '전체', value: ''});
                //$.each(data.resultData, function (index, data) {
                //srchResCd.push({label: data.codeName, value: data.comCode2})
                //});
            }
        });
    },

    getVersionOfBrowser: function () {

        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return {name: tem[1].replace('OPR', 'Opera'), version: tem[2]};
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null)
            M.splice(1, 1, tem[1]);
        return {name: M[0], version: M[1]};

    },

    /** login */
    login: function () {
        var obj = $('#userId');
        if ($.isBlank(obj.val())) {
            alert('ID를 입력해주세요.');
            obj.focus();
            return;
        }
        obj = $('#password');
        if ($.isBlank(obj.val())) {
            alert('Password를 입력해주세요.');
            obj.focus();
            return;
        }

        //잠겼는지 확인
        // Server.post('/login/isUserAccountLocked.do', {
        //    data: { userId: $('#userId').val(), retries: $('#gRetries').val(), releaseTime:$('#gReleaseTime').val()},
        //    success: function(data) {
        //    	if(data){
        //
        Server.post('/api/login/getLogin', {
            data: {
                userId: $('#userId').val(), password: $('#password').val()
            },
            success: function (data) {
                if (data.data == "OK") {
                    Main.otpMake();
                    //var mainUrl = '/main/main.do';
                    //location.href = ctxPath + mainUrl;
                } else { //로그인 실패시

                    if (data.data == 'expire') { //비밀번호 만료 3개월(12주)
                        alert("비밀번호를 변경해주세요.");
                        Main.showAccount();
                    } else if (data.data == 'lock') {
                        alert("잠긴 계정입니다. 관리자에게 문의해주세요.")
                    } else if (data.data == 'reset') {
                        alert("비밀번호를 재 설정해주세요.");
                        Main.showAccount();
                    } else if (data.data == 'ipMiss') {
                        alert("접속하신 IP가 올바르지 않습니다.")
                    } else {
                        alert(data.data)
                    }
                }
            }
        });
        // 		}else{
        //    		alert('요청하신 계정은 잠금 상태 입니다.');
        //            return;
        // 		}
        //
        //    }
        // });

    },
    showAccount: function () {
        var mainUrl = '/main/popup/env/expire/pUserPassExpireReset.do'
        //HmUtil.createPopup(mainUrl , $('#hForm'), 'pAccountAdd', 400, 180);
        window.open('main/popup/env/expire/pUserPassExpireReset.do', '', 'width=420, height=160')
    },

    test: function () {
        var pwin = $('#pInfoWindow');
        var pHeight = 280;

        try {
            if (pwin.length == 0) {
                pwin = $('<div id="pInfoWindow" style="position: absolute;"></div>')
                pwin.append($('<div></div>'));
                pwin.append($('<div></div>'));
                $('body').append(pwin);
            }
            HmWindow.create(pwin);
        } catch (e) {
        }

        $.post(ctxPath + '/main/popup/sys/pPolicyInfo.do',
            function (result) {
                HmWindow.open(pwin, '개인정보 처리방침', result, 980, 650, 'pInfoWindow_init', '');

            }
        );
    },

    otpMake: function () {
        Server.post('/api/login/getOtpGenerate', {
            data: {},
            success: function (data) {
                console.log("data", data.data.newKey + "    " + data.data.userKey);
                if (data.data.userKey == null) {
                    $("#otpNewCode").text(data.data.newKey);
                    $('#otpSetCode').val(data.data.newKey);

                } else {
                    $("#otpNewCodeInfo").text("OTP 번호를 입력해주세요.")
                    $('#otpSetCode').val(data.data.userKey);
                }

                $("#optForm").show();
            }
        });
    },

    otpCheck: function () {
        if ($('#userCode').val() == '') {
            alert("OTP 인증번호를 입력해주세요.");
            return
        }
        ;

        if (!$('#userCode').val().isNum()) {
            alert('6자리 숫자를 입력해주세요.');
            $('#userCode').val('')
            return;
        }
        console.log("->", $('#otpSetCode').val() + "   입력값   " + $('#userCode').val());

        Server.post('/api/login/getOtpCheck', {
            data: {
                otpSetCode: $('#otpSetCode').val(), userCode: $('#userCode').val()
            },
            success: function (data) {
                console.log("data.data", data.data)
                if (data.data == true) {

                    //otp 인증 성공 이후
                    Server.post('/api/login/editOtpKey', {
                        data: {
                            otpSetCode: $('#otpSetCode').val(),
                            userId: $('#sUserId').val()
                        },
                        success: function (data) {
                            alert("OTP 인증성공")
                            var mainUrl = '/main/main.do';
                            location.href = ctxPath + mainUrl;
                        }

                    });

                } else {
                    alert("OTP 인증실패")
                }
            }
        });
    }

};