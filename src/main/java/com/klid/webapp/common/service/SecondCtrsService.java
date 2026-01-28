package com.klid.webapp.common.service;

import lombok.extern.slf4j.Slf4j;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.login.service.LoginService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class SecondCtrsService {
    private final LoginService loginService;
    private final ThirdPartyRedirectService thirdPartyRedirectService;

    public SecondCtrsService(final LoginService loginService, final ThirdPartyRedirectService thirdPartyRedirectService) {
        this.loginService = loginService;
        this.thirdPartyRedirectService = thirdPartyRedirectService;
    }

    @Transactional
    public void updateOtpSecretKey(String userId, String otpSecretKey) {
        log.info("CTRS [" + userId + "]  사용자 OTP 키 신규/수정 등록 시작");

        final Criterion criterion = new Criterion();
        criterion.addParam("userId", userId);
        criterion.addParam("otpSetCode", StringUtils.isBlank(otpSecretKey) ? null : otpSecretKey);

        loginService.editOtpKey(criterion);
        log.info("CTRS [" + userId + "]  사용자 OTP 키 신규/수정 등록 완료");
    }

    @Transactional
    public void updateOtpSecretKey(String userName, String officeNumber, String plainPhoneNumber, String otpSecretKey) {
        final UserDto userInfo = thirdPartyRedirectService.getUserInfo(userName, officeNumber, plainPhoneNumber);
        if(userInfo == null) {
            log.warn(String.format("사용자를 찾을 수 없습니다. 무시가능한 에러. userName: %s, officeNumber: %s, plainPhoneNumber: %s, otpSecretKey: %s",
                    userName, officeNumber, plainPhoneNumber, otpSecretKey));
        } else {
            updateOtpSecretKey(userInfo.getUserId(), otpSecretKey);
        }
    }
}
