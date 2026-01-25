package com.klid.webapp.main.controller.thirdparty;

import com.klid.common.IntegrationSessionManager;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.IntegrationLoginInfoDto;
import com.klid.webapp.common.properties.ThirdPartyProperty;
import com.klid.webapp.common.service.RedirectCtssService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/main/ctss")
public class CtssRestController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final ThirdPartyProperty thirdPartyProperty;
    private final RedirectCtssService redirectCtssService;

    public CtssRestController(final ThirdPartyProperty thirdPartyProperty,
                              final RedirectCtssService redirectCtssService) {
        this.thirdPartyProperty = thirdPartyProperty;
        this.redirectCtssService = redirectCtssService;
    }

    @GetMapping(value = "/privacy-policy")
    public String getPrivacyPolicy() {
        final String ctsUrlLinkPolicy = thirdPartyProperty.getCtssUrlLinkPolicy();
        log.info("ctss 개인정보 처리방침 호출 url: " + ctsUrlLinkPolicy);
        return ctsUrlLinkPolicy;
    }

    @GetMapping("/redirect/auth")
    public ReturnData getAuthRedirect() {
        log.info("CTSS redirect 주소 요청");
        final boolean authenticatePrimary = IntegrationSessionManager.isAuthenticatePrimary();

        if (authenticatePrimary) {
            final IntegrationLoginInfoDto integrationLoginInfo = IntegrationSessionManager.getIntegrationLoginInfo();
            final String redirectUrl = redirectCtssService.requestRedirectMainPage(integrationLoginInfo.getUserName(), integrationLoginInfo.getOfficeNumber(), integrationLoginInfo.getPlainPhoneNumber(), integrationLoginInfo.getClientIp());
            IntegrationSessionManager.setThirdPartyRedirect(redirectUrl);
            return new ReturnData();
        } else {
            throw new CustomException("인증 정보가 없습니다.");
        }
    }
}
