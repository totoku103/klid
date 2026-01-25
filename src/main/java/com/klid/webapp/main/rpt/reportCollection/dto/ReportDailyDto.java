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

public class ReportDailyDto {
    private int     seqNo;        //순번
    private String  inciNo;     //사고번호
    private String  dmgInstNm;     //피해기관명
    private String  dclInstNm;     //사고처리기관명
    private String  inciDttNm;     //탐지명
    private String  inciDttNmExclude;     //예외탐지명
    private String  attCodeName;     //사고유형명
    private String  inciAcpnDate;     //접수일자
    private String  inciAcpnTime;     //접수일시
    private String  inciPrcsStatNm;     //처리상태
    private String  inciPrcsStatCodeNm;     //조치결과
    private String  transInciPrcsStatCodeNm; //시도조치결과
    private String  dclCrgr;     //접수자
    private String  nationNm;     //국가이름
    private String  prty;     //우선순위
    private String  sigun;     //시군구
    private int     klid;     //중앙지원센터
    private int     nis;     //국가사이버안전센터
    private int     nirs;     //국가정보자원관리원
    private int     cyber;     //사이버위협분석팀
    private int     total;     //총
    private int     accdTypeCd;     //사고유형코드
    private String termDay; //경과일
    private String termTime; //경과일
    private String attNatnCd; //국가코드
    private String inciAcpnDts;
    private String inciTtlDtt;
    private String inciTtl;
    private String inciAcpnDt;
    private String inciUpdDt;

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

    public String getDclInstNm() {
        return dclInstNm;
    }

    public void setDclInstNm(String dclInstNm) {
        this.dclInstNm = dclInstNm;
    }

    public String getInciDttNm() {
        return inciDttNm;
    }

    public void setInciDttNm(String inciDttNm) {
        this.inciDttNm = inciDttNm;
    }

    public String getAttCodeName() {
        return attCodeName;
    }

    public void setAttCodeName(String attCodeName) {
        this.attCodeName = attCodeName;
    }

    public String getInciAcpnDate() {
        return inciAcpnDate;
    }

    public void setInciAcpnDate(String inciAcpnDate) {
        this.inciAcpnDate = inciAcpnDate;
    }

    public String getInciAcpnTime() {
        return inciAcpnTime;
    }

    public void setInciAcpnTime(String inciAcpnTime) {
        this.inciAcpnTime = inciAcpnTime;
    }

    public String getInciPrcsStatNm() {
        return inciPrcsStatNm;
    }

    public void setInciPrcsStatNm(String inciPrcsStatNm) {
        this.inciPrcsStatNm = inciPrcsStatNm;
    }

    public String getInciPrcsStatCodeNm() {
        return inciPrcsStatCodeNm;
    }

    public void setInciPrcsStatCodeNm(String inciPrcsStatCodeNm) {
        this.inciPrcsStatCodeNm = inciPrcsStatCodeNm;
    }

    public String getDclCrgr() {
        return dclCrgr;
    }

    public void setDclCrgr(String dclCrgr) {
        this.dclCrgr = dclCrgr;
    }

    public String getNationNm() {
        return nationNm;
    }

    public void setNationNm(String nationNm) {
        this.nationNm = nationNm;
    }

    public String getPrty() {
        return prty;
    }

    public void setPrty(String prty) {
        this.prty = prty;
    }

    public String getSigun() {
        return sigun;
    }

    public void setSigun(String sigun) {
        this.sigun = sigun;
    }

    public int getKlid() {
        return klid;
    }

    public void setKlid(int klid) {
        this.klid = klid;
    }

    public int getNis() {
        return nis;
    }

    public void setNis(int nis) {
        this.nis = nis;
    }

    public int getNirs() {
        return nirs;
    }

    public void setNirs(int nirs) {
        this.nirs = nirs;
    }

    public int getCyber() {
        return cyber;
    }

    public void setCyber(int cyber) {
        this.cyber = cyber;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getAccdTypeCd() { return accdTypeCd;}

    public void setAccdTypeCd(int accdTypeCd) { this.accdTypeCd = accdTypeCd; }

    public String getInciDttNmExclude() {
        return inciDttNmExclude;
    }

    public void setInciDttNmExclude(String inciDttNmExclude) {
        this.inciDttNmExclude = inciDttNmExclude;
    }

    public String getTermDay() {
        return termDay;
    }

    public void setTermDay(String termDay) {
        this.termDay = termDay;
    }

    public String getAttNatnCd() {
        return attNatnCd;
    }

    public void setAttNatnCd(String attNatnCd) {
        this.attNatnCd = attNatnCd;
    }

    public String getInciAcpnDts() {
        return inciAcpnDts;
    }

    public void setInciAcpnDts(String inciAcpnDts) {
        this.inciAcpnDts = inciAcpnDts;
    }

    public String getInciTtlDtt() {
        return inciTtlDtt;
    }

    public void setInciTtlDtt(String inciTtlDtt) {
        this.inciTtlDtt = inciTtlDtt;
    }

    public String getInciTtl() {
        return inciTtl;
    }

    public void setInciTtl(String inciTtl) {
        this.inciTtl = inciTtl;
    }

    public String getInciAcpnDt() {
        return inciAcpnDt;
    }

    public void setInciAcpnDt(String inciAcpnDt) {
        this.inciAcpnDt = inciAcpnDt;
    }

    public String getInciUpdDt() {
        return inciUpdDt;
    }

    public void setInciUpdDt(String inciUpdDt) {
        this.inciUpdDt = inciUpdDt;
    }

    public String getTransInciPrcsStatCodeNm() {
        return transInciPrcsStatCodeNm;
    }

    public void setTransInciPrcsStatCodeNm(String transInciPrcsStatCodeNm) {
        this.transInciPrcsStatCodeNm = transInciPrcsStatCodeNm;
    }

    public String getTermTime() {
        return termTime;
    }

    public void setTermTime(String termTime) {
        this.termTime = termTime;
    }
}
