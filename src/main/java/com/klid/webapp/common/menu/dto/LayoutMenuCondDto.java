package com.klid.webapp.common.menu.dto;

import java.io.Serializable;

public class LayoutMenuCondDto implements Serializable {
    private String guid;
    private String condType;

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public String getCondType() {
        return condType;
    }

    public void setCondType(String condType) {
        this.condType = condType;
    }
}
