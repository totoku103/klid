/**
 * Program Name : MenuMgmtDto.java
 *
 * Version  :  1.0
 *
 * Creation Date : 2016. 2. 22.
 * 
 * Programmer Name  : Song Young Wook
 *
 * Copyright 2016 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE   : PROGRAMMER : REASON
 */

package com.klid.webapp.engineer.menuMgmt.dto;

import java.io.Serializable;
/**
 * @author ywsong
 *
 */

@SuppressWarnings("serial")
public class MenuMgmtDto implements Serializable {
	private String menuNo;
	private String menuName;
	private String menuKind;
	private String menuAuth;
	private String menuAuthNM;
	private String menuPageNo;
	private String menuPageGrpNo;
	private String guid;
	private String siteName;
	private String visibleOrder;
	private String isWebuse;
	private String isFileuse;
	private String webIconClass;
	
	public String getMenuAuthNM() {
		return menuAuthNM;
	}
	public void setMenuAuthNM(String menuAuthNM) {
		this.menuAuthNM = menuAuthNM;
	}
	public String getMenuNo() {
		return menuNo;
	}
	public void setMenuNo(String menuNo) {
		this.menuNo = menuNo;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public String getMenuKind() {
		return menuKind;
	}
	public void setMenuKind(String menuKind) {
		this.menuKind = menuKind;
	}
	public String getMenuAuth() {
		return menuAuth;
	}
	public void setMenuAuth(String menuAuth) {
		this.menuAuth = menuAuth;
	}
	public String getMenuPageNo() {
		return menuPageNo;
	}
	public void setMenuPageNo(String menuPageNo) {
		this.menuPageNo = menuPageNo;
	}
	public String getMenuPageGrpNo() {
		return menuPageGrpNo;
	}
	public void setMenuPageGrpNo(String menuPageGrpNo) {
		this.menuPageGrpNo = menuPageGrpNo;
	}
	public String getGuid() {
		return guid;
	}
	public void setGuid(String guid) {
		this.guid = guid;
	}
	public String getSiteName() {
		return siteName;
	}
	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}
	public String getVisibleOrder() {
		return visibleOrder;
	}
	public void setVisibleOrder(String visibleOrder) {
		this.visibleOrder = visibleOrder;
	}
	public String getIsWebuse() {
		return isWebuse;
	}
	public void setIsWebuse(String isWebuse) {
		this.isWebuse = isWebuse;
	}
	public String getWebIconClass() {
		return webIconClass;
	}
	public void setWebIconClass(String webIconClass) {
		this.webIconClass = webIconClass;
	}

	public String getIsFileuse() {
		return isFileuse;
	}

	public void setIsFileuse(String isFileuse) {
		this.isFileuse = isFileuse;
	}
}
