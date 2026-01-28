package com.klid.webapp.common;

import lombok.extern.slf4j.Slf4j;
import com.klid.webapp.common.dto.*;
import com.klid.webapp.common.properties.ThirdPartyProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Profile;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
@DependsOn(value = {"thirdPartyProperty"})
@Profile("!local")
@Slf4j
public class ThirdPartyRestTemplate {
    private final ThirdPartyProperty thirdPartyProperty;
    private final RestTemplate restTemplate;

    @Autowired
    public ThirdPartyRestTemplate(ThirdPartyProperty thirdPartyProperty, RestTemplate restTemplate) {
        this.thirdPartyProperty = thirdPartyProperty;
        this.restTemplate = restTemplate;
    }

    private HttpHeaders getDefaultHeaders() {
        final HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
        headers.set("API_KEY", this.thirdPartyProperty.getApiKey());
        headers.set("API_SECRET", this.thirdPartyProperty.getApiSecret());

        return headers;
    }

    public void checkVms() {
        requestHealthCheck("VMS", thirdPartyProperty.getVmsUrlRest());
    }

    public void checkCtss() {
        requestHealthCheck("CTSS", thirdPartyProperty.getCtssUrlRest());
    }

    private void requestHealthCheck(String name, String url) {
        log.info(name + " 서버 상태 확인 시도. " + url);
        try {
            final ResponseEntity<Map> exchange = this.restTemplate.exchange(url, HttpMethod.GET, null, Map.class);
            if (exchange.getStatusCode() != HttpStatus.OK) {
                throw new RuntimeException(name + " 서버 통신 실패. HttpStatus: " + exchange.getStatusCode());
            }
            log.info(name + " 서버 상태  확인." + exchange.getBody());
        } catch (Exception e) {
            log.error(name + " 서버 에러: " + e.getMessage());
            throw e;
        }
    }

    public ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> postAuthVms(ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto) {
        final String url = thirdPartyProperty.getVmsUrlRest();
        return postAuth(url, thirdPartyAuthPrimaryCryptoReqDto);
    }

    public ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> postAuthCtss(ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto) {
        final String url = thirdPartyProperty.getCtssUrlRest();
        return postAuth(url, thirdPartyAuthPrimaryCryptoReqDto);
    }

    private ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto> postAuth(String url, ThirdPartyAuthPrimaryCryptoReqDto thirdPartyAuthPrimaryCryptoReqDto) {
        log.info("post url: " + url);
        final ParameterizedTypeReference<ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto>> parameterizedTypeReference = new ParameterizedTypeReference<ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto>>() {
        };
        HttpEntity<ThirdPartyAuthPrimaryCryptoReqDto> request = new HttpEntity<>(thirdPartyAuthPrimaryCryptoReqDto, getDefaultHeaders());
        final ResponseEntity<ThirdPartyBaseResDto<ThirdPartyAuthPrimaryCryptoResDto>> exchange = this.restTemplate.exchange(url, HttpMethod.POST, request, parameterizedTypeReference);
        return exchange.getBody();
    }

    public ThirdPartyBaseResDto<ThirdPartyAuthSecondValueResDto> postSecondValue(ThirdPartyAuthSecondValueCryptReqDto cryptoDto) {
        final String url = thirdPartyProperty.getVmsUrlRest();
        final HttpEntity<ThirdPartyAuthSecondValueCryptReqDto> request = new HttpEntity<>(cryptoDto, getDefaultHeaders());
        final ParameterizedTypeReference<ThirdPartyBaseResDto<ThirdPartyAuthSecondValueResDto>> parameterizedTypeReference = new ParameterizedTypeReference<ThirdPartyBaseResDto<ThirdPartyAuthSecondValueResDto>>() {
        };

        return post(url, request, parameterizedTypeReference);
    }

    public ThirdPartyBaseResDto<ThirdPartyRedirectResDto> postRedirect(ThirdPartyRedirectCryptoReqDto cryptoDto) {
        final String url = thirdPartyProperty.getVmsUrlRest();

        final HttpEntity<ThirdPartyRedirectCryptoReqDto> request = new HttpEntity<>(cryptoDto, getDefaultHeaders());
        final ParameterizedTypeReference<ThirdPartyBaseResDto<ThirdPartyRedirectResDto>> parameterizedTypeReference = new ParameterizedTypeReference<ThirdPartyBaseResDto<ThirdPartyRedirectResDto>>() {
        };

        return post(url, request, parameterizedTypeReference);
    }

    public ThirdPartyBaseResDto<ThirdPartyAuthOtpCheckCryptoResDto> postOtpCheck(ThirdPartyAuthOtpCheckCryptReqDto cryptoDto) {
        final String url = thirdPartyProperty.getVmsUrlRest();

        final HttpEntity<ThirdPartyAuthOtpCheckCryptReqDto> request = new HttpEntity<>(cryptoDto, getDefaultHeaders());
        final ParameterizedTypeReference<ThirdPartyBaseResDto<ThirdPartyAuthOtpCheckCryptoResDto>> parameterizedTypeReference = new ParameterizedTypeReference<ThirdPartyBaseResDto<ThirdPartyAuthOtpCheckCryptoResDto>>() {
        };

        return post(url, request, parameterizedTypeReference);
    }

    public ThirdPartyBaseResDto<ThirdPartyAuthEmailSendCryptResDto> postEmailSend(ThirdPartyAuthEmailSendCryptReqDto cryptoDto) {
        final String url = thirdPartyProperty.getVmsUrlRest();

        final HttpEntity<ThirdPartyAuthEmailSendCryptReqDto> request = new HttpEntity<>(cryptoDto, getDefaultHeaders());
        final ParameterizedTypeReference<ThirdPartyBaseResDto<ThirdPartyAuthEmailSendCryptResDto>> parameterizedTypeReference = new ParameterizedTypeReference<ThirdPartyBaseResDto<ThirdPartyAuthEmailSendCryptResDto>>() {
        };

        return post(url, request, parameterizedTypeReference);
    }

    private <T, R> ThirdPartyBaseResDto<R> post(String url, HttpEntity<T> httpEntity, ParameterizedTypeReference<ThirdPartyBaseResDto<R>> parameterizedTypeReference) {
        log.info(String.format("request url: %s, entity: %s, responseType: %s", url, httpEntity, parameterizedTypeReference.getType()));
        final ResponseEntity<ThirdPartyBaseResDto<R>> exchange;
        try {
            exchange = this.restTemplate.exchange(url, HttpMethod.POST, httpEntity, parameterizedTypeReference);
        } catch (ResourceAccessException e) {
            e.printStackTrace();
            log.error(e.getMessage());
            throw new CustomException("시스템 통신 실패.");
        }
        log.info(String.format("response url: %s, httpStatusCode: %s, domainStatusCode: %d,  message: %s", url, exchange.getStatusCode().toString(), exchange.getBody().getStatus(), exchange.getBody().getMessage()));
        return exchange.getBody();
    }
}
