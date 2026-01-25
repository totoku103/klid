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
package com.klid.webapp.main.sec.shareBoard.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.annotation.Resource;

import com.klid.webapp.common.*;
import com.klid.webapp.main.hist.userActHist.persistence.UserActHistMapper;
import com.klid.webapp.main.sec.shareBoard.dto.ShareBoardDto;
import org.springframework.stereotype.Service;

import com.klid.webapp.main.sec.shareBoard.persistence.ShareBoardMapper;

/**
 * @author dongju
 *
 */
@Service("shareBoardService")
public class ShareBoardServiceImpl extends MsgService implements ShareBoardService {

	@Resource(name = "shareBoardMapper")
	private ShareBoardMapper mapper;

	@Resource(name = "userActHistMapper")
	private UserActHistMapper userActHistMapper;

	/** 게시판 최근리스트 받아오기 */
	@Override
	public ReturnData getPostBoardList(Criterion criterion) throws Exception {
		return new ReturnData(mapper.getPostBoardList(criterion.getCondition()));
	}

	/** 타입으로 게시판 리스트 받아오기 */
	@Override
	public ReturnData getBoardList(Criterion criterion){
		return new ReturnData(mapper.getBoardList(criterion.getCondition()));
	}

	/** 게시판 번호로 컨텐츠 보기 */
	@Override
	public ReturnData getBoardContents(Criterion criterion){
		mapper.hitsUpBoard(criterion.getCondition());

		Map<String, Object> returnList = new HashMap<String, Object>();

		returnList.put("attachFile", mapper.selectAttachFileList(criterion.getCondition()));
		returnList.put("contents", mapper.getBoardContents(criterion.getCondition()));

		return new ReturnData(returnList);
	}

	/** 게시판 글쓰고 작성한 글 번호 받아오기 */
	@Override
	public ReturnData addBoard(Criterion criterion){
		//		criterion.addParam("boardTitle", xssConvert.stringConvert(criterion.getValue("boardTitle").toString()));
		//		criterion.addParam("boardContent", xssConvert.stringConvert(criterion.getValue("boardContent").toString()));

		mapper.addBoard(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "11B3C551-A9E2-4361-AC5C-D45751AD5E64");
		criterionHist.addParam("actType", "C");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "BULTN");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getValue("boardNo"));
	}

	/** 게시판 글 수정하기 */
	@Override
	public ReturnData editBoard(Criterion criterion){
		//		criterion.addParam("boardTitle", xssConvert.stringConvert(criterion.getValue("boardTitle").toString()));
		//		criterion.addParam("boardContent", xssConvert.stringConvert(criterion.getValue("boardContent").toString()));

		ShareBoardDto boardDetail = mapper.getBoardContents(criterion.getCondition());
		if(!SessionManager.getUser().getUserId().equals(boardDetail.getUserId())){
			throw new CustomException("잘못된 접근 입니다.");
		}
		mapper.editBoard(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "11B3C551-A9E2-4361-AC5C-D45751AD5E64");
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
		ShareBoardDto boardDetail = mapper.getBoardContents(criterion.getCondition());
		if(!SessionManager.getUser().getUserId().equals(boardDetail.getUserId())){
			throw new CustomException("잘못된 접근 입니다.");
		}

		mapper.delBoard(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "11B3C551-A9E2-4361-AC5C-D45751AD5E64");
		criterionHist.addParam("actType", "D");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "BULTN");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getCondition());
	}
	
	@Override
	public ReturnData getShareBoardSidoCnt(Criterion criterion){
		return new ReturnData(mapper.getShareBoardSidoCnt(criterion.getCondition()));
	}

	@Override
	public ReturnData checkAuth(Criterion criterion) {
		criterion.addParam("boardNo", criterion.getValue("boardNo"));

		//Map<String, Object> returnList = new HashMap<String, Object>();
		ShareBoardDto boardDetail = mapper.getBoardContents(criterion.getCondition());
		String checkAuthYn = "N";
		if(SessionManager.getUser().getUserId().equals(boardDetail.getUserId())){
			checkAuthYn = "Y";
		}
		return new ReturnData(checkAuthYn);
	}

	@Override
	public List<ShareBoardDto> getBoardDetail(Criterion criterion) {
		return mapper.getBoardDetail(criterion.getCondition());
	}

}
