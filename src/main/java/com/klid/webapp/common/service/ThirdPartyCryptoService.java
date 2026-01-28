package com.klid.webapp.common.service;

import lombok.extern.slf4j.Slf4j;
import com.klid.webapp.common.dto.*;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;
import com.klid.webapp.common.enums.ThirdPartyUserTypes;
import me.totoku103.crypto.core.utils.ByteUtils;
import me.totoku103.crypto.enums.SeedCbcTransformations;
import me.totoku103.crypto.java.hmac.HmacSha256;
import me.totoku103.crypto.java.seed.SeedCbc;
import org.apache.commons.lang3.StringUtils;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

/**
 * VMS, CTSS  시스템과 통신 시 사용하는 암복호화 서비스
 */
@Slf4j
public class ThirdPartyCryptoService {


    private final int SEED_KEY_LENGTH = 16;
    private final int HMAC_KEY_LENGTH = 32;
    private final int INITIALIZE_VECTOR_LENGTH = 16;

    private final byte[] SEED_KEY;
    private final byte[] HMAC_KEY;

    public ThirdPartyCryptoService(final byte[] seedKey, final byte[] hmacKey) {
        log.info("ThirdPartyCryptoService 생성자 시작 - seedKey length: {}, hmacKey length: {}", seedKey.length, hmacKey.length);

        if (seedKey.length != SEED_KEY_LENGTH) {
            log.error("seedKey 길이 오류 - 필요: {}, 실제: {}", SEED_KEY_LENGTH, seedKey.length);
            throw new RuntimeException("seedKey must be 16 bytes");
        }
        if (hmacKey.length != HMAC_KEY_LENGTH) {
            log.error("hmacKey 길이 오류 - 필요: {}, 실제: {}", HMAC_KEY_LENGTH, hmacKey.length);
            throw new RuntimeException("hmacKey must be 32 bytes");
        }

        this.SEED_KEY = seedKey;
        this.HMAC_KEY = hmacKey;
        log.info("ThirdPartyCryptoService 생성자 완료 - 키 초기화 성공");
    }

    public byte[] getSeedKey() {
        return SEED_KEY;
    }

    public byte[] getHmacKey() {
        return HMAC_KEY;
    }

    private SeedCbc getSeedModule() {
        return new SeedCbc(SeedCbcTransformations.SEED_CBC_PKCS7_PADDING);
    }

    private HmacSha256 getHmacModule() {
        return new HmacSha256();
    }

    private byte[] getIv() {
        log.debug("IV 생성 시작 - IV 길이: {}", INITIALIZE_VECTOR_LENGTH);
        final SecureRandom secureRandomIv = new SecureRandom();
        final byte[] ivBytes = new byte[INITIALIZE_VECTOR_LENGTH];
        secureRandomIv.nextBytes(ivBytes);
        log.debug("IV 생성 완료 - hex: {}", ByteUtils.toHexString(ivBytes));
        return ivBytes;
    }

    private String encodeBase64(byte[] value) {
        log.debug("Base64 인코딩 시작 - 입력 바이트 길이: {}", value.length);
        final String base64 = Base64.getEncoder().encodeToString(value);
        if (log.isDebugEnabled()) {
            final String valueHex = ByteUtils.toHexString(value);
            log.debug("Base64 인코딩 완료 - hex: {} -> base64: {}", valueHex, base64);
        }
        return base64;
    }

    private byte[] decodeBase64(String base64Text) {
        log.debug("Base64 디코딩 시작 - 입력 텍스트 길이: [{}]. {}", base64Text.length(), base64Text);
        final byte[] decode = Base64.getDecoder().decode(base64Text.getBytes(StandardCharsets.UTF_8));
        if (log.isDebugEnabled()) {
            log.debug("Base64 디코딩 완료 - base64: {} -> hex: {}", base64Text, ByteUtils.toHexString(decode));
        }
        log.debug("Base64 디코딩 결과 - 출력 바이트 길이: {}", decode.length);
        return decode;
    }

