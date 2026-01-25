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
package com.klid.webapp.main.sec.qnaBoard.service;

import java.util.HashMap;
import java.util.Map;

import jakarta.annotation.Resource;

import com.klid.webapp.common.*;
import com.klid.webapp.main.sec.qnaBoard.dto.QnaBoardDto;
import org.springframework.stereotype.Service;

import com.klid.webapp.main.sec.qnaBoard.persistence.QnaBoardMapper;

/**
 * @author dongju
 *
 */
@Service("qnaBoardService")
public class QnaBoardServiceImpl extends MsgService implements QnaBoardService {

	@Resource(name = "qnaBoardMapper")
	private QnaBoardMapper mapper;

	/** 게시판 최근리스트 받아오기 */
	@Override
	public ReturnData getPostBoardList(Criterion criterion) {
		return new ReturnData(mapper.getPostBoardList(criterion.getCondition()));
	}

	/** 게시판 리스트 받아오기 */
	@Override
	public ReturnData getBoardList(Criterion criterion){
		return new ReturnData(mapper.getBoardList(criterion.getCondition()));
	}

	/** 게시판 번호로 컨텐츠 보기 */
	@Override
	public ReturnData getBoardContents(Criterion criterion)  {
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
		return new ReturnData(criterion.getValue("boardNo"));
	}

	/** 코멘트 쓰고 번호 받아오기 */
	@Override
	public ReturnData addComment(Criterion criterion) {
		mapper.addComment(criterion.getCondition());
		return new ReturnData(criterion.getValue("boardNo"));
	}

	/** 게시판 글 수정하기 */
	@Override
	public ReturnData editBoard(Criterion criterion) {
		QnaBoardDto boardDetail = mapper.getBoardContents(criterion.getCondition());
		if(!SessionManager.getUser().getUserId().equals(boardDetail.getUserId())){
			throw new CustomException("잘못된 접근 입니다.");
		}

		mapper.editBoard(criterion.getCondition());
		return new ReturnData(criterion.getCondition());
	}

	/** 게시판 글 삭제하기 */
	@Override
	public ReturnData delBoard(Criterion criterion){
		QnaBoardDto boardDetail = mapper.getBoardContents(criterion.getCondition());
		if(!SessionManager.getUser().getUserId().equals(boardDetail.getUserId())){
			throw new CustomException("잘못된 접근 입니다.");
		}

		mapper.delBoard(criterion.getCondition());
		return new ReturnData(criterion.getCondition());
	}

	/** 메인 문의/의견 리스트 가져오기 */
	@Override
	public ReturnData getMainQnaList(Criterion criterion) {
		return new ReturnData(mapper.getMainQnaList(criterion.getCondition()));
	}

	@Override
	public ReturnData checkAuth(Criterion criterion) {
		criterion.addParam("boardNo", criterion.getValue("boardNo"));

		//Map<String, Object> returnList = new HashMap<String, Object>();
		QnaBoardDto boardDetail = mapper.getBoardContents(criterion.getCondition());
		String checkAuthYn = "N";
		if(SessionManager.getUser().getUserId().equals(boardDetail.getUserId())){
			checkAuthYn = "Y";
		}
		return new ReturnData(checkAuthYn);
	}

}
