package com.klid.webapp.common.menu.dto;

import java.io.Serializable;

public class LayoutMenuDto implements Serializable {
    private String menuName;
    private String guid;
    private String grpType;

    public String getGrpType() {
        return grpType;
    }

    public void setGrpType(String grpType) {
        this.grpType = grpType;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }
}
