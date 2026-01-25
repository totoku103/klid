package com.klid.webapp.common.code.dto;

import java.io.Serializable;

/**
 * Created by devbong on 2018-07-05.
 */
public class CustUserDto implements Serializable {

    private int seqNo;
    private String userId;
    private String custNm;
    private String custCellNo;
    private String custMailAddr;
    private String regDt;
    private String modDt;
    private int smsGroupSeq;
    private String smsGroupName;

    public String getSmsGroupName() {
        return smsGroupName;
    }

    public void setSmsGroupName(String smsGroupName) {
        this.smsGroupName = smsGroupName;
    }

    public int getSmsGroupSeq() {
        return smsGroupSeq;
    }

    public void setSmsGroupSeq(int smsGroupSeq) {
        this.smsGroupSeq = smsGroupSeq;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCustNm() {
        return custNm;
    }

    public void setCustNm(String custNm) {
        this.custNm = custNm;
    }

    public String getCustCellNo() {
        return custCellNo;
    }

    public void setCustCellNo(String custCellNo) {
        this.custCellNo = custCellNo;
    }

    public String getCustMailAddr() {
        return custMailAddr;
    }

    public void setCustMailAddr(String custMailAddr) {
        this.custMailAddr = custMailAddr;
    }

    public String getRegDt() {
        return regDt;
    }

    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

    public String getModDt() {
        return modDt;
    }

    public void setModDt(String modDt) {
        this.modDt = modDt;
    }

    public int getSeqNo() {
        return seqNo;
    }

    public void setSeqNo(int seqNo) {
        this.seqNo = seqNo;
    }
}
