/**
 * Program Name : TakeOverBoardDto.java
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

package com.klid.webapp.main.sec.takeOverBoard.dto;

/**
 * @author kdj
 *
 */
public class TakeOverBoardDto {
	private int bultnTakeSeq;			//게시판번호	
	private String bultnTakeTitle;		//제목
	private String bultnTakeCont;		//내용
	private String regDate;			//작성일	
	private String regUserId;
	private String regUserName;
	private String mdfDate;
	private String mdfUserId;
	private String mdfUserName;
	private String alarmDate;
	private String alarmUnit;
	private String alarmWeek;
	private String alarmMonth;
	private String alarmMonthLastYn;
	private String readFlag;			//읽음여부
	private String isClose;		//종결여부
	private String confirmDate;
	private String confirmWeek;
	private String confirmMoneth;
	private String instCd;

	public int getBultnTakeSeq() {
		return bultnTakeSeq;
	}
	public void setBultnTakeSeq(int bultnTakeSeq) {
		this.bultnTakeSeq = bultnTakeSeq;
	}
	public String getBultnTakeTitle() {
		return bultnTakeTitle;
	}
	public void setBultnTakeTitle(String bultnTakeTitle) {
		this.bultnTakeTitle = bultnTakeTitle;
	}
	public String getBultnTakeCont() {
		return bultnTakeCont;
	}
	public void setBultnTakeCont(String bultnTakeCont) {
		this.bultnTakeCont = bultnTakeCont;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public String getRegUserName() {
		return regUserName;
	}
	public void setRegUserName(String regUserName) {
		this.regUserName = regUserName;
	}
	public String getMdfDate() {
		return mdfDate;
	}
	public void setMdfDate(String mdfDate) {
		this.mdfDate = mdfDate;
	}
	public String getMdfUserId() {
		return mdfUserId;
	}
	public void setMdfUserId(String mdfUserId) {
		this.mdfUserId = mdfUserId;
	}
	public String getMdfUserName() {
		return mdfUserName;
	}
	public void setMdfUserName(String mdfUserName) {
		this.mdfUserName = mdfUserName;
	}
	public String getAlarmDate() {
		return alarmDate;
	}
	public void setAlarmDate(String alarmDate) {
		this.alarmDate = alarmDate;
	}
	public String getAlarmUnit() {
		return alarmUnit;
	}
	public void setAlarmUnit(String alarmUnit) {
		this.alarmUnit = alarmUnit;
	}
	public String getAlarmWeek() {
		return alarmWeek;
	}
	public void setAlarmWeek(String alarmWeek) {
		this.alarmWeek = alarmWeek;
	}
	public String getAlarmMonth() {
		return alarmMonth;
	}
	public void setAlarmMonth(String alarmMonth) {
		this.alarmMonth = alarmMonth;
	}
	public String getAlarmMonthLastYn() {
		return alarmMonthLastYn;
	}
	public void setAlarmMonthLastYn(String alarmMonthLastYn) {
		this.alarmMonthLastYn = alarmMonthLastYn;
	}
	public String getReadFlag() {
		return readFlag;
	}
	public void setReadFlag(String readFlag) {
		this.readFlag = readFlag;
	}
	public String getIsClose() {
		return isClose;
	}
	public void setIsClose(String isClose) {
		this.isClose = isClose;
	}
	public String getConfirmDate() {
		return confirmDate;
	}
	public void setConfirmDate(String confirmDate) {
		this.confirmDate = confirmDate;
	}
	public String getConfirmWeek() {
		return confirmWeek;
	}
	public void setConfirmWeek(String confirmWeek) {
		this.confirmWeek = confirmWeek;
	}
	public String getConfirmMoneth() {
		return confirmMoneth;
	}
	public void setConfirmMoneth(String confirmMoneth) {
		this.confirmMoneth = confirmMoneth;
	}

	public String getInstCd() {
		return instCd;
	}

	public void setInstCd(String instCd) {
		this.instCd = instCd;
	}
}
