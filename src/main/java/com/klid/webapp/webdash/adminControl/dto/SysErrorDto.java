package com.klid.webapp.webdash.adminControl.dto;

import java.io.Serializable;

@SuppressWarnings("serial")
public class SysErrorDto implements Serializable {
    private String name;
    private String id;
    private String originNameCnt;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOriginNameCnt() {
        return originNameCnt;
    }

    public void setOriginNameCnt(String originNameCnt) {
        this.originNameCnt = originNameCnt;
    }
}
