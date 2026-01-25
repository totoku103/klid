package com.klid.webapp.common.dto;

import java.io.Serializable;

/**
 * Created by devbong on 2018-07-05.
 */
public class PolicyDto implements Serializable {
    private String policyKind;
    private String policyName;
    private String val1;
    private String val2;
    private String valLob1;

    public String getPolicyKind() {
        return policyKind;
    }

    public void setPolicyKind(String policyKind) {
        this.policyKind = policyKind;
    }

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }

    public String getVal1() {
        return val1;
    }

    public void setVal1(String val1) {
        this.val1 = val1;
    }

    public String getVal2() {
        return val2;
    }

    public void setVal2(String val2) {
        this.val2 = val2;
    }

    public String getValLob1() {
        return valLob1;
    }

    public void setValLob1(String valLob1) {
        this.valLob1 = valLob1;
    }

    @Override
    public String toString() {
        return "PolicyDto{" +
                "policyKind='" + policyKind + '\'' +
                ", policyName='" + policyName + '\'' +
                ", val1='" + val1 + '\'' +
                ", val2='" + val2 + '\'' +
                ", valLob1='" + valLob1 + '\'' +
                '}';
    }
}
