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

package com.klid.webapp.main.rpt.reportDailyInciState.dto;

public class ReportDailyInciStateDto {
    private String inst_nm; //보고서-일일 보안관제 피해기관명
    private String total_cnt;
    private String end_cnt;
    private String ing_cnt;

    public String getInst_nm() {
        return inst_nm;
    }

    public void setInst_nm(String inst_nm) {
        this.inst_nm = inst_nm;
    }

    public String getTotal_cnt() {
        return total_cnt;
    }

    public void setTotal_cnt(String total_cnt) {
        this.total_cnt = total_cnt;
    }

    public String getEnd_cnt() {
        return end_cnt;
    }

    public void setEnd_cnt(String end_cnt) {
        this.end_cnt = end_cnt;
    }

    public String getIng_cnt() {
        return ing_cnt;
    }

    public void setIng_cnt(String ing_cnt) {
        this.ing_cnt = ing_cnt;
    }

}
