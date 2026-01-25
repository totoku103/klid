package com.klid.webapp.main.env.userManagement.dto;

import com.klid.common.SEED_KISA256;

import java.sql.Timestamp;

public class CommUserRequestUserInfoDto implements CommUserRequestUserInfo {
    private Integer seq;
    private Integer commUserSeq;
    private String userName;
    private String userId;
    private String useYn;
    private String smsYn;
    private String userPwd;
    private String offcTelNo;
    private String moblPhnNo;
    private String ipAddr;
    private Integer instCd;
    private String regDt;
    private String emailAddr;
    private String authSub;
    private String authMain;
    private Timestamp lastPwdModified;
    private String otpKey = null;
    private String gpkiSerialNo = null;
    private Integer loginFailCnt = 0;
    private String passResetYn = "N";
    private String lockYn = "N";
    private String inactiveYn = "N";

    public String getInactiveYn() {
        return inactiveYn;
    }

    public void setInactiveYn(final String inactiveYn) {
        this.inactiveYn = inactiveYn;
    }


    @Override
    public Integer getLoginFailCnt() {
        return loginFailCnt;
    }

    public void setLoginFailCnt(final Integer loginFailCnt) {
        this.loginFailCnt = loginFailCnt;
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(final Integer seq) {
        this.seq = seq;
    }

    @Override
    public Integer getCommUserSeq() {
        return commUserSeq;
    }

    public void setCommUserSeq(final Integer commUserSeq) {
        this.commUserSeq = commUserSeq;
    }

    @Override
    public String getUserName() {
        return userName;
    }

    public void setUserName(final String userName) {
        this.userName = userName;
    }

    @Override
    public String getUserId() {
        return userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }

    @Override
    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(final String useYn) {
        this.useYn = useYn;
    }

    @Override
    public String getSmsYn() {
        return smsYn;
    }

    public void setSmsYn(final String smsYn) {
        this.smsYn = smsYn;
    }

    @Override
    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(final String userPwd) {
        this.userPwd = userPwd;
    }

    @Override
    public String getOffcTelNo() {
        return offcTelNo;
    }

    @Override
    public String getRegDt() {
        return regDt;
    }

    public void setRegDt(final String regDt) {
        this.regDt = regDt;
    }

    public void setOffcTelNo(final String offcTelNo) {
        this.offcTelNo = offcTelNo;
    }

    @Override
    public String getMoblPhnNo() {
        return moblPhnNo;
    }

    public void setMoblPhnNo(final String moblPhnNo) {
        this.moblPhnNo = moblPhnNo;
    }

    @Override
    public String getIpAddr() {
        return ipAddr;
    }

    public void setIpAddr(final String ipAddr) {
        this.ipAddr = ipAddr;
    }

    @Override
    public Integer getInstCd() {
        return instCd;
    }

    public void setInstCd(final Integer instCd) {
        this.instCd = instCd;
    }

    @Override
    public String getEmailAddr() {
        return emailAddr;
    }

    public void setEmailAddr(final String emailAddr) {
        this.emailAddr = emailAddr;
    }

    @Override
    public String getAuthSub() {
        return authSub;
    }

    public void setAuthSub(final String authSub) {
        this.authSub = authSub;
    }

    @Override
    public String getAuthMain() {
        return authMain;
    }

    public void setAuthMain(final String authMain) {
        this.authMain = authMain;
    }

    @Override
    public Timestamp getLastPwdModified() {
        return lastPwdModified;
    }

    public void setLastPwdModified(final Timestamp lastPwdModified) {
        this.lastPwdModified = lastPwdModified;
    }


    @Override
    public String getPassResetYn() {
        return passResetYn;
    }

    public void setPassResetYn(final String passResetYn) {
        this.passResetYn = passResetYn;
    }

    @Override
    public String getLockYn() {
        return lockYn;
    }

    public void setLockYn(final String lockYn) {
        this.lockYn = lockYn;
    }

    @Override
    public String getOtpKey() {
        return otpKey;
    }

    public void setOtpKey(final String otpKey) {
        this.otpKey = otpKey;
    }

    @Override
    public String getGpkiSerialNo() {
        return gpkiSerialNo;
    }

    public void setGpkiSerialNo(final String gpkiSerialNo) {
        this.gpkiSerialNo = gpkiSerialNo;
    }

    public void encrypt() {
        this.userPwd = SEED_KISA256.Encrypt(this.userPwd);
        this.moblPhnNo = SEED_KISA256.Encrypt(this.moblPhnNo);
        this.emailAddr = SEED_KISA256.Encrypt(this.emailAddr);
    }
}
