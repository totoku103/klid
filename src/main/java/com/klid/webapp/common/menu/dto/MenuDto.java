/**
 * Program Name	: MenuDto.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 1. 28.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.menu.dto;

/**
 * @author jung
 *
 */
public class MenuDto {
	private long pageNo;
	private long pageGrpNo;
	private long menuNo;
	private String menuName;
	private int orderNo;
	private String guid;
	private String menuAuth;
	/**
	 * @return the pageNo
	 */
	public long getPageNo() {
		return pageNo;
	}
	/**
	 * @param pageNo the pageNo to set
	 */
	public void setPageNo(long pageNo) {
		this.pageNo = pageNo;
	}
	/**
	 * @return the pageGrpNo
	 */
	public long getPageGrpNo() {
		return pageGrpNo;
	}
	/**
	 * @param pageGrpNo the pageGrpNo to set
	 */
	public void setPageGrpNo(long pageGrpNo) {
		this.pageGrpNo = pageGrpNo;
	}
	/**
	 * @return the menuNo
	 */
	public long getMenuNo() {
		return menuNo;
	}
	/**
	 * @param menuNo the menuNo to set
	 */
	public void setMenuNo(long menuNo) {
		this.menuNo = menuNo;
	}
	/**
	 * @return the menuName
	 */
	public String getMenuName() {
		return menuName;
	}
	/**
	 * @param menuName the menuName to set
	 */
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	/**
	 * @return the orderNo
	 */
	public int getOrderNo() {
		return orderNo;
	}
	/**
	 * @param orderNo the orderNo to set
	 */
	public void setOrderNo(int orderNo) {
		this.orderNo = orderNo;
	}
	/**
	 * @return the guid
	 */
	public String getGuid() {
		return guid;
	}
	/**
	 * @param guid the guid to set
	 */
	public void setGuid(String guid) {
		this.guid = guid;
	}
	/**
	 * @return the menuAuth
	 */
	public String getMenuAuth() {
		return menuAuth;
	}
	/**
	 * @param menuAuth the menuAuth to set
	 */
	public void setMenuAuth(String menuAuth) {
		this.menuAuth = menuAuth;
	}
}
