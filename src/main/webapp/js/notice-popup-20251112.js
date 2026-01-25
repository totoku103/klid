(function () {
    'use strict';

    const STORAGE_KEY = 'notice-popup-hide-until';

    let popupOverlay;
    let closeBtn;
    let dontShowTodayBtn;

    const noticeConfig = {
        title: '',
        content: `
                <div style="margin-top: 0;">
                <div style="display: flex; justify-content: center; align-items: center;">
                <span style="font-size: 19px; font-weight: bold;">[공지사항 및 시범운영 안내]</span><br>
                </div>
                사이버침해대응시스템(CTRS)과<br>
                취약점진단 통합관리시스템(VMS) 사용자 편의성 개선을 위해 로그인 화면이<br>통합(일원화) 되었습니다.<br>
                시스템 이용에 참고해 주시기 바랍니다.
                </div>
                <br>
                <div>
                    〇 시범운영기간 : '25.11.14.(금) ~ <br>
                    11.21(금)<br>
                    〇 문의사항 : 사이버침해대응지원센터<br>
                    (02-2031-9900)
                </div>
                <br>
                <div>
                    <div style="text-align: center; display: flex; flex-direction: row; justify-content: center; align-items: center;">
                         <div class="checkbox-container">
                            <input type="checkbox" id="notice-dont-show-today-btn">
                            <label for="notice-dont-show-today-btn">오늘 하루 더 안 보기</label>
                         </div>
                         &nbsp;/</span><span id="notice-close-btn">닫기</span>
                    </div>
                </div>
        `
    };

    function createPopupElement() {
        const overlay = document.createElement('div');
        overlay.id = 'notice-popup-overlay';

        overlay.innerHTML = `
<div class="notice-ring-container">
            <div class="notice-ring"></div>
            <div class="notice-ring"></div>
</div>
            <div class="notice-header">
<!--                <span>${noticeConfig.title}</span>-->
            </div>
            <div id="notice-popup">
                <div class="notice-body">
                    <div id="notice-content">
                        ${noticeConfig.content}
                    </div>
                </div>
            </div>
        `;

        return overlay;
    }

    function shouldShowPopup() {
        const hideUntil = localStorage.getItem(STORAGE_KEY);
        if (!hideUntil) return true;


        const hideUntilDate = new Date(Number(hideUntil));
        const now = new Date();
        console.log(now)
        console.log(hideUntil);
        // 저장된 날짜가 오늘보다 이전이면 팝업 표시
        const isShowPopup = now > hideUntilDate;
        console.log("isShowPopup", isShowPopup);
        return isShowPopup;
    }

    function showPopup() {
        if (popupOverlay) {
            popupOverlay.style.display = '';
        }
    }

    function closePopup() {
        if (!popupOverlay) return;
        popupOverlay.style.display = 'none';
    }

    function closeAndDontShowTodayPopup() {
        if (!popupOverlay) return;
        popupOverlay.style.display = 'none';

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0); // 다음날 자정으로 설정

        localStorage.setItem(STORAGE_KEY, String(tomorrow.getTime()));
    }

    function initElements() {
        popupOverlay = createPopupElement();
        document.body.appendChild(popupOverlay);
        closeBtn = document.getElementById('notice-close-btn');
        dontShowTodayBtn = document.getElementById('notice-dont-show-today-btn');

        if (!closeBtn || !dontShowTodayBtn) {
            console.warn('Notice popup elements not found');
            return false;
        }

        return true;
    }

    function attachEventListeners() {
        closeBtn.addEventListener('click', closePopup);
        dontShowTodayBtn.addEventListener('click', closeAndDontShowTodayPopup);
    }

    function init() {
        if (!isOpenThis()) return;
        if (!initElements()) return;
        attachEventListeners();

        if (shouldShowPopup()) showPopup();
        else closePopup()
    }

    function isOpenThis() {
        const nowDate = new Date();
        const limitDate = new Date(2025, 10, 22, 0, 0, 0);

        return nowDate < limitDate;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

