package com.klid.common;

import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.EmailSendInfoDto;
import com.klid.webapp.common.dto.IntegrationLoginInfoDto;
import com.klid.webapp.common.dto.UserLastActionDto;
import com.klid.webapp.common.enums.SessionAttributeTypes;
import org.apache.commons.lang3.StringUtils;
import lombok.extern.slf4j.Slf4j;

import jakarta.servlet.http.HttpSession;

@Slf4j
public class IntegrationSessionManager {

    public static boolean isAuthenticatePrimary() {
        final HttpSession session = SessionManager.getSession();
        final Object attribute = session.getAttribute(SessionAttributeTypes.IS_AUTHENTICATE_PRIMARY.getValue());
        return attribute != null && (boolean) attribute;
    }

    public static boolean isAuthenticateSecond() {
        final HttpSession session = SessionManager.getSession();
        final Object attribute = session.getAttribute(SessionAttributeTypes.IS_AUTHENTICATE_SECOND.getValue());
        return attribute != null && (boolean) attribute;
    }

    public static boolean isAuthenticateAll() {
        final HttpSession session = SessionManager.getSession();

        final Object primaryAttribute = session.getAttribute(SessionAttributeTypes.IS_AUTHENTICATE_PRIMARY.getValue());
        final boolean isPrimary = primaryAttribute != null && (boolean) primaryAttribute;

        final Object secondAttribute = session.getAttribute(SessionAttributeTypes.IS_AUTHENTICATE_SECOND.getValue());
        final boolean isSecond = secondAttribute != null && (boolean) secondAttribute;

        log.info("isPassPrimary: " + isPrimary + ", isPassSecond: " + isSecond);
        return isPrimary && isSecond;
    }

    public static void setThirdPartyRedirectConnect() {
        final HttpSession session = SessionManager.getSession();
        session.setAttribute(SessionAttributeTypes.THIRD_PARTY_REDIRECT_CONNECT.getValue(), true);
        log.info("Third Party Redirect 접속 세션 저장.");
    }

    public static boolean isThirdPartyRedirectConnect() {
        final HttpSession session = SessionManager.getSession();
        final Object attribute = session.getAttribute(SessionAttributeTypes.THIRD_PARTY_REDIRECT_CONNECT.getValue());
        return attribute != null && (boolean) attribute;
    }

    public static void setPrimaryAuthSuccess(IntegrationLoginInfoDto dto) {
        final HttpSession session = SessionManager.getSession();
        session.setAttribute(SessionAttributeTypes.IS_AUTHENTICATE_PRIMARY.getValue(), true);
        session.setAttribute(SessionAttributeTypes.INTEGRATION_LOGIN_INFO.getValue(), dto);
        log.info(String.format("1차 인증 성공 결과 세션 저장. %s", dto));
    }

    public static void setSecondAuthSuccess() {
        final HttpSession session = SessionManager.getSession();
        session.setAttribute(SessionAttributeTypes.IS_AUTHENTICATE_SECOND.getValue(), true);

        final IntegrationLoginInfoDto loginInfo = (IntegrationLoginInfoDto) session.getAttribute(SessionAttributeTypes.INTEGRATION_LOGIN_INFO.getValue());
        log.info(String.format("2차 인증 성공 결과 세션 저장. %s", loginInfo));
    }

    public static IntegrationLoginInfoDto getIntegrationLoginInfo() {
        final HttpSession session = SessionManager.getSession();
        return (IntegrationLoginInfoDto) session.getAttribute(SessionAttributeTypes.INTEGRATION_LOGIN_INFO.getValue());
    }

    public static void setGpkiSerialNumber(String serialNumber) {
        final HttpSession session = SessionManager.getSession();
        session.setAttribute(SessionAttributeTypes.GPKI_SERIAL_NUMBER.getValue(), serialNumber);
        log.info("GPKI Serial Number 저장.");
    }

    public static String getGpkiSerialNumber() {
        final HttpSession session = SessionManager.getSession();
        return (String) session.getAttribute(SessionAttributeTypes.GPKI_SERIAL_NUMBER.getValue());
    }

    public static void setOtpSecretKeys(String... otpSecretKeys) {
        final HttpSession session = SessionManager.getSession();
        session.setAttribute(SessionAttributeTypes.OTP_SECRET_KEYS.getValue(), otpSecretKeys);
        log.debug("Session ID: " + session.getId() + ". has SecretKey in session: " + !StringUtils.isBlank(session.getAttribute(SessionAttributeTypes.OTP_SECRET_KEYS.getValue()).toString()));
    }

    public static String getOtpSecretKey() {
        final HttpSession session = SessionManager.getSession();
        return (String) session.getAttribute(SessionAttributeTypes.OTP_SECRET_KEY.getValue());
    }

    public static String[] getOtpSecretKeyArray() {
        final HttpSession session = SessionManager.getSession();
        return (String[]) session.getAttribute(SessionAttributeTypes.OTP_SECRET_KEYS.getValue());
    }

    public static void setEmailRandomDigit(String digit) {
        final EmailSendInfoDto emailSendInfoDto = new EmailSendInfoDto(digit);
        final HttpSession session = SessionManager.getSession();
        session.setAttribute(SessionAttributeTypes.EMAIL_RANDOM_DIGIT.getValue(), emailSendInfoDto);
    }

    public static EmailSendInfoDto getEmailRandomDigit() {
        final HttpSession session = SessionManager.getSession();
        return (EmailSendInfoDto) session.getAttribute(SessionAttributeTypes.EMAIL_RANDOM_DIGIT.getValue());
    }

    public static void removeEmailRandomDigit() {
        final HttpSession session = SessionManager.getSession();
        session.removeAttribute(SessionAttributeTypes.EMAIL_RANDOM_DIGIT.getValue());
    }

    public static void setUserLastAction(UserLastActionDto action) {
        final HttpSession session = SessionManager.getSession();
        session.setAttribute(SessionAttributeTypes.USER_LAST_ACTION.getValue(), action);
    }

    public static UserLastActionDto getUserLastAction() {
        final HttpSession session = SessionManager.getSession();
        return (UserLastActionDto) session.getAttribute(SessionAttributeTypes.USER_LAST_ACTION.getValue());
    }

    public static void setThirdPartyRedirect(String redirectUrl) {
        final HttpSession session = SessionManager.getSession();
        session.setAttribute(SessionAttributeTypes.THIRD_PARTY_REDIRECT_URL.getValue(), redirectUrl);
    }

    public static String getThirdPartyRedirect() {
        final HttpSession session = SessionManager.getSession();
        final Object attribute = session.getAttribute(SessionAttributeTypes.THIRD_PARTY_REDIRECT_URL.getValue());
        if (attribute == null) return null;
        else return (String) attribute;
    }

    public static void invalidateSession() {
        final HttpSession session = SessionManager.getSession();
        session.invalidate();
    }
}
