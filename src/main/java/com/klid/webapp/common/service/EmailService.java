package com.klid.webapp.common.service;

import lombok.extern.slf4j.Slf4j;
import com.klid.common.IntegrationSessionManager;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.ThirdPartyRestTemplate;
import com.klid.webapp.common.dto.ThirdPartyAuthEmailSendCryptReqDto;
import com.klid.webapp.common.dto.ThirdPartyAuthEmailSendCryptResDto;
import com.klid.webapp.common.dto.ThirdPartyBaseResDto;
import com.klid.webapp.common.dto.UserLastActionDto;
import com.klid.webapp.common.enums.ThirdPartyResponseStatusCodes;
import com.klid.webapp.main.rpt.reportCollection.persistence.ReportCollectionMapper;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@Slf4j
public class EmailService {

    private final String USER_LAST_ACTION_EMAIL = "emailSend";
    private final ThirdPartyRestTemplate thirdPartyRestTemplate;
    private final ThirdPartyCryptoService thirdPartyCryptoService;

    public EmailService(final ThirdPartyRestTemplate thirdPartyRestTemplate,
                        final ThirdPartyCryptoService thirdPartyCryptoService) {
        this.thirdPartyRestTemplate = thirdPartyRestTemplate;
        this.thirdPartyCryptoService = thirdPartyCryptoService;
    }

    public void setUserLastAction() {
        IntegrationSessionManager.setUserLastAction(new UserLastActionDto(USER_LAST_ACTION_EMAIL));
    }

    public ThirdPartyBaseResDto<ThirdPartyAuthEmailSendCryptResDto> postSendEmail(String emailAddress, String authCode) {
        log.info("이메일 인증 발송 시작. " + emailAddress);
        final ThirdPartyAuthEmailSendCryptReqDto thirdPartyAuthEmailSendCryptReqDto = thirdPartyCryptoService.encryptThirdPartyAuthEmailSendOnlyCtrsCryptReqDto(emailAddress, authCode);
        final ThirdPartyBaseResDto<ThirdPartyAuthEmailSendCryptResDto> response = this.thirdPartyRestTemplate.postEmailSend(thirdPartyAuthEmailSendCryptReqDto);
        if (ThirdPartyResponseStatusCodes.SUCCESS.getCode() == response.getStatus()) {
            log.info("이메일 인증 발송 성공. " + emailAddress);
            return response;
        } else {
            final ThirdPartyResponseStatusCodes thirdPartyResponseStatusCodes = ThirdPartyResponseStatusCodes.fromCode(response.getStatus());
            log.info(String.format("E-MAIL 발송 요청 실패 [%s] %s", thirdPartyResponseStatusCodes.getCode(), thirdPartyResponseStatusCodes.getSystemMessage()));
            throw new CustomException(thirdPartyResponseStatusCodes.getUserMessage());
        }
    }

    public void validateEmailSendTime() {
        final UserLastActionDto userLastAction = IntegrationSessionManager.getUserLastAction();
        if (userLastAction == null) return;

        if (USER_LAST_ACTION_EMAIL.equals(userLastAction.getAction())) {
            final int limitMinute = 5;
            final LocalDateTime actionTime = userLastAction.getActionTime();
            final LocalDateTime limitTime = LocalDateTime.now().minusMinutes(limitMinute);
            if (limitTime.isBefore(actionTime)) {
                final Duration duration = Duration.between(limitTime, actionTime);

                final long minutes = duration.toMinutes();
                final long second = duration.getSeconds() % 60;
                if (minutes == 0) {
                    throw new CustomException("재발송은 " + second + "초 후에 발송할 수 있습니다.");
                } else {
                    throw new CustomException("재발송은 " + minutes + "분 " + second + "초 후에 발송할 수 있습니다.");
                }
            }
        }
    }
}
