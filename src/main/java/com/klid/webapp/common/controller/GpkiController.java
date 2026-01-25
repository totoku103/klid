package com.klid.webapp.common.controller;

// TODO: GPKI 라이브러리가 Jakarta EE와 호환되지 않아 임시 비활성화
// GPKI 라이브러리 업그레이드 후 아래 import 주석 해제 필요
// import com.gpki.gpkiapi.cert.X509Certificate;
// import com.gpki.servlet.GPKIHttpServletRequest;
// import com.gpki.servlet.GPKIHttpServletResponse;
import com.klid.common.IntegrationSessionManager;
import com.klid.webapp.common.dto.IntegrationLoginInfoDto;
import com.klid.webapp.common.service.GpkiService;
import java.util.Base64;
import me.totoku103.crypto.java.sha2.Sha512;
import org.apache.commons.lang3.StringUtils;
import org.apache.tomcat.util.buf.HexUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigInteger;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.Map;

@Controller
@RequestMapping("/gpki")
public class GpkiController {

    private final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(GpkiController.class);
    private final GpkiService gpkiService;

    public GpkiController(final GpkiService gpkiService) {
        this.gpkiService = gpkiService;
    }

    @GetMapping("/error")
    public ModelAndView error() {
        return new ModelAndView("gpki/GPKIError");
    }

    @GetMapping("/sign-in-popup")
    public ModelAndView openPopup() {
        log.info("gpki popup open");

        final ModelAndView mv = new ModelAndView();
        mv.setViewName("gpki/sign-in-popup");
        return mv;
    }

    @GetMapping("/sign-up-popup")
    public ModelAndView openSignUpPopup() {
        log.info("gpki sign-up popup open");

        final ModelAndView mv = new ModelAndView();
        mv.setViewName("gpki/sign-up-popup");
        return mv;
    }

    @GetMapping("/request-secure-session")
    public ModelAndView requestSecureSession(@RequestParam(value = "rnd", required = false) String sessionId) {
        log.info("gpki requestSecureSession");

        final ModelAndView mv = new ModelAndView();
        mv.setViewName("gpki/requestSecureSession");
        mv.addObject("sessionId", sessionId);
        return mv;
    }

    public static class GpkiResponseSecureSessionReqDto {
        private String sessionid;
        private String challenge;

        public String getSessionid() {
            return sessionid;
        }

        public void setSessionid(final String sessionid) {
            this.sessionid = sessionid;
        }

        public String getChallenge() {
            return challenge;
        }

        public void setChallenge(final String challenge) {
            this.challenge = challenge;
        }
    }

    @PostMapping("/response-secure-session")
    public ModelAndView responseSecureSession(@ModelAttribute GpkiResponseSecureSessionReqDto dto) {
        log.info("gpki responseSecureSession");
        final ModelAndView mv = new ModelAndView();
        mv.setViewName("gpki/responseSecureSession");
        return mv;
    }

    @PostMapping(value = "/create-secure-session", consumes = "application/x-www-form-urlencoded;charset=UTF-8")
    public void createSecureSession(HttpServletRequest request,
                                    HttpServletResponse response) throws IOException {
        log.info("gpki createSecureSession");
        // TODO: GPKI 라이브러리가 Jakarta EE와 호환되지 않아 임시 비활성화
        // GPKI 라이브러리 (gpkisecureweb)가 javax.servlet을 사용하여 jakarta.servlet과 호환되지 않음
        // GPKI 공급업체에서 Jakarta EE 호환 버전을 제공하면 아래 주석을 해제하고 복원 필요
        log.error("GPKI 기능이 일시적으로 비활성화되었습니다. GPKI 라이브러리 Jakarta EE 호환 버전 필요.");
        response.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
        final String host = "https://" + request.getServerName();
        response.sendRedirect(host + "/gpki/error.do?errmsg=" + URLEncoder.encode("GPKI 서비스가 일시적으로 비활성화되었습니다.", "UTF-8"));

        /* 원본 코드 - GPKI 라이브러리 Jakarta EE 호환 버전 적용 후 복원
        try {
            final GPKIHttpServletResponse gpkiResponse = new GPKIHttpServletResponse(response);
            final GPKIHttpServletRequest gpkiRequest = new GPKIHttpServletRequest(request);

            gpkiResponse.setRequest(gpkiRequest);

            final String inputSerialNumber = checkAndSerialNumber(gpkiRequest);
            if (StringUtils.isBlank(inputSerialNumber)) {
                throw new RuntimeException("input serial number is empty");
            }
            final Sha512 sha512 = new Sha512();
            final String encryptSerialNumber = sha512.encrypt(inputSerialNumber.getBytes(StandardCharsets.UTF_8));
            final String databaseSerialNumber = IntegrationSessionManager.getGpkiSerialNumber();

            final String type = "gpki-sign-in";
            final String code;
            final String message;
            if (StringUtils.isBlank(databaseSerialNumber)) {
                code = "404";
                message = "인증서를 먼저 등록해주세요.";
            } else if (encryptSerialNumber.equals(databaseSerialNumber)) {
                code = "200";
                message = "인증서 인증 성공";
                IntegrationSessionManager.setSecondAuthSuccess();
            } else {
                code = "400";
                message = "인증서 인증 실패";
            }
            final String host = "https://" + request.getServerName();
            log.info("gpki host: " + host);
            response.sendRedirect(host + "/gpki/result.do?" + getResultQueryString(type, code, message));
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("GPKI Create Secure Session Error." + e.getMessage());
            log.error(String.valueOf(e));
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            final String host = "https://" + request.getServerName();
            log.info("gpki host: " + host);
            response.sendRedirect(host + "/error.do");
        }
        */
    }

