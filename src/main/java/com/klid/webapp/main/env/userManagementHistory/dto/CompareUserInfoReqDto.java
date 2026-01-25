package com.klid.webapp.main.env.userManagementHistory.dto;

public class CompareUserInfoReqDto {
    private Integer commUserSeq;
    private Integer commUserRequestSeq;

    public Integer getCommUserSeq() {
        return commUserSeq;
    }

    public void setCommUserSeq(final Integer commUserSeq) {
        this.commUserSeq = commUserSeq;
    }

    public Integer getCommUserRequestSeq() {
        return commUserRequestSeq;
    }

    public void setCommUserRequestSeq(final Integer commUserRequestSeq) {
        this.commUserRequestSeq = commUserRequestSeq;
    }
}