    private String encryptCbcBase64(String msg, byte[] iv) {
        log.debug("CBC 암호화 시작 - 메시지 길이: {}, IV 길이: {}", msg.length(), iv.length);
        final SeedCbc module = getSeedModule();
        final byte[] msgBytes = msg.getBytes(StandardCharsets.UTF_8);
        log.debug("CBC 암호화 - UTF-8 변환된 메시지 바이트 길이: {}", msgBytes.length);

        final byte[] encrypt = module.encrypt(msgBytes, getSeedKey(), iv);
        log.debug("CBC 암호화 완료 - 원본 메시지: [{}], 암호화 결과 hex: {}", msg, ByteUtils.toHexString(encrypt));

        final String base64Result = encodeBase64(encrypt);
        log.debug("CBC 암호화 최종 결과 - base64: {}", base64Result);
        return base64Result;
    }

    private String decryptCbcBase64(String msg, byte[] iv) {
        log.debug("CBC 복호화 시작 - 입력 메시지: {}, IV 길이: {}", msg, iv.length);

        if (StringUtils.isBlank(msg)) {
            log.warn("CBC 복호화 - 입력 메시지가 비어있음");
            return null;
        }

        final byte[] encryptText = decodeBase64(msg);
        log.debug("CBC 복호화 - Base64 디코딩 후 바이트 길이: {}", encryptText.length);

        final SeedCbc module = getSeedModule();
        final byte[] decrypt = module.decrypt(encryptText, getSeedKey(), iv);
        log.debug("CBC 복호화 완료 - 입력 base64: {}, 복호화 결과 hex: {}", msg, ByteUtils.toHexString(decrypt));

        final String result = new String(decrypt, StandardCharsets.UTF_8);
        log.debug("CBC 복호화 최종 결과 - UTF-8 문자열 길이: {}", result.length());
        return result;
    }

    private String toHmacBase64(String message) {
        log.debug("HMAC 생성 시작 - 메시지 길이: {}", message.length());
        final HmacSha256 hmacModule = getHmacModule();
        final byte[] messageBytes = message.getBytes(StandardCharsets.UTF_8);
        log.debug("HMAC 생성 - UTF-8 변환된 메시지 바이트 길이: {}", messageBytes.length);

        final byte[] hmac = hmacModule.toHmac(getHmacKey(), messageBytes);
        log.debug("HMAC 생성 완료 - HMAC 바이트 길이: {}, hex: {}", hmac.length, ByteUtils.toHexString(hmac));

        final String base64Result = encodeBase64(hmac);
        log.debug("HMAC 최종 결과 - base64: {}", base64Result);
        return base64Result;
    }

    private String getRequestPrimaryHmac(ThirdPartyAuthPrimaryCryptoReqDto dto) {
        log.debug("1차 인증 요청 HMAC 생성 시작");
        final String hmacTarget = dto.getIv() + dto.getUserId() + dto.getPassword() + dto.getClientIp();
        log.debug("1차 인증 요청 HMAC 대상 문자열 길이: {}", hmacTarget.length());
        log.debug("1차 인증 요청 HMAC 대상: IV + UserId + Password + ClientIp");

        final String hmacBase64 = toHmacBase64(hmacTarget);
        log.debug("1차 인증 요청 HMAC 생성 완료 - 결과: {}", hmacBase64);
        return hmacBase64;
    }

    private String getRequestEmailSendHmac(ThirdPartyAuthEmailSendCryptReqDto dto) {
        log.debug("이메일 인증 전송 요청 HMAC 생성 시작");
        final String hmacTarget = dto.getIv() + dto.getEmailAddress() + dto.getEmailCode();
        log.debug("이메일 인증 전송 요청 HMAC 대상 문자열 길이: {}", hmacTarget.length());
        log.debug("이메일 인증 전송 요청 HMAC 대상: IV + EmailAddress + EmailCode");
        final String hmacBase64 = toHmacBase64(hmacTarget);
        log.debug("이메일 인증 전송 요청 HMAC 생성 완료 - 결과: {}", hmacBase64);

        return hmacBase64;
    }

