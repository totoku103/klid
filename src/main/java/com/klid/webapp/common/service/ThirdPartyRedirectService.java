package com.klid.webapp.common.service;

import lombok.extern.slf4j.Slf4j;
import com.klid.common.SEED_KISA256;
import com.klid.common.util.RedirectTokenUtil;
import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.controller.CtrsRedirectViewController;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.enums.RedirectTokenStatusTypes;
import com.klid.webapp.common.enums.ThirdPartyResponseStatusCodes;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;
import com.klid.webapp.common.login.persistence.LoginMapper;
import com.klid.webapp.common.properties.ThirdPartyProperty;
import com.klid.webapp.main.thirdparty.redirect.dto.SimpleSaveTokenInfoDto;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ThirdPartyRedirectService {


    private final LoginMapper loginMapper;
    private final ThirdPartyProperty thirdPartyProperty;

    public ThirdPartyRedirectService(final LoginMapper loginMapper,
                                     final ThirdPartyProperty thirdPartyProperty) {
        this.loginMapper = loginMapper;
        this.thirdPartyProperty = thirdPartyProperty;
    }

    public UserDto getUserInfo(String id) {
        final HashMap<String, Object> map = new HashMap<>();
        map.put("userId", id);

        final UserDto userDto = loginMapper.selectUserInfo(map);
        log.info("사용자 정보 조회." + userDto);
        return userDto;
    }

    public UserDto getUserInfo(String userName, String officeNumber, String plainPhoneNumber) {
        final String name = userName.trim();
        final String office;
        if (StringUtils.isBlank(officeNumber)) {
            office = StringUtils.EMPTY;
        } else {
            office = officeNumber.trim().replaceAll("\\D", "");
        }

        final String phone = plainPhoneNumber.trim().replaceAll("\\D", "");

        final List<UserDto> userList = loginMapper.selectUserInfoByUserNameAndOfficeNumber(name, office);
        final List<UserDto> correctUserList = userList.stream()
                .filter(d -> !StringUtils.isBlank(d.getMoblPhnNo()))
                .filter(d -> {
                    final String decryptPhoneNumber = SEED_KISA256.Decrypt(d.getMoblPhnNo());
                    if (StringUtils.isBlank(decryptPhoneNumber)) return false;
                    final String plainPN = decryptPhoneNumber.replaceAll("\\D", "");
                    return plainPN.equals(phone);
                })
                .collect(Collectors.toList());

        if (correctUserList.isEmpty()) return null;
        if (correctUserList.size() == 1) return correctUserList.get(0);
        else throw new CustomException(ThirdPartyResponseStatusCodes.DUPLICATED_USER.getUserMessage());
    }

    private String generateToken(String secret, Timestamp expiredTimeSecond) {
        final String token = RedirectTokenUtil.createToken(secret, expiredTimeSecond);
        log.debug("generated token. " + token);
        return token;
    }

    public SimpleSaveTokenInfoDto buildRedirectUrl(String userName,
                                                   String officeNumber,
                                                   String plainPhoneNumber,
                                                   String clientIp,
                                                   ThirdPartySystemTypes systemTypes) throws UnsupportedEncodingException {
        final UserDto userInfo = getUserInfo(userName, officeNumber, plainPhoneNumber);
        final String secretKey = RedirectTokenUtil.getSecretKey(userInfo);
        final Timestamp expiredTime = RedirectTokenUtil.getExpiredTime(60);
        final String token = generateToken(secretKey, expiredTime);

        return get(userInfo.getUserId(), clientIp, systemTypes, token, expiredTime);
    }

    public String getRedirect(String token) throws UnsupportedEncodingException {
        final String ctrsUrlHost = thirdPartyProperty.getCtrsUrlHost() + CtrsRedirectViewController.REDIRECT_URL;
        final String redirectUrl = RedirectTokenUtil.buildRedirectUrl(ctrsUrlHost, token);
        log.info("generated redirect url: " + redirectUrl);
        return redirectUrl;
    }

    public SimpleSaveTokenInfoDto get(String userId,
                                      String clientIp,
                                      ThirdPartySystemTypes systemTypes,
                                      String token,
                                      Timestamp expiredTimeSecond) {
        log.error(String.format("[%s] expiredDate: %s", userId, expiredTimeSecond));

        final SimpleSaveTokenInfoDto dto = new SimpleSaveTokenInfoDto();
        dto.setUserId(userId);
        dto.setClientIp(clientIp);
        dto.setSystemType(systemTypes);
        dto.setToken(token);
        dto.setExpiredAt(expiredTimeSecond);
        dto.setStatus(RedirectTokenStatusTypes.ACTIVE);
        dto.setIsUsed("N");
        return dto;
    }
}
