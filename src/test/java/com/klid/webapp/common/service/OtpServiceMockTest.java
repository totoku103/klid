package com.klid.webapp.common.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("local")
class OtpServiceMockTest {

    @Autowired
    private OtpService otpService;

    @Test
    void shouldInjectOtpServiceMock() {
        // local 프로파일에서 OtpServiceMock이 주입되어야 함
        assertTrue(otpService instanceof OtpServiceMock,
            "Expected OtpServiceMock but got: " + otpService.getClass().getSimpleName());
    }

    @Test
    void shouldPassWithMockCode860207() {
        // "860207" 코드로 OTP 검증 통과
        boolean result = otpService.checkOtpCode("860207", "any-secret-key");
        assertTrue(result, "OTP code '860207' should pass in mock");
    }

    @Test
    void shouldFailWithWrongCode() {
        // 다른 코드는 실패해야 함
        boolean result = otpService.checkOtpCode("123456", "any-secret-key");
        assertFalse(result, "OTP code '123456' should fail in mock");
    }

    @Test
    void shouldReturnSecretKeyForCorrectCode() {
        // "860207"로 검증 시 시크릿 키 반환
        String[] keys = {"key1", "key2"};
        String result = otpService.getSecretKeyAndCheckOtpCode(keys, "860207");
        assertNotNull(result, "Should return mock secret key for code '860207'");
    }

    @Test
    void shouldReturnNullForWrongCode() {
        // 잘못된 코드로 검증 시 null 반환
        String[] keys = {"key1", "key2"};
        String result = otpService.getSecretKeyAndCheckOtpCode(keys, "000000");
        assertNull(result, "Should return null for wrong code");
    }
}
