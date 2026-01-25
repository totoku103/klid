package com.klid.webapp.webdash.adminControl.dto;

import java.io.Serializable;

@SuppressWarnings("serial")
public class LocalStatusDto implements Serializable {
    private int localCd;
    private String localNm;
    private int forgeryEvt;
    private int hcEvt;

    public int getLocalCd() {
        return localCd;
    }

    public void setLocalCd(int localCd) {
        this.localCd = localCd;
    }

    public String getLocalNm() {
        return localNm;
    }

    public void setLocalNm(String localNm) {
        this.localNm = localNm;
    }

    public int getForgeryEvt() {
        return forgeryEvt;
    }

    public void setForgeryEvt(int forgeryEvt) {
        this.forgeryEvt = forgeryEvt;
    }

    public int getHcEvt() {
        return hcEvt;
    }

    public void setHcEvt(int hcEvt) {
        this.hcEvt = hcEvt;
    }
}
