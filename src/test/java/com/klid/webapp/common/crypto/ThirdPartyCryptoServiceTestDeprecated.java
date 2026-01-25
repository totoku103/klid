package com.klid.webapp.common.crypto;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.klid.webapp.common.dto.ThirdPartyAuthPrimaryCryptoReqDto;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;
import com.klid.webapp.common.service.ThirdPartyCryptoService;
import me.totoku103.crypto.core.utils.ByteUtils;
import me.totoku103.crypto.enums.SeedCbcTransformations;
import me.totoku103.crypto.java.hmac.HmacSha256;
import me.totoku103.crypto.java.seed.SeedCbc;
import org.junit.Test;

import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Random;
import java.util.stream.Stream;

/*
Junit5 -> Junit4 로 버전 전환으로 코드 변경 예정
 */
@Deprecated
public class ThirdPartyCryptoServiceTestDeprecated {
    private static final String CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final String PASSWORD_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
    private static final Random RANDOM = new SecureRandom();

    // 랜덤 문자열 생성
    private static String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(CHARSET.charAt(RANDOM.nextInt(CHARSET.length())));
        }
        return sb.toString();
    }

    // 랜덤 비밀번호 생성
    private static String generateRandomPassword(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(PASSWORD_CHARS.charAt(RANDOM.nextInt(PASSWORD_CHARS.length())));
        }
        return sb.toString();
    }

    // 랜덤 IPv4 주소 생성
    private static String generateRandomIP() {
        return RANDOM.nextInt(256) + "." +
                RANDOM.nextInt(256) + "." +
                RANDOM.nextInt(256) + "." +
                RANDOM.nextInt(256);
    }

    static class Data {
        String userId;
        String password;
        String clientIp;
    }

    public static Stream<Data> generate() {
        final List<Data> result = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            final Data data = new Data();
            data.userId = generateRandomString(new Random().nextInt(90) + 5);
            data.password = generateRandomPassword(new Random().nextInt(10) + 8);
            data.clientIp = generateRandomIP();
            result.add(data);
        }
        return result.stream();
    }

//    @ParameterizedTest
//    @MethodSource("generate")
    public void makeVectorTestFile(Data data) throws IOException {
        final SecureRandom seedRandomKey = new SecureRandom();
        final byte[] seedKeyBytes = new byte[16];
        seedRandomKey.nextBytes(seedKeyBytes);
        final SecretKeySpec seedKeySpec = new SecretKeySpec(seedKeyBytes, "SEED");

        final SecureRandom hmacRandomKey = new SecureRandom();
        final byte[] hmacKeyBytes = new byte[32];
        hmacRandomKey.nextBytes(hmacKeyBytes);
        final SecretKeySpec hmacKeySpec = new SecretKeySpec(hmacKeyBytes, "HMAC");

        final ThirdPartySystemTypes loginType = new Random().nextInt(2) == 0
                ? ThirdPartySystemTypes.VMS
                : ThirdPartySystemTypes.CTSS;

        final ThirdPartyCryptoService thirdPartyCryptoService = new ThirdPartyCryptoService(seedKeySpec.getEncoded(), hmacKeySpec.getEncoded());
        final ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto = thirdPartyCryptoService.encryptThirdPartyAuthPrimaryReqDto(data.userId, data.password, loginType, data.clientIp);

        final String seedKey = ByteUtils.toHexString(seedKeySpec.getEncoded());
        final String hmacKey = ByteUtils.toHexString(hmacKeySpec.getEncoded());
        final String json = new ObjectMapper().writeValueAsString(thirdPartyAuthPrimaryCryptoReqDto);
        createFileInTarget( "---공유 KEY(HEX)---",
                "SEED_KEY: " + seedKey,
                "HMAC_KEY: " + hmacKey,
                "---참고 데이터(PLAIN)---",
                "USER_ID: " + data.userId,
                "PASSWORD: " + data.password,
                "CLIENT_IP: " + data.clientIp,
                "---REST 전송 데이터 셈플(JSON 구조)---",
                "JSON: " + json);
    }

