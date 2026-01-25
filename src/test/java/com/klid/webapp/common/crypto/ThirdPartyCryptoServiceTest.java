package com.klid.webapp.common.crypto;

import com.klid.common.SEED_KISA256;
import com.klid.webapp.common.dto.*;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;
import com.klid.webapp.common.service.ThirdPartyCryptoService;
import me.totoku103.crypto.core.utils.ByteUtils;
import org.junit.Test;

import java.util.UUID;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class ThirdPartyCryptoServiceTest {

    final byte[] seedKey = ByteUtils.fromHexString("9b8796492bfb18443c94f3e8fc193da2");
    final byte[] hmacKey = ByteUtils.fromHexString("318d136afe9edd9aa5a3902539480d6f37efa67146ec83c6e146bf99dce78025");

    @Test
    public void test() {
        final String userId = "hamon1";
        final String password = "hamon1@gmail.com";
        final String clientIp = "121.145.67.11";

        final ThirdPartyCryptoService thirdPartyCryptoService = new ThirdPartyCryptoService(seedKey, hmacKey);
        final ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto = thirdPartyCryptoService.encryptThirdPartyAuthPrimaryReqDto(userId, password, ThirdPartySystemTypes.VMS, clientIp);

        assertNotNull(thirdPartyAuthPrimaryCryptoReqDto);
        assertNotNull(thirdPartyAuthPrimaryCryptoReqDto.getUserId());
    }

    @Test
    public void vms_primary_response_decrypt_test() {
        final ThirdPartyAuthPrimaryCryptoResDto cryptoDto = new ThirdPartyAuthPrimaryCryptoResDto();
        cryptoDto.setOtpKey("nwI/s3iEbkEPgEqHeexQLg==");
        cryptoDto.setGpkiKey("ED/4vJP2mo9twfkMvxMfY7veBYmQZs1FeHi98N3Oij8=");
        cryptoDto.setEmail("2Vi+qMIfG9IxyfZFWFI8WgJpJ0NIcyrQM2zxk6g+0Ds=");
        cryptoDto.setIv("rvtW3kpiHuYbmuGMvKdu3g==");
        cryptoDto.setHmac("+tIMJLgvG3pVmJz68X5Sr3EjGSrjyfm5YNhjiIlqvtQ=");

        final ThirdPartyCryptoService thirdPartyCryptoService = new ThirdPartyCryptoService(seedKey, hmacKey);
        final ThirdPartyAuthPrimaryPlainResDto thirdPartyAuthPrimaryPlainResDto = thirdPartyCryptoService.decryptThirdPartyAuthPrimaryResDto(cryptoDto);

        System.out.println(thirdPartyAuthPrimaryPlainResDto);
    }

    @Test
    public void vms_primary_response_decrypt_test_2() {
        final ThirdPartyAuthPrimaryCryptoResDto cryptoDto = new ThirdPartyAuthPrimaryCryptoResDto();
        cryptoDto.setOtpKey("MVFZxjlSDLUzRg1LRWXJpg==");
        cryptoDto.setGpkiKey("MVFZxjlSDLUzRg1LRWXJpg==");
        cryptoDto.setEmail("j9S1FoPpeCFBt4MY6W9/SjREt3TYTVxkOSlRsRZWAWM=");
        cryptoDto.setIv("H8Az1WAIgbiuTA5p3/ASUQ==");
        cryptoDto.setHmac("93RIVrv8p4BLEyVxG6tupVfCis6n7Rn92Aj/0HlvFNY=");

        final ThirdPartyCryptoService thirdPartyCryptoService = new ThirdPartyCryptoService(seedKey, hmacKey);
        final ThirdPartyAuthPrimaryPlainResDto thirdPartyAuthPrimaryPlainResDto = thirdPartyCryptoService.decryptThirdPartyAuthPrimaryResDto(cryptoDto);

        System.out.println(thirdPartyAuthPrimaryPlainResDto);
    }

    @Test
    public void encryptCtrsRedirectCryptoReqDto_test() {
        final String userName = "test";
        final String officeNumber = "be13a8d9555ca59adfae9630bd3943ab";
        final String phoneNumber = "02-3333-3333";
        final ThirdPartySystemTypes systemType = ThirdPartySystemTypes.CTRS;

        final ThirdPartyCryptoService thirdPartyCryptoService = new ThirdPartyCryptoService(seedKey, hmacKey);
        final CtrsRedirectCryptoReqDto result = thirdPartyCryptoService.encryptCtrsRedirectCryptoReqDto(userName, officeNumber, phoneNumber, systemType);

        assertNotNull(result);
        assertNotNull(result.getUserName());
        assertNotNull(result.getOfficeNumber());
        assertNotNull(result.getPhoneNumber());
        assertNotNull(result.getIv());
        assertNotNull(result.getHmac());
        assertEquals(systemType, result.getSystemType());

        System.out.println("=== encryptCtrsRedirectCryptoReqDto Test Result ===");
        System.out.println("Encrypted DTO: " + result.toString());
    }

    @Test
    public void encryptAndDecryptCtrsRedirectCryptoReqDto_test() {
        final String userName = "test";
        final String officeNumber = "be13a8d9555ca59adfae9630bd3943ab";
        final String phoneNumber = "02-3333-3333";
        final ThirdPartySystemTypes systemType = ThirdPartySystemTypes.CTRS;

        final ThirdPartyCryptoService thirdPartyCryptoService = new ThirdPartyCryptoService(seedKey, hmacKey);

        final CtrsRedirectCryptoReqDto encryptedDto = thirdPartyCryptoService.encryptCtrsRedirectCryptoReqDto(userName, officeNumber, phoneNumber, systemType);
        final CtrsRedirectPlainReqDto decryptedDto = thirdPartyCryptoService.decryptCtrsRedirectCryptoReqDto(encryptedDto);

        assertNotNull(encryptedDto);
        assertNotNull(decryptedDto);
        assertEquals(userName, decryptedDto.getUserName());
        assertEquals(officeNumber, decryptedDto.getOfficeNumber());
        assertEquals(phoneNumber, decryptedDto.getPhoneNumber());
        assertEquals(systemType, decryptedDto.getSystemType());

        System.out.println("=== Encrypt/Decrypt Round Trip Test ===");
        System.out.println("Encrypted DTO: " + encryptedDto.toString());
        System.out.println("Decrypted DTO: " + decryptedDto.toString());
    }

    @Test
    public void encryptCtrsRedirectCryptoReqDto_different_system_types_test() {
        final String userName = "test";
        final String officeNumber = "be13a8d9555ca59adfae9630bd3943ab";
        final String phoneNumber = "02-3333-3333";

        final ThirdPartyCryptoService thirdPartyCryptoService = new ThirdPartyCryptoService(seedKey, hmacKey);

        for (ThirdPartySystemTypes systemType : ThirdPartySystemTypes.values()) {
            final CtrsRedirectCryptoReqDto result = thirdPartyCryptoService.encryptCtrsRedirectCryptoReqDto(userName, officeNumber, phoneNumber, systemType);

            assertNotNull(result);
            assertEquals(systemType, result.getSystemType());

            System.out.println("SystemType: " + systemType + " -> " + result.toString());
        }
    }

    @Test
    public void encryptNormal() {
        final String userName = "vvvvvvvvvv";
        final String officeNumber = "";
        final String phoneNumber = "010-1234-1234";
        final ThirdPartySystemTypes systemType = ThirdPartySystemTypes.VMS;
        final String reqUserId = "abiosdjfi@@#@3";
        final String reqUserName = "간다란아라";

        final ThirdPartyOtpInitializePlainResDto thirdPartyOtpInitializePlainResDto = new ThirdPartyOtpInitializePlainResDto();
        thirdPartyOtpInitializePlainResDto.setUserName(userName);
        thirdPartyOtpInitializePlainResDto.setOfficeNumber(officeNumber);
        thirdPartyOtpInitializePlainResDto.setPhoneNumber(phoneNumber);
        thirdPartyOtpInitializePlainResDto.setSystemType(systemType);
        thirdPartyOtpInitializePlainResDto.setReqUserId(reqUserId);
        thirdPartyOtpInitializePlainResDto.setReqUserName(reqUserName);

        final ThirdPartyCryptoService thirdPartyCryptoService = new ThirdPartyCryptoService(seedKey, hmacKey);
        final ThirdPartyOtpInitializeCryptoReqDto thirdPartyOtpInitializeCryptoReqDto = thirdPartyCryptoService.encryptThirdPartyOtpInitializeCryptoReqDto(thirdPartyOtpInitializePlainResDto);

        System.out.println("=== encryptCtrsRedirectCryptoReqDto Test Result ===");
        System.out.println("Encrypted DTO: " + thirdPartyOtpInitializeCryptoReqDto.toString());

        final ThirdPartyOtpInitializePlainResDto thirdPartyOtpInitializePlainResDto1 = thirdPartyCryptoService.decryptThirdPartyOtpInitializeCryptoReqDto(thirdPartyOtpInitializeCryptoReqDto);
        System.out.println("Decrypted DTO: " + thirdPartyOtpInitializePlainResDto1.toString());
    }

    @Test
    public void userInfoDecrypt () {
        final String phoneNumber = "be13a8d9555ca59adfae9630bd3943ab";
        System.out.println(SEED_KISA256.Decrypt(phoneNumber));
    }



}