package com.klid.webapp.webdash.adminControl.dto;

import java.io.Serializable;

@SuppressWarnings("serial")
public class IncidentDto implements Serializable {
    private int receiptCnt;
    private int processCnt;
    private int completeCnt;

    public int getReceiptCnt() {
        return receiptCnt;
    }

    public void setReceiptCnt(int receiptCnt) {
        this.receiptCnt = receiptCnt;
    }

    public int getProcessCnt() {
        return processCnt;
    }

    public void setProcessCnt(int processCnt) {
        this.processCnt = processCnt;
    }

    public int getCompleteCnt() {
        return completeCnt;
    }

    public void setCompleteCnt(int completeCnt) {
        this.completeCnt = completeCnt;
    }
}
