/**
 * Program Name	: NoticeBoardMapper.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 12. 14.
 * 
 * Programmer Name 	: kim dong ju
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.main.sec.noticeBoard.persistence;

import com.klid.webapp.common.file.dto.AttachfileDto;
import com.klid.webapp.main.sec.noticeBoard.dto.NoticeBoardDto;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author dongju
 *
 */
@Repository("noticeBoardMapper")
public interface NoticeBoardMapper {

	/** 게시판 최근리스트 받아오기 */
	List<NoticeBoardDto> getPostBoardList(Map<String, Object> paramMap);

	/** 날짜별 공지사항 게시판 리스트 받아오기 */
	List<NoticeBoardDto> getPeriodBoardList(Map<String, Object> paramMap);

	/** 타입으로 게시판 리스트 받아오기 */
	List<NoticeBoardDto> getBoardList(Map<String, Object> paramMap);

	/** 게시판 번호로 컨텐츠 보기 */
	NoticeBoardDto getBoardContents(Map<String, Object> paramMap);

	/** 게시판 번호로 첨부파일 보기 */
	List<AttachfileDto> selectAttachFileList(Map<String, Object> paramMap);

	/** 글 번호로 조회수 증가 */
	void hitsUpBoard(Map<String, Object> paramMap);

	/** 게시판 글쓰고 작성한 글 번호 받아오기 */
	int addBoard(Map<String, Object> paramMap);

	/** 게시판 글 수정하기 */
	void editBoard(Map<String, Object> paramMap);

	/** 게시판 글 삭제하기 */
	void delBoard(Map<String, Object> paramMap);
	
	/** 게시판 그룹타입 리스트 */
	List<NoticeBoardDto> getBoardTypeList(Map<String, Object> paramMap);

	int addNoticeSurvey(Map<String, Object> paramMap);

	int selectSurveyAnsweCnt(Map<String, Object> paramMap);

	List<NoticeBoardDto> selectSurveyChart(Map<String, Object> paramMap);

	List<NoticeBoardDto> selectSurveyGrid(Map<String, Object> paramMap);

	/** 메인 공지사항 리스트 */
	List<NoticeBoardDto> getMainNoticeList(Map<String, Object> paramMap);

	String getInstNmByInstCd(Map<String, Object> paramMap);

	List<Map<String, Object>> selectConfirmList(Map<String, Object> paramMap);

	int addNoticeConfirm(Map<String, Object> paramMap);

	int selectConfirmCheck(Map<String, Object> paramMap);

    void deleteNoticeConfirm(Map<String, Object> condition);

    int editNoticeConfirm(Map<String, Object> condition);

	int selectConfirmReplyCheck(Map<String, Object> condition);

	int selectCreateCnt(Map<String, Object> condition);
}