    private boolean checkResponsePrimaryHmac(ThirdPartyAuthPrimaryCryptoResDto encryptDto) {
        final String hmacTarget = encryptDto.getIv() +
                encryptDto.getUserName() +
                encryptDto.getOfficeNumber() +
                encryptDto.getPhoneNumber() +
                encryptDto.getOtpKey() +
                encryptDto.getGpkiKey() +
                encryptDto.getEmail();

        final String hmacBase64 = toHmacBase64(hmacTarget);

        final boolean isValid = hmacBase64.equals(encryptDto.getHmac());
        if (!isValid) log.warn("1차 인증 응답 HMAC 검증 실패 - 데이터 무결성 오류 가능성");

        return isValid;
    }

    private boolean checkResponseOtpCheckHmac(ThirdPartyAuthOtpCheckCryptoResDto encryptDto) {
        log.debug("OTP 조회 응답 HMAC 검증 시작");
        final String hmacTarget = encryptDto.getIv() + encryptDto.getUserId() + encryptDto.getOtpSecretKey();
        log.debug("OTP 조회  응답 HMAC 대상 문자열 길이: {}", hmacTarget.length());
        log.debug("OTP 조회  응답 HMAC 대상: IV + otpSecretKey");

        final String hmacBase64 = toHmacBase64(hmacTarget);
        final boolean isValid = hmacBase64.equals(encryptDto.getHmac());

        log.debug("OTP 조회 응답 HMAC 검증 - 응답 HMAC: {}, 계산된 HMAC: {}, 검증 결과: {}",
                encryptDto.getHmac(), hmacBase64, isValid);

        if (!isValid) {
            log.warn("OTP 조회 응답 HMAC 검증 실패 - 데이터 무결성 오류 가능성");
        }

        return isValid;
    }

    private boolean checkResponseRedirectHmac(CtrsRedirectCryptoReqDto encryptDto) {
        log.debug("리다이렉트 응답 HMAC 검증 시작");
        final String hmacTarget = encryptDto.getIv() +
                encryptDto.getUserName() +
                encryptDto.getOfficeNumber() +
                encryptDto.getPhoneNumber() +
                encryptDto.getClientIp();

        final String hmacBase64 = toHmacBase64(hmacTarget);
        final boolean isValid = hmacBase64.equals(encryptDto.getHmac());

        log.debug("리다이렉트 응답 HMAC 검증 - 응답 HMAC: {}, 계산된 HMAC: {}, 검증 결과: {}", encryptDto.getHmac(), hmacBase64, isValid);

        if (!isValid) log.warn("리다이렉트 응답 HMAC 검증 실패 - 데이터 무결성 오류 가능성");
        return isValid;
    }

    public ThirdPartyAuthPrimaryCryptoReqDto encryptThirdPartyAuthPrimaryReqDto(String userId,
                                                                                String password,
                                                                                ThirdPartySystemTypes userType,
                                                                                String clientIp) {
        log.info("제3자 인증 1차 요청 암호화 시작 - 사용자ID: {}, 사용자 타입: {}, 클라이언트IP: {}",
                userId, userType.getValue(), clientIp);

        final byte[] iv = getIv();
        log.debug("1차 인증 요청 - IV 생성 완료");

        final ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto = new ThirdPartyAuthPrimaryCryptoReqDto();

        log.debug("1차 인증 요청 - 사용자ID 암호화 시작");
        thirdPartyAuthPrimaryCryptoReqDto.setUserId(encryptCbcBase64(userId.trim(), iv));

        log.debug("1차 인증 요청 - 패스워드 암호화 시작");
        thirdPartyAuthPrimaryCryptoReqDto.setPassword(encryptCbcBase64(password.trim(), iv));

        log.debug("1차 인증 요청 - 클라이언트IP 암호화 시작");
        thirdPartyAuthPrimaryCryptoReqDto.setClientIp(encryptCbcBase64(clientIp.trim(), iv));

        thirdPartyAuthPrimaryCryptoReqDto.setUserType(userType.getValue());
        thirdPartyAuthPrimaryCryptoReqDto.setIv(encodeBase64(iv));
        log.debug("1차 인증 요청 - 기본 필드 설정 완료");

        final String hmac = getRequestPrimaryHmac(thirdPartyAuthPrimaryCryptoReqDto);
        thirdPartyAuthPrimaryCryptoReqDto.setHmac(hmac);

        log.info("제3자 인증 1차 요청 암호화 완료 - HMAC 생성 완료");
        return thirdPartyAuthPrimaryCryptoReqDto;
    }

