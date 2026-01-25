<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.*, java.text.*" %>
<%@ page import="com.klid.common.AppGlobal" %>
<%@ page import="org.apache.commons.lang3.StringUtils" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="사이버 침해대응시스템 로그인">
    <title>사이버 침해대응시스템</title>
    <%@include file="/inc/inc.jsp" %>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/integration-login-black.css"/>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/integration-login.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/notice-popup-black.js"></script>
</head>
<body>
<!-- Main login form -->
<form id="login-form" class="login-background-image2" method="post" onsubmit="return false;" novalidate>
    <!-- Application configuration hidden fields -->
    <input type="hidden" id="gMaxWeeks" value="<%=AppGlobal.MAXWEEKS%>"/>
    <input type="hidden" id="gMinWeeks" value="<%=AppGlobal.MINWEEKS%>"/>
    <input type="hidden" id="gHistory" value="<%=AppGlobal.HISTORY%>"/>
    <input type="hidden" id="gWhiteSpace" value="<%=AppGlobal.WHITESPACE%>"/>
    <input type="hidden" id="gRetries" value="<%=AppGlobal.RETRIES%>"/>
    <input type="hidden" id="gReleaseTime" value="<%=AppGlobal.RELEASETIME%>"/>
    <input type="hidden" id="gPolicyMsg" value="<%=AppGlobal.POLICY_MSG%>"/>
    <input type="hidden" id="gAlarm" value="<%=AppGlobal.ALARM%>"/>
    <input type="hidden" id="gAlarmMsgHead" value="<%=AppGlobal.ALARM_MSG_HEAD%>"/>
    <input type="hidden" id="gAlarmMsgFoot" value="<%=AppGlobal.ALARM_MSG_FOOT%>"/>
    <input type="hidden" id="gAppNetisPopup" value="<%=AppGlobal.appNetisPopup%>"/>
    <input type="hidden" id="gSiteName" value="<%=AppGlobal.webSiteName%>"/>
    <input type="hidden" id="ctxPath" value="${pageContext.request.contextPath}"/>
    <!-- Main login container -->
    <div class="login-container">
        <div class="login-box">
            <div class="title-with-logo">
                <span class="main-title">사이버 침해대응시스템</span>
            </div>

            <div class="login-section">
                <div class="login-header">
                    <span class="login-title">LOGIN</span>
                    <p class="login-instruction">접속을 원하는 시스템을 선택하세요.</p>
                </div>

                <div class="system-selection">
                    <label class="radio-label">
                        <input type="radio"
                               id="ctrs-input-radio"
                               name="connect-system-type"
                               value="CTRS"
                               checked/>
                        <span>사이버침해대응시스템</span>
                    </label>
                    <label class="radio-label">
                        <input type="radio"
                               id="vms-input-radio"
                               name="connect-system-type"
                               value="VMS"/>
                        <span>보안취약점 진단시스템</span>
                    </label>
                    <label class="radio-label">
                        <input type="radio"
                               id="ctss-input-radio"
                               name="connect-system-type"
                               value="CTSS"/>
                        <span>주요정보통신기반시설 업무지원시스템</span>
                    </label>
                </div>

                <div id="loginForm" class="login-form">
                    <div class="input-group">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                    stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="#999" stroke-width="2"
                                  stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <label for="user-id" class="visually-hidden">사용자 ID</label>
                        <input type="text"
                               id="user-id"
                               name="user-id"
                               class="input-field"
                               placeholder="사용자 ID"
                               required>
                    </div>

                    <div class="input-group">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                    d="M17 11H7C5.89543 11 5 11.8954 5 13V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V13C19 11.8954 18.1046 11 17 11Z"
                                    stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path
                                    d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                                    stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="#999" stroke-width="2"
                                  stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <label for="password" class="visually-hidden">비밀번호</label>
                        <input type="password"
                               id="password"
                               name="password"
                               class="input-field"
                               placeholder="비밀번호"
                               required
                               autocomplete="off">
                    </div>

                    <div class="login-button-container">
                        <button type="button"
                                id="button-log-in"
                                class="login-button">
                            로그인
                        </button>

                        <button type="button"
                                id="button-sign-up"
                                class="login-button"
                                style="display: none"
                                aria-label="회원가입 버튼">
                            회원가입
                        </button>
                    </div>
                </div>

                <div id="multi-authenticate-type-container" style="display: none;">
                    <div class="help-desk-section" id="vms-help-desk-container">
                        <p class="help-desk-text">Help Desk: 02-2031-5049</p>
                    </div>

                    <div class="auth-method-selection">
                        <fieldset class="auth-fieldset">
                            <legend class="visually-hidden">인증 방법 선택</legend>

                            <label class="radio-label">
                                <input type="radio"
                                       id="vms-otp-radio"
                                       name="multi-authenticate-type"
                                       value="otp"
                                       checked
                                       aria-label="OTP 인증 선택">
                                <span>OTP 인증</span>
                            </label>

                            <label class="radio-label">
                                <input type="radio"
                                       id="vms-gpki-radio"
                                       name="multi-authenticate-type"
                                       value="gpki"
                                       aria-label="GPKI 인증 선택">
                                <span>GPKI 인증</span>
                            </label>

                            <label class="radio-label">
                                <input type="radio"
                                       id="vms-email-radio"
                                       name="multi-authenticate-type"
                                       value="email"
                                       aria-label="E-MAIL 인증 선택">
                                <span>E-MAIL 인증</span>
                            </label>
                        </fieldset>
                    </div>
                </div>

                <!-- E-Mail Authenticate Container -->
                <div id="authenticate-email-container" class="email-section">
                    <div class="email-timer">
                        <span id="timer-print">00:00</span>
                    </div>
                    <div style="display: flex; width: 100%; gap: 10px">
                        <div class="email-input-group">
                            <svg class="email-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                                      stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M22 6L12 13L2 6"
                                      stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            <label for="email-code" class="visually-hidden">E-MAIL 코드 입력</label>
                            <input type="text"
                                   id="email-code"
                                   name="email-code"
                                   class="email-input"
                                   placeholder="6자리 이메일 인증 코드"
                                   pattern="[0-9]{6}"
                                   maxlength="6"
                                   inputmode="numeric">
                        </div>
                        <button id="button-email-send"
                                type="button"
                                class="email-send-button"
                                aria-label="E-Mail 인증 번호 발송 버튼">
                            발송
                        </button>
                    </div>
                </div>

                <!-- GPKI Authenticate Container -->
                <div id="authenticate-gpki-container" class="gpki-section">
                    <div class="gpki-buttons-container">
                        <button id="button-gpki-authenticate"
                                type="button"
                                class="gpki-button"
                                aria-label="GPKI 인증 버튼">
                            GPKI 인증
                        </button>
                        <button id="button-gpki-certificate-register"
                                type="button"
                                class="gpki-button"
                                aria-label="GPKI 인증서 등록 버튼">
                            인증서 등록
                        </button>
                    </div>
                    <div class="gpki-download-link">
                        <a href="/gpkisecureweb/client/setup/GPKISecureWebSetup.exe">인증서 모듈 다운로드</a>
                    </div>
                </div>

                <!-- OTP Authenticate Container -->
                <div id="authenticate-otp-container" class="otp-section">
                    <div id="new-otp-key" class="otp-code-display">
                        <span class="otp-code-label">OTP CODE:</span>
                        <span id="otp-new-code" class="otp-code-value">ABCDIEOWIJDOFIJSOIDFJ</span>
                        <input type="hidden" id="otp-set-code" value="">
                    </div>
                    <div style="display: flex; width: 100%; gap: 10px">
                        <div class="otp-input-group">
                            <svg class="otp-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                        d="M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2Z"
                                        stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M12 18H12.01" stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"></path>
                            </svg>
                            <label for="otp-code" class="visually-hidden">OTP 코드 6자리 입력</label>
                            <input type="text"
                                   id="otp-code"
                                   name="otp-code"
                                   class="otp-input"
                                   placeholder="6자리 OTP 코드"
                                   pattern="[0-9]{6}"
                                   inputmode="numeric"
                                   autocomplete="one-time-code"
                                   onkeyup="this.value=this.value.replace(/[^0-9]/g,'')"
                                   maxlength="6"/>
                        </div>
                        <button id="button-otp-confirm"
                                type="button"
                                class="otp-register-button">
                            OTP 확인
                        </button>
                    </div>
                </div>

                <div class="contact-section">
                    <div class="contact-info">
                        <p class="contact-title">로그인/시스템 사용문의</p>
                        <ul class="contact-list">
                            <li>* 사이버침해 대응시스템 02-2031-9900</li>
                            <li>* 보안취약점 진단시스템 02-2031-9787</li>
                            <li>* 주요정보통신기반시설 업무지원시스템 02-2031-9872</li>
                        </ul>
                    </div>
                    <a href="${pageContext.request.contextPath}/files/user-manual.pdf"
                       download
                       class="manual-button">
                        매뉴얼 다운로드
                    </a>
                </div>

                <div class="footer">
                    <p class="copyright">
                        Copyright © 2025 한국지역정보개발원. All rights reserved.
                    </p>
                    <p class="footer-links">
                        <a id="private-policy-info" href="#" class="privacy-link">개인정보 처리방침</a>
                    </p>
                </div>

            </div>
        </div>
    </div>
</form>

<div id="pInfoWindow" style="position: absolute;">
    <div></div>
    <div></div>
</div>

</body>
</html>