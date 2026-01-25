/**
 * Program Name	: TakeOverBoardServiceImpl.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 12. 22.
 * 
 * Programmer Name 	:  kim dong ju
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.main.sec.takeOverBoard.service;

import java.util.HashMap;
import java.util.Map;

import jakarta.annotation.Resource;

import org.springframework.stereotype.Service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.sec.takeOverBoard.persistence.TakeOverBoardMapper;

/**
 * @author dongju
 *
 */
@Service("takeOverBoardService")
public class TakeOverBoardServiceImpl extends MsgService implements TakeOverBoardService {

	@Resource(name = "takeOverBoardMapper")
	private TakeOverBoardMapper mapper;

	/** 인수인계 리스트 조회 */
	@Override
	public ReturnData getBoardList(Criterion criterion)  {
		return new ReturnData(mapper.selectBoardList(criterion.getCondition()));
	}

	/** 인수인계 정보 조회 */
	@Override
	public ReturnData getBoardInfo(Criterion criterion){

		Map<String, Object> returnList = new HashMap<String, Object>();

		returnList.put("contents", mapper.selectBoardInfo(criterion.getCondition()));
		returnList.put("answer", mapper.selectAnsBoardList(criterion.getCondition()));

		return new ReturnData(returnList);
	}

	/** 인수인계 추가 */
	@Override
	public ReturnData addBoard(Criterion criterion)  {
		mapper.insertBoard(criterion.getCondition());
		return new ReturnData("SUCCESS");
	}

	/** 인수인계 수정 */
	@Override
	public ReturnData editBoard(Criterion criterion)  {
		mapper.updateBoard(criterion.getCondition());
		return new ReturnData("SUCCESS");
	}
	
	/** 인수인계 수정 - 확인상태로 변경 */
	@Override
	public ReturnData addBoardConfirm(Criterion criterion) {
		mapper.insertBoardConfirm(criterion.getCondition());
		return new ReturnData("SUCCESS");
	}
	
	/** 인수인계 수정  - 종결상태로 변경*/
	@Override
	public ReturnData editBoard_finish(Criterion criterion) {
		mapper.updateBoard_finish(criterion.getCondition());
		return new ReturnData("SUCCESS");
	}

	/** 인수인계 답글 리스트 조회 */
	@Override
	public ReturnData getAnsBoardList(Criterion criterion)  {
		return new ReturnData(mapper.selectAnsBoardList(criterion.getCondition()));
	}
	
	/** 인수인계 답글 추가 */
	@Override
	public ReturnData addAnsBoard(Criterion criterion)  {
		mapper.insertAnsBoard(criterion.getCondition());
		return new ReturnData("SUCCESS");
	}

}
