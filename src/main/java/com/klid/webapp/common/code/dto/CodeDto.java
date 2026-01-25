package com.klid.webapp.common.code.dto;

import java.io.Serializable;

/**
 * Created by devbong on 2018-07-05.
 */
public class CodeDto implements Serializable {
    // 공통으로 사용될 정적변
    private String comCode1  = "";
    private String comCode2  = "";
    private String comCode3  = "";
    private String codeName  = "";
    private int    codeLvl   = 0;
    private String flag1      = "";
    private String flag2      = "";
    private String codeCont  = "";
    private String useYn     = "";
    private String regDt     = "";
    private String trnsDt    = "";
    private int    localCd   = 0;
    private String localNm   = "";
    private int    nationCd  = 0;
    private String nationNm  = "";
    private int    instCd    = 0;
    private String instNm    = "";
    private String agentIp   = "";
    private String agtNm     = "";

    public String getComCode1() {
        return comCode1;
    }

    public void setComCode1(String comCode1) {
        this.comCode1 = comCode1;
    }

    public String getComCode2() {
        return comCode2;
    }

    public void setComCode2(String comCode2) {
        this.comCode2 = comCode2;
    }

    public String getComCode3() {
        return comCode3;
    }

    public void setComCode3(String comCode3) {
        this.comCode3 = comCode3;
    }

    public String getCodeName() {
        return codeName;
    }

    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }

    public int getCodeLvl() {
        return codeLvl;
    }

    public void setCodeLvl(int codeLvl) {
        this.codeLvl = codeLvl;
    }

    public String getFlag1() {
        return flag1;
    }

    public void setFlag1(String flag1) {
        this.flag1 = flag1;
    }

    public String getFlag2() {
        return flag2;
    }

    public void setFlag2(String flag2) {
        this.flag2 = flag2;
    }

    public String getCodeCont() {
        return codeCont;
    }

    public void setCodeCont(String codeCont) {
        this.codeCont = codeCont;
    }

    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }

    public String getRegDt() {
        return regDt;
    }

    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

    public String getTrnsDt() {
        return trnsDt;
    }

    public void setTrnsDt(String trnsDt) {
        this.trnsDt = trnsDt;
    }

    public int getLocalCd() {
        return localCd;
    }

    public void setLocalCd(int localCd) {
        this.localCd = localCd;
    }

    public String getLocalNm() {
        return localNm;
    }

    public void setLocalNm(String localNm) {
        this.localNm = localNm;
    }

    public int getNationCd() {
        return nationCd;
    }

    public void setNationCd(int nationCd) {
        this.nationCd = nationCd;
    }

    public String getNationNm() {
        return nationNm;
    }

    public void setNationNm(String nationNm) {
        this.nationNm = nationNm;
    }

    public int getInstCd() {
        return instCd;
    }

    public void setInstCd(int instCd) {
        this.instCd = instCd;
    }

    public String getInstNm() {
        return instNm;
    }

    public void setInstNm(String instNm) {
        this.instNm = instNm;
    }

    public String getAgentIp() {
        return agentIp;
    }

    public void setAgentIp(String agentIp) {
        this.agentIp = agentIp;
    }

    public String getAgtNm() {
        return agtNm;
    }

    public void setAgtNm(String agtNm) {
        this.agtNm = agtNm;
    }

    @Override
    public String toString() {
        return "CodeDto{" +
                "comCode1='" + comCode1 + '\'' +
                ", comCode2='" + comCode2 + '\'' +
                ", comCode3='" + comCode3 + '\'' +
                ", codeName='" + codeName + '\'' +
                ", codeLvl=" + codeLvl +
                ", flag1='" + flag1 + '\'' +
                ", flag2='" + flag2 + '\'' +
                ", codeCont='" + codeCont + '\'' +
                ", useYn='" + useYn + '\'' +
                ", regDt='" + regDt + '\'' +
                ", trnsDt='" + trnsDt + '\'' +
                ", localCd=" + localCd +
                ", localNm='" + localNm + '\'' +
                ", nationCd=" + nationCd +
                ", nationNm='" + nationNm + '\'' +
                ", instCd=" + instCd +
                ", instNm='" + instNm + '\'' +
                ", agentIp='" + agentIp + '\'' +
                ", agtNm='" + agtNm + '\'' +
                '}';
    }
}
