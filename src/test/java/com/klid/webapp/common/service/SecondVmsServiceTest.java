package com.klid.webapp.common.service;


import com.klid.common.SEED_KISA256;
import com.klid.webapp.common.RestTemplateConfig;
import com.klid.webapp.common.ThirdPartyPropertyCrypto;
import com.klid.webapp.common.ThirdPartyRestTemplate;
import com.klid.webapp.common.dto.ThirdPartyAuthSecondValueCryptReqDto;
import com.klid.webapp.common.dto.ThirdPartyAuthSecondValueResDto;
import com.klid.webapp.common.dto.ThirdPartyBaseResDto;
import com.klid.webapp.common.enums.ThirdPartyUserTypes;
import com.klid.webapp.common.properties.ThirdPartyCommonProperty;
import com.klid.webapp.common.properties.ThirdPartyCtssProperty;
import com.klid.webapp.common.properties.ThirdPartyProperty;
import com.klid.webapp.common.properties.ThirdPartyVmsProperty;
import me.totoku103.crypto.core.utils.ByteUtils;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.rules.SpringClassRule;
import org.springframework.test.context.junit4.rules.SpringMethodRule;

@ContextConfiguration(classes = {
        RestTemplateConfig.class,
        ThirdPartyRestTemplate.class,
        ThirdPartyPropertyCrypto.class,
        ThirdPartyProperty.class,
        ThirdPartyCommonProperty.class,
        ThirdPartyCtssProperty.class,
        ThirdPartyVmsProperty.class,
        ThirdPartyCtssProperty.class
})
public class SecondVmsServiceTest {
    final byte[] seedKey = ByteUtils.fromHexString("9b8796492bfb18443c94f3e8fc193da2");
    final byte[] hmacKey = ByteUtils.fromHexString("318d136afe9edd9aa5a3902539480d6f37efa67146ec83c6e146bf99dce78025");
    @ClassRule
    public static final SpringClassRule SPRING_CLASS_RULE = new SpringClassRule();
    @Rule
    public final SpringMethodRule springMethodRule = new SpringMethodRule();
    @Autowired
    private ThirdPartyRestTemplate thirdPartyRestTemplate;

    @Test
    public void test() {
        final String userName = "test";
        final String officeNumber = "be13a8d9555ca59adfae9630bd3943ab";
        final String phoneNumber = "0233333333";
        final String clientIp = "121.145.67.11";

        final ThirdPartyCryptoService thirdPartyCryptoService = new ThirdPartyCryptoService(seedKey, hmacKey);
        final ThirdPartyAuthSecondValueCryptReqDto reqDto = thirdPartyCryptoService.encryptThirdPartyAuthSecondValueCryptReqDto(
                ThirdPartyAuthSecondValueCryptReqDto.ApiType.OTP,
                userName, officeNumber,
                SEED_KISA256.Encrypt(phoneNumber),
                ThirdPartyUserTypes.VMS,
                "testValue"
        );

        final ThirdPartyBaseResDto<ThirdPartyAuthSecondValueResDto> thirdPartyAuthSecondValueResDtoThirdPartyBaseResDto = thirdPartyRestTemplate.postSecondValue(reqDto);
        System.out.println(thirdPartyAuthSecondValueResDtoThirdPartyBaseResDto);
    }

}