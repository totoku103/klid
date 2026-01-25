/**
 * Program Name	: GrpDto.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 1. 29.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.grp.dto;

import java.io.Serializable;

/**
 * @author jung
 *
 */
@SuppressWarnings("serial")
public class GrpDto implements Serializable {
	private String grpNo;
	private long grpParent;
	private long grpRef;
	private String grpRefString;
	private String grpName;
	private int isLeaf;
	private String devKind2;
	private String devIp;
	private int grpFlag;

	public String getGrpNo() {
		return grpNo;
	}

	public void setGrpNo(String grpNo) {
		this.grpNo = grpNo;
	}

	public long getGrpParent() {
		return grpParent;
	}

	public void setGrpParent(long grpParent) {
		this.grpParent = grpParent;
	}

	public long getGrpRef() {
		return grpRef;
	}

	public void setGrpRef(long grpRef) {
		this.grpRef = grpRef;
	}

	public String getGrpRefString() {
		return grpRefString;
	}

	public void setGrpRefString(String grpRefString) {
		this.grpRefString = grpRefString;
	}

	public String getGrpName() {
		return grpName;
	}

	public void setGrpName(String grpName) {
		this.grpName = grpName;
	}

	public int getIsLeaf() {
		return isLeaf;
	}

	public void setIsLeaf(int isLeaf) {
		this.isLeaf = isLeaf;
	}

	public String getDevKind2() {
		return devKind2;
	}

	public void setDevKind2(String devKind2) {
		this.devKind2 = devKind2;
	}

	public String getDevIp() {
		return devIp;
	}

	public void setDevIp(String devIp) {
		this.devIp = devIp;
	}

	public int getGrpFlag() {
		return grpFlag;
	}

	public void setGrpFlag(int grpFlag) {
		this.grpFlag = grpFlag;
	}

}
