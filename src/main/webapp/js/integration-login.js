(function () {

        const SYSTEM_TYPE = Object.freeze({
            CTRS: 'CTRS',
            VMS: 'VMS',
            CTSS: 'CTSS'
        });

        const AUTH_TYPE = Object.freeze({
            OTP: 'otp',
            GPKI: 'gpki',
            EMAIL: 'email'
        })

        const DISPLAY_VALUE = Object.freeze({
            NONE: 'none',
            BLOCK: 'block'
        });

        const CONTAINER_ELEMENT = Object.freeze({
            MULTI_AUTH_TYPE: 'multi-authenticate-type-container',
            AUTH_OTP: 'authenticate-otp-container',
            AUTH_GPKI: 'authenticate-gpki-container',
            AUTH_EMAIL: 'authenticate-email-container'
        })

        const RADIO_ELEMENT = Object.freeze({
            SYSTEM_TYPE: 'connect-system-type',
            MULTI_AUTH_TYPE: 'multi-authenticate-type'
        })

        const HOST_TYPE = Object.freeze({
            CTRS: 'ctrs-host',
            VMS: 'vms-host',
            CTSS: 'ctss-host'
        })

        let emailSendTimer = null;

        // 로딩 관리 함수
        function showLoading(message = '처리 중입니다. 잠시만 기다려주세요.') {
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
        }

        function hideLoading() {
            const loader = $('#comLoader');
            if (loader.length > 0) {
                loader.jqxLoader('close');
            }
        }

        //  start
        function displayElement(elementId, displayValue) {
            const element = document.getElementById(elementId);
            if (displayValue === null || displayValue === undefined) {
                displayValue = DISPLAY_VALUE.BLOCK;
            }
            element.style.display = displayValue;
        }

        function displayMultiAuthenticateTypeContainer(displayValue) {
            displayElement(CONTAINER_ELEMENT.MULTI_AUTH_TYPE, displayValue);
        }

        function displayAuthenticateOtpContainer(displayValue) {
            displayElement(CONTAINER_ELEMENT.AUTH_OTP, displayValue);
        }

        function displayAuthenticateGpkiContainer(displayValue) {
            displayElement(CONTAINER_ELEMENT.AUTH_GPKI, displayValue);
        }

        function displayAuthenticateEmailContainer(displayValue) {
            displayElement(CONTAINER_ELEMENT.AUTH_EMAIL, displayValue);
        }

        function displaySignUpButton(displayValue) {
            displayElement('button-sign-up', displayValue)
        }

        function setAuthenticateOtpSecretKey(otpSecretKey) {
            document.getElementById('otp-new-code').innerText = otpSecretKey
            if (otpSecretKey === null || otpSecretKey === undefined) {
                document.getElementById('new-otp-key').style.display = DISPLAY_VALUE.NONE;
            } else {
                document.getElementById('new-otp-key').style.display = DISPLAY_VALUE.BLOCK;
            }
        }

        function initializeDesign() {
            displayMultiAuthenticateTypeContainer(DISPLAY_VALUE.NONE);
            displayAuthenticateOtpContainer(DISPLAY_VALUE.NONE);
            displayAuthenticateGpkiContainer(DISPLAY_VALUE.NONE);
            displayAuthenticateEmailContainer(DISPLAY_VALUE.NONE);
            displaySignUpButton(DISPLAY_VALUE.NONE);

            toggleEmailCodeInput(true)
        }

        function initializeEvent() {
            bindLoginButtonClickEvent();
            bindSignUpButtonClickEvent();
            bindPrivatePolicyButtonClickEvent();

            bindConnectSystemTypeChangeEvent()
            bindVmsAuthTypeChangeEvent();

            bindOtpCodeKeyDownEvent()
            bindOtpConfirmButtonClickEvent();

            bindEmailCodeInputOnKeyUpEvent();
            bindEmailSendButtonClickEvent();

            bindGpkiConfirmButtonClickEvent();
            bindGpkiCertificateRegisterButtonClickEvent();

            bindPasswordElementInputEvent();
        }

        function getCheckedRadioValue(name) {
            if (name === null || name === undefined) new Error("name is null or undefined")

            const radios = document.getElementsByName(name);
            const checked = Array.from(radios).find(r => r.checked);
            return checked ? checked.value : null;
        }

        // design
        function bindConnectSystemTypeChangeEvent() {
            Array.from(document.getElementsByName(RADIO_ELEMENT.SYSTEM_TYPE))
                .forEach(function (radio) {
                    radio.addEventListener('change', function (event) {
                        allNoneDisplayAuthContainers();
                        displaySignUpButton(DISPLAY_VALUE.NONE);
                        displayMultiAuthenticateTypeContainer(DISPLAY_VALUE.NONE);

                        switch (event.target.value) {
                            case SYSTEM_TYPE.CTRS:
                                displaySignUpButton(DISPLAY_VALUE.NONE);
                                break;
                            case SYSTEM_TYPE.VMS:
                                displaySignUpButton(DISPLAY_VALUE.BLOCK);
                                break;
                            case SYSTEM_TYPE.CTSS:
                                displaySignUpButton(DISPLAY_VALUE.BLOCK);
                                break;
                            default:
                                new Error(event.target.value);
                        }
                    });
                });
        }

        function bindVmsAuthTypeChangeEvent() {
            Array.from(document.getElementsByName(RADIO_ELEMENT.MULTI_AUTH_TYPE))
                .forEach(function (radio) {
                    radio.addEventListener('change', function (event) {
                        switch (event.target.value) {
                            case AUTH_TYPE.OTP:
                                displayAuthenticateOtpContainer(DISPLAY_VALUE.BLOCK);
                                displayAuthenticateGpkiContainer(DISPLAY_VALUE.NONE);
                                displayAuthenticateEmailContainer(DISPLAY_VALUE.NONE);
                                break;
                            case AUTH_TYPE.GPKI:
                                displayAuthenticateOtpContainer(DISPLAY_VALUE.NONE);
                                displayAuthenticateGpkiContainer(DISPLAY_VALUE.BLOCK);
                                displayAuthenticateEmailContainer(DISPLAY_VALUE.NONE);
                                break;
                            case AUTH_TYPE.EMAIL:
                                displayAuthenticateOtpContainer(DISPLAY_VALUE.NONE);
                                displayAuthenticateGpkiContainer(DISPLAY_VALUE.NONE);
                                displayAuthenticateEmailContainer(DISPLAY_VALUE.BLOCK);
                                break;
                            default:
                                new Error(event.target.value);
                        }
                    })
                });
        }

        function dispatcherRadioChangeEvent(elementName) {
            const radios = document.getElementsByName(elementName);
            const targetRadio = Array.from(radios).find(radio => radio.checked);

            if (targetRadio) {
                const changeEvent = new Event('change', {bubbles: true});
                targetRadio.dispatchEvent(changeEvent);
            }
        }

        function bindLoginButtonClickEvent() {
            const element = document.getElementById('button-log-in');
            element.addEventListener('click', () => processingLogin());
        }

        function bindSignUpButtonClickEvent() {
            const element = document.getElementById('button-sign-up');
            element.addEventListener('click', (event) => {
                const selectedSystemType = getCheckedRadioValue(RADIO_ELEMENT.SYSTEM_TYPE);
                const popupOption = "width=" + screen.availWidth + ",height=" + screen.availHeight + ",top=100,left=100,resizable=no,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,fullscreen=yes";
                switch (selectedSystemType) {
                    case SYSTEM_TYPE.VMS:
                        // location.href = ctxPath + "/main/vms/sign-up.do";
                        window.open(ctxPath + "/main/vms/sign-up.do", 'vms-sign-up', popupOption)
                        break;
                    case SYSTEM_TYPE.CTSS:
                        // location.href = ctxPath + "/main/ctss/sign-up.do";
                        window.open(ctxPath + "/main/ctss/sign-up.do", 'vms-sign-up', popupOption)
                        break;
                }
            })
        }

        function bindPrivatePolicyButtonClickEvent() {
            const element = document.getElementById('private-policy-info');
            element.addEventListener('click', (event) => {
                const selectedSystemType = getCheckedRadioValue(RADIO_ELEMENT.SYSTEM_TYPE);
                switch (selectedSystemType) {
                    case SYSTEM_TYPE.CTRS:
                        const ctrsPrivatePolicy = ctxPath + '/main/popup/sys/pPolicyInfo.do';
                        const ctrsPopupOptions = "width=700,height=800,top=10,left=10,resizable=no,scrollbars=no,menubar=no,toolbar=no,location=no,status=no";
                        window.open(ctrsPrivatePolicy, 'ctrs-private-policy', ctrsPopupOptions)
                        break;
                    case SYSTEM_TYPE.VMS:
                        $.get(ctxPath + "/api/main/vms/privacy-policy", function (result) {
                            const options = "width=1240,height=800,top=10,left=10,resizable=no,scrollbars=no,menubar=no,toolbar=no,location=no,status=no";
                            window.open(result, 'vms-private-policy', options)
                        })
                        break;
                    case SYSTEM_TYPE.CTSS:
                        $.get(ctxPath + "/api/main/ctss/privacy-policy", function (result) {
                            const options = "width=1240,height=800,top=10,left=10,resizable=no,scrollbars=no,menubar=no,toolbar=no,location=no,status=no";
                            window.open(result, 'ctss-private-policy', options)
                        })
                        break;
                }
            })
        }

        function bindOtpCodeKeyDownEvent() {
            const otpCodeElement = document.getElementById('otp-code');
            otpCodeElement.addEventListener("keydown", function (event) {
                if (event.key === 'Enter') {
                    confirmOtpCode();
                    event.preventDefault();
                }
            });
        }

        function bindOtpConfirmButtonClickEvent() {
            const element = document.getElementById('button-otp-confirm');
            element.addEventListener('click', (event) => confirmOtpCode())
        }

        function confirmOtpCode() {
            const otpCodeElement = document.getElementById('otp-code');
            if (otpCodeElement.value === null || otpCodeElement.value === undefined || String(otpCodeElement.value) === '') {
                alert("OTP 인증번호를 입력해주세요.");
                return;
            }
            if (String(otpCodeElement.value).length !== 6) {
                alert('6자리 숫자를 입력해주세요.');
                otpCodeElement.value = ''
                return;
            }

            const param = {
                userCode: otpCodeElement.value
            }

            const checkedRadioValue = getCheckedRadioValue(RADIO_ELEMENT.SYSTEM_TYPE);
            switch (checkedRadioValue) {
                case SYSTEM_TYPE.CTRS:
                    requestOtpCtrs(param);
                    break;
                case SYSTEM_TYPE.VMS:
                    requestOtpVms(param);
                    break;
                case SYSTEM_TYPE.CTSS:
                    requestOtpCtss(param);
                    break;
                default:
                    new Error(checkedRadioValue);
            }
        }

        function requestOtpCtrs(param) {
            showLoading('OTP 인증 중입니다...');
            fetch("/api/login/ctrs/authenticate/second/otp", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(param),
            })
                .then(r => r.json())
                .then(data => {
                    if (data.hasError) throw new Error(data.errorInfo?.message || 'Unknown error');
                    return data;
                })
                .then(r => {
                    hideLoading();
                    if (r.resultData?.isPass) {
                        alert("OTP 인증성공")
                        goToPage()
                    } else {
                        alert("OTP 인증실패")
                    }
                })
                .catch(err => {
                    hideLoading();
                    console.error(err)
                    alert(err.message)
                })
        }

        function requestOtpVms(param) {
            showLoading('OTP 인증 중입니다...');
            fetch("/api/login/vms/authenticate/second/otp", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(param),
            })
                .then(r => r.json())
                .then(data => {
                    if (data.hasError) throw new Error(data.errorInfo?.message || 'Unknown error');
                    return data;
                })
                .then(r => {
                    hideLoading();
                    if (r.resultData?.isPass) {
                        alert("OTP 인증성공")
                        goToPage()
                    } else {
                        alert("OTP 인증실패")
                    }
                })
                .catch(err => {
                    hideLoading();
                    console.error(err)
                    alert(err.message)
                })
        }

        function requestOtpCtss(param) {
            showLoading('OTP 인증 중입니다...');
            fetch("/api/login/ctss/authenticate/second/otp", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(param),
            })
                .then(r => r.json())
                .then(data => {
                    if (data.hasError) throw new Error(data.errorInfo?.message || 'Unknown error');
                    return data;
                })
                .then(r => {
                    hideLoading();
                    if (r.resultData.isPass) {
                        alert("OTP 인증성공")
                        goToPage()
                    } else {
                        alert("OTP 인증실패")
                    }
                })
                .catch(err => {
                    hideLoading();
                    console.error(err)
                    alert(err.message)
                })
        }

        function bindGpkiConfirmButtonClickEvent() {
            const element = document.getElementById('button-gpki-authenticate');
            element.addEventListener('click', async (event) => {
                const popupOption = "width=1200,height=800,top=100,left=100,resizable=no,scrollbars=no,menubar=no,toolbar=no,location=no,status=no";
                window.open("gpki/sign-in-popup.do", "gpki-sign-in-popup", popupOption);
            })
        }

        window.addEventListener('message', function (event) {
            // result.jsp 메시지 수신
            const d = event.data;
            console.log("message", event.data)
            if (d.type === 'gpki-sign-in') {
                switch (d.code) {
                    case "200":
                        goToPage();
                        break;
                    case "404":
                        break;
                    default:
                        window.location.assign("");
                }
            } else if (d.type === "gpki-sign-up") {
                switch (d.code) {
                    case "201":
                        window.location.assign("");
                        break;
                }
            }
        });

        function bindGpkiCertificateRegisterButtonClickEvent() {
            const element = document.getElementById('button-gpki-certificate-register');
            element.addEventListener('click', async () => {
                const popupOption = "width=1200,height=800,top=100,left=100,resizable=no,scrollbars=no,menubar=no,toolbar=no,location=no,status=no";
                window.open("gpki/sign-up-popup.do", "gpki-sign-up-popup", popupOption);
            })
        }


        function bindEmailSendButtonClickEvent() {
            const element = document.getElementById('button-email-send');
            element.addEventListener('click', () => {
                Array.from(document.getElementsByName(RADIO_ELEMENT.MULTI_AUTH_TYPE)).forEach(r => r.disabled = true);
                const selectedSystemType = getCheckedRadioValue(RADIO_ELEMENT.SYSTEM_TYPE);
                switch (selectedSystemType) {
                    case SYSTEM_TYPE.CTRS:
                        const ctrsUrl = ctxPath + "/api/login/ctrs/authenticate/second/email/send";
                        requestEmailSend(ctrsUrl);
                        break;
                    case SYSTEM_TYPE.VMS:
                        const vmsUrl = ctxPath + "/api/login/vms/authenticate/second/email/send";
                        requestEmailSend(vmsUrl);
                        break;
                    case SYSTEM_TYPE.CTSS:
                        break;
                }
            })
        }

        function requestEmailSend(url) {
            showLoading('이메일 전송 중입니다...');
            fetch(url, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
            })
                .then(r => r.json())
                .then(data => {
                    if (data.hasError) throw new Error(data.errorInfo?.message || 'Unknown error');
                    return data;
                })
                .then(d => {
                    hideLoading();
                    countDownTimer(d.resultData.expiredTimestamp)
                    toggleEmailSendButton(true);
                    toggleEmailCodeInput(false);
                    alert(d.resultData.message)
                })
                .catch(err => {
                    hideLoading();
                    clearCountDownTimer()
                    console.error(err)
                    alert(err.message)
                })
        }

        function countDownTimer(targetEpochMillis) {
            const timerElement = document.getElementById('timer-print');

            if (emailSendTimer !== null) {
                clearInterval(emailSendTimer);
            }

            const interval = setInterval(() => {
                const now = Date.now(); // 현재 시간 (ms)
                let remainingTime = Math.floor((targetEpochMillis - now) / 1000); // 남은 시간 (초)

                if (remainingTime < 0) {
                    clearInterval(interval);
                    timerElement.textContent = "00:00";
                    toggleEmailSendButton(false);
                    toggleEmailCodeInput(true);
                    return;
                }

                const min = Math.floor(remainingTime / 60);
                const sec = remainingTime % 60;

                // 두 자리 숫자 포맷 (01:05 형태)
                timerElement.textContent = String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
            }, 1000);
            emailSendTimer = interval;
        }

        function clearCountDownTimer() {
            const timerElement = document.getElementById('timer-print');
            timerElement.textContent = "00:00";
            if (emailSendTimer !== null) {
                clearInterval(emailSendTimer);
            }
        }

        function requestValidateEmailCode() {
            const param = {
                userCode: document.getElementById('email-code').value
            }
            showLoading('이메일 인증 확인 중입니다...');
            const url = ctxPath + "/api/login/vms/authenticate/second/email/validate"
            fetch(url, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(param)
            })
                .then(r => r.json())
                .then(data => {
                    hideLoading();
                    if (data.hasError) {
                        if (data.errorInfo?.code === "200") {
                            alert(data.errorInfo.message)
                        } else {
                            throw new Error(data.errorInfo?.message || 'Unknown error');
                        }
                    }
                    if (data.resultData?.isPass) {
                        alert("이메일 인증성공")
                        goToPage();
                    }
                })
                .catch(err => {
                    hideLoading();
                    toggleEmailSendButton(false);
                    console.error(err)
                    alert(err.message)
                })
        }

        function bindEmailCodeInputOnKeyUpEvent() {
            const element = document.getElementById('email-code');
            element.addEventListener('input', function () {
                this.value = this.value.replace(/[^0-9]/g, '');
                if (String(this.value).length === 6) {
                    requestValidateEmailCode()
                }
            })
        }

        function bindPasswordElementInputEvent() {
            const passwordElement = document.getElementById('password');
            passwordElement.addEventListener("keydown", function (event) {
                if (event.key === 'Enter') {
                    processingLogin();
                    event.preventDefault();
                }
            });
        }

        function isValidLogin() {
            const userIdElement = document.getElementById('user-id');
            if (!userIdElement?.value) {
                alert('ID를 입력해주세요.');
                userIdElement.focus();
                return false;
            }

            const passwordElement = document.getElementById('password');
            if (!passwordElement?.value) {
                alert('Password를 입력해주세요.');
                passwordElement.focus();
                return false;
            }

            return true;
        }

        function processingLogin() {
            const isValid = isValidLogin();
            if (!isValid) return;

            const systemTypeValue = getCheckedRadioValue(RADIO_ELEMENT.SYSTEM_TYPE);
            const params = {
                systemType: systemTypeValue.toUpperCase(),
                id: document.getElementById('user-id').value,
                password: document.getElementById('password').value
            }
            switch (systemTypeValue) {
                case SYSTEM_TYPE.CTRS:
                    requestCtrsLogin(params);
                    break;
                case SYSTEM_TYPE.VMS:
                    requestVmsLogin(params);
                    break;
                case SYSTEM_TYPE.CTSS:
                    requestCtssLogin(params);
                    break;
            }
        }

        function showCtrsAuthSecond(otpSecretKey) {
            displayMultiAuthenticateTypeContainer(DISPLAY_VALUE.NONE);
            toggleVmsHelpDeskContainer(true);
            dispatcherRadioChangeEvent(RADIO_ELEMENT.MULTI_AUTH_TYPE)
            showOtpAuth(otpSecretKey);
        }

        function showVmsAuthSecond(otpSecretKey) {
            displayMultiAuthenticateTypeContainer(DISPLAY_VALUE.NONE);
            dispatcherRadioChangeEvent(RADIO_ELEMENT.MULTI_AUTH_TYPE)

            showOtpAuth(otpSecretKey);
        }

        function showCtssAuthSecond(otpSecretKey) {
            showOtpAuth(otpSecretKey);
        }

        function disableIdPrimaryInputElements() {
            document.getElementById('user-id').disabled = true;
            document.getElementById('password').disabled = true;
            Array.from(document.getElementsByName(RADIO_ELEMENT.SYSTEM_TYPE)).forEach(radio => radio.disabled = true);
            disabledLoginButton();
            disabledSignUpButton();
        }

        function disabledLoginButton() {
            document.getElementById('button-log-in').disabled = true;
        }

        function disabledSignUpButton() {
            document.getElementById('button-sign-up').disabled = true;
        }

        function toggleEmailSendButton(isDisabled) {
            document.getElementById('button-email-send').disabled = isDisabled;
        }

        function toggleEmailCodeInput(isDisabled) {
            document.getElementById('email-code').disabled = isDisabled;
        }

        function toggleVmsHelpDeskContainer(isDisabled) {
            if (isDisabled) document.getElementById('vms-help-desk-container').style.display = 'none';
            else document.getElementById('vms-help-desk-container').style.display = '';
        }

        function showAccount(message) {
            let url = "/main/popup/env/expire/pUserPasswordChange.do";
            if(message !== null && message !== undefined && message !== '') {
                url += "?message=" + encodeURIComponent(message);
            }
            const popupOption = "width=480,height=550,top=100,left=100,resizable=no,scrollbars=no,menubar=no,toolbar=no,location=no,status=no";
            window.open(url, 'pUserPasswordChange', popupOption)
        }

        function requestCtrsLogin(params) {
            showLoading('로그인 중입니다...');
            fetch('/api/login/ctrs/authenticate/primary', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(params)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.hasError)
                        throw new Error(data.errorInfo?.message || 'Unknown error');
                    if (data.resultData.code !== 'OK') {
                        const code = data.resultData.code;
                        const message = data.resultData.message;
                        if (code !== null && code !== undefined && code.toUpperCase() === 'EXPIRE') {
                            showAccount(message);
                            return null;
                        } else if (code !== null && code !== undefined && code.toUpperCase() === 'RESET') {
                            showAccount(message);
                            return null;
                        } else {
                            console.error("login failed.", code, data);
                            throw new Error(data.resultData.message)
                        }
                    }

                    return data;
                })
                .then(d => {
                    hideLoading();
                    if(d === null || d === undefined) return;
                    // 정상
                    disableIdPrimaryInputElements();
                    showCtrsAuthSecond(d.resultData?.otpSecretKey);
                })
                .catch(err => {
                    hideLoading();
                    console.error(err)
                    alert(err.message)
                })
        }

        function requestVmsLogin(param) {
            showLoading('로그인 중입니다...');
            fetch('/api/login/vms/authenticate/primary', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(param)
            })
                .then(r => r.json())
                .then(data => {
                    if (data.hasError)
                        throw new Error(data.errorInfo?.message || 'Unknown error');
                    return data;
                })
                .then(data => {
                    hideLoading();
                    // 정상
                    disableIdPrimaryInputElements();
                    showVmsAuthSecond(data.resultData?.otpSecretKey);
                })
                .catch(error => {
                    hideLoading();
                    console.error(error);
                    alert(error.message)
                })
        }

        function requestCtssLogin(param) {
            showLoading('로그인 중입니다...');
            fetch('/api/login/ctss/authenticate/primary', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(param)
            })
                .then(r => r.json())
                .then(data => {
                    if (data.hasError)
                        throw new Error(data.errorInfo?.message || 'Unknown error');
                    return data;
                })
                .then(data => {
                    hideLoading();
                    // 정상
                    disableIdPrimaryInputElements();
                    showCtssAuthSecond(data.resultData?.otpSecretKey)
                })
                .catch(error => {
                    hideLoading();
                    console.error(error);
                    alert(error.message)
                })
        }

        function showOtpAuth(otpSecretKey) {
            allNoneDisplayAuthContainers();
            displayAuthenticateOtpContainer(DISPLAY_VALUE.BLOCK);
            setAuthenticateOtpSecretKey(otpSecretKey);
        }

        function goToPage() {
            const systemTypeValue = getCheckedRadioValue(RADIO_ELEMENT.SYSTEM_TYPE);
            switch (systemTypeValue) {
                case SYSTEM_TYPE.CTRS:
                    const mainUrl = '/main/main.do';
                    window.location.href = ctxPath + mainUrl;
                    break;
                case SYSTEM_TYPE.VMS:
                    Master.redirectVmsMainPage(false);
                    break;
                case SYSTEM_TYPE.CTSS:
                    Master.redirectCtssMainPage(false);
                    break;
                default:
                    new Error()
            }
        }

        function allNoneDisplayAuthContainers() {
            displayAuthenticateOtpContainer(DISPLAY_VALUE.NONE);
            displayAuthenticateGpkiContainer(DISPLAY_VALUE.NONE);
            displayAuthenticateEmailContainer(DISPLAY_VALUE.NONE);
        }


        document.addEventListener('DOMContentLoaded', function () {
            initializeDesign();
            initializeEvent();
        });

        window.addEventListener("pageshow", function (event) {
            if (event.persisted) {
                // 캐시에서 불러온 경우
                console.log("뒤로 오면서 캐시된 페이지 로드됨 → 초기화");
                window.location.reload(); // 강제로 새로고침
            } else {
                console.log("정상 로드됨");
            }
        });
    }

)
();