/**
 * Program Name	: PopupMapper.java
 *
 * Version		:  3.0
 *
 * Creation Date	: 2016. 2. 23.
 * 
 * Programmer Name 	: Song Young Wook
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.engineer.popup.persistence;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

/**
 * @author ywsong
 *
 */
@Repository("popupMapper")
public interface PopupMapper {

	/** page 추가 */
	int addPage(Map<String, Object> paramMap);
	
	/** page 수정 */
	void savePage(Map<String, Object> paramMap);

	/** page 삭제 */
	void delPage(Map<String, Object> paramMap);
	
	/** pageGroup 추가 */
	int addPageGroup(Map<String, Object> paramMap);
	
	/** pageGroup 수정 */
	void savePageGroup(Map<String, Object> paramMap);
	
	/** pageGroup 삭제 */
	void delPageGroup(Map<String, Object> paramMap);
	
	/** Menu 추가 */
	void addMenu(Map<String, Object> paramMap);
	
	/** Menu 수정 */
	void saveMenu(Map<String, Object> paramMap);
	
	/** Menu 삭제 */
	void delMenu(Map<String, Object> paramMap);
	
}
