package com.klid.webapp.main.controller;

import lombok.extern.slf4j.Slf4j;
import com.klid.common.IntegrationSessionManager;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.properties.ThirdPartyProperty;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/main/vms")
@Slf4j
public class VmsViewController {

    private final ThirdPartyProperty thirdPartyProperty;

    public VmsViewController(final ThirdPartyProperty thirdPartyProperty) {
        this.thirdPartyProperty = thirdPartyProperty;
    }

    @GetMapping("/sign-up.do")
    public String getSignupPage() {
        final String redirectUrl = thirdPartyProperty.getVmsUrlRedirectSignUp();
        log.info("리다이렉트 URL: " + redirectUrl);
        return "redirect:" + redirectUrl;
    }

    @GetMapping("/page-redirect.do")
    public String getRedirectVmsMainPage() {
        log.info("redirect 요청");
        final boolean authenticateAll = IntegrationSessionManager.isAuthenticateAll();

        if (authenticateAll) {
            final String redirectUrl = IntegrationSessionManager.getThirdPartyRedirect();
            final String id = SessionManager.getSession().getId();
            log.info(String.format("[%s] VMS redirectUrl: %s", id, redirectUrl));
            IntegrationSessionManager.invalidateSession();
            return String.format("redirect:%s", redirectUrl);
        } else {
            throw new CustomException("인증 정보가 없습니다.");
        }
    }

    @ExceptionHandler(value = CustomException.class)
    public ModelAndView handlerCustomException(CustomException e) {
        log.error(e.getMessage());
        final ModelAndView modelAndView = new ModelAndView("/error");
        modelAndView.addObject("redirectMessage", e.getMessage());
        return modelAndView;
    }
}