    public ThirdPartyAuthPrimaryPlainResDto decryptThirdPartyAuthPrimaryResDto(ThirdPartyAuthPrimaryCryptoResDto encryptDto) {
        log.info("제3자 인증 1차 응답 복호화 시작.encryptDto." + encryptDto);
        if (encryptDto.getHmac() == null) {
            log.error("1차 응답 복호화 실패 - HMAC 값이 null");
            throw new RuntimeException("응답값에 HMAC 값이 Null입니다.");
        }

        if (encryptDto.getIv() == null) {
            log.error("1차 응답 복호화 실패 - IV 값이 null");
            throw new RuntimeException("응답값에 IV 값이 Null입니다.");
        }

        final boolean isMatch = checkResponsePrimaryHmac(encryptDto);
        if (!isMatch) {
            log.error("1차 응답 복호화 실패 - HMAC 검증 불일치");
            throw new RuntimeException("1차 인증 응답 값 Hmac 불일치");
        }
        final byte[] ivByte = decodeBase64(encryptDto.getIv());

        final ThirdPartyAuthPrimaryPlainResDto decryptDto = new ThirdPartyAuthPrimaryPlainResDto();

        decryptDto.setUserName(decryptCbcBase64(encryptDto.getUserName(), ivByte));
        decryptDto.setOfficeNumber(decryptCbcBase64(encryptDto.getOfficeNumber(), ivByte));
        decryptDto.setPhoneNumber(decryptCbcBase64(encryptDto.getPhoneNumber(), ivByte));

        decryptDto.setOtpKey(decryptCbcBase64(encryptDto.getOtpKey(), ivByte));
        decryptDto.setGpkiKey(decryptCbcBase64(encryptDto.getGpkiKey(), ivByte));
        decryptDto.setEmail(decryptCbcBase64(encryptDto.getEmail(), ivByte));

        log.debug("제3자 인증 1차 응답 복호화 종료." + decryptDto);
        return decryptDto;
    }

    private String getRequestSecondValueHmac(ThirdPartyAuthSecondValueCryptReqDto dto) {
        log.debug("2차 인증 값 저장 요청 HMAC 생성 시작");
        final String hmacTarget = dto.getIv() +
                dto.getUserName() +
                dto.getOfficeNumber() +
                dto.getPhoneNumber() +
                dto.getAuthValue();

        final String hmacBase64 = toHmacBase64(hmacTarget);
        log.debug("2차 인증 값 저장 HMAC 생성 완료 - 결과: {}", hmacBase64);
        return hmacBase64;
    }

    private String getRequestRedirectHmac(ThirdPartyRedirectCryptoReqDto dto) {
        final String hmacTarget = dto.getIv() + dto.getUserName() + dto.getOfficeNumber() + dto.getPhoneNumber() + dto.getClientIp();
        log.debug("리다이렉트 요청 HMAC 대상 문자열 길이: {}", hmacTarget.length());

        final String hmacBase64 = toHmacBase64(hmacTarget);
        log.debug("리다이렉트 요청 HMAC 생성 완료 - 결과: {}", hmacBase64);
        return hmacBase64;
    }

    private String getRequestOtpCheckHmac(ThirdPartyAuthOtpCheckCryptReqDto dto) {
        log.debug("OTP 조회 요청 HMAC 생성 시작");
        final String hmacTarget = dto.getIv() + dto.getUserName() + dto.getOfficeNumber() + dto.getPhoneNumber();
        final String hmacBase64 = toHmacBase64(hmacTarget);
        log.debug("OTP 조회 요청 HMAC 생성 완료 - 결과: {}", hmacBase64);
        return hmacBase64;
    }