//    @ParameterizedTest
//    @MethodSource("generate")
    public void valid(Data data) throws IOException {
        final SecureRandom seedRandomKey = new SecureRandom();
        final byte[] seedKeyBytes = new byte[16];
        seedRandomKey.nextBytes(seedKeyBytes);
        final SecretKeySpec seedKeySpec = new SecretKeySpec(seedKeyBytes, "SEED");

        final SecureRandom hmacRandomKey = new SecureRandom();
        final byte[] hmacKeyBytes = new byte[32];
        hmacRandomKey.nextBytes(hmacKeyBytes);
        final SecretKeySpec hmacKeySpec = new SecretKeySpec(hmacKeyBytes, "HMAC");

        final ThirdPartySystemTypes loginType = new Random().nextInt(2) == 0
                ? ThirdPartySystemTypes.VMS
                : ThirdPartySystemTypes.CTSS;

        final ThirdPartyCryptoService thirdPartyCryptoService = new ThirdPartyCryptoService(seedKeySpec.getEncoded(), hmacKeySpec.getEncoded());
        final ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto = thirdPartyCryptoService.encryptThirdPartyAuthPrimaryReqDto(data.userId, data.password, loginType, data.clientIp);

        valid(seedKeySpec.getEncoded(), hmacKeySpec.getEncoded(), data, thirdPartyAuthPrimaryCryptoReqDto);
    }

    private void valid(byte[] seedKey, byte[] hmacKey, Data data, ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto) {
        final ThirdPartyCryptoService thirdPartyCryptoService = new ThirdPartyCryptoService(seedKey, hmacKey);

        final boolean b = thirdPartyCryptoService.validHmac(thirdPartyAuthPrimaryCryptoReqDto);
//        Assertions.assertTrue(b);

        final String decryptUserId = thirdPartyCryptoService.decrypt(thirdPartyAuthPrimaryCryptoReqDto.getUserId(), thirdPartyAuthPrimaryCryptoReqDto.getIv());
        final String decryptPassword = thirdPartyCryptoService.decrypt(thirdPartyAuthPrimaryCryptoReqDto.getPassword(), thirdPartyAuthPrimaryCryptoReqDto.getIv());
        final String decryptClientIp = thirdPartyCryptoService.decrypt(thirdPartyAuthPrimaryCryptoReqDto.getClientIp(), thirdPartyAuthPrimaryCryptoReqDto.getIv());
//
//        Assertions.assertEquals(data.userId, decryptUserId);
//        Assertions.assertEquals(data.password, decryptPassword);
//        Assertions.assertEquals(data.clientIp, decryptClientIp);
    }

    void createFileInTarget(String... messages) throws IOException {
        // 프로젝트 루트 기준으로 target 폴더 지정
        String filePath = "target/test-output.txt";

        File file = new File(filePath);
        // target 폴더가 없을 경우 대비해 부모 디렉토리 생성
        file.getParentFile().mkdirs();

        try (FileWriter writer = new FileWriter(file, true)) {
            for (String message : messages) {
                writer.write(message + "\n");
            }
            writer.write("\n");
        }

        System.out.println("파일 생성 완료: " + file.getAbsolutePath());
    }

    @Test
    public void simpleEncryptDecryptTest() {
        final SecureRandom randomKey = new SecureRandom();
        final byte[] keyBytes = new byte[16];
        randomKey.nextBytes(keyBytes);
        final SecretKeySpec secretKeySpec = new SecretKeySpec(keyBytes, "SEED");

        final SecureRandom randomiv = new SecureRandom();
        final byte[] ivBytes = new byte[16];
        randomiv.nextBytes(ivBytes);
        final IvParameterSpec ivParameterSpec = new IvParameterSpec(ivBytes);

        final String message = "가나다라마바사아자차카타파하";

        final SeedCbc seedCbc1 = new SeedCbc(SeedCbcTransformations.SEED_CBC_PKCS7_PADDING);
        final byte[] encrypt = seedCbc1.encrypt(message.getBytes(StandardCharsets.UTF_8), secretKeySpec.getEncoded(), ivParameterSpec.getIV());


        final SeedCbc seedCbc2 = new SeedCbc(SeedCbcTransformations.SEED_CBC_PKCS7_PADDING);
        final byte[] decrypt = seedCbc2.decrypt(encrypt, secretKeySpec.getEncoded(), ivParameterSpec.getIV());
        final String s = new String(decrypt, StandardCharsets.UTF_8);
        System.out.println(s);
    }

