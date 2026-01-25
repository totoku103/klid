package com.klid.webapp.common;

import com.klid.webapp.common.properties.*;
import com.klid.webapp.common.service.ThirdPartyCryptoService;
import com.klid.webapp.common.dto.ThirdPartyAuthPrimaryCryptoReqDto;
import com.klid.webapp.common.dto.ThirdPartyAuthPrimaryCryptoResDto;
import com.klid.webapp.common.dto.ThirdPartyBaseResDto;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;
import me.totoku103.crypto.core.utils.ByteUtils;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.rules.SpringClassRule;
import org.springframework.test.context.junit4.rules.SpringMethodRule;

import static org.junit.Assert.assertEquals;


@ContextConfiguration(classes = {
        RestTemplateConfig.class,
        ThirdPartyRestTemplate.class,
        ThirdPartyPropertyCrypto.class,
        ThirdPartyProperty.class,
        ThirdPartyCommonProperty.class,
        ThirdPartyCtrsProperty.class,
        ThirdPartyCtssProperty.class,
        ThirdPartyVmsProperty.class,
        ThirdPartyCtssProperty.class
})
public class ThirdPartyRestTemplateTest {
    @ClassRule
    public static final SpringClassRule SPRING_CLASS_RULE = new SpringClassRule();
    @Rule
    public final SpringMethodRule springMethodRule = new SpringMethodRule();

    @Autowired
    private ThirdPartyRestTemplate thirdPartyRestTemplate;

    @Autowired
    private ThirdPartyProperty thirdPartyProperty;


    /**
     * VMS 테스트 계정. hamon1		hamon1@gmail.com		121.145.67.11		승인
     */
    @Test
    public void vmsUser1() {
        final String userId = "hamon1";
        final String password = "hamon1@gmail.com";
        final String clientIp = "121.145.67.11";

        final ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> thirdPartyAuthResDtoThirdPartyBaseResDto = postAuthVms(userId, password, clientIp);
        assertEquals(0, thirdPartyAuthResDtoThirdPartyBaseResDto.getStatus().intValue());
    }

    /**
     * VMS 테스트 계정. hamon2		hamon2@gmail.com		106.245.230.92		미승인
     */
    @Test
    public void vmsUser2() {
        final String userId = "hamon2";
        final String password = "hamon2@gmail.com";
        final String clientIp = "106.245.230.92";

        final ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> thirdPartyAuthResDtoThirdPartyBaseResDto = postAuthVms(userId, password, clientIp);
        assertEquals(-7, thirdPartyAuthResDtoThirdPartyBaseResDto.getStatus().intValue());
    }

    /**
     * VMS 테스트 계정. hamon3		hamon3@gmail.com		58.229.150.100		임시삭제
     */
    @Test
    public void vmsUser3() {
        final String userId = "hamon3";
        final String password = "hamon3@gmail.com";
        final String clientIp = "58.229.150.100";

        final ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> thirdPartyAuthResDtoThirdPartyBaseResDto = postAuthVms(userId, password, clientIp);
        assertEquals(-8, thirdPartyAuthResDtoThirdPartyBaseResDto.getStatus().intValue());
    }

    /**
     * VMS 테스트 계정. hamon4		hamon4@gmail.com		59.5.234.78		    삭제됨
     */
    @Test
    public void vmsUser4() {
        final String userId = "hamon4";
        final String password = "hamon4@gmail.com";
        final String clientIp = "59.5.234.78";

        final ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> thirdPartyAuthResDtoThirdPartyBaseResDto = postAuthVms(userId, password, clientIp);
        assertEquals(0, thirdPartyAuthResDtoThirdPartyBaseResDto.getStatus().intValue());
    }

