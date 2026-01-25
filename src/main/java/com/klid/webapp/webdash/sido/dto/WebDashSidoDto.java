package com.klid.webapp.webdash.sido.dto;

public class WebDashSidoDto {
    private String title;		//제목
    private String ymd;			//작성일
    private String instCd;      //기관코드
    private String cnt;         //갯수
    private String instNm;      //기관명
    private String totalCnt;    //총건수
    private String processCnt;  //진행건수
    private String completeCnt;  //완료건수
    private String receiptCnt;   //접수건수
    private String rnum;        //로우번호
    private String dataCnt;      //데이터건수

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getYmd() {
        return ymd;
    }

    public void setYmd(String ymd) {
        this.ymd = ymd;
    }

    public String getInstCd() {
        return instCd;
    }

    public void setInstCd(String instCd) {
        this.instCd = instCd;
    }

    public String getCnt() {
        return cnt;
    }

    public void setCnt(String cnt) {
        this.cnt = cnt;
    }

    public String getInstNm() {
        return instNm;
    }

    public void setInstNm(String instNm) {
        this.instNm = instNm;
    }

    public String getTotalCnt() {
        return totalCnt;
    }

    public void setTotalCnt(String totalCnt) {
        this.totalCnt = totalCnt;
    }

    public String getProcessCnt() {
        return processCnt;
    }

    public void setProcessCnt(String processCnt) {
        this.processCnt = processCnt;
    }

    public String getCompleteCnt() {
        return completeCnt;
    }

    public void setCompleteCnt(String completeCnt) {
        this.completeCnt = completeCnt;
    }

    public String getReceiptCnt() {
        return receiptCnt;
    }

    public void setReceiptCnt(String receiptCnt) {
        this.receiptCnt = receiptCnt;
    }

    public String getRnum() {
        return rnum;
    }

    public void setRnum(String rnum) {
        this.rnum = rnum;
    }

    public String getDataCnt() {
        return dataCnt;
    }

    public void setDataCnt(String dataCnt) {
        this.dataCnt = dataCnt;
    }
}
