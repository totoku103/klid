package com.klid.webapp.main.user.otp.persistence;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OtpMapper {

    String selectOtpSecretKeyByUserNameAndPhoneNumberAndOfficeNumber(@Param("userName") String userName,
                                                                     @Param("phoneNumber") String phoneNumber,
                                                                     @Param("officeNumber") String officeNumber);
}
