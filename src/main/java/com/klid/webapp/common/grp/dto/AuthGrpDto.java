/**
 * Program Name	: AuthGrpDto.java
 *
 * Version		:  3.0
 *
 * Creation Date	: 2015. 8. 28.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.grp.dto;

import java.io.Serializable;

/**
 * @author jjung
 *
 */
@SuppressWarnings("serial")
public class AuthGrpDto implements Serializable {
	private long grpNo;
	private String grpName;
	private String authMain;
	
	public String getAuthMain() {
		return authMain;
	}
	public void setAuthMain(String authMain) {
		this.authMain = authMain;
	}
	public long getGrpNo() {
		return grpNo;
	}
	public void setGrpNo(long grpNo) {
		this.grpNo = grpNo;
	}
	public String getGrpName() {
		return grpName;
	}
	public void setGrpName(String grpName) {
		this.grpName = grpName;
	}
}
