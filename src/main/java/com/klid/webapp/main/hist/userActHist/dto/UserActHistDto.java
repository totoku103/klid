/**
 * Program Name : UserInoutHistMgmtDto.java
 *
 * Version  :  1.0
 *
 * Creation Date : 2018. 08. 17
 * 
 * Programmer Name  : devbong
 *
 * Copyright 2018 Hamonsoft. All rights reserved.
 */

package com.klid.webapp.main.hist.userActHist.dto;

public class UserActHistDto {
	//시퀀스
	private int seq;
	//메뉴명
	private String guid;
	//행동타입 C:등록, U:수정, D:삭제
	private String actType;
	//참조되는 테이블
	private String refTable;
	private String regUserId;
	private String regUserName;
	private String regDate;
	private String menuName;
	private String parentMenuName;
	private String instNm;
	private String usrIp;

	public String getUsrIp() {
		return usrIp;
	}

	public void setUsrIp(String usrIp) {
		this.usrIp = usrIp;
	}

	public String getParentMenuName() {
		return parentMenuName;
	}

	public void setParentMenuName(String parentMenuName) {
		this.parentMenuName = parentMenuName;
	}

	public String getInstNm() {
		return instNm;
	}

	public void setInstNm(String instNm) {
		this.instNm = instNm;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getGuid() {
		return guid;
	}
	public void setGuid(String guid) {
		this.guid = guid;
	}
	public String getActType() {
		return actType;
	}
	public void setActType(String actType) {
		this.actType = actType;
	}
	public String getRefTable() {
		return refTable;
	}
	public void setRefTable(String refTable) {
		this.refTable = refTable;
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
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
}
