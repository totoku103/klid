(function () {
    'use strict';

    const STORAGE_KEY = 'notice-popup-hide-until';

    let popupOverlay;
    let closeBtn;
    let dontShowTodayBtn;

    const noticeConfig = {
        title: '',
        content: `
  <div id="noticePopup" class="notice-popup">
    <div class="notice-header">
      <svg class="notice-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round" />
        <circle cx="18.5" cy="6.5" r="3.5" fill="#ff4757" />
      </svg>
      <span class="notice-header-text">알림</span>
    </div>
    <div class="notice-content">
      <h3 class="notice-title">[공지사항 및 시범운영 안내]</h3>
      <div class="notice-message">
        <p>사이버침해대응지원시스템(CTRS)과 보안취약점 진단시스템(VMS)</p>
        <p>사용자 편의성 개선을 위해 로그인 화면이 단일화되었습니다.</p>
        <p>시스템 이용에 참고해 주시기 바랍니다.</p>
      </div>
      <ul class="notice-list">
        <li>시범운영기간 : '25.12.5.(금) ~ 12.12(금)</li>
        <li>문의사항 : 사이버침해대응지원센터 (02-2031-9900)</li>
      </ul>
      <div class="notice-footer">
        <button type="button" class="notice-hide-today" id="hideTodayBtn">
            <input id="notice-dont-show-today-btn" type="checkbox" style="cursor: pointer"/>
           <label for="notice-dont-show-today-btn" style="cursor: pointer">오늘 하루 더 안 보기</label>
        </button>
        <button type="button" class="notice-close" id="notice-close-btn">닫기</button>
      </div>
    </div>
  </div>
        `
    };

    function createPopupElement() {
        const overlay = document.createElement('div');

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
        return now > hideUntilDate;
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
        const limitDate = new Date(2025, 11, 13, 0, 0, 0);

        return nowDate < limitDate;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

