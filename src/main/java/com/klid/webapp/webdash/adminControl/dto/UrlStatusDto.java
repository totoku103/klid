package com.klid.webapp.webdash.adminControl.dto;

import java.io.Serializable;

@SuppressWarnings("serial")
public class UrlStatusDto implements Serializable {
    private int depthCnt;
    private int normalCnt;
    private int forgeryCnt;
    private int errorCnt;

    public int getDepthCnt() {
        return depthCnt;
    }

    public void setDepthCnt(int depthCnt) {
        this.depthCnt = depthCnt;
    }

    public int getNormalCnt() {
        return normalCnt;
    }

    public void setNormalCnt(int normalCnt) {
        this.normalCnt = normalCnt;
    }

    public int getForgeryCnt() {
        return forgeryCnt;
    }

    public void setForgeryCnt(int forgeryCnt) {
        this.forgeryCnt = forgeryCnt;
    }

    public int getErrorCnt() {
        return errorCnt;
    }

    public void setErrorCnt(int errorCnt) {
        this.errorCnt = errorCnt;
    }
}
