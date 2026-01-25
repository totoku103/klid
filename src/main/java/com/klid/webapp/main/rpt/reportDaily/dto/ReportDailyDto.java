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

package com.klid.webapp.main.rpt.reportDaily.dto;

public class ReportDailyDto {
    private int seqNo;

    private String inciNo;
    private String instNm;
    private String inciTtl;
    private String inciDttNm;
    private String inciTtlDtt;
    private String accdTypeCdNm;
    private String dclCrgr;
    private String nationNm;
    private String inciPrcsStatNm;
    private String inciAcpnDt;
    private String inciUpdDt;
    private String inciPrty;

    private String inci_type_nm;
    private int    inci_type_inst1;
    private int    inci_type_inst2;
    private int    inci_type_inst3;
    private int    inci_type_inst4;
    private int    inci_type_inst5;

    private int    total_cnt;
    private int    end_cnt;
    private int     t_end_cnt;
    private int    ing_cnt;
    private int    ncsc_code_cnt;
    private int    ncsc_etc_cnt;

    private int    b_total_cnt;
    private int    b_end_cnt;
    private int    b_ing_cnt;

    private int    sums;

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

    public String getInstNm() {
        return instNm;
    }

    public void setInstNm(String instNm) {
        this.instNm = instNm;
    }

    public String getInciTtl() {
        return inciTtl;
    }

    public void setInciTtl(String inciTtl) {
        this.inciTtl = inciTtl;
    }

    public String getAccdTypeCdNm() {
        return accdTypeCdNm;
    }

    public void setAccdTypeCdNm(String accdTypeCdNm) {
        this.accdTypeCdNm = accdTypeCdNm;
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

    public String getInciPrcsStatNm() {
        return inciPrcsStatNm;
    }

    public void setInciPrcsStatNm(String inciPrcsStatNm) {
        this.inciPrcsStatNm = inciPrcsStatNm;
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

    public String getInciPrty() {
        return inciPrty;
    }

    public void setInciPrty(String inciPrty) {
        this.inciPrty = inciPrty;
    }

    public String getInci_type_nm() {
        return inci_type_nm;
    }

    public void setInci_type_nm(String inci_type_nm) {
        this.inci_type_nm = inci_type_nm;
    }

    public int getInci_type_inst1() {
        return inci_type_inst1;
    }

    public void setInci_type_inst1(int inci_type_inst1) {
        this.inci_type_inst1 = inci_type_inst1;
    }

    public int getInci_type_inst2() {
        return inci_type_inst2;
    }

    public void setInci_type_inst2(int inci_type_inst2) {
        this.inci_type_inst2 = inci_type_inst2;
    }

    public int getInci_type_inst3() {
        return inci_type_inst3;
    }

    public void setInci_type_inst3(int inci_type_inst3) {
        this.inci_type_inst3 = inci_type_inst3;
    }

    public int getInci_type_inst4() {
        return inci_type_inst4;
    }

    public void setInci_type_inst4(int inci_type_inst4) {
        this.inci_type_inst4 = inci_type_inst4;
    }

    public int getTotal_cnt() {
        return total_cnt;
    }

    public void setTotal_cnt(int total_cnt) {
        this.total_cnt = total_cnt;
    }

    public int getEnd_cnt() {
        return end_cnt;
    }

    public void setEnd_cnt(int end_cnt) {
        this.end_cnt = end_cnt;
    }

    public int getIng_cnt() {
        return ing_cnt;
    }

    public void setIng_cnt(int ing_cnt) {
        this.ing_cnt = ing_cnt;
    }

    public String getInciDttNm() {
        return inciDttNm;
    }

    public void setInciDttNm(String inciDttNm) {
        this.inciDttNm = inciDttNm;
    }

    public String getInciTtlDtt() {
        return inciTtlDtt;
    }

    public void setInciTtlDtt(String inciTtlDtt) {
        this.inciTtlDtt = inciTtlDtt;
    }

    public int getSums() {
        return sums;
    }

    public void setSums(int sums) {
        this.sums = sums;
    }

    public int getB_total_cnt() {
        return b_total_cnt;
    }

    public void setB_total_cnt(int b_total_cnt) {
        this.b_total_cnt = b_total_cnt;
    }

    public int getB_end_cnt() {
        return b_end_cnt;
    }

    public void setB_end_cnt(int b_end_cnt) {
        this.b_end_cnt = b_end_cnt;
    }

    public int getB_ing_cnt() {
        return b_ing_cnt;
    }

    public void setB_ing_cnt(int b_ing_cnt) {
        this.b_ing_cnt = b_ing_cnt;
    }

    public int getT_end_cnt() {
        return t_end_cnt;
    }

    public void setT_end_cnt(int t_end_cnt) {
        this.t_end_cnt = t_end_cnt;
    }

    public int getInci_type_inst5() {
        return inci_type_inst5;
    }

    public void setInci_type_inst5(int inci_type_inst5) {
        this.inci_type_inst5 = inci_type_inst5;
    }

    public int getNcsc_code_cnt() {
        return ncsc_code_cnt;
    }

    public void setNcsc_code_cnt(int ncsc_code_cnt) {
        this.ncsc_code_cnt = ncsc_code_cnt;
    }

    public int getNcsc_etc_cnt() {
        return ncsc_etc_cnt;
    }

    public void setNcsc_etc_cnt(int ncsc_etc_cnt) {
        this.ncsc_etc_cnt = ncsc_etc_cnt;
    }
}