    public ThirdPartyAuthSecondValueCryptReqDto encryptThirdPartyAuthSecondValueCryptReqDto(ThirdPartyAuthSecondValueCryptReqDto.ApiType apiType,
                                                                                            String userName,
                                                                                            String officeNumber,
                                                                                            String phoneNumber,
                                                                                            ThirdPartyUserTypes userType,
                                                                                            String authValue) {
        log.info("제3자 인증 2차 값 저장 요청 암호화 시작");

        final byte[] iv = getIv();

        final ThirdPartyAuthSecondValueCryptReqDto cryptReqDto = new ThirdPartyAuthSecondValueCryptReqDto();
        cryptReqDto.setApiType(apiType.getValue().toLowerCase());
        cryptReqDto.setUserName(encryptCbcBase64(userName.trim(), iv));

        if (StringUtils.isBlank(officeNumber)) {
            cryptReqDto.setOfficeNumber(encryptCbcBase64(StringUtils.EMPTY, iv));
        } else {
            cryptReqDto.setOfficeNumber(encryptCbcBase64(officeNumber.trim(), iv));
        }

        cryptReqDto.setPhoneNumber(encryptCbcBase64(phoneNumber.trim(), iv));
        cryptReqDto.setUserType(userType.getValue().toLowerCase());
        cryptReqDto.setAuthValue(encryptCbcBase64(authValue.trim(), iv));

        cryptReqDto.setIv(encodeBase64(iv));
        final String hmac = getRequestSecondValueHmac(cryptReqDto);
        cryptReqDto.setHmac(hmac);

        log.info("제3자 인증 2차 값 저장 요청 암호화 완료 - HMAC 생성 완료");
        return cryptReqDto;
    }

    public ThirdPartyAuthEmailSendCryptReqDto encryptThirdPartyAuthEmailSendOnlyCtrsCryptReqDto(String email, String code) {
        log.info("이메일 인증 전송 요청 암호화 시작 - 이메일: {}, 인증코드: {}", email, code);

        final byte[] iv = getIv();
        log.debug("이메일 인증 전송 요청 - IV 생성 완료");

        final ThirdPartyAuthEmailSendCryptReqDto thirdPartyAuthEmailSendCryptReqDto = new ThirdPartyAuthEmailSendCryptReqDto();
        log.debug("이메일 인증 전송 요청 - 이메일 암호화 시작");
        thirdPartyAuthEmailSendCryptReqDto.setEmailAddress(encryptCbcBase64(email.trim(), iv));
        log.debug("이메일 인증 전송 요청 - 인증코드 암호화 시작");
        thirdPartyAuthEmailSendCryptReqDto.setEmailCode(encryptCbcBase64(code.trim(), iv));

        thirdPartyAuthEmailSendCryptReqDto.setIv(encodeBase64(iv));
        final String hmac = getRequestEmailSendHmac(thirdPartyAuthEmailSendCryptReqDto);
        thirdPartyAuthEmailSendCryptReqDto.setHmac(hmac);

        log.info("이메일 인증 전송 요청 암호화 완료 - HMAC 생성 완료");
        return thirdPartyAuthEmailSendCryptReqDto;
    }

    public ThirdPartyAuthOtpCheckCryptReqDto encryptThirdPartyAuthOtpCheckCryptReqDto(final String userName,
                                                                                      final String officeNumber,
                                                                                      final String phoneNumber,
                                                                                      final ThirdPartyUserTypes userType) {
        log.info("OTP CHECK DTO start. {} , {}, {}, {}", userName, officeNumber, phoneNumber, userType);
        final byte[] iv = getIv();

        final ThirdPartyAuthOtpCheckCryptReqDto cryptReqDto = new ThirdPartyAuthOtpCheckCryptReqDto();
        cryptReqDto.setUserName(encryptCbcBase64(userName.trim(), iv));

        if (StringUtils.isBlank(officeNumber)) {
            cryptReqDto.setOfficeNumber(encryptCbcBase64(StringUtils.EMPTY, iv));
        } else {
            cryptReqDto.setOfficeNumber(encryptCbcBase64(officeNumber.trim(), iv));
        }

        cryptReqDto.setPhoneNumber(encryptCbcBase64(phoneNumber.trim(), iv));
        cryptReqDto.setUserType(userType.getValue().toLowerCase());

        cryptReqDto.setIv(encodeBase64(iv));
        cryptReqDto.setHmac(getRequestOtpCheckHmac(cryptReqDto));

        log.info("OTP CHECK DTO end. {} , {}, {}, {}, {}", userName, officeNumber, phoneNumber, userType, cryptReqDto);
        return cryptReqDto;
    }

