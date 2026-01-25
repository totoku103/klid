package com.klid.webapp.common.menu.dto;

import java.io.Serializable;

public class SimpleMenuDTO implements Serializable {
    private String pageNo;
    private String pageName;
    private String pageGrpNo;
    private String pageGrpName;
    private String menuNo;
    private String menuName;
    private String guid;
    private String menuAuth;

    public String getPageNo() {
        return pageNo;
    }

    public void setPageNo(String pageNo) {
        this.pageNo = pageNo;
    }

    public String getPageName() {
        return pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public String getPageGrpNo() {
        return pageGrpNo;
    }

    public void setPageGrpNo(String pageGrpNo) {
        this.pageGrpNo = pageGrpNo;
    }

    public String getPageGrpName() {
        return pageGrpName;
    }

    public void setPageGrpName(String pageGrpName) {
        this.pageGrpName = pageGrpName;
    }

    public String getMenuNo() {
        return menuNo;
    }

    public void setMenuNo(String menuNo) {
        this.menuNo = menuNo;
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

    public String getMenuAuth() {
        return menuAuth;
    }

    public void setMenuAuth(String menuAuth) {
        this.menuAuth = menuAuth;
    }
}
