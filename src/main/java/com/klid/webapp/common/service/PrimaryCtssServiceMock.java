package com.klid.webapp.common.service;

import com.klid.common.SEED_KISA256;
import com.klid.webapp.common.dto.ThirdPartyAuthPrimaryPlainResDto;
import com.klid.webapp.common.dto.UserDto;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Profile("local")
@Service
public class PrimaryCtssServiceMock implements PrimaryCtssServiceI {

    private final ThirdPartyRedirectService thirdPartyRedirectService;

    public PrimaryCtssServiceMock(final ThirdPartyRedirectService thirdPartyRedirectService) {
        this.thirdPartyRedirectService = thirdPartyRedirectService;
    }

    private String decrypt(String value) {
        if (StringUtils.isBlank(value)) {
            return null;
        } else {
            return SEED_KISA256.Decrypt(value).replaceAll("\\D", "").trim();
        }
    }

    @Override
    public ThirdPartyAuthPrimaryPlainResDto requestCheck(String id, String password, String clientIp) {
        final UserDto userInfo = thirdPartyRedirectService.getUserInfo(id);

        final String name = userInfo.getUserName().trim();
        String office = null;
        if (!StringUtils.isBlank(userInfo.getOffcTelNo())) {
            office = userInfo.getOffcTelNo().replaceAll("\\D", "").trim();
        }
        final String phone = decrypt(userInfo.getMoblPhnNo());
        final String email = decrypt(userInfo.getEmailAddr());
        final String otpSecretKey = userInfo.getOtpKey();

        final ThirdPartyAuthPrimaryPlainResDto thirdPartyAuthPrimaryPlainResDto = new ThirdPartyAuthPrimaryPlainResDto();
        thirdPartyAuthPrimaryPlainResDto.setUserName(name);
        thirdPartyAuthPrimaryPlainResDto.setOfficeNumber(office);
        thirdPartyAuthPrimaryPlainResDto.setPhoneNumber(phone);

        thirdPartyAuthPrimaryPlainResDto.setEmail(email);
        thirdPartyAuthPrimaryPlainResDto.setOtpKey(otpSecretKey);

        return thirdPartyAuthPrimaryPlainResDto;
    }
}
