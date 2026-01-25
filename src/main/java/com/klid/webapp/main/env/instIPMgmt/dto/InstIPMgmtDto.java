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

package com.klid.webapp.main.env.instIPMgmt.dto;

import com.klid.common.util.ConvertUtil;

public class InstIPMgmtDto {
    private long no; // rownum
    private int seq; // 번호
    private int instCd; // 기관코드
    private String instNm; // 기관명
    private int pntSInstCd;
    private String pntSInstCdNm;
    private String instNmStr; // 그룹-기관명
    private long sip; // start IP (number)
    private long eip; // end IP (number)
    private String sipStr; // start IP
    private String eipStr; // end IP
    private String sipEip; // start-end IP
    private String ipCd; // 망구분
    private String usrId; // 사용자ID
    private String regDt; // 등록일
    private String usrIp; //
	private String ipCont; //기관별IP 설명

	public String getIpCont() {
		return ipCont;
	}

	public void setIpCont(String ipCont) {
		this.ipCont = ipCont;
	}

	public long getNo() {
		return no;
	}
	public void setNo(long no) {
		this.no = no;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
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
	public int getPntSInstCd() {
		return pntSInstCd;
	}
	public void setPntSInstCd(int pntSInstCd) {
		this.pntSInstCd = pntSInstCd;
	}
	public String getPntSInstCdNm() {
		return pntSInstCdNm;
	}
	public void setPntSInstCdNm(String pntSInstCdNm) {
		this.pntSInstCdNm = pntSInstCdNm;
	}
	public String getInstNmStr() {
		return instNmStr;
	}
	public void setInstNmStr(String instNmStr) {
		this.instNmStr = instNmStr;
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
	public String getSipEip() {
		return ConvertUtil.longToIPv4(sip)+" ~ "+ConvertUtil.longToIPv4(eip);
	}
	public String getIpCd() {
		return ipCd;
	}
	public void setIpCd(String ipCd) {
		this.ipCd = ipCd;
	}
	public String getUsrId() {
		return usrId;
	}
	public void setUsrId(String usrId) {
		this.usrId = usrId;
	}
	public String getRegDt() {
		return regDt;
	}
	public void setRegDt(String regDt) {
		this.regDt = regDt;
	}
	public String getUsrIp() {
		return usrIp;
	}
	public void setUsrIp(String usrIp) {
		this.usrIp = usrIp;
	}
    
}
