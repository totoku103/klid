package com.klid.webapp.common.menu.helper;

public class MenuVO {
    private MenuTypeEnum menuDesc;
    private String menuNm;

    public  MenuVO(String menuNm, MenuTypeEnum menuDesc) {
        this.menuNm = menuNm;
        this.menuDesc = menuDesc;
    }

    public MenuTypeEnum getMenuDesc() {
        return menuDesc;
    }

    public void setMenuDesc(MenuTypeEnum menuDesc) {
        this.menuDesc = menuDesc;
    }

    public String getMenuNm() {
        return menuNm;
    }

    public void setMenuNm(String menuNm) {
        this.menuNm = menuNm;
    }
}