//    @ParameterizedTest
//    @CsvSource(value = {
//            "test,test,0.0.0.0",
//            "admin,admin,1.2.3.4"
//    })
    public void simpleParamTest(String userId, String password, String clientIp) {
        final SecureRandom randomKey = new SecureRandom();
        final byte[] keyBytes = new byte[16];
        randomKey.nextBytes(keyBytes);
        final SecretKeySpec secretKeySpec = new SecretKeySpec(keyBytes, "SEED");

        final SecureRandom randomiv = new SecureRandom();
        final byte[] ivBytes = new byte[16];
        randomiv.nextBytes(ivBytes);
        final IvParameterSpec ivParameterSpec = new IvParameterSpec(ivBytes);


        final SeedCbc encodeCbc = new SeedCbc(SeedCbcTransformations.SEED_CBC_PKCS7_PADDING);
        final byte[] userIdEncrypt = encodeCbc.encrypt(userId.getBytes(StandardCharsets.UTF_8), secretKeySpec.getEncoded(), ivParameterSpec.getIV());
        final byte[] passwordEncrypt = encodeCbc.encrypt(password.getBytes(StandardCharsets.UTF_8), secretKeySpec.getEncoded(), ivParameterSpec.getIV());
        final byte[] clientIpEncrypt = encodeCbc.encrypt(clientIp.getBytes(StandardCharsets.UTF_8), secretKeySpec.getEncoded(), ivParameterSpec.getIV());

        final String userIdBas64 = Base64.getEncoder().encodeToString(userIdEncrypt);
        final String passwordBase64 = Base64.getEncoder().encodeToString(passwordEncrypt);
        final String clientIpBase64 = Base64.getEncoder().encodeToString(clientIpEncrypt);

        final byte[] decodeUserIdBytes = Base64.getDecoder().decode(userIdBas64);
        final byte[] decodePasswordBytes = Base64.getDecoder().decode(passwordBase64);
        final byte[] decodeClientIpBytes = Base64.getDecoder().decode(clientIpBase64);


        final SeedCbc decodeCbc = new SeedCbc(SeedCbcTransformations.SEED_CBC_PKCS7_PADDING);
        final byte[] decryptUserId = decodeCbc.decrypt(decodeUserIdBytes, secretKeySpec.getEncoded(), ivParameterSpec.getIV());
        final byte[] decryptPassword = decodeCbc.decrypt(decodePasswordBytes, secretKeySpec.getEncoded(), ivParameterSpec.getIV());
        final byte[] decryptClientIp = decodeCbc.decrypt(decodeClientIpBytes, secretKeySpec.getEncoded(), ivParameterSpec.getIV());

        final String s = new String(decryptUserId, StandardCharsets.UTF_8);
        final String s1 = new String(decryptPassword, StandardCharsets.UTF_8);
        final String s2 = new String(decryptClientIp, StandardCharsets.UTF_8);

//        Assertions.assertEquals(userId, s);
//        Assertions.assertEquals(password, s1);
//        Assertions.assertEquals(clientIp, s2);
    }


    @Test
    public void novaTest() {
        final String key = "D4EC9108DA6D8AE433DF0449CA0AF272BF20113069AB13859CC3FD6F2784CE02";
        final String msg = "A1BF61B966F0940EDC70AA48FBECEE950C169958B09AF6C42554C4AAC5C0DC8FCFB214026A47622DE71B45A947BC6097FD5F68ECF5D2410CD4B2649B82DE848FE62B718AF05A3C68DD479C13B662909F1A6346933E3A3C843245A5E966C60E2A6C9441FAFF116AE7455B782F51C7C6D6EC8BFBF595BA2F55C6764F3C7961C287";

        final byte[] hmac = new HmacSha256().toHmac(ByteUtils.fromHexString(key), ByteUtils.fromHexString(msg));
        System.out.println(hmac.length);
        System.out.println(ByteUtils.toHexString(hmac));

    }

}