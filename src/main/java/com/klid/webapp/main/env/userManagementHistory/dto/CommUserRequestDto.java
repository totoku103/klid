package com.klid.webapp.main.env.userManagementHistory.dto;

import com.klid.webapp.common.enums.UserManagementProcessTypes;
import com.klid.webapp.common.enums.UserManagementRequestTypes;
import com.klid.webapp.main.env.userManagement.dto.CommUserRequestUserInfo;

import java.sql.Timestamp;

public class CommUserRequestDto implements CommUserRequestUserInfo {
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
    private Integer loginFailCnt;
    private String passResetYn;
    private String lockYn;
    private String ipAddr;
    private String otpKey;
    private String gpkiSerialNo;
    private String inactiveYn;
    private Integer requestUserSeq;
    private UserManagementRequestTypes requestType;
    private String requestReason;
    private String requestRegDt;
    private String requestInstCd;
    private UserManagementProcessTypes processState;
    private Integer parentSeq;
    private Integer approveUserSeq;
    private String approveReason;
    private String approveRegDt;
    private String approveInstCd;

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(final Integer seq) {
        this.seq = seq;
    }

    public Integer getCommUserSeq() {
        return commUserSeq;
    }

    public void setCommUserSeq(final Integer commUserSeq) {
        this.commUserSeq = commUserSeq;
    }

    public Integer getInstCd() {
        return instCd;
    }

    public void setInstCd(final Integer instCd) {
        this.instCd = instCd;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(final String userName) {
        this.userName = userName;
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(final String userPwd) {
        this.userPwd = userPwd;
    }

    public String getMoblPhnNo() {
        return moblPhnNo;
    }

    public void setMoblPhnNo(final String moblPhnNo) {
        this.moblPhnNo = moblPhnNo;
    }

    public String getOffcTelNo() {
        return offcTelNo;
    }

    public void setOffcTelNo(final String offcTelNo) {
        this.offcTelNo = offcTelNo;
    }

    public String getEmailAddr() {
        return emailAddr;
    }

    public void setEmailAddr(final String emailAddr) {
        this.emailAddr = emailAddr;
    }

    public String getSmsYn() {
        return smsYn;
    }

    public void setSmsYn(final String smsYn) {
        this.smsYn = smsYn;
    }

    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(final String useYn) {
        this.useYn = useYn;
    }

    public String getRegDt() {
        return regDt;
    }

    public void setRegDt(final String regDt) {
        this.regDt = regDt;
    }

    public Timestamp getLastPwdModified() {
        return lastPwdModified;
    }

    public void setLastPwdModified(final Timestamp lastPwdModified) {
        this.lastPwdModified = lastPwdModified;
    }

    public String getAuthMain() {
        return authMain;
    }

    public void setAuthMain(final String authMain) {
        this.authMain = authMain;
    }

    public String getAuthSub() {
        return authSub;
    }

    public void setAuthSub(final String authSub) {
        this.authSub = authSub;
    }

    public Integer getLoginFailCnt() {
        return loginFailCnt;
    }

    public void setLoginFailCnt(final Integer loginFailCnt) {
        this.loginFailCnt = loginFailCnt;
    }

    public String getPassResetYn() {
        return passResetYn;
    }

    public void setPassResetYn(final String passResetYn) {
        this.passResetYn = passResetYn;
    }

    public String getLockYn() {
        return lockYn;
    }

    @Override
    public String getInactiveYn() {
        return inactiveYn;
    }

    public void setInactiveYn(final String inactiveYn) {
        this.inactiveYn = inactiveYn;
    }

    public void setLockYn(final String lockYn) {
        this.lockYn = lockYn;
    }

    public String getIpAddr() {
        return ipAddr;
    }

    public void setIpAddr(final String ipAddr) {
        this.ipAddr = ipAddr;
    }

    public String getOtpKey() {
        return otpKey;
    }

    public void setOtpKey(final String otpKey) {
        this.otpKey = otpKey;
    }

    public String getGpkiSerialNo() {
        return gpkiSerialNo;
    }

    public void setGpkiSerialNo(final String gpkiSerialNo) {
        this.gpkiSerialNo = gpkiSerialNo;
    }

    public Integer getRequestUserSeq() {
        return requestUserSeq;
    }

    public void setRequestUserSeq(final Integer requestUserSeq) {
        this.requestUserSeq = requestUserSeq;
    }

    public UserManagementRequestTypes getRequestType() {
        return requestType;
    }

    public void setRequestType(final UserManagementRequestTypes requestType) {
        this.requestType = requestType;
    }

    public String getRequestReason() {
        return requestReason;
    }

    public void setRequestReason(final String requestReason) {
        this.requestReason = requestReason;
    }

    public String getRequestRegDt() {
        return requestRegDt;
    }

    public void setRequestRegDt(final String requestRegDt) {
        this.requestRegDt = requestRegDt;
    }

    public String getRequestInstCd() {
        return requestInstCd;
    }

    public void setRequestInstCd(final String requestInstCd) {
        this.requestInstCd = requestInstCd;
    }

    public UserManagementProcessTypes getProcessState() {
        return processState;
    }

    public void setProcessState(final UserManagementProcessTypes processState) {
        this.processState = processState;
    }

    public Integer getParentSeq() {
        return parentSeq;
    }

    public void setParentSeq(final Integer parentSeq) {
        this.parentSeq = parentSeq;
    }

    public Integer getApproveUserSeq() {
        return approveUserSeq;
    }

    public void setApproveUserSeq(final Integer approveUserSeq) {
        this.approveUserSeq = approveUserSeq;
    }

    public String getApproveReason() {
        return approveReason;
    }

    public void setApproveReason(final String approveReason) {
        this.approveReason = approveReason;
    }

    public String getApproveRegDt() {
        return approveRegDt;
    }

    public void setApproveRegDt(final String approveRegDt) {
        this.approveRegDt = approveRegDt;
    }

    public String getApproveInstCd() {
        return approveInstCd;
    }

    public void setApproveInstCd(final String approveInstCd) {
        this.approveInstCd = approveInstCd;
    }
}
