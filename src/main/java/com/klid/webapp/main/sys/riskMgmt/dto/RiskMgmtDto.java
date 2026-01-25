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

package com.klid.webapp.main.sys.riskMgmt.dto;

/**
 * @author imhoojng
 *
 */
public class RiskMgmtDto {
	private int levelCd;
	private String levelNm; 	//위협등급명
	private int basis;			//위협등급값
	private String userId;
	private String regDt;
	private String usrIp;
	
	private int basis1; 		//위협등급 각 항목 값
	private int basis2;
	private int basis3;
	private int basis4;
	private int basis5;
	
	private int logSeq;
	private int step;
	private String contents;
	private String usrId;
	private String usrName;

	private int pastThreat;
	private int nowThreat;
	private int instCd;
	private String modDt;
	private String pastNm;
	private String nowNm;

	private int period1;
	private int period2;
	private int period3;

	private String threatCont;
	
	public int getLogSeq() {
		return logSeq;
	}
	public void setLogSeq(int logSeq) {
		this.logSeq = logSeq;
	}
	public int getStep() {
		return step;
	}
	public void setStep(int step) {
		this.step = step;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public String getUsrId() {
		return usrId;
	}
	public void setUsrId(String usrId) {
		this.usrId = usrId;
	}
	public String getUsrName() {
		return usrName;
	}
	public void setUsrName(String usrName) {
		this.usrName = usrName;
	}
	public int getLevelCd() {
		return levelCd;
	}
	public void setLevelCd(int levelCd) {
		this.levelCd = levelCd;
	}
	public String getLevelNm() {
		return levelNm;
	}
	public void setLevelNm(String levelNm) {
		this.levelNm = levelNm;
	}
	public int getBasis() {
		return basis;
	}
	public void setBasis(int basis) {
		this.basis = basis;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
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
	public int getBasis1() {
		return basis1;
	}
	public void setBasis1(int basis1) {
		this.basis1 = basis1;
	}
	public int getBasis2() {
		return basis2;
	}
	public void setBasis2(int basis2) {
		this.basis2 = basis2;
	}
	public int getBasis3() {
		return basis3;
	}
	public void setBasis3(int basis3) {
		this.basis3 = basis3;
	}
	public int getBasis4() {
		return basis4;
	}
	public void setBasis4(int basis4) {
		this.basis4 = basis4;
	}
	public int getBasis5() {
		return basis5;
	}
	public void setBasis5(int basis5) {
		this.basis5 = basis5;
	}

	public int getPastThreat() {
		return pastThreat;
	}

	public void setPastThreat(int pastThreat) {
		this.pastThreat = pastThreat;
	}

	public int getNowThreat() {
		return nowThreat;
	}

	public void setNowThreat(int nowThreat) {
		this.nowThreat = nowThreat;
	}

	public int getInstCd() {
		return instCd;
	}

	public void setInstCd(int instCd) {
		this.instCd = instCd;
	}

	public String getModDt() {
		return modDt;
	}

	public void setModDt(String modDt) {
		this.modDt = modDt;
	}

	public String getPastNm() {
		return pastNm;
	}

	public void setPastNm(String pastNm) {
		this.pastNm = pastNm;
	}

	public String getNowNm() {
		return nowNm;
	}

	public void setNowNm(String nowNm) {
		this.nowNm = nowNm;
	}

	public int getPeriod1() {
		return period1;
	}

	public void setPeriod1(int period1) {
		this.period1 = period1;
	}

	public int getPeriod2() {
		return period2;
	}

	public void setPeriod2(int period2) {
		this.period2 = period2;
	}

	public int getPeriod3() {
		return period3;
	}

	public void setPeriod3(int period3) {
		this.period3 = period3;
	}

	public String getThreatCont() {
		return threatCont;
	}

	public void setThreatCont(String threatCont) {
		this.threatCont = threatCont;
	}
}
