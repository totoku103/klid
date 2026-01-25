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

package com.klid.webapp.main.rpt.reportCollection.dto;

public class ReportHackingDto {
    private int    seqNo;            //순번
    private String inciNo;           //사고번호
    private String dmgInstNm;        //피해기관명
    private String hackingDt;        //해킹일자
    private String hackingMonth;     //접수월
    private String hackingDay;       //접수날짜
    private String regDt;            //등록일
    private String inciTarget;       //사고대상
    private String ipAddress;        //IP정보
    private String instType;         //사업소구분
    private String domainNm;         //도메인
    private String netDiv;           //망구분
    private String hackingCont;      //내용
    private String attackTypeNm;     //공격유형
    private String remark;           //비고
    private String mediaReport;      //언론보도
    private String inciHistory;      //사고히스토리
    private String analysisHistory;  //분석히스토리
    private String inciPrcsStatNm;   //종결

    public int getSeqNo() {
        return seqNo;
    }

    public void setSeqNo(int seqNo) {
        this.seqNo = seqNo;
    }

    public String getInciNo() {
        return inciNo;
    }

    public void setInciNo(String inciNo) {
        this.inciNo = inciNo;
    }

    public String getDmgInstNm() {
        return dmgInstNm;
    }

    public void setDmgInstNm(String dmgInstNm) {
        this.dmgInstNm = dmgInstNm;
    }

    public String getHackingDt() {
        return hackingDt;
    }

    public void setHackingDt(String hackingDt) {
        this.hackingDt = hackingDt;
    }

    public String getHackingMonth() {
        return hackingMonth;
    }

    public void setHackingMonth(String hackingMonth) {
        this.hackingMonth = hackingMonth;
    }

    public String getHackingDay() {
        return hackingDay;
    }

    public void setHackingDay(String hackingDay) {
        this.hackingDay = hackingDay;
    }

    public String getRegDt() {
        return regDt;
    }

    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

    public String getInciTarget() {
        return inciTarget;
    }

    public void setInciTarget(String inciTarget) {
        this.inciTarget = inciTarget;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getInstType() {
        return instType;
    }

    public void setInstType(String instType) {
        this.instType = instType;
    }

    public String getDomainNm() {
        return domainNm;
    }

    public void setDomainNm(String domainNm) {
        this.domainNm = domainNm;
    }

    public String getNetDiv() {
        return netDiv;
    }

    public void setNetDiv(String netDiv) {
        this.netDiv = netDiv;
    }

    public String getHackingCont() {
        return hackingCont;
    }

    public void setHackingCont(String hackingCont) {
        this.hackingCont = hackingCont;
    }

    public String getAttackTypeNm() {
        return attackTypeNm;
    }

    public void setAttackTypeNm(String attackTypeNm) {
        this.attackTypeNm = attackTypeNm;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getMediaReport() {
        return mediaReport;
    }

    public void setMediaReport(String mediaReport) {
        this.mediaReport = mediaReport;
    }

    public String getInciHistory() {
        return inciHistory;
    }

    public void setInciHistory(String inciHistory) {
        this.inciHistory = inciHistory;
    }

    public String getAnalysisHistory() {
        return analysisHistory;
    }

    public void setAnalysisHistory(String analysisHistory) {
        this.analysisHistory = analysisHistory;
    }

    public String getInciPrcsStatNm() {
        return inciPrcsStatNm;
    }

    public void setInciPrcsStatNm(String inciPrcsStatNm) {
        this.inciPrcsStatNm = inciPrcsStatNm;
    }
}
