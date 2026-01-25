/**
 * Program Name : MenuMgmtServiceImpl.java
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

package com.klid.webapp.engineer.menuMgmt.service;
import jakarta.annotation.Resource;

import org.springframework.stereotype.Service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.engineer.menuMgmt.persistence.MenuMgmtMapper;

@Service("menuMgmtService")
public class MenuMgmtServiceImpl extends MsgService implements MenuMgmtService {

	@Resource(name="menuMgmtMapper")
	private MenuMgmtMapper mapper;

	@Override
	public ReturnData getPageList(Criterion criterion) {
		return new ReturnData(mapper.selectPageList(criterion.getCondition()));
	}

	@Override
	public ReturnData getPageGroupList(Criterion criterion) {
		return new ReturnData(mapper.selectPageGroupList(criterion.getCondition()));
	}

	@Override
	public ReturnData getMenuList(Criterion criterion) {
		return new ReturnData(mapper.selectMenuList(criterion.getCondition()));
	}


	
	

}
