package com.klid.webapp.main.controller.thirdparty;

import lombok.extern.slf4j.Slf4j;
import com.klid.common.IntegrationSessionManager;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.dto.IntegrationLoginInfoDto;
import com.klid.webapp.common.properties.ThirdPartyProperty;
import com.klid.webapp.common.service.RedirectVmsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/main/vms")
@Slf4j
public class VmsRestController {

    private final ThirdPartyProperty thirdPartyProperty;
    private final RedirectVmsService redirectVmsService;

    public VmsRestController(final ThirdPartyProperty thirdPartyProperty,
                             final RedirectVmsService redirectVmsService) {
        this.thirdPartyProperty = thirdPartyProperty;
        this.redirectVmsService = redirectVmsService;
    }

    @GetMapping(value = "/privacy-policy")
    public String getPrivacyPolicy() {
        final String vmsUrlLinkPolicy = thirdPartyProperty.getVmsUrlLinkPolicy();
        log.info("vms 개인정보 처리방침 호출 url: " + vmsUrlLinkPolicy);
        return vmsUrlLinkPolicy;
    }

    @GetMapping("/redirect/auth")
    public ReturnData getAuthRedirect() {
        log.info("VMS redirect 주소 요청");
        final boolean authenticateAll = IntegrationSessionManager.isAuthenticateAll();

        if (authenticateAll) {
            final IntegrationLoginInfoDto integrationLoginInfo = IntegrationSessionManager.getIntegrationLoginInfo();
            final String redirectUrl = redirectVmsService.requestRedirectMainPage(integrationLoginInfo.getUserName(), integrationLoginInfo.getOfficeNumber(), integrationLoginInfo.getPlainPhoneNumber(), integrationLoginInfo.getClientIp());
            IntegrationSessionManager.setThirdPartyRedirect(redirectUrl);
            return new ReturnData();
        } else {
            throw new CustomException("인증 정보가 없습니다.");
        }
    }
}
