/**
 * Program Name	: PopupServiceImpl.java
 *
 * Version		:  1.0
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
package com.klid.webapp.engineer.popup.service;

import jakarta.annotation.Resource;

import org.springframework.stereotype.Service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.engineer.popup.persistence.PopupMapper;

/**
 * @author ywsong
 *
 */
@Service("popupService")
public class PopupServiceImpl extends MsgService implements PopupService {

	@Resource(name="popupMapper")
	private PopupMapper mapper;

	@Override
	public ReturnData addPage(Criterion criterion){
		return new ReturnData(mapper.addPage(criterion.getCondition()));
	}

	@Override
	public ReturnData savePage(Criterion criterion) {
		ReturnData returnData = new ReturnData();
		mapper.savePage(criterion.getCondition());
		returnData.setResultData(getEditOkMessage());
		return returnData;
	}

	@Override
	public ReturnData delPage(Criterion criterion) {
		mapper.delPage(criterion.getCondition());
		return new ReturnData(criterion.getCondition());
	}

	
	@Override
	public ReturnData addPageGroup(Criterion criterion) throws Exception {
		return new ReturnData(mapper.addPageGroup(criterion.getCondition()));
	}

	@Override
	public ReturnData savePageGroup(Criterion criterion){
		ReturnData returnData = new ReturnData();
		mapper.savePageGroup(criterion.getCondition());
		returnData.setResultData(getEditOkMessage());
		return returnData;
	}

	@Override
	public ReturnData delPageGroup(Criterion criterion) {
		mapper.delPageGroup(criterion.getCondition());
		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData addMenu(Criterion criterion){
		ReturnData returnData = new ReturnData();
		mapper.addMenu(criterion.getCondition());
		returnData.setResultData(getEditOkMessage());
		return returnData;
	}

	@Override
	public ReturnData saveMenu(Criterion criterion) {
		ReturnData returnData = new ReturnData();
		mapper.saveMenu(criterion.getCondition());
		returnData.setResultData(getEditOkMessage());
		return returnData;
	}

	@Override
	public ReturnData delMenu(Criterion criterion){
		mapper.delMenu(criterion.getCondition());
		return new ReturnData(criterion.getCondition());
	}
	


}
