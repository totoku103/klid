package com.klid.webapp.main.env.userManagementHistory.dto;

public class UserManagementHistoryGridSearchDto {
    private Integer searchInstitutionCode;
    private String searchDateFrom;
    private String searchDateTo;
    private String searchUserName;
    private String searchRequestType;
    private String searchProcessState;

    public Integer getSearchInstitutionCode() {
        return searchInstitutionCode;
    }

    public void setSearchInstitutionCode(final Integer searchInstitutionCode) {
        this.searchInstitutionCode = searchInstitutionCode;
    }

    public String getSearchDateFrom() {
        return searchDateFrom;
    }

    public void setSearchDateFrom(final String searchDateFrom) {
        this.searchDateFrom = searchDateFrom;
    }

    public String getSearchDateTo() {
        return searchDateTo;
    }

    public void setSearchDateTo(final String searchDateTo) {
        this.searchDateTo = searchDateTo;
    }

    public String getSearchUserName() {
        return searchUserName;
    }

    public void setSearchUserName(final String searchUserName) {
        this.searchUserName = searchUserName;
    }

    public String getSearchRequestType() {
        return searchRequestType;
    }

    public void setSearchRequestType(final String searchRequestType) {
        this.searchRequestType = searchRequestType;
    }

    public String getSearchProcessState() {
        return searchProcessState;
    }

    public void setSearchProcessState(final String searchProcessState) {
        this.searchProcessState = searchProcessState;
    }
}
