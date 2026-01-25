package com.klid.webapp.main.env.userManagement.dto;

import java.sql.Timestamp;

public interface CommUserRequestUserInfo {

    Integer getCommUserSeq();

    Integer getInstCd();

    String getUserId();

    String getUserName();

    String getUserPwd();

    String getMoblPhnNo();

    String getOffcTelNo();

    String getEmailAddr();

    String getSmsYn();

    String getUseYn();

    String getRegDt();

    Timestamp getLastPwdModified();

    String getAuthMain();

    String getAuthSub();

    String getIpAddr();

    String getOtpKey();

    String getGpkiSerialNo();

    Integer getLoginFailCnt();

    String getPassResetYn();

    String getLockYn();

    String getInactiveYn();
}