    /**
     * VMS 테스트 계정. hamon5		hamon5@gmail.com		211.36.123.44		승인됨
     */
    @Test
    public void vmsUser5() {
        final String userId = "hamon5";
        final String password = "hamon5@gmail.com";
        final String clientIp = "211.36.123.44";

        final ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> thirdPartyAuthResDtoThirdPartyBaseResDto = postAuthVms(userId, password, clientIp);
        assertEquals(-4, thirdPartyAuthResDtoThirdPartyBaseResDto.getStatus().intValue());
    }


    /**
     * CTSS 테스트 계정. hamon6		hamon6@gmail.com		121.145.67.11		승인
     */
    @Test
    public void ctssUser1() {
        final String userId = "hamon6";
        final String password = "hamon6@gmail.com";
        final String clientIp = "121.145.67.11";

        final ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> thirdPartyAuthResDtoThirdPartyBaseResDto = postAuthCtss(userId, password, clientIp);
        assertEquals(0, thirdPartyAuthResDtoThirdPartyBaseResDto.getStatus().intValue());
    }

    /**
     * CTSS 테스트 계정. hamon7		hamon7@gmail.com		106.245.230.92		미승인
     */
    @Test
    public void ctssUser2() {
        final String userId = "hamon7";
        final String password = "hamon7@gmail.com";
        final String clientIp = "106.245.230.92";

        final ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> thirdPartyAuthResDtoThirdPartyBaseResDto = postAuthCtss(userId, password, clientIp);
        assertEquals(-3, thirdPartyAuthResDtoThirdPartyBaseResDto.getStatus().intValue());
    }

    private ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> postAuthVms(final String userId, final String password, final String clientIp) {
        final String seedKey = thirdPartyProperty.getSeedCbcKey();
        final String hmacKey = thirdPartyProperty.getHmacKey();

        final ThirdPartyCryptoService thirdPartyCryptoService = new ThirdPartyCryptoService(ByteUtils.fromHexString(seedKey), ByteUtils.fromHexString(hmacKey));
        final ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto = thirdPartyCryptoService.encryptThirdPartyAuthPrimaryReqDto(userId, password, ThirdPartySystemTypes.VMS, clientIp);
        final ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> thirdPartyAuthResDtoThirdPartyBaseResDto = thirdPartyRestTemplate.postAuthVms(thirdPartyAuthPrimaryCryptoReqDto);

        System.out.println("\n---\n" + "userId: " + userId + ", password: " + password + ", ip: " + clientIp + "\n" + thirdPartyAuthPrimaryCryptoReqDto + "\n" + thirdPartyAuthResDtoThirdPartyBaseResDto + "\n" + thirdPartyAuthResDtoThirdPartyBaseResDto.getData() + "\n---\n");
        return thirdPartyAuthResDtoThirdPartyBaseResDto;
    }


    private ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> postAuthCtss(final String userId, final String password, final String clientIp) {
        final String seedKey = thirdPartyProperty.getSeedCbcKey();
        final String hmacKey = thirdPartyProperty.getHmacKey();

        final ThirdPartyCryptoService thirdPartyCryptoService = new ThirdPartyCryptoService(ByteUtils.fromHexString(seedKey), ByteUtils.fromHexString(hmacKey));
        final ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto = thirdPartyCryptoService.encryptThirdPartyAuthPrimaryReqDto(userId, password, ThirdPartySystemTypes.CTSS, clientIp);
        final ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> thirdPartyAuthResDtoThirdPartyBaseResDto = thirdPartyRestTemplate.postAuthCtss(thirdPartyAuthPrimaryCryptoReqDto);

        System.out.println("\n---\n" + "userId: " + userId + ", password: " + password + ", ip: " + clientIp + "\n" + thirdPartyAuthPrimaryCryptoReqDto + "\n" + thirdPartyAuthResDtoThirdPartyBaseResDto + "\n" + thirdPartyAuthResDtoThirdPartyBaseResDto.getData() + "\n---\n");
        return thirdPartyAuthResDtoThirdPartyBaseResDto;
    }
}