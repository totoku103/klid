(function () {
    'use strict';

    const STORAGE_KEY = 'notice-popup-hide-until';

    let popupOverlay;
    let closeBtn;
    let dontShowTodayBtn;

    function createPopupElement() {
        const overlay = document.createElement('div');
        overlay.id = 'notice-popup-overlay';

        overlay.innerHTML = `
            <div class="notice-header-container">
                <span class="notice-header-title">공지사항 및 시범운영 안내</span>
            </div>
            <div class="notice-body-container">
                <div class="body-content-container">
                사이버침해대응지원시스템(CTRS)와<br>
                보안취약점 진단시스템(VMS) 사용자<br>
                편의성 개선을 위해 로그인 화면이 통합<br>
                (일원화) 되었습니다.<br>
                시스템 이용에 참고해 주시기 바랍니다.
                </div>
                <div class="body-item-container">
                    <div class="body-item">
                        <span>〇 시범운영기간 : '25.11.14.(금) ~ 11.21(금)'</span>
                    </div>
                    <div class="body-item">
                        <span>〇 문의사항 : 사이버침해대응지원센터 (02-2031-9900)</span>
                    </div>
                </div>
            </div>
            <div class="notice-footer-container">
                <div class="notice-footer-item" style="border-bottom-left-radius: 10px">
                    <span>
                    <input type="checkbox" id="notice-dont-show-today-btn">
                        <label for="notice-dont-show-today-btn">오늘 하루 더 안 보기</label>
                    </span>
                </div>
                <div class="notice-footer-item" style="background: #0066B3; border-bottom-right-radius: 10px">
                    <span style="color: white">닫기</span>
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

    function fadeOutAndClose(callback) {
        if (!popupOverlay) return;

        // fade-out 클래스 추가하여 애니메이션 시작
        popupOverlay.classList.add('fade-out');

        // 300ms 후 display none 처리 및 콜백 실행
        setTimeout(() => {
            popupOverlay.style.display = 'none';
            popupOverlay.classList.remove('fade-out');
            if (callback) callback();
        }, 300);
    }

    function closePopup() {
        fadeOutAndClose();
    }

    function closeAndDontShowTodayPopup() {
        if (!popupOverlay) return;

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0); // 다음날 자정으로 설정

        fadeOutAndClose(() => {
            localStorage.setItem(STORAGE_KEY, String(tomorrow.getTime()));
        });
    }

    function initElements() {
        popupOverlay = createPopupElement();
        document.body.appendChild(popupOverlay);

        // footer의 두 버튼 가져오기
        const footerItems = popupOverlay.querySelectorAll('.notice-footer-item');
        if (footerItems.length >= 2) {
            dontShowTodayBtn = footerItems[0]; // 첫 번째: "오늘 하루"
            closeBtn = footerItems[1]; // 두 번째: "닫기"
        }

        if (!closeBtn || !dontShowTodayBtn) {
            console.warn('Notice popup footer buttons not found');
            return false;
        }

        return true;
    }

    function attachEventListeners() {
        closeBtn.addEventListener('click', closePopup);
        dontShowTodayBtn.addEventListener('click', closeAndDontShowTodayPopup);
    }

    function init() {
        if (!initElements()) return;
        attachEventListeners();

        if (shouldShowPopup()) showPopup();
        else closePopup()
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