    public ThirdPartyAuthOtpCheckPlainResDto decryptThirdPartyAuthOtpCheckCryptoResDto(ThirdPartyAuthOtpCheckCryptoResDto encryptDto) {
        if (encryptDto.getHmac() == null) {
            log.error("OTP 조회 응답 복호화 실패 - HMAC 값이 null");
            throw new RuntimeException("응답값 HMAC 값이 Null입니다.");
        }

        if (encryptDto.getIv() == null) {
            log.error("OTP 조회 응답 복호화 실패 - IV 값이 null");
            throw new RuntimeException("응답값 IV 값이 Null입니다.");
        }

        log.debug("OTP 조회 응답 - 필수 필드 검증 완료 (HMAC, IV)");

        final boolean isMatch = checkResponseOtpCheckHmac(encryptDto);
        if (!isMatch) {
            log.error("OTP 조회 응답 복호화 실패 - HMAC 검증 불일치");
            throw new RuntimeException("응답값 Hmac 불일치");
        }
        log.debug("OTP 조회 응답 - HMAC 검증 성공");

        final byte[] ivByte = decodeBase64(encryptDto.getIv());
        log.debug("OTP 조회 응답- IV 디코딩 완료");

        final ThirdPartyAuthOtpCheckPlainResDto plainDto = new ThirdPartyAuthOtpCheckPlainResDto();

        log.debug("OTP 조회 응답 - 사용자ID 복호화 시작");
        plainDto.setUserId(decryptCbcBase64(encryptDto.getUserId(), ivByte));

        log.debug("OTP 조회 응답 - 클라이언트IP 복호화 시작");
        plainDto.setOtpSecretKey(decryptCbcBase64(encryptDto.getOtpSecretKey(), ivByte));

        log.debug("OTP 조회 응답 복호화 완료 - 사용자ID: {}, 클라이언트IP: {}", plainDto.getUserId(), plainDto.getOtpSecretKey());
        return plainDto;
    }

    public ThirdPartyRedirectCryptoReqDto encryptThirdPartyRedirectCryptoReqDto(final String userName,
                                                                                final String officeNumber,
                                                                                final String plainPhoneNumber,
                                                                                final String clientIp,
                                                                                final ThirdPartySystemTypes systemTypes) {
        final byte[] iv = getIv();

        final ThirdPartyRedirectCryptoReqDto reqDto = new ThirdPartyRedirectCryptoReqDto();
        reqDto.setUserName(encryptCbcBase64(userName.trim(), iv));

        if (StringUtils.isBlank(officeNumber)) {
            reqDto.setOfficeNumber(encryptCbcBase64(StringUtils.EMPTY, iv));
        } else {
            reqDto.setOfficeNumber(encryptCbcBase64(officeNumber.trim(), iv));
        }

        reqDto.setPhoneNumber(encryptCbcBase64(plainPhoneNumber.trim(), iv));
        reqDto.setUserType(systemTypes.getValue().toLowerCase());
        reqDto.setClientIp(encryptCbcBase64(clientIp.trim(), iv));
        reqDto.setIv(encodeBase64(iv));

        final String hmac = getRequestRedirectHmac(reqDto);
        reqDto.setHmac(hmac);

        log.info("제3자 시스템 리다이렉트 요청 암호화 완료 - HMAC 생성 완료");
        return reqDto;
    }

    public CtrsRedirectCryptoReqDto encryptCtrsRedirectCryptoReqDto(String userName, String officeNumber, String phoneNumber, ThirdPartySystemTypes systemTypes) {
        final byte[] iv = getIv();
        final CtrsRedirectCryptoReqDto reqDto = new CtrsRedirectCryptoReqDto();
        reqDto.setUserName(encryptCbcBase64(userName.trim(), iv));
        reqDto.setOfficeNumber(encryptCbcBase64(officeNumber.trim(), iv));
        reqDto.setPhoneNumber(encryptCbcBase64(phoneNumber.trim(), iv));
        reqDto.setSystemType(systemTypes);
        reqDto.setIv(encodeBase64(iv));

        final String hmacTarget = reqDto.getIv() + reqDto.getUserName() + reqDto.getOfficeNumber() + reqDto.getPhoneNumber();
        final String hmac = toHmacBase64(hmacTarget);
        reqDto.setHmac(hmac);

        log.info("CTRS 리다이렉트 요청 암호화 완료 - HMAC 생성 완료");
        return reqDto;
    }

