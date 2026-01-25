/**
 * Program Name	: NoticeBoardServiceImpl.java
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
package com.klid.webapp.main.sec.resourceBoard.service;

import java.util.HashMap;
import java.util.Map;

import jakarta.annotation.Resource;

import com.klid.webapp.common.*;
import com.klid.webapp.main.hist.userActHist.persistence.UserActHistMapper;
import com.klid.webapp.main.sec.resourceBoard.dto.ResourceBoardDto;
import org.springframework.stereotype.Service;

import com.klid.webapp.main.sec.resourceBoard.persistence.ResourceBoardMapper;

/**
 * @author dongju
 *
 */
@Service("resourceBoardService")
public class ResourceBoardServiceImpl extends MsgService implements ResourceBoardService {

	@Resource(name = "resourceBoardMapper")
	private ResourceBoardMapper mapper;

	@Resource(name = "userActHistMapper")
	private UserActHistMapper userActHistMapper;

	/** 게시판 최근리스트 받아오기 */
	@Override
	public ReturnData getPostBoardList(Criterion criterion) {
		return new ReturnData(mapper.getPostBoardList(criterion.getCondition()));
	}

	/** 타입으로 게시판 리스트 받아오기 */
	@Override
	public ReturnData getBoardList(Criterion criterion) {
		return new ReturnData(mapper.getBoardList(criterion.getCondition()));
	}

	/** 게시판 번호로 컨텐츠 보기 */
	@Override
	public ReturnData getBoardContents(Criterion criterion) {
		mapper.hitsUpBoard(criterion.getCondition());

		Map<String, Object> returnList = new HashMap<String, Object>();

		returnList.put("attachFile", mapper.selectAttachFileList(criterion.getCondition()));
		returnList.put("contents", mapper.getBoardContents(criterion.getCondition()));

		return new ReturnData(returnList);
	}

	/** 게시판 글쓰고 작성한 글 번호 받아오기 */
	@Override
	public ReturnData addBoard(Criterion criterion) {
		mapper.addBoard(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "35E56A6F-B4CF-4255-8300-A55BA44F7BA6");
		criterionHist.addParam("actType", "C");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "BULTN");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getValue("boardNo"));
	}

	/** 게시판 글 수정하기 */
	@Override
	public ReturnData editBoard(Criterion criterion) {
		ResourceBoardDto boardDetail = mapper.getBoardContents(criterion.getCondition());
		if(!SessionManager.getUser().getUserId().equals(boardDetail.getUserId())){
			throw new CustomException("잘못된 접근 입니다.");
		}
		mapper.editBoard(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "35E56A6F-B4CF-4255-8300-A55BA44F7BA6");
		criterionHist.addParam("actType", "U");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "BULTN");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getCondition());
	}

	/** 게시판 글 삭제하기 */
	@Override
	public ReturnData delBoard(Criterion criterion) {
		ResourceBoardDto boardDetail = mapper.getBoardContents(criterion.getCondition());
		if(!SessionManager.getUser().getUserId().equals(boardDetail.getUserId())){
			throw new CustomException("잘못된 접근 입니다.");
		}

		mapper.delBoard(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "35E56A6F-B4CF-4255-8300-A55BA44F7BA6");
		criterionHist.addParam("actType", "D");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "BULTN");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getCondition());
	}
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.netis.webapp.scn.oms.noticeBoard.service.NoticeBoardService#getBoardPostListByType(com.netis.webapp.common.Criterion)
	 */

	@Override
	public ReturnData checkAuth(Criterion criterion) {
		criterion.addParam("boardNo", criterion.getValue("boardNo"));

		//Map<String, Object> returnList = new HashMap<String, Object>();
		ResourceBoardDto boardDetail = mapper.getBoardContents(criterion.getCondition());
		String checkAuthYn = "N";
		if(SessionManager.getUser().getUserId().equals(boardDetail.getUserId())){
			checkAuthYn = "Y";
		}
		return new ReturnData(checkAuthYn);
	}


	/////////////////////////////행안부/////////////////////////

	@Override
	public ReturnData getMoisBoardList(Criterion criterion) {
		return new ReturnData(mapper.getMoisBoardList(criterion.getCondition()));
	}

	@Override
	public ReturnData getMoisBoardContents(Criterion criterion) {
		mapper.hitsUpBoard(criterion.getCondition());

		Map<String, Object> returnList = new HashMap<String, Object>();

		returnList.put("attachFile", mapper.selectAttachFileList(criterion.getCondition()));
		returnList.put("contents", mapper.getMoisBoardContents(criterion.getCondition()));

		return new ReturnData(returnList);
	}

	@Override
	public ReturnData addMoisBoard(Criterion criterion) {

		mapper.addMoisBoard(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "02C5C442-3DA4-16Z3-2B20-J40FJ2759538");
		criterionHist.addParam("actType", "C");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "BULTN");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getValue("boardNo"));
	}

	@Override
	public ReturnData editMoisBoard(Criterion criterion) {
		ResourceBoardDto boardDetail = mapper.getMoisBoardContents(criterion.getCondition());
		if(!SessionManager.getUser().getUserId().equals(boardDetail.getUserId())){
			throw new CustomException("잘못된 접근 입니다.");
		}
		mapper.editMoisBoard(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "02C5C442-3DA4-16Z3-2B20-J40FJ2759538");
		criterionHist.addParam("actType", "U");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "BULTN");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData delMoisBoard(Criterion criterion) {
		ResourceBoardDto boardDetail = mapper.getMoisBoardContents(criterion.getCondition());
		if(!SessionManager.getUser().getUserId().equals(boardDetail.getUserId())){
			throw new CustomException("잘못된 접근 입니다.");
		}

		mapper.delMoisBoard(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "02C5C442-3DA4-16Z3-2B20-J40FJ2759538");
		criterionHist.addParam("actType", "D");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "BULTN");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getCondition());
	}
}
