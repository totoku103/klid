package com.klid.webapp.common.service;

import lombok.extern.slf4j.Slf4j;
import com.klid.common.SEED_KISA256;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.main.user.gpki.persistence.GpkiMapper;
import me.totoku103.crypto.java.sha2.Sha512;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;

@Service
@Transactional
@Slf4j
public class GpkiService {

    private final GpkiMapper gpkiMapper;
    private final SecondVmsService secondVmsService;
    private final ThirdPartyRedirectService thirdPartyRedirectService;

    public GpkiService(final GpkiMapper gpkiMapper,
                       final SecondVmsService secondVmsService,
                       final ThirdPartyRedirectService thirdPartyRedirectService) {
        this.gpkiMapper = gpkiMapper;
        this.secondVmsService = secondVmsService;
        this.thirdPartyRedirectService = thirdPartyRedirectService;
    }

    public String getCtrsGpkiSerialNumber(String userId) {
        final String serialNo = gpkiMapper.selectGpkiSerialNoByUserIdAndIpAddr(userId);
        log.debug("serial no: " + serialNo);
        return serialNo;
    }

    public void editGpkiSerialNo(final String userName, final String officeNumber, final String plainPhoneNumber, final String serialNo) {
        // CTRS는 암호화 후 저장
        // 타 시스템에 넘길땐 각 시스템에서 암호화 처리하기에 plainText로 전달
        final String serialNoEncrypt;
        if (StringUtils.isBlank(serialNo)) {
            serialNoEncrypt = null;
        } else {
            final Sha512 sha512 = new Sha512();
            serialNoEncrypt = sha512.encrypt(serialNo.getBytes(StandardCharsets.UTF_8));
        }
        log.debug("시리언 넘버 암호화 완료." + serialNoEncrypt);
        final UserDto userInfo = thirdPartyRedirectService.getUserInfo(userName, officeNumber, plainPhoneNumber);
        gpkiMapper.updateGpkiSerialNoByUserNameAndOfficeNumberAndPhoneNumber(userName, userInfo.getOffcTelNo(), userInfo.getMoblPhnNo(), serialNoEncrypt);
    }

    public void updateGpkiSerialNumberAllSystem(final String serialNumber,
                                                final String userName,
                                                final String officeNumber,
                                                final String plainPhoneNumber) {
        try {
            // 저장 전 검증 API가 없어, 전 시스템에 브로드케스트처럼 전부 요청하고 응답값은 무시한다.
            // 타 시스템에 넘길땐 각 시스템에서 암호화 처리하기에 plainText로 전달
            secondVmsService.postGpkiSerialNumberReturnBody(serialNumber, userName, officeNumber, plainPhoneNumber);
        } catch (Exception e) {
            log.warn("무시 가능 에러." + e.getMessage());
        }
        // CTRS는 암호화 후 저장
        editGpkiSerialNo(userName, officeNumber, plainPhoneNumber, serialNumber);
    }
}
