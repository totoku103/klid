package com.klid.webapp.main.env.userManagement.dto;

import java.sql.Timestamp;

public class CommUserDto implements CommUserRequestUserInfo {
    private Integer seq;
    private Integer commUserSeq;
    private Integer instCd;
    private String userId;
    private String userName;
    private String userPwd;
    private String moblPhnNo;
    private String offcTelNo;
    private String emailAddr;
    private String smsYn;
    private String useYn;
    private String regDt;
    private Timestamp lastPwdModified;
    private String authMain;
    private String authSub;
    private String ipAddr;
    private String otpKey;
    private String gpkiSerialNo;
    private Integer loginFailCnt;
    private String passResetYn;
    private String lockYn;
    private String inactiveYn;

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(final Integer seq) {
        this.seq = seq;
    }

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
    public Integer getCommUserSeq() {
        return commUserSeq;
    }

    public void setCommUserSeq(final Integer commUserSeq) {
        this.commUserSeq = commUserSeq;
    }

    @Override
    public Integer getInstCd() {
        return instCd;
    }

    public void setInstCd(final Integer instCd) {
        this.instCd = instCd;
    }

    @Override
    public String getUserId() {
        return userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }

    @Override
    public String getUserName() {
        return userName;
    }

    public void setUserName(final String userName) {
        this.userName = userName;
    }

    @Override
    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(final String userPwd) {
        this.userPwd = userPwd;
    }

    @Override
    public String getMoblPhnNo() {
        return moblPhnNo;
    }

    public void setMoblPhnNo(final String moblPhnNo) {
        this.moblPhnNo = moblPhnNo;
    }

    @Override
    public String getOffcTelNo() {
        return offcTelNo;
    }

    public void setOffcTelNo(final String offcTelNo) {
        this.offcTelNo = offcTelNo;
    }

    @Override
    public String getEmailAddr() {
        return emailAddr;
    }

    public void setEmailAddr(final String emailAddr) {
        this.emailAddr = emailAddr;
    }

    @Override
    public String getSmsYn() {
        return smsYn;
    }

    public void setSmsYn(final String smsYn) {
        this.smsYn = smsYn;
    }

    @Override
    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(final String useYn) {
        this.useYn = useYn;
    }

    @Override
    public String getRegDt() {
        return regDt;
    }

    public void setRegDt(final String regDt) {
        this.regDt = regDt;
    }

    @Override
    public Timestamp getLastPwdModified() {
        return lastPwdModified;
    }

    public void setLastPwdModified(final Timestamp lastPwdModified) {
        this.lastPwdModified = lastPwdModified;
    }

    @Override
    public String getAuthMain() {
        return authMain;
    }

    public void setAuthMain(final String authMain) {
        this.authMain = authMain;
    }

    @Override
    public String getAuthSub() {
        return authSub;
    }

    public void setAuthSub(final String authSub) {
        this.authSub = authSub;
    }

    @Override
    public String getIpAddr() {
        return ipAddr;
    }

    public void setIpAddr(final String ipAddr) {
        this.ipAddr = ipAddr;
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
}
