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
package com.klid.webapp.main.sec.noticeBoard.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.annotation.Resource;

import com.klid.webapp.common.*;
import com.klid.webapp.common.code.dto.CodeDto;
import com.klid.webapp.common.code.persistence.CodeMapper;
import com.klid.webapp.main.hist.userActHist.persistence.UserActHistMapper;
import com.klid.webapp.main.sec.noticeBoard.dto.NoticeBoardDto;
import org.springframework.stereotype.Service;

import com.klid.webapp.main.sec.noticeBoard.persistence.NoticeBoardMapper;

/**
 * @author dongju
 *
 */
@Service("noticeBoardService")
public class NoticeBoardServiceImpl extends MsgService implements NoticeBoardService {

	@Resource(name = "noticeBoardMapper")
	private NoticeBoardMapper mapper;

	@Resource(name = "userActHistMapper")
	private UserActHistMapper userActHistMapper;

	@Resource(name = "codeMapper")
	private CodeMapper codeMapper;

	/** 게시판 최근리스트 받아오기 */
	@Override
	public ReturnData getPostBoardList(Criterion criterion){
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
		Criterion criterion2 = new Criterion();
		criterion2.addParam("comCode1", "5000");
		criterion2.addParam("codeLvl", "1");
		List<CodeDto> codeList = codeMapper.getCodeList(criterion2.getCondition());
		int createBoardMaxCnt = 10;
		if(codeList.size() > 0) {
			createBoardMaxCnt = Integer.parseInt(codeList.get(0).getComCode2());
		}

		criterion.addParam("boardType", "notice");
		int createBoardCnt = mapper.selectCreateCnt(criterion.getCondition());
		if(createBoardCnt > createBoardMaxCnt){
			return new ReturnData(new ErrorInfo("최근 1시간 이내 게시글 최대 등록 가능 수는 "+createBoardMaxCnt +"개 입니다."));
		}

		mapper.addBoard(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "B4529762-C067-4731-9129-B84FF840063A");
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
		NoticeBoardDto boardDetail = mapper.getBoardContents(criterion.getCondition());
		if(!SessionManager.getUser().getUserId().equals(boardDetail.getUserId())){
			throw new CustomException("잘못된 접근 입니다.");
		}

		mapper.editBoard(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "B4529762-C067-4731-9129-B84FF840063A");
		criterionHist.addParam("actType", "U");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "BULTN");
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getCondition());
	}

	/** 게시판 글 삭제하기 */
	@Override
	public ReturnData delBoard(Criterion criterion){
		NoticeBoardDto boardDetail = mapper.getBoardContents(criterion.getCondition());
		if(!SessionManager.getUser().getUserId().equals(boardDetail.getUserId())){
			throw new CustomException("잘못된 접근 입니다.");
		}

		mapper.delBoard(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "B4529762-C067-4731-9129-B84FF840063A");
		criterionHist.addParam("actType", "D");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "BULTN");
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData getBoardTypeList(Criterion criterion) {
		return new ReturnData(mapper.getBoardTypeList(criterion.getCondition()));
	}

	/** 설문제출 */
	@Override
	public ReturnData addNoticeSurvey(Criterion criterion){
		mapper.addNoticeSurvey(criterion.getCondition());
		return new ReturnData(criterion.getValue("noticeSurveySeq"));
	}

	/** 설문응시 여부 확인 */
	@Override
	public ReturnData getSurveyAnsweCnt(Criterion criterion) {
		return new ReturnData(mapper.selectSurveyAnsweCnt(criterion.getCondition()));
	}

	/** 객관식 설문 결과 */
	@Override
	public ReturnData getSurveyChart(Criterion criterion){
		return new ReturnData(mapper.selectSurveyChart(criterion.getCondition()));
	}

	/** 주관식 설문 결과 */
	@Override
	public ReturnData getSurveyGrid(Criterion criterion)  {
		return new ReturnData(mapper.selectSurveyGrid(criterion.getCondition()));
	}

	/** 메인 공지사항 리스트 받아오기 */
	@Override
	public ReturnData getMainNoticeList(Criterion criterion) {
		return new ReturnData(mapper.getMainNoticeList(criterion.getCondition()));
	}

	@Override
	public ReturnData checkAuth(Criterion criterion) {
		criterion.addParam("boardNo", criterion.getValue("boardNo"));

		//Map<String, Object> returnList = new HashMap<String, Object>();
		NoticeBoardDto boardDetail = mapper.getBoardContents(criterion.getCondition());
		String checkAuthYn = "N";
		if(SessionManager.getUser().getUserId().equals(boardDetail.getUserId())){
			checkAuthYn = "Y";
		}
		return new ReturnData(checkAuthYn);
	}

	@Override
	public ReturnData addNoticeConfirm(Criterion criterion){
		mapper.addNoticeConfirm(criterion.getCondition());
		return new ReturnData(criterion.getValue("confirmSeq"));
	}

	@Override
	public ReturnData editNoticeConfirm(Criterion criterion) {
		mapper.editNoticeConfirm(criterion.getCondition());
		return new ReturnData();
	}

	@Override
	public ReturnData getConfirmList(Criterion criterion)  {
		return new ReturnData(mapper.selectConfirmList(criterion.getCondition()));
	}

	@Override
	public ReturnData getConfirmCheck(Criterion criterion)  {
		return new ReturnData(mapper.selectConfirmCheck(criterion.getCondition()));
	}

	@Override
	public ReturnData getConfirmReplyCheck(Criterion criterion) {
		return new ReturnData(mapper.selectConfirmReplyCheck(criterion.getCondition()));
	}

	@Override
	public ReturnData delNoticeConfirm(Criterion criterion) {
		mapper.deleteNoticeConfirm(criterion.getCondition());
		return new ReturnData();
	}
}