    private String getResultQueryString(String type, String code, String message) {
        log.info("gpki getResultQueryString");
        final Map<String, String> params = new LinkedHashMap<>();
        params.put("type", type);
        params.put("code", code);
        params.put("message", message);

        final StringBuilder query = new StringBuilder();
        for (Map.Entry<String, String> entry : params.entrySet()) {
            if (query.length() > 0) {
                query.append("&");
            }
            query.append(entry.getKey());
            query.append("=");
            query.append(Base64.getEncoder().encodeToString(entry.getValue().getBytes(StandardCharsets.UTF_8)));
        }
        return query.toString();
    }

    /* TODO: GPKI 라이브러리 Jakarta EE 호환 버전 적용 후 복원
    private String checkAndSerialNumber(GPKIHttpServletRequest gpkiRequest) throws Exception {
        log.info("gpki checkAndSerialNumber");
        final int messageType = gpkiRequest.getRequestMessageType();
        if (gpkiRequest.LOGIN_ENVELOP_SIGN_DATA != messageType) {
            log.error(messageType + " not supported. " + messageType);
            throw new RuntimeException("GPKI Login Envelopp Sign Data not supported. message type:" + messageType);
        }

        final X509Certificate cert = gpkiRequest.getSignerCert();
        if (cert == null) {
            log.error("GPKI Create Secure Session Error. Cert Info is null");
            throw new RuntimeException("GPKI Create Secure Session Error. Cert Info is null");
        }

        final String subDN = cert.getSubjectDN();
        final BigInteger serialNumber = cert.getSerialNumber();
        log.debug("GPKI - SubjectDN: " + subDN + ", SerialNumber: " + serialNumber);

        final byte[] signData = gpkiRequest.getSignedData();
        log.debug("Signed Data: " + HexUtils.toHexString(signData));
        final byte[] privateKeyRandom = gpkiRequest.getSignerRValue();
        log.debug("Random: " + HexUtils.toHexString(privateKeyRandom));
        final String signType = gpkiRequest.getSignType();
        log.debug("GPKI - Sign Type: " + signType);

        final Enumeration params = gpkiRequest.getParameterNames();
        while (params.hasMoreElements()) {
            final String paramName = (String) params.nextElement();
            final String paramValue = gpkiRequest.getParameter(paramName);
            log.debug("GPKI params - " + paramName + " : " + paramValue);
        }

        return serialNumber.toString();
    }
    */

    @GetMapping("result")
    public ModelAndView resultPage() {
        log.info("gpki resultPage");
        final ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("gpki/result");
        return modelAndView;
    }

    @PostMapping(value = "/register", consumes = "application/x-www-form-urlencoded;charset=UTF-8")
    public void registerPage(HttpServletRequest request,
                             HttpServletResponse response) throws IOException {
        log.info("gpki registerPage");
        // TODO: GPKI 라이브러리가 Jakarta EE와 호환되지 않아 임시 비활성화
        log.error("GPKI 기능이 일시적으로 비활성화되었습니다. GPKI 라이브러리 Jakarta EE 호환 버전 필요.");
        response.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
        final String host = "https://" + request.getServerName();
        response.sendRedirect(host + "/gpki/error.do?errmsg=" + URLEncoder.encode("GPKI 서비스가 일시적으로 비활성화되었습니다.", "UTF-8"));

        /* 원본 코드 - GPKI 라이브러리 Jakarta EE 호환 버전 적용 후 복원
        final boolean authenticatePrimary = IntegrationSessionManager.isAuthenticatePrimary();
        if (!authenticatePrimary) {
            throw new RuntimeException("1차 인증 정보가 없습니다.");
        }
        try {
            final GPKIHttpServletResponse gpkiResponse = new GPKIHttpServletResponse(response);
            final GPKIHttpServletRequest gpkiRequest = new GPKIHttpServletRequest(request);

            gpkiResponse.setRequest(gpkiRequest);

            final String inputSerialNumber = checkAndSerialNumber(gpkiRequest);
            final IntegrationLoginInfoDto integrationLoginInfo = IntegrationSessionManager.getIntegrationLoginInfo();
            log.info("GPKI - 시리얼 넘버 저장 요청");

            gpkiService.updateGpkiSerialNumberAllSystem(inputSerialNumber, integrationLoginInfo.getUserName(), integrationLoginInfo.getOfficeNumber(), integrationLoginInfo.getPlainPhoneNumber());
            log.info("GPKI - 시리얼 넘버 저장 완료");

            final String type = "gpki-sign-up";
            final String code = "201";
            final String message = "저장이 완료되었습니다.\n다시 로그인 해주세요.";
            response.setStatus(HttpServletResponse.SC_OK);
            final String host = "https://" + request.getServerName();
            log.info("gpki host: " + host);
            response.sendRedirect(host + "/gpki/result.do?" + getResultQueryString(type, code, message));
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            final String host = "https://" + request.getServerName();
            log.info("gpki host: " + host);
            response.sendRedirect(host + "/gpki/error.do?errmsg=" + URLEncoder.encode(e.getMessage(), "UTF-8"));
        }
        */
    }
}
