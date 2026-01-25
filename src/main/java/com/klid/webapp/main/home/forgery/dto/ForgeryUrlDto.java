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

package com.klid.webapp.main.home.forgery.dto;

/**
 * @author imhoojng
 *
 */
public class ForgeryUrlDto {
	private String forgerySeq; 
	private int instCd; 
	private String instNm;
	private String pLocalNm;
	private int localCd; 
	private int instLevel; 
	private int pntInstCd;
	private String sIp;
	private String dIp; 
	private String sPort;
	private String dPort;
	private int depth; 
	private String excpYn; 
	private String delYn;
	private String checkYn;
	private String wsisIp;
	private String url;
	private String domain;
	private String hmCnt;
	private String foCnt;
	
	private int healthNormalCnt;
	private int healthErrCnt;
	private int urlNormalCnt;
	private int urlErrCnt;
	private int lastRes;

	private String detectTime;
	private String evtName;
	private String depthRes;

	public int getHealthNormalCnt() {
		return healthNormalCnt;
	}

	public void setHealthNormalCnt(int healthNormalCnt) {
		this.healthNormalCnt = healthNormalCnt;
	}

	public int getHealthErrCnt() {
		return healthErrCnt;
	}

	public void setHealthErrCnt(int healthErrCnt) {
		this.healthErrCnt = healthErrCnt;
	}

	public int getUrlNormalCnt() {
		return urlNormalCnt;
	}

	public void setUrlNormalCnt(int urlNormalCnt) {
		this.urlNormalCnt = urlNormalCnt;
	}

	public int getUrlErrCnt() {
		return urlErrCnt;
	}

	public void setUrlErrCnt(int urlErrCnt) {
		this.urlErrCnt = urlErrCnt;
	}

	public String getpLocalNm() {
		return pLocalNm;
	}
	public void setpLocalNm(String pLocalNm) {
		this.pLocalNm = pLocalNm;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public String getWsisIp() {
		return wsisIp;
	}
	public void setWsisIp(String wsisIp) {
		this.wsisIp = wsisIp;
	}
	public String getForgerySeq() {
		return forgerySeq;
	}
	public void setForgerySeq(String forgerySeq) {
		this.forgerySeq = forgerySeq;
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
	public int getLocalCd() {
		return localCd;
	}
	public void setLocalCd(int localCd) {
		this.localCd = localCd;
	}
	public int getInstLevel() {
		return instLevel;
	}
	public void setInstLevel(int instLevel) {
		this.instLevel = instLevel;
	}
	public int getPntInstCd() {
		return pntInstCd;
	}
	public void setPntInstCd(int pntInstCd) {
		this.pntInstCd = pntInstCd;
	}
	public String getsIp() {
		return sIp;
	}
	public void setsIp(String sIp) {
		this.sIp = sIp;
	}
	public String getdIp() {
		return dIp;
	}
	public void setdIp(String dIp) {
		this.dIp = dIp;
	}
	public String getsPort() {
		return sPort;
	}
	public void setsPort(String sPort) {
		this.sPort = sPort;
	}
	public String getdPort() {
		return dPort;
	}
	public void setdPort(String dPort) {
		this.dPort = dPort;
	}
	public int getDepth() {
		return depth;
	}
	public void setDepth(int depth) {
		this.depth = depth;
	}
	public String getExcpYn() {
		return excpYn;
	}
	public void setExcpYn(String excpYn) {
		this.excpYn = excpYn;
	}
	public String getDelYn() {
		return delYn;
	}
	public void setDelYn(String delYn) {
		this.delYn = delYn;
	}

	public String getHmCnt() {
		return hmCnt;
	}

	public void setHmCnt(String hmCnt) {
		this.hmCnt = hmCnt;
	}

	public String getFoCnt() {
		return foCnt;
	}

	public void setFoCnt(String foCnt) {
		this.foCnt = foCnt;
	}

	public int getLastRes() {
		return lastRes;
	}

	public void setLastRes(int lastRes) {
		this.lastRes = lastRes;
	}

	public String getCheckYn() {
		return checkYn;
	}

	public void setCheckYn(String checkYn) {
		this.checkYn = checkYn;
	}

	public String getDetectTime() {
		return detectTime;
	}

	public void setDetectTime(String detectTime) {
		this.detectTime = detectTime;
	}

	public String getEvtName() {
		return evtName;
	}

	public void setEvtName(String evtName) {
		this.evtName = evtName;
	}

	public String getDepthRes() {
		return depthRes;
	}

	public void setDepthRes(String depthRes) {
		this.depthRes = depthRes;
	}
}
