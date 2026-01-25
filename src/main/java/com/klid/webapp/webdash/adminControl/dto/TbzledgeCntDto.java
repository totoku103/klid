package com.klid.webapp.webdash.adminControl.dto;

import java.io.Serializable;

@SuppressWarnings("serial")
public class TbzledgeCntDto implements Serializable {
    private String type;
    private int completeCnt;
    private int processCnt;
    private int totalCnt;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getCompleteCnt() {
        return completeCnt;
    }

    public void setCompleteCnt(int completeCnt) {
        this.completeCnt = completeCnt;
    }

    public int getProcessCnt() {
        return processCnt;
    }

    public void setProcessCnt(int processCnt) {
        this.processCnt = processCnt;
    }

    public int getTotalCnt() {
        return this.completeCnt + this.processCnt;
    }

    public void setTotalCnt(int totalCnt) {
        this.totalCnt = totalCnt;
    }
}
