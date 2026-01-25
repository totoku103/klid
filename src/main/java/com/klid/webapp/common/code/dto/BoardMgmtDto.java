package com.klid.webapp.common.code.dto;

import java.io.Serializable;

/**
 * Created by devbong on 2018-07-05.
 */
public class BoardMgmtDto implements Serializable {

    private String menuName;
    private String guid;
    private String fileExt;
    private String fileSize;
    private String label;
    private String value;

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

    public String getFileExt() {
        return fileExt;
    }

    public void setFileExt(String fileExt) {
        this.fileExt = fileExt;
    }

    public String getFileSize() {
        return fileSize;
    }

    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
