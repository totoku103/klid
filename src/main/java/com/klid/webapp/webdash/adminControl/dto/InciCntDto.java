package com.klid.webapp.webdash.adminControl.dto;

import java.io.Serializable;

@SuppressWarnings("serial")
public class InciCntDto implements Serializable {
    private String name;
    private int evtCnt;

    public InciCntDto() {
        super();
    }

    public InciCntDto(String name, int evtCnt) {
        super();
        this.name = name;
        this.evtCnt = evtCnt;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getEvtCnt() {
        return evtCnt;
    }

    public void setEvtCnt(int evtCnt) {
        this.evtCnt = evtCnt;
    }
}
