<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>비밀번호 변경</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .password-change-container {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 40px;
            width: 100%;
            max-width: 450px;
        }

        .password-change-title {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            text-align: center;
            margin-bottom: 10px;
        }

        .password-change-message {
            font-size: 14px;
            color: #666;
            text-align: center;
            margin-bottom: 30px;
        }

        .split-line {
            border: none;
            border-top: 1px solid #e0e0e0;
            margin: 20px 0;
        }

        .input-group {
            margin-bottom: 20px;
        }

        .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            border: 1px solid #d0d0d0;
            border-radius: 4px;
            background-color: #fff;
            padding: 0 15px;
            height: 45px;
        }

        .input-wrapper:focus-within {
            border-color: #4a90e2;
            box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
        }

        .input-icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            flex-shrink: 0;
        }

        .input-field {
            flex: 1;
            border: none;
            outline: none;
            font-size: 14px;
            color: #333;
            background: transparent;
        }

        .input-field::placeholder {
            color: #999;
        }

        .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            margin: -1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
        }

        .button-container {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 30px;
        }

        .button {
            padding: 12px 30px;
            font-size: 14px;
            font-weight: 600;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 100px;
        }

        .button-confirm {
            background-color: #005e9e;
            color: #ffffff;
        }

        .button-confirm:hover {
            background-color: #357abd;
        }

        .button-confirm:active {
            background-color: #2d6ba3;
        }

        .button-cancel {
            background-color: #e0e0e0;
            color: #333;
        }

        .button-cancel:hover {
            background-color: #d0d0d0;
        }

        .button-cancel:active {
            background-color: #c0c0c0;
        }

        .error-message {
            color: #e74c3c;
            font-size: 12px;
            margin-top: 5px;
            display: none;
        }

        .error-message.show {
            display: block;
        }

        /* 패스워드 강도 표시 */
        .password-strength {
            margin-top: 5px;
            height: 4px;
            background-color: #e0e0e0;
            border-radius: 2px;
            overflow: hidden;
            display: none;
        }

        .password-strength.show {
            display: block;
        }

        .password-strength-bar {
            height: 100%;
            transition: all 0.3s ease;
            width: 0;
        }

        .password-strength-bar.weak {
            background-color: #e74c3c;
            width: 33%;
        }

        .password-strength-bar.medium {
            background-color: #f39c12;
            width: 66%;
        }

        .password-strength-bar.strong {
            background-color: #27ae60;
            width: 100%;
        }
    </style>
</head>
<body>
<input type="hidden" value="${message}" id="message">
<form id="password-change-form" class="password-change-container" onsubmit="return false;" novalidate>
    <input type="hidden" value="${userId}" id="userId">
    <div class="password-change-title">비밀번호 변경</div>
    <div class="password-change-message">새로운 비밀번호를 입력해주세요.</div>

    <hr class="split-line">

    <div class="input-group">
        <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <label for="current-password" class="visually-hidden">기존 비밀번호</label>
            <input
                    type="password"
                    id="current-password"
                    name="current-password"
                    class="input-field"
                    placeholder="기존 비밀번호"
                    required
                    autocomplete="current-password">
        </div>
        <div class="error-message" id="current-password-error"></div>
    </div>

    <div class="input-group">
        <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <label for="new-password" class="visually-hidden">새 비밀번호</label>
            <input
                    type="password"
                    id="new-password"
                    name="new-password"
                    class="input-field"
                    placeholder="새 비밀번호"
                    required
                    autocomplete="new-password">
        </div>
        <div class="password-strength" id="password-strength">
            <div class="password-strength-bar" id="password-strength-bar"></div>
        </div>
        <div class="error-message" id="new-password-error"></div>
    </div>

    <div class="input-group">
        <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <label for="confirm-password" class="visually-hidden">새 비밀번호 확인</label>
            <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    class="input-field"
                    placeholder="새 비밀번호 확인"
                    required
                    autocomplete="new-password">
        </div>
        <div class="error-message" id="confirm-password-error"></div>
    </div>

    <hr class="split-line">

    <div class="button-container">
        <button type="submit" id="button-confirm" class="button button-confirm" aria-label="비밀번호 변경 확인">
            확인
        </button>
        <button type="button" id="button-cancel" class="button button-cancel" aria-label="비밀번호 변경 취소">
            취소
        </button>
    </div>
</form>

