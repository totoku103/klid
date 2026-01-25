package com.klid.webapp.main.env.userManagementHistory.dto;

public class HistoryGridPopupResDto {
    private boolean admin = false;
    private String pageUrl;

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(final boolean admin) {
        this.admin = admin;
    }

    public String getPageUrl() {
        return pageUrl;
    }

    public void setPageUrl(final String pageUrl) {
        this.pageUrl = pageUrl;
    }
}
