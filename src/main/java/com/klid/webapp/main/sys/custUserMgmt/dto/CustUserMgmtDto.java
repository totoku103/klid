package com.klid.webapp.main.sys.custUserMgmt.dto;

public class CustUserMgmtDto {

    private String seq;             //순번
    private String userId;			//아이디
    private String userName;		//이름
    private String moblPhnNo;		//전화번호
    private String offcTelno;		//사무실 전화번호
    private int instCd;		    //기관코드
    private String  instNm;
    private String  localNm;
    private int localCd;
    private String authSub;

    public String getSeq() {
        return seq;
    }

    public void setSeq(String seq) {
        this.seq = seq;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMoblPhnNo() {
        return moblPhnNo;
    }

    public void setMoblPhnNo(String moblPhnNo) {
        this.moblPhnNo = moblPhnNo;
    }

    public int getInstCd() {
        return instCd;
    }

    public void setInstCd(int instCd) {
        this.instCd = instCd;
    }

    public String getOffcTelno() {
        return offcTelno;
    }

    public void setOffcTelno(String offcTelno) {
        this.offcTelno = offcTelno;
    }

    public String getInstNm() {
        return instNm;
    }

    public void setInstNm(String instNm) {
        this.instNm = instNm;
    }

    public String getLocalNm() {
        return localNm;
    }

    public void setLocalNm(String localNm) {
        this.localNm = localNm;
    }

    public int getLocalCd() {
        return localCd;
    }

    public void setLocalCd(int localCd) {
        this.localCd = localCd;
    }

    public String getAuthSub() {
        return authSub;
    }

    public void setAuthSub(String authSub) {
        this.authSub = authSub;
    }
}
