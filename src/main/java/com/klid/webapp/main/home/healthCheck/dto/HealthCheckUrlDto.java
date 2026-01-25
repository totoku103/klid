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

package com.klid.webapp.main.home.healthCheck.dto;

/**
 * @author imhoojng
 *
 */
public class HealthCheckUrlDto {
	private int seqNo;
	
	private String url;		
	
	private int instCd;		
	
	//기관명
	private String instNm;
	
	//기관상세명
	private String instCenterNm;
	
	private String updtime;	
	
	//사용여부 0:미사용, 1:사용
	private int useYn;		
	
	//마지막 응답코드
	private int lastRes;	
	
	//행안부 0:그외 1:행안부
	private int moisYn;
	
	////////////장애이력/////////////

	//응답코드
	private int resCd;
	
	//장애시간
	private String errTime;

	private String resNm;

	//집중감시여부 0 아니오, 1 예
	private int checkYn;

	private int checkSidoYn;

	public int getCheckSidoYn() {
		return checkSidoYn;
	}

	public void setCheckSidoYn(int checkSidoYn) {
		this.checkSidoYn = checkSidoYn;
	}

	private String parentName;

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public void setCheckYn(int checkYn) {
		this.checkYn = checkYn;
	}

	public int getCheckYn() {
		return checkYn;
	}

	public void setResNm(String resNm) {
		this.resNm = resNm;
	}

	public String getResNm() {
		return resNm;
	}

	public int getResCd() {
		return resCd;
	}

	public void setResCd(int resCd) {
		this.resCd = resCd;
	}

	public String getErrTime() {
		return errTime;
	}

	public void setErrTime(String errTime) {
		this.errTime = errTime;
	}

	public String getInstCenterNm() {
		return instCenterNm;
	}

	public void setInstCenterNm(String instCenterNm) {
		this.instCenterNm = instCenterNm;
	}

	public int getSeqNo() {
		return seqNo;
	}

	public void setSeqNo(int seqNo) {
		this.seqNo = seqNo;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
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

	public String getUpdtime() {
		return updtime;
	}

	public void setUpdtime(String updtime) {
		this.updtime = updtime;
	}

	public int getUseYn() {
		return useYn;
	}

	public void setUseYn(int useYn) {
		this.useYn = useYn;
	}

	public int getLastRes() {
		return lastRes;
	}

	public void setLastRes(int lastRes) {
		this.lastRes = lastRes;
	}

	public int getMoisYn() {
		return moisYn;
	}

	public void setMoisYn(int moisYn) {
		this.moisYn = moisYn;
	}
}
