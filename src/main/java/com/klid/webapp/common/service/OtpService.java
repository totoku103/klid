package com.klid.webapp.common.service;

import com.klid.webapp.common.dto.ThirdPartyAuthOtpCheckPlainResDto;
import com.klid.webapp.common.enums.ThirdPartyUserTypes;

public interface OtpService {

    String generateSecretKey();

    String generateSecretKeyAndSetSession();

    void validateSession();

    String getOtpSecretKeyFromSession();

    String[] getOtpSecretKeyArrayFromSession();

    boolean checkOtpCode(String userCode, String otpSecretKey);

    String getCtrsOtpSecretKey(String userName, String officeNumber, String plainPhoneNumber);

    String getVmsOtpSecretKey(String userName, String officeNumber, String phoneNumber);

    String getCtssOtpSecretKey(String userName, String officeNumber, String phoneNumber);

    ThirdPartyAuthOtpCheckPlainResDto getOtpSecretKey(String userName, String officeNumber, String phoneNumber, ThirdPartyUserTypes userType);

    void updateOtpSecretKeyAllSystem(String otpSecretKey, String userName, String officeNumber, String plainPhoneNumber);

    boolean hasUsableSecretKey(String ctrs, String vms, String ctss);

    String getSecretKeyAndCheckOtpCode(String[] otpSecretKeys, String otpUserCode);
}
