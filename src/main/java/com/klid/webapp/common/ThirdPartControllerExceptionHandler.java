package com.klid.webapp.common;

import lombok.extern.slf4j.Slf4j;
import com.klid.webapp.common.controller.CtrsRedirectController;
import com.klid.webapp.common.dto.ThirdPartyBaseResDto;
import com.klid.webapp.common.enums.ThirdPartyResponseStatusCodes;
import org.springframework.core.annotation.Order;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.UnsupportedEncodingException;

@Order(1)
@RestControllerAdvice(assignableTypes = {
        CtrsRedirectController.class,
        ThirdPartyRestTemplate.class
})
@Slf4j
public class ThirdPartControllerExceptionHandler {


    @ExceptionHandler(Exception.class)
    public ThirdPartyBaseResDto<CtrsRedirectController.ResponseDto> exceptionHandler(Exception e) {
        log.error(e.getMessage());
        final ThirdPartyBaseResDto<CtrsRedirectController.ResponseDto> responseDtoThirdPartyBaseResDto = new ThirdPartyBaseResDto<>(ThirdPartyResponseStatusCodes.BAD_REQUEST);
        responseDtoThirdPartyBaseResDto.setDetailMessage(e.getMessage());
        return responseDtoThirdPartyBaseResDto;
    }

    @ExceptionHandler(RuntimeException.class)
    public ThirdPartyBaseResDto<CtrsRedirectController.ResponseDto> exceptionHandler(RuntimeException e) {
        log.error(e.getMessage());
        final ThirdPartyBaseResDto<CtrsRedirectController.ResponseDto> responseDtoThirdPartyBaseResDto = new ThirdPartyBaseResDto<>(ThirdPartyResponseStatusCodes.SERVER_ERROR);
        responseDtoThirdPartyBaseResDto.setDetailMessage(e.getMessage());
        return responseDtoThirdPartyBaseResDto;
    }

    @ExceptionHandler(UnsupportedEncodingException.class)
    public ThirdPartyBaseResDto<CtrsRedirectController.ResponseDto> unsupportedEncodingExceptionHandler(UnsupportedEncodingException e) {
        log.error(e.getMessage());
        return new ThirdPartyBaseResDto<>(ThirdPartyResponseStatusCodes.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ThirdPartyBaseResDto<CtrsRedirectController.ResponseDto> resourceNotFoundExceptionHandler(ResourceNotFoundException e) {
        log.error(e.getMessage());
        return new ThirdPartyBaseResDto<>(ThirdPartyResponseStatusCodes.RESOURCE_NOT_FOUND);
    }

    @ExceptionHandler(UserInfoNotFoundException.class)
    public ThirdPartyBaseResDto<CtrsRedirectController.ResponseDto> userInfoNotFoundExceptionHandler(UserInfoNotFoundException e) {
        log.error(e.getMessage());
        final ThirdPartyBaseResDto<CtrsRedirectController.ResponseDto> resDto = new ThirdPartyBaseResDto<>(ThirdPartyResponseStatusCodes.USER_NOT_FOUND);
        resDto.setDetailMessage(e.getMessage());
        return resDto;
    }

    @ExceptionHandler(UserInfoStatusCheckException.class)
    public ThirdPartyBaseResDto<CtrsRedirectController.ResponseDto> userInfoNotFoundExceptionHandler(UserInfoStatusCheckException e) {
        log.error(e.getMessage());
        final ThirdPartyBaseResDto<CtrsRedirectController.ResponseDto> resDto = new ThirdPartyBaseResDto<>(ThirdPartyResponseStatusCodes.USER_INFO_STATUS_CHECK);
        resDto.setDetailMessage(e.getMessage());
        return resDto;
    }
}
