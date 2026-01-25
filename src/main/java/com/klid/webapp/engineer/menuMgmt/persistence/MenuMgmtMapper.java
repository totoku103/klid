/**
 * Program Name : MenuMgmtMapper.java
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

package com.klid.webapp.engineer.menuMgmt.persistence;
/**
 * @author ywsong
 *
 */
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.klid.webapp.engineer.menuMgmt.dto.MenuMgmtDto;

@Repository("menuMgmtMapper")
public interface MenuMgmtMapper {

	public List<MenuMgmtDto> selectPageList(Map<String, Object> reqMap);
	public List<MenuMgmtDto> selectPageGroupList(Map<String, Object> reqMap);
	public List<MenuMgmtDto> selectMenuList(Map<String, Object> reqMap);
}
