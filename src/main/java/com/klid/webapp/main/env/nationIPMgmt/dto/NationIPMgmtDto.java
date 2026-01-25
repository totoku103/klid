/**
 * Program Name : NoticeBoardDto.java
 *
 * Version  :  3.0
 *
 * Creation Date : 2015. 12. 22.
 * 
 * Programmer Name  : kim dong ju
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE   : PROGRAMMER : REASON
 */

package com.klid.webapp.main.env.nationIPMgmt.dto;

import com.klid.common.util.ConvertUtil;

public class NationIPMgmtDto {
    private int nationCd; // 번호
    private String nationNm; // 국가명
    private String nationNmCnt; // 국가명+IP개수
    private String domain; // 국가약어
    private String continental; // 대륙명
    private String nationCnt; // 해당국가 등록 IP 개수
    private String regDt; // IP 등록일
    private long sip; // start IP (number)
    private long eip; // end IP (number)
    private String sipStr; // start IP
    private String eipStr; // end IP
	private String krNm; // 한글명
    
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
	public String getNationNmCnt() {
		return nationNmCnt;
	}
	public void setNationNmCnt(String nationNmCnt) {
		this.nationNmCnt = nationNmCnt;
	}
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public String getContinental() {
		return continental;
	}
	public void setContinental(String continental) {
		this.continental = continental;
	}
	public String getNationCnt() {
		return nationCnt;
	}
	public void setNationCnt(String nationCnt) {
		this.nationCnt = nationCnt;
	}
	public String getRegDt() {
		return regDt;
	}
	public void setRegDt(String regDt) {
		this.regDt = regDt;
	}
	public long getSip() {
		return sip;
	}
	public void setSip(long sip) {
		this.sip = sip;
	}
	public long getEip() {
		return eip;
	}
	public void setEip(long eip) {
		this.eip = eip;
	}
	public String getSipStr() {
		return ConvertUtil.longToIPv4(sip);
	}
	public String getEipStr() {
		return ConvertUtil.longToIPv4(eip);
	}
	public String getKrNm() {
		return krNm;
	}
	public void setKrNm(String krNm) {
		this.krNm = krNm;
	}
}
