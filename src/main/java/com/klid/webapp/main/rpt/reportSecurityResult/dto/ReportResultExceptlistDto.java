/**
 * Program Name : NoticeBoardDto.java
 *
 * Version  :  3.0
 *
 * Creation Date : 2015. 12. 22.
 * 
 * Programmer Name  : kim dong ju
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE   : PROGRAMMER : REASON
 */

package com.klid.webapp.main.rpt.reportSecurityResult.dto;

public class ReportResultExceptlistDto {
    private String inciAcpnDt;
    private String inciNo;
    private String instNm;
    private String accTypCdNm;
    private String ipAddr;
    private int    accdTypCd;
    private String accdTypCdNm;

    public String getInciAcpnDt() {
        return inciAcpnDt;
    }

    public void setInciAcpnDt(String inciAcpnDt) {
        this.inciAcpnDt = inciAcpnDt;
    }

    public String getInciNo() {
        return inciNo;
    }

    public void setInciNo(String inciNo) {
        this.inciNo = inciNo;
    }

    public String getInstNm() {
        return instNm;
    }

    public void setInstNm(String instNm) {
        this.instNm = instNm;
    }

    public String getAccTypCdNm() {
        return accTypCdNm;
    }

    public void setAccTypCdNm(String accTypCdNm) {
        this.accTypCdNm = accTypCdNm;
    }

    public String getIpAddr() {
        return ipAddr;
    }

    public void setIpAddr(String ipAddr) {
        this.ipAddr = ipAddr;
    }

    public int getAccdTypCd() {
        return accdTypCd;
    }

    public void setAccdTypCd(int accdTypCd) {
        this.accdTypCd = accdTypCd;
    }

    public String getAccdTypCdNm() {
        return accdTypCdNm;
    }

    public void setAccdTypCdNm(String accdTypCdNm) {
        this.accdTypCdNm = accdTypCdNm;
    }
}