    public CtrsRedirectPlainReqDto decryptCtrsRedirectCryptoReqDto(CtrsRedirectCryptoReqDto encryptDto) {
        log.info("CTRS 리다이렉트 요청 복호화 시작 - 시스템타입: {}", encryptDto.getSystemType());

        if (encryptDto.getHmac() == null) {
            log.error("CTRS 리다이렉트 요청 복호화 실패 - HMAC 값이 null");
            throw new RuntimeException("요청값에 HMAC 값이 Null입니다.");
        }

        if (encryptDto.getIv() == null) {
            log.error("CTRS 리다이렉트 요청 복호화 실패 - IV 값이 null");
            throw new RuntimeException("요청값에 IV 값이 Null입니다.");
        }

        final boolean isMatch = checkResponseRedirectHmac(encryptDto);
        if (!isMatch) {
            log.error("CTRS 리다이렉트 요청 복호화 실패 - HMAC 검증 불일치");
            throw new RuntimeException("요청값 Hmac 불일치");
        }

        final byte[] ivByte = decodeBase64(encryptDto.getIv());

        final CtrsRedirectPlainReqDto plainDto = new CtrsRedirectPlainReqDto();
        plainDto.setUserName(decryptCbcBase64(encryptDto.getUserName(), ivByte));
        plainDto.setOfficeNumber(decryptCbcBase64(encryptDto.getOfficeNumber(), ivByte));
        plainDto.setPhoneNumber(decryptCbcBase64(encryptDto.getPhoneNumber(), ivByte));
        plainDto.setClientIp(decryptCbcBase64(encryptDto.getClientIp(), ivByte));
        plainDto.setSystemType(encryptDto.getSystemType());

        log.info("CTRS 리다이렉트 요청 복호화 완료 - {}", plainDto);
        return plainDto;
    }

    public boolean validHmac(ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto) {
        log.debug("1차 인증 요청 HMAC 유효성 검증 시작");
        final String responseMac = thirdPartyAuthPrimaryCryptoReqDto.getHmac();
        final String hmac = getRequestPrimaryHmac(thirdPartyAuthPrimaryCryptoReqDto);

        final boolean isValid = responseMac.equalsIgnoreCase(hmac);
        log.debug("1차 인증 요청 HMAC 검증 - 요청 HMAC: {}, 계산된 HMAC: {}, 검증 결과: {}",
                responseMac, hmac, isValid);

        if (!isValid) {
            log.warn("1차 인증 요청 HMAC 검증 실패 - 데이터 무결성 오류 가능성");
        }

        return isValid;
    }

    public String decrypt(String cryptBase64Text, String ivBase64) {
        log.info("범용 복호화 메서드 시작 - 암호화텍스트 길이: {}, IV 길이: {}", cryptBase64Text.length(), ivBase64.length());

        final byte[] decodeBas64Message = Base64.getDecoder().decode(cryptBase64Text);
        log.debug("범용 복호화 - 암호화 메시지 Base64 디코딩 완료, hex: {}", ByteUtils.toHexString(decodeBas64Message));

        final byte[] decodeBas64Iv = Base64.getDecoder().decode(ivBase64);
        log.debug("범용 복호화 - IV Base64 디코딩 완료, hex: {}", ByteUtils.toHexString(decodeBas64Iv));

        final SeedCbc module = getSeedModule();
        final byte[] decrypt = module.decrypt(decodeBas64Message, getSeedKey(), decodeBas64Iv);
        log.debug("범용 복호화 - SEED CBC 복호화 완료, 결과 바이트 길이: {}", decrypt.length);

        final String result = new String(decrypt, StandardCharsets.UTF_8);
        log.info("범용 복호화 완료 - 결과 문자열 길이: {}", result.length());
        return result;
    }