<script>
    // ========================================
    // 상수 정의
    // ========================================
    const PASSWORD_PATTERNS = {
        NUMBER: /[0-9]/,
        LETTER: /[a-zA-Z]/,
        SPECIAL: /[~!@#$%^&*()_+|<>?:{}]/
    };

    const PASSWORD_MIN_LENGTH = 8;

    const STRENGTH_LEVELS = {
        WEAK: 'weak',
        MEDIUM: 'medium',
        STRONG: 'strong'
    };

    // ========================================
    // 유틸리티 함수
    // ========================================

    /**
     * 에러 메시지를 표시하는 함수
     * @param {string} elementId - 에러 메시지를 표시할 요소의 ID
     * @param {string} message - 표시할 에러 메시지
     */
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    /**
     * 모든 에러 메시지를 초기화하는 함수
     */
    function clearAllErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
    }

    // ========================================
    // 비밀번호 검증 함수
    // ========================================

    /**
     * 비밀번호가 정책을 만족하는지 검사하는 함수
     * @param {string} password - 검사할 비밀번호
     * @returns {object} - 검사 결과 객체 { isValid: boolean, hasNumber: boolean, hasLetter: boolean, hasSpecial: boolean, hasMinLength: boolean }
     */
    function validatePasswordPolicy(password) {
        return {
            hasNumber: PASSWORD_PATTERNS.NUMBER.test(password),
            hasLetter: PASSWORD_PATTERNS.LETTER.test(password),
            hasSpecial: PASSWORD_PATTERNS.SPECIAL.test(password),
            hasMinLength: password.length >= PASSWORD_MIN_LENGTH,
            get isValid() {
                return this.hasNumber && this.hasLetter && this.hasSpecial && this.hasMinLength;
            }
        };
    }

    /**
     * 비밀번호 강도를 계산하는 함수
     * @param {string} password - 계산할 비밀번호
     * @returns {string} - 강도 레벨 ('weak', 'medium', 'strong')
     */
    function calculatePasswordStrength(password) {
        const validation = validatePasswordPolicy(password);

        let strength = 0;
        if (validation.hasMinLength) strength++;
        if (validation.hasNumber) strength++;
        if (validation.hasLetter) strength++;
        if (validation.hasSpecial) strength++;

        // 모든 조건을 만족해야 강함
        if (validation.isValid) {
            return STRENGTH_LEVELS.STRONG;
        } else if (strength >= 2) {
            return STRENGTH_LEVELS.MEDIUM;
        } else {
            return STRENGTH_LEVELS.WEAK;
        }
    }

    /**
     * 비밀번호 강도 바를 업데이트하는 함수
     * @param {string} strengthLevel - 강도 레벨
     */
    function updatePasswordStrengthBar(strengthLevel) {
        const strengthBar = document.getElementById('password-strength-bar');
        if (strengthBar) {
            strengthBar.className = 'password-strength-bar';
            strengthBar.classList.add(strengthLevel);
        }
    }

    // ========================================
    // 이벤트 핸들러
    // ========================================

    /**
     * 비밀번호 입력 시 강도를 체크하는 핸들러
     * @param {Event} event - 입력 이벤트
     */
    function handlePasswordInput(event) {
        const password = event.target.value;
        const strengthContainer = document.getElementById('password-strength');

        if (password.length === 0) {
            strengthContainer.classList.remove('show');
            return;
        }

        strengthContainer.classList.add('show');

        const strengthLevel = calculatePasswordStrength(password);
        updatePasswordStrengthBar(strengthLevel);
    }

    /**
     * 취소 버튼 클릭 핸들러
     */
    function handleCancelClick() {
        if (window.opener) {
            window.close();
        } else {
            history.back();
        }
    }

    /**
     * 폼 제출 핸들러
     * @param {Event} event - 제출 이벤트
     */
    function handleFormSubmit(event) {
        event.preventDefault();

        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // 에러 메시지 초기화
        clearAllErrors();

        // 유효성 검사
        if (!validateForm(currentPassword, newPassword, confirmPassword)) {
            return false;
        }

        // 비밀번호 변경 요청
        submitPasswordChange(currentPassword, newPassword);

        return false;
    }

    /**
     * 폼 유효성 검사
     * @param {string} currentPassword - 기존 비밀번호
     * @param {string} newPassword - 새 비밀번호
     * @param {string} confirmPassword - 새 비밀번호 확인
     * @returns {boolean} - 유효성 검사 통과 여부
     */
    function validateForm(currentPassword, newPassword, confirmPassword) {
        let isValid = true;

        // 기존 비밀번호 검사
        if (!currentPassword) {
            showError('current-password-error', '기존 비밀번호를 입력해주세요.');
            isValid = false;
        }

        // 새 비밀번호 검사
        if (!newPassword) {
            showError('new-password-error', '새 비밀번호를 입력해주세요.');
            isValid = false;
        } else {
            const validation = validatePasswordPolicy(newPassword);
            if (!validation.isValid) {
                showError('new-password-error', '비밀번호는 영/숫자/특문 포함 8자 이상입니다.');
                isValid = false;
            }
        }

        // 비밀번호 확인 검사
        if (!confirmPassword) {
            showError('confirm-password-error', '새 비밀번호를 다시 입력해주세요.');
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            showError('confirm-password-error', '비밀번호가 일치하지 않습니다.');
            isValid = false;
        }

        return isValid;
    }

    /**
     * 서버에 비밀번호 변경 요청을 보내는 함수
     * @param {string} currentPassword - 기존 비밀번호
     * @param {string} newPassword - 새 비밀번호
     */
    function submitPasswordChange(currentPassword, newPassword) {
        const url = '/api/main/env/userConf/expire/passwordCheck';
        const data = {
            'userId': document.getElementById('userId').value,
            'prePassword': currentPassword,
            'password': newPassword
        };
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.hasError) {
                    throw new Error(data.errorInfo.message);
                } else {
                    return data;
                }
            })
            .then(data => {
                console.table(data)
                alert(data.resultData);
            })
            .catch(error => {
                console.log(error);
                alert(error.message);
            })
            .finally(() => self.close())
    }

    // ========================================
    // 이벤트 리스너 등록
    // ========================================

    /**
     * DOM 로드 완료 후 이벤트 리스너를 등록하는 함수
     */
    function initializeEventListeners() {
        // 비밀번호 강도 체크
        const newPasswordInput = document.getElementById('new-password');
        if (newPasswordInput) {
            newPasswordInput.addEventListener('input', handlePasswordInput);
        }

        // 취소 버튼
        const cancelButton = document.getElementById('button-cancel');
        if (cancelButton) {
            cancelButton.addEventListener('click', handleCancelClick);
        }

        // 폼 제출
        const form = document.getElementById('password-change-form');
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
        }
    }

    function showMessage() {
        const messageElement = document.getElementById('message');
        if (!messageElement) return;

        const message = messageElement.value;
        if (!message) return;

        alert(message)
    }

    // DOM 로드 완료 후 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeEventListeners();
            showMessage();
        });
    } else {
        initializeEventListeners();
        showMessage();
    }
</script>
</body>
</html>
