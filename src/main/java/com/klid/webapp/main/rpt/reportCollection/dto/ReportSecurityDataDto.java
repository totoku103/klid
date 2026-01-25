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

public class ReportSecurityDataDto {
    private int    seqNo;        //순번
    private String cateName;     //분류
    private String bultnTitle;   //제목
    private String instNm;       //소속
    private String userName;     //게시자
    private String regDate;      //등록일
    private int bultnNo;      //등록일

    public int getSeqNo() {
        return seqNo;
    }

    public void setSeqNo(int seqNo) {
        this.seqNo = seqNo;
    }

    public String getCateName() {
        return cateName;
    }

    public void setCateName(String cateName) {
        this.cateName = cateName;
    }

    public String getBultnTitle() {
        return bultnTitle;
    }

    public void setBultnTitle(String bultnTitle) {
        this.bultnTitle = bultnTitle;
    }

    public String getInstNm() {
        return instNm;
    }

    public void setInstNm(String instNm) {
        this.instNm = instNm;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRegDate() {
        return regDate;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    public int getBultnNo() {
        return bultnNo;
    }

    public void setBultnNo(int bultnNo) {
        this.bultnNo = bultnNo;
    }
}
