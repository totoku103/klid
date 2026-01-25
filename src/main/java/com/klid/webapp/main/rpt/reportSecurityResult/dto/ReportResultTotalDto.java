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

public class ReportResultTotalDto {
    private int nisCnt;
    private int cntCnt;
    private int tngCnt;
    private int totCnt;
    private int wormCnt;
    private int webCnt;

    public int getNisCnt() {
        return nisCnt;
    }

    public void setNisCnt(int nisCnt) {
        this.nisCnt = nisCnt;
    }

    public int getCntCnt() {
        return cntCnt;
    }

    public void setCntCnt(int cntCnt) {
        this.cntCnt = cntCnt;
    }

    public int getTngCnt() {
        return tngCnt;
    }

    public void setTngCnt(int tngCnt) {
        this.tngCnt = tngCnt;
    }

    public int getTotCnt() {
        return totCnt;
    }

    public void setTotCnt(int totCnt) {
        this.totCnt = totCnt;
    }

    public int getWormCnt() {
        return wormCnt;
    }

    public void setWormCnt(int wormCnt) {
        this.wormCnt = wormCnt;
    }

    public int getWebCnt() {
        return webCnt;
    }

    public void setWebCnt(int webCnt) {
        this.webCnt = webCnt;
    }
}
