package com.klid.webapp.main.env.userManagementHistory.dto;

public class CompareUserInfoResDto {

    private String key;
    private String oldValue;
    private String newValue;

    public CompareUserInfoResDto(final String key, final String oldValue, final String newValue) {
        this.key = key;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }

    public String getKey() {
        return key;
    }

    public String getOldValue() {
        return oldValue;
    }

    public String getNewValue() {
        return newValue;
    }
}