    private boolean checkResponseOtpInitializeHmac(ThirdPartyOtpInitializeCryptoReqDto encryptDto) {
        log.debug("OTP 초기화 요청 수신." + encryptDto);
        final String hmacTarget = encryptDto.getIv() +
                encryptDto.getUserName() +
                encryptDto.getOfficeNumber() +
                encryptDto.getPhoneNumber() +
                encryptDto.getReqUserId() +
                encryptDto.getReqUserName();

        final String hmacBase64 = toHmacBase64(hmacTarget);
        final boolean isValid = hmacBase64.equals(encryptDto.getHmac());

        log.debug("OTP 초기화  요청 수신 HMAC 검증 - 응답 HMAC: {}, 계산된 HMAC: {}, 검증 결과: {}", encryptDto.getHmac(), hmacBase64, isValid);
        if (!isValid) log.warn("OTP 초기화  요청 수신 HMAC 검증 실패 - 데이터 무결성 오류 가능성");
        return isValid;
    }

    public ThirdPartyOtpInitializeCryptoReqDto encryptThirdPartyOtpInitializeCryptoReqDto(ThirdPartyOtpInitializePlainResDto plainDto) {
        final byte[] iv = getIv();
        final ThirdPartyOtpInitializeCryptoReqDto reqDto = new ThirdPartyOtpInitializeCryptoReqDto();
        reqDto.setUserName(encryptCbcBase64(plainDto.getUserName().trim(), iv));
        reqDto.setOfficeNumber(encryptCbcBase64(plainDto.getOfficeNumber().trim(), iv));
        reqDto.setPhoneNumber(encryptCbcBase64(plainDto.getPhoneNumber().trim(), iv));
        reqDto.setSystemType(plainDto.getSystemType());

        reqDto.setReqUserId(encryptCbcBase64(plainDto.getReqUserId().trim(), iv));
        reqDto.setReqUserName(encryptCbcBase64(plainDto.getReqUserName().trim(), iv));
        reqDto.setIv(encodeBase64(iv));

        final String hmacTarget = reqDto.getIv() + reqDto.getUserName() + reqDto.getOfficeNumber() + reqDto.getPhoneNumber() + reqDto.getReqUserId() + reqDto.getReqUserName();
        final String hmac = toHmacBase64(hmacTarget);
        reqDto.setHmac(hmac);

        log.info("OTP 초기화 요청 암호화 완료 - HMAC 생성 완료");
        return reqDto;
    }

    public ThirdPartyOtpInitializePlainResDto decryptThirdPartyOtpInitializeCryptoReqDto(ThirdPartyOtpInitializeCryptoReqDto encryptDto) {
        log.info("OTP 초기화 요청 복호화 시작 - 시스템타입: {}", encryptDto.getSystemType());

        if (encryptDto.getHmac() == null) {
            log.error("OTP 초기화 요청 복호화 실패 - HMAC 값이 null. " + encryptDto);
            throw new RuntimeException("요청값에 HMAC 값이 Null입니다.");
        }

        if (encryptDto.getIv() == null) {
            log.error("OTP 초기화 요청 복호화 실패 - IV 값이 null" + encryptDto);
            throw new RuntimeException("요청값에 IV 값이 Null입니다.");
        }

        final boolean isMatch = checkResponseOtpInitializeHmac(encryptDto);
        if (!isMatch) {
            log.error("OTP 초기화 요청  복호화 실패 - HMAC 검증 불일치");
            throw new RuntimeException("요청값 Hmac 불일치");
        }

        final byte[] ivByte = decodeBase64(encryptDto.getIv());

        final ThirdPartyOtpInitializePlainResDto plainDto = new ThirdPartyOtpInitializePlainResDto();
        plainDto.setUserName(decryptCbcBase64(encryptDto.getUserName(), ivByte));
        plainDto.setOfficeNumber(decryptCbcBase64(encryptDto.getOfficeNumber(), ivByte));
        plainDto.setPhoneNumber(decryptCbcBase64(encryptDto.getPhoneNumber(), ivByte));
        plainDto.setReqUserId(decryptCbcBase64(encryptDto.getReqUserId(), ivByte));
        plainDto.setReqUserName(decryptCbcBase64(encryptDto.getReqUserName(), ivByte));
        plainDto.setSystemType(encryptDto.getSystemType());

        log.info("OTP 초기화 요청 복호화 완료 - {}", plainDto);
        return plainDto;
    }
}
