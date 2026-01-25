var jqxTheme = 'ui-hamon', ctxPath = '';

$(function () {
    Master.initVariable();
    Master.observe();
    Master.initDesign();
    Master.initData();
});

var Master = {
    initVariable: function () {
        ctxPath = $('#ctxPath').val();

        var icoNm = 'favicon.ico';
        if ($('#gSiteName').val() == 'SangsinBreak' || $('#gSiteName').val() == 'Sycros') {
            icoNm = 'sycros.ico';
        }
        //var icoUrl = ctxPath + '/img/ico/' + icoNm;
        //$('head').append('<link rel="shortcut icon" href="' + icoUrl + '" />');
    },

    observe: function () {
        $('#btnLogout').bind('click', function (event) {
            Master.prcsLogout();
        });


        //$('#password').on('keypress', function(event) { if(event.keyCode == 13) {Main.login(); return false;} return; });
        $('.searchBox').on('keypress', function (event) {
            if (event.keyCode == 13) {
                Master.commonBtnSearch(event);
                return false;
            }
            return;
        });

        const vmsLinkElement = document.getElementById('link-third-party-vms');
        if (vmsLinkElement) {
            vmsLinkElement.addEventListener('click', function () {
                Master.redirectVmsMainPage();
            });
        }

        const ctssLinkElement = document.getElementById('link-third-party-ctss');
        if (ctssLinkElement) {
            ctssLinkElement.addEventListener('click', function () {
                Master.redirectCtssMainPage();
            });
        }
    },

    redirectCtssMainPage: function (isConfirm) {
        if (isConfirm === null || isConfirm === undefined) isConfirm = true;

        fetch("/api/main/ctss/redirect/auth", {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        })
            .then(r => {
                const contentType = r.headers.get("content-type") || "";
                if (contentType.includes("application/json")) {
                    return r.json();
                }
                window.location.href = "/login.do";
                return Promise.reject();
            })
            .then(data => {
                if (data.hasError) throw new Error(data.errorInfo?.message || 'Unknown error');
            })
            .then(data => {
                if (isConfirm) {
                    if (confirm("주요정보통신기반시설 업무지원시스템으로 이동하시겠습니까?")) {
                        window.location.href = "/main/ctss/page-redirect.do";
                    }
                } else {
                    window.location.href = "/main/ctss/page-redirect.do";
                }
            })
            .catch(err => {
                console.error(err)
                alert(err.message)
            })
    },

    redirectVmsMainPage: function (isConfirm) {
        if (isConfirm === null || isConfirm === undefined) isConfirm = true;

        fetch("/api/main/vms/redirect/auth", {
            method: 'GET',
            headers: {'content-type': 'application/json'}
        })
            .then(r => {
                const contentType = r.headers.get("content-type") || "";
                if (contentType.includes("application/json")) {
                    return r.json();
                }
                window.location.href = "/login.do";
                return Promise.reject();
            })
            .then(data => {
                if (data.hasError) throw new Error(data.errorInfo?.message || 'Unknown error');
            })
            .then(data => {
                if (isConfirm) {
                    if (confirm("취약점진단 통합관리시스템으로 이동하시겠습니까?")) {
                        window.location.href = "/main/vms/page-redirect.do";
                    }
                } else {
                    window.location.href = "/main/vms/page-redirect.do";
                }
            })
            .catch(err => {
                console.error(err)
                alert(err.message)
            })
    },

    commonBtnSearch: function (event) {
        try {
            Main.search();
        } catch (error) {
            Main.searchNBoard();
        }
    },

    initDesign: function () {
        // HmHighchart.setOptions();
        $.ajaxSetup({cache: false});

        //메뉴생성
        if ($('#mega-menu') !== undefined) {
            $('#mega-menu').dcMegaMenu({
                rowItems: '6',
                beforeOpen: function () {
                    // rack화면에서 서브그리드 오픈시 z-index문제로 메뉴를 오픈하면 가려지는 현상발생
                    // 메뉴오픈전에 z-index를 조정하는 코드 추가
                    //$('#mega-menu').css('z-index', 9999999);
                },
                onLoad: function () {
                    $('#mega-menu').css('visibility', 'visible');
                }
            });
        }
    },

    initData: function () {
        Master.setLoc();
        document.title = "사이버 침해대응시스템";
        Master.setCommInit();

        //2022.01.18 공지사항 여부 체크
        var urlFull = window.location.href;

        var protocol = location.protocol + "//";
        var hostName = location.host;
        var domainUrl = protocol + hostName + "/";
        var sortUrl = urlFull.replace(domainUrl, "");

        var lastUrl = sortUrl.split("/");
        //길이가 2보다 크면서;
        if (lastUrl.length > 2) {
            if (lastUrl[2].startsWith('p')) { //팝업 관련 페이지에서는 실시간 공지 팝업 차단
                console.log('팝업');
                return
            } else {
                Master.noticePopup();
            }
        } else { //url이 2단계 면서 메인 페이지일 경우 실시간 공지 팝업 호출
            if (sortUrl.indexOf('main.do') > 0) {
                Master.noticePopup();
            }
        }


    },

    noticePopup: function () {
        // return
        Server.get('/api/main/sec/noticeBoard/getBoardList', {
            data: {
                sAuthMain: $("#sAuthMain").val(),
                sInstCd: $("#sInstCd").val(),
                sPntInstCd: $("#sPntInstCd").val(),
                popupYn: 'Y'
            },
            success: function (result) {
                if (result.length > 0) {
                    Master.setNotificationInit(result.length);

                    $.each(result, function (index, data) {
                        var popupName = data.userId + '_' + data.bultnNo;
                        Master.openPopup(data.bultnNo, popupName);
                    });
                }
            }
        });
    },

    openPopup: function (bultnNo, popupName) {
        var params = {};
        params.sUserId = $('#sUserId').val()
        params.bultnNo = bultnNo;

        var boardNo = bultnNo;
        var popupNm = popupName;
        Server.get('/api/main/sec/noticeBoard/getConfirmCheck', {
            data: params,
            success: function (result) {
                if (result === 0) {
                    Master.showNotification(boardNo, popupNm)
                    // HmUtil.createPopup('/main/board/pNoticeBoardContents.do?boardNo=' + boardNo, $('#hForm'), popupNm, 1000, 750);
                }
            }
        });
    },

    setNotificationInit: function () {
        var div = $('<div id="containerBox" style="width: 300px; z-index: 9999; position: absolute; left: 15px; bottom: 10px;overflow: auto; max-height: 750px "></div>');
        $('body').append(div);

    },

    showNotification: function (boardNo, popupNm) {
        var audio = new Audio('/css/default.mp3');
        audio.play();

        var div = '<div id="ntNo_' + boardNo + '"><div>긴급공지사항입니다.</div></div>';
        $('#containerBox').before(div);

        var $notificationId = $("#ntNo_" + boardNo);
        $notificationId.jqxNotification({
            appendContainer: "#containerBox",
            width: "100%",
            opacity: 0.9,
            autoOpen: true, animationOpenDelay: 800,
            autoClose: false, autoCloseDelay: 3000,
            template: 'warning'
        });

        $notificationId.on('click', function () {
            var boardNo = this.id.split('_')[1];

            Server.post('/api/main/sec/noticeBoard/addNoticeConfirm', {
                data: {
                    bultnNo: boardNo,
                    uUserId: $('#sUserId').val()
                },
                success: function () {
                }
            });

            HmUtil.createPopup('/main/board/pNoticeBoardContents.do?boardNo=' + boardNo, $('#hForm'), '', 1000, 750);
        })
    },

    /** set images src */
    setImg: function () {

    },

    // 공통초기화 (이미지, 버튼 등등)
    setCommInit: function () {
        try {
            var pwin = $('#pwindow');
            if (pwin.length == 0) {
                pwin = $('<div id="pwindow" style="position: absolute;"></div>');
                pwin.append($('<div></div>'));
                pwin.append($('<div></div>'));
                $('body').append(pwin);
            }
            HmWindow.create(pwin);
        } catch (e) {
        }
    },

    //버튼이미지 설정
    setBtnImgSrc: function () {

    },

    // 공통이미지 설정
    setCommImgSrc: function () {

    },

    // location 영역 설정
    setLoc: function (event) {
        var urlPath = window.location.pathname;
        $('#mega-menu li.level-3 a').each(function () {
            var href = $(this).attr('href');
            /**
             * SK텔링크 > 장애현황을 팝업형태로 호출 예외처리
             * @date 2017.1.25
             * @req 권덕용
             * @author jjung
             */
            /*
            if($('#gSiteName').val() == 'SkTelink') {
                if(href.indexOf('javascript:') !== -1) {
                    href = href.replace('javascript: Menu.gotoPage("', '').replace('")', '');
                }
            }
            */

            if (urlPath == href) {
                var menu = $(this).text();
                var pageGrp = $(this).closest('li.level-2').children(':first').text();
                var page = $(this).closest('li.level-1').children(':first').text();
                $('#navMenuNm, #navPageMenu').text(menu);
                $('#navPage').text(page);
                $('#navPageGrp').text(pageGrp);
                /*
            } else if (urlPath == '/main/layout/layout.do' && (href.indexOf('gotoLayoutPage') !== -1)) {
                var menu = $(this).text();
                var pageGrp = $(this).closest('li.level-2').children(':first').text();
                var page = $(this).closest('li.level-1').children(':first').text();
                $('#navMenuNm, #navPageMenu').text(menu);
                $('#navPage').text(page);
                $('#navPageGrp').text(pageGrp);*/
            }
        });
    },

    // 버튼 활성화/비활성화 상태 변경
    setBtnDisable: function ($btn, isDisable) {
        if (isDisable) {
            $btn.addClass('btnDisable').attr('disabled', 'disabled');
        } else {
            $btn.removeClass('btnDisable').removeAttr('disabled');
        }
    },

    /** 로고 클릭시 메인화면으로 이동 */
    gotoMainPage: function () {
//    	var _auth = $('#sAuth').val().toUpperCase();
        switch ($('#gSiteName').val()) {
            case 'Samsung':
                location.href = ctxPath + '/samsung/main.do';
                break;
            //location.href = $.inArray(_auth, ['SYSTEM', 'ADMIN', 'MUSER']) > -1? ctxPath + '/nia/main.do' : ctxPath + '/nia/usrMain.do';
            default:
                location.href = ctxPath + '/main/main.do';
                break;
        }
    },

    /** 편집형 대시보드 호출 */
    gotoNetisDash: function () {
        var url;
        if ($('#gDashDefaultUse').val() === "true") {
//    		url = location.protocol + '//' + location.hostname + ':' + $('#gDashPort').val() + '/netis/main.do';
            url = location.protocol + '//' + location.hostname + ':' + location.port + '/netis/main.do';
        } else {
            url = location.protocol + '//' + $('#gDashIp').val() + ':' + $('#gDashPort').val() + ($('#gDashUrl').val() == 'null' ? '' : $('#gDashUrl').val());
        }
        HmUtil.createFullPopup(url, $('#hForm'), 'pNetisDash', {userId: $('#sUserId').val(), inflow: 'NetisWeb'});
    },

    /** 대시보드 호출 Link */
    gotoDashLink: function (type) {
        var params = {
            type: type,
            sUserId: $('#sUserId').val(),
            instCd: $('#sInstCd').val(),
            sInstLevel: $('#sInstLevel').val(),
            sPntInstCd: $('#sPntInstCd').val(),
            sInstName: $('#sInstName').val(),
            fullSize: true
        }

        //HmUtil.createFullPopup('http://10.1.3.229:8006', $('#hForm'), 'pNetisDash', params);
        HmUtil.createFullPopup('http://10.1.3.229:28082', $('#hForm'), 'pNetisDash');

        // var dashLinkType = $('#gDashLinkType').val();
        // var dashLinkURL = $('#gDashLinkURL').val();
        // var hostName = location.hostname;
        // var protocol = location.protocol + "//";
        //
        // if (dashLinkType === 'Layout') {
        //    var guid = dashLinkURL.substring(0, dashLinkURL.indexOf('/'));
        //    var grpType = dashLinkURL.substring(dashLinkURL.indexOf('/') + 1, dashLinkURL.length);
        //
        //    //HmUtil.createFullPopup(ctxPath + '/main/layout/layout.do', $('#hForm'), 'pNetisDash', {guid: guid, grpType: grpType, fullSize: true });
        //
        //    Master.gotoLayoutPage(guid, grpType, false);
        // } else  {
        //    dashLinkURL.replace("localhost", hostName);
        //    dashLinkURL = protocol + dashLinkURL;
        //    HmUtil.createFullPopup(dashLinkURL, $('#hForm'), 'pNetisDash', {userId: $('#sUserId').val(), inflow: 'NetisWeb' });
        // }
    },

    /** 웹대시보드 호출 Link */
    gotoWebDashLink: function (type, dashLocal) {
        if (type == "1") {//대시보드
            HmUtil.createFullPopup($('#ctxPath').val() + "/webdash/local.do", $("#hForm"), "pWebDash", $("#sLocalCd").val());
        } else if (type == "2") {//운영자용
            HmUtil.createFullPopup($('#ctxPath').val() + "/webdash/adminControl.do", $("#hForm"), "pWebDash", '');
        } else if (type == "3") {//대외용
            HmUtil.createFullPopup($('#ctxPath').val() + "/webdash/externalControl.do", $("#hForm"), "pWebDash", '');
        } else if (type == "4") {//브리핑1
            HmUtil.createFullPopup($('#ctxPath').val() + "/webdash/BrfMgrControl.do", $("#hForm"), "pWebDash", '');
        } else if (type == "5") {//브리핑2
            HmUtil.createFullPopup($('#ctxPath').val() + "/webdash/externalBrefing.do", $("#hForm"), "pWebDash", '');
        } else if (type == "6") {//전자정부상황판1
            HmUtil.createFullPopup($('#ctxPath').val() + "/webdash/mois1.do", $("#hForm"), "pWebDash", '');
        } else if (type == "7") {//전자정부상황판2
            HmUtil.createFullPopup($('#ctxPath').val() + "/webdash/mois2.do", $("#hForm"), "pWebDash", '');
        } else if (type == "8") {//전자정부상황판3
            HmUtil.createFullPopup($('#ctxPath').val() + "/webdash/mois3.do", $("#hForm"), "pWebDash", '');
        } else if (type == "9") {//전자정부상황판4
            HmUtil.createFullPopup($('#ctxPath').val() + "/webdash/mois4.do", $("#hForm"), "pWebDash", '');
        } else if (type == "99") {//시도
            HmUtil.createFullPopup($('#ctxPath').val() + "/webdash/local.do", $("#hForm"), "pWebDash", dashLocal);
        }
    },

    /** RACK 토폴로지 호출 */
    gotoRackTopo: function () {
        var url;
        url = location.protocol + '//' + location.hostname + ':' + location.port + '/map/RackTopology.do';
        HmUtil.createFullPopup(url, $('#hForm'), 'pNetisDash', {userId: $('#sUserId').val(), inflow: 'NetisWeb'});
    },


    /** Layout 호출 */
    gotoLayoutPage: function (guid, grpType, fullSize) {
        $('#hForm').empty();

        $('<input />', {type: 'hidden', name: 'guid', value: guid}).appendTo($('#hForm'));
        $('<input />', {type: 'hidden', name: 'grpType', value: grpType}).appendTo($('#hForm'));
        $('<input />', {type: 'hidden', name: 'fullSize', value: fullSize}).appendTo($('#hForm'));

        $('#hForm').attr({
            method: 'POST',
            action: ctxPath + '/main/layout/layout.do',
            target: '_self'
        }).submit();
    },

    /** LayoutGrid 호출 */
    gotoLayoutGridPage: function (guid, grpType) {
        $('#hForm').empty();
        $('<input />', {type: 'hidden', name: 'guid', value: guid}).appendTo($('#hForm'));
        $('<input />', {type: 'hidden', name: 'grpType', value: grpType}).appendTo($('#hForm'));
        $('#hForm').attr({
            method: 'POST',
            action: ctxPath + '/main/layout/layoutGrid.do',
            target: '_self'
        }).submit();
    },

    /**
     * 로그아웃 처리
     */
    prcsLogout: function () {
        if (!confirm("로그아웃 하시겠습니까?")) return;
        $('#hForm').attr({
            method: 'post',
            action: ctxPath + '/login/prcsLogout.do',
            target: '_self'
        }).submit();
    },

    /** =============================
     * 좌측 > 그룹탭
     ==============================*/
    /** 그룹트리 생성(장비 포함) */
    createGrpTab: function (callbackFn, params) {
        if ($('#leftTab') === undefined) return;
        $('#leftTab').jqxTabs({
            width: '100%', height: '99.8%', scrollable: true, theme: jqxTheme,
            initTabContent: function (tab) {
                switch (tab) {
                    case 0:
                        HmTreeGrid.create($('#dGrpTreeGrid'), HmTree.T_GRP_DEFAULT2, callbackFn, params);
                        break;
                    case 1:
                        HmTreeGrid.create($('#sGrpTreeGrid'), HmTree.T_GRP_SEARCH, callbackFn, params);
                        break;
                }
            }
        });
    },

    /** 그룹트리 생성(장비 미포함) */
    createGrpTab2: function (callbackFn) {
        if ($('#leftTab') === undefined) return;
        $('#leftTab').jqxTabs({
            width: '100%', height: '99.8%', scrollable: true, theme: jqxTheme,
            initTabContent: function (tab) {
                switch (tab) {
                    case 0:
                        HmTreeGrid.create($('#dGrpTreeGrid'), HmTree.T_GRP_DEFAULT, callbackFn, null, ['grpName']);
                        break;
                    case 1:
                        HmTreeGrid.create($('#sGrpTreeGrid'), HmTree.T_GRP_SEARCH, callbackFn, null, ['grpName']);
                        break;
                }
            }
        });
    },

    /** 그룹탭 공통 파라미터 */
    getGrpTabParams: function () {
        var treeItem = null, _grpType = 'DEFAULT';
        switch ($('#leftTab').val()) {
            case 0:
                treeItem = HmTreeGrid.getSelectedItem($('#dGrpTreeGrid'));
                _grpType = 'DEFAULT';
                break;
            case 1:
                treeItem = HmTreeGrid.getSelectedItem($('#sGrpTreeGrid'));
                _grpType = 'SEARCH';
                break;
        }
        var _grpNo = 0, _grpParent = 0, _itemKind = 'GROUP';
        if (treeItem != null) {
            _itemKind = treeItem.devKind2;
            _grpNo = _itemKind == 'GROUP' ? treeItem.grpNo : treeItem.grpNo.split('_')[1];
            _grpParent = treeItem.grpParent;
        }

        return {
            grpType: _grpType,
            grpNo: _grpNo,
            grpParent: _grpParent,
            itemKind: _itemKind
        };
    },

    /** 기본그룹 트리 파라미터  */
    getDefGrpParams: function ($treeGrid) {
        if ($treeGrid === undefined && $('#grpTree').length != 0) {
            $treeGrid = $('#grpTree');
        }
        var _grpNo = 0, _grpParent = 0, _itemKind = 'GROUP';
        var treeItem = HmTreeGrid.getSelectedItem($treeGrid);
        if (treeItem != null) {
            _itemKind = treeItem.devKind2;
            _grpNo = _itemKind == 'GROUP' ? treeItem.grpNo : _itemKind == 'IF' ? treeItem.grpNo.split('_')[2] : treeItem.grpNo.split('_')[1];
            _grpParent = treeItem.grpParent;
        }

        return {
            grpType: 'DEFAULT',
            grpNo: _grpNo,
            grpParent: _grpParent,
            itemKind: _itemKind
        }
    },

    /** 서버그룹 트리 파라미터  */
    getSvrGrpParams: function ($treeGrid) {
        var _grpNo = 0, _grpParent = 0, _itemKind = 'GROUP';
        var treeItem = HmTreeGrid.getSelectedItem($treeGrid);
        if (treeItem != null) {
            _itemKind = treeItem.devKind2;
            _grpNo = _itemKind == 'GROUP' ? treeItem.grpNo : treeItem.grpNo.split('_')[1];
            _grpParent = treeItem.grpParent;
        }

        return {
            grpType: HmTree.T_GRP_SERVER,
            grpNo: _grpNo,
            grpParent: _grpParent,
            itemKind: _itemKind
        }
    },

    /** =============================
     * 공통 검색조건
     ==============================*/
    createPeriodCondition: function ($combo, $date1, $date2) {
        $combo.jqxDropDownList({
            width: 100, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
            source: [
                {label: '최근24시간', value: 1},
                {label: '최근1주일', value: 7},
                {label: '최근1개월', value: 30},
                {label: '최근1년', value: 365},
                {label: '사용자설정', value: -1}
            ]
        })
            .on('change', function (event) {
                switch (String(event.args.item.value)) {
                    case '-1':
                        $date1.add($date2).jqxDateTimeInput({disabled: false});
                        break;
                    default:
                        var toDate = new Date();
                        var fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - parseInt(event.args.item.value));
                        $date1.jqxDateTimeInput('setDate', fromDate);
                        $date2.jqxDateTimeInput('setDate', toDate);
                        $date1.add($date2).jqxDateTimeInput({disabled: false});
                        break;
                }
            });

        HmDate.create($date1, $date2, HmDate.DAY, 1);
        $date1.add($date2).jqxDateTimeInput({disabled: false});
    },

    createPeriodCondition2: function ($combo, $date1, $date2) {
        $combo.jqxDropDownList({
            width: 100, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
            source: [
                {label: '현재', value: 0},
                {label: '최근24시간', value: 1},
                {label: '최근1주일', value: 7},
                {label: '최근1개월', value: 30},
                {label: '최근1년', value: 365},
                {label: '사용자설정', value: -1}
            ]
        })
            .on('change', function (event) {
                switch (String(event.args.item.value)) {
                    case '-1':
                        $date1.add($date2).jqxDateTimeInput({disabled: false});
                        break;
                    default:
                        var toDate = new Date();
                        var fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - parseInt(event.args.item.value));
                        $date1.jqxDateTimeInput('setDate', fromDate);
                        $date2.jqxDateTimeInput('setDate', toDate);
                        $date1.add($date2).jqxDateTimeInput({disabled: true});
                        break;
                }
            });

        HmDate.create($date1, $date2, HmDate.HOUR, 0);
        $date1.add($date2).jqxDateTimeInput({disabled: true});
    },
    //airCube(최근3개월 검색 허용)
    createPeriodCondition3: function ($combo, $date1, $date2, dateFormat) {
        $combo.jqxDropDownList({
            width: 100, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
            source: [
                {label: '최근24시간', value: 1},
                {label: '최근1주일', value: 7},
                {label: '최근1개월', value: 30},
                {label: '사용자설정', value: -1}
            ]
        })
            .on('change', function (event) {
                switch (String(event.args.item.value)) {
                    case '-1':
                        $date1.add($date2).jqxDateTimeInput({disabled: false});
                        break;
                    default:
                        var toDate = new Date();
                        var fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - parseInt(event.args.item.value));
                        $date1.jqxDateTimeInput('setDate', fromDate);
                        $date2.jqxDateTimeInput('setDate', toDate);
                        $date1.add($date2).jqxDateTimeInput({disabled: true});
                        break;
                }
            });

        if (dateFormat != null) {
            HmDate.create($date1, $date2, HmDate.HOUR, 0, dateFormat);
        } else {
            HmDate.create($date1, $date2, HmDate.HOUR, 0);
        }
        $date1.add($date2).jqxDateTimeInput({disabled: true});
    },

    /** 기간변경시 -> 사용자설정      최근 24시는 예외 */
    createPeriodCondition4: function ($combo, $date1, $date2) {
        $combo.date1 = false;
        $combo.date2 = false;
        $combo.isload1 = false;
        $combo.isload2 = false;
        $combo.evt = false;
        $combo.jqxDropDownList({
            width: 100, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
            source: [
                {label: '최근24시간', value: 1},
                {label: '최근1주일', value: 7},
                {label: '최근1개월', value: 30},
                {label: '최근1년', value: 365},
                {label: '사용자설정', value: -1}
            ]
        })
            .on('change', function (event) {
                switch (String(event.args.item.value)) {
                    case '-1':
                        $date1.add($date2).jqxDateTimeInput({disabled: false});
                        break;
                    default:
                        var index = event.args.item.index;

                        if (index != 4) {
                            if ($combo.isload1 === false && $combo.isload2 === false) {

                            } else {
                                if ($combo.evt === false && $combo.date1 === false && $combo.date2 === false) {
                                    $combo.evt = true;
                                    console.log("set evt ");
                                } else {
                                    $combo.evt = false;
                                }
                            }
                        } else {
                            $combo.date1 = false;
                            $combo.date2 = false;
                        }

                        var toDate = new Date();
                        var fromDate = new Date();
                        fromDate.setDate(fromDate.getDate() - parseInt(event.args.item.value));
                        $date1.jqxDateTimeInput('setDate', fromDate);
                        $date2.jqxDateTimeInput('setDate', toDate);
                        $date1.add($date2).jqxDateTimeInput({disabled: false});
                        break;
                }
            });

        HmDate.create($date1, $date2, HmDate.DAY, 1);
        $date1.add($date2).jqxDateTimeInput({disabled: false});

        $date1.on('textchanged', function (event) {
            var index = $combo.jqxDropDownList('selectedIndex');
            var toDate = new Date();
            var fromDate = new Date();
            var tdate1 = $date1.jqxDateTimeInput('getDate');
            var tdate2 = $date2.jqxDateTimeInput('getDate');
            var div = 1;
            if (index === 0) {
                div = 1;
            } else if (index === 1) {
                div = 7;
            } else if (index === 2) {
                div = 30;
            } else if (index === 3) {
                div = 365
            }
            fromDate.setDate(fromDate.getDate() - parseInt(div));

            if (index != 4) {
                if ($combo.isload1 === false) {
                    $combo.isload1 = true;
                    return;
                }
                if (fromDate.getDate() === tdate1.getDate() && toDate.getDate() === tdate2.getDate()) {

                } else {
                    $combo.jqxDropDownList({selectedIndex: 4});
                }
            }
        });
        $date2.on('textchanged', function (event) {
            var index = $combo.jqxDropDownList('selectedIndex');
            var toDate = new Date();
            var fromDate = new Date();
            var tdate1 = $date1.jqxDateTimeInput('getDate');
            var tdate2 = $date2.jqxDateTimeInput('getDate');
            var div = 1;
            if (index === 0) {
                div = 1;
            } else if (index === 1) {
                div = 7;
            } else if (index === 2) {
                div = 30;
            } else if (index === 3) {
                div = 365
            }
            fromDate.setDate(fromDate.getDate() - parseInt(div));
            if (index != 4) {
                if (fromDate.getDate() === tdate1.getDate() && toDate.getDate() === tdate2.getDate()) {

                } else {
                    $combo.jqxDropDownList({selectedIndex: 4});
                }
            }
        })
    },


    /**
     * TMS 5분단위용
     * @param $combo
     * @param $date1
     * @param $date2
     * @param type
     * @param dateFormat
     */
    createTmsPeriodCondition: function ($combo, $date1, $date2, type, dateFormat) {
        var _source = null;
        if (type === undefined) {
            _source = HmResource.getResource('period_tms_long_list');
        } else {
            switch (type) {
                case HmConst.period_type.tms_short:
                    _source = HmResource.getResource('period_tms_short_list');
                    break;
                case HmConst.period_type.tms_long:
                    _source = HmResource.getResource('period_tms_long_list');
                    break;
                default:
                    _source = HmResource.getResource('period_tms_long_list');
                    break;
            }
        }
        HmDate.create($date1, $date2, HmDate.HOUR, 0, dateFormat === undefined ? null : dateFormat);
        $date1.add($date2).jqxDateTimeInput({disabled: true});

        if (type == HmConst.period_type.tms_short) {
            $date1.add($date2).on('valueChanged', function (event) {
                var jsDate = event.args.date;
                var mod = jsDate.getMinutes() % 5;
                if (mod == 1) {
                    jsDate.setTime(jsDate.getTime() + (4 * 60 * 1000));
                    $(this).jqxDateTimeInput('setDate', jsDate);
                } else if (mod == 4) {
                    jsDate.setTime(jsDate.getTime() - (4 * 60 * 1000));
                    $(this).jqxDateTimeInput('setDate', jsDate);
                }
            });
        }
        $combo.jqxDropDownList({width: 100, height: 21, theme: jqxTheme, autoDropDownHeight: true, source: _source})
            .on('change', function (event) {
                var value = String(event.args.item.value);
                switch (value) {
                    case '-1':
                        $date1.add($date2).jqxDateTimeInput({disabled: false});
                        break;
                    default:
                        var toDate = new Date();
                        var fromDate = new Date();
                        var unit = value.substr(value.length - 1);
                        var itemVal = parseInt(value.substring(0, value.length - 1));
                        switch (unit) {
                            case 'm': // minute
                                if (itemVal == 5) {
                                    var min = Math.floor(fromDate.getMinutes() / 5) * 5;
                                    fromDate.setMinutes(min);
                                    toDate.setMinutes(min);
                                } else if (itemVal == 10) {
                                    toDate.setMinutes(Math.floor(toDate.getMinutes() / 5) * 5);
                                    fromDate.setTime(toDate.getTime() - (5 * 60 * 1000));
                                } else {
                                    fromDate.setTime(toDate.getTime() - (itemVal * 60 * 1000));
                                }
                                break;
                            case 'h': //hour
                                fromDate.setTime(fromDate.getTime() - (1 * 60 * 60 * 1000));
                                toDate.setTime(fromDate.getTime());
                                break;
                            case 'd': //day
                                if (itemVal != 0) {
                                    fromDate.setTime(fromDate.getTime() - (itemVal * 24 * 60 * 60 * 1000));
                                }
                                fromDate.setHours(0);
                                toDate.setHours(23);
                                break;
                        }
                        $date1.jqxDateTimeInput('setDate', fromDate);
                        $date2.jqxDateTimeInput('setDate', toDate);
                        $date1.add($date2).jqxDateTimeInput({disabled: true});
                        break;
                }
            });
        $combo.jqxDropDownList('selectIndex', 0);
    },

    refreshCbPeriod: function ($cbPeriod) {
        var _selectedIndex = $cbPeriod.jqxDropDownList('getSelectedIndex');
        $cbPeriod.jqxDropDownList('clearSelection');
        $cbPeriod.jqxDropDownList('selectIndex', _selectedIndex);
    },

    //사용자 정보 편집 팝업
    showUserConfEdit: function () {
        HmUtil.createPopup('/main/popup/env/pUserSelfConfEdit.do', $('#hForm'), 'pUserConfEdit', 450, 240);
    },
    showLoading: function (message = '처리 중입니다. 잠시만 기다려주세요.') {
        let loader = $('#comLoader');
        if (loader.length <= 0) {
            loader = $('<div id="comLoader" style="z-index: 100000;"></div>');
            loader.appendTo('body');
        }
        loader.jqxLoader({
            isModal: true,
            width: 150,
            height: 70,
            text: message
        });
        loader.jqxLoader('open');
    },

    hideLoading: function () {
        const loader = $('#comLoader');
        if (loader.length > 0) {
            loader.jqxLoader('close');
        }
    }

};

// 메뉴에 대한 예외처리시 사용! 
var Menu = {
    gotoPage: function (pageUrl) {
        if (pageUrl == "/main/oms/errStatus.do")
            HmUtil.createPopup(ctxPath + pageUrl, $('#hForm'), 'pMainErrStatus', 1280, 720);
    }
};

