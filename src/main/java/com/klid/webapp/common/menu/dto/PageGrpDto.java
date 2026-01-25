/**
 * Program Name	: PageGrpDto.java
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

import java.util.List;

/**
 * @author jung
 *
 */
public class PageGrpDto {
	private long pageNo;
	private long pageGrpNo;
	private String pageGrpName;
	private int orderNo;
	private List<MenuDto> children;
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
	 * @return the pageGrpName
	 */
	public String getPageGrpName() {
		return pageGrpName;
	}
	/**
	 * @param pageGrpName the pageGrpName to set
	 */
	public void setPageGrpName(String pageGrpName) {
		this.pageGrpName = pageGrpName;
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
	 * @return the children
	 */
	public List<MenuDto> getChildren() {
		return children;
	}
	/**
	 * @param children the children to set
	 */
	public void setChildren(List<MenuDto> children) {
		this.children = children;
	}
	
}
