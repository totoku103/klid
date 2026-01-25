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
package com.klid.webapp.main.sec.qnaBoard.persistence;

import java.util.List;
import java.util.Map;

import com.klid.webapp.common.file.dto.AttachfileDto;
import org.springframework.stereotype.Repository;

import com.klid.webapp.main.sec.qnaBoard.dto.QnaBoardDto;

/**
 * @author dongju
 *
 */
@Repository("qnaBoardMapper")
public interface QnaBoardMapper {

	/** ===============================게시판 정리============================== */

	/** 게시판 최근리스트 받아오기 */
	List<QnaBoardDto> getPostBoardList(Map<String, Object> paramMap);

	/** 게시판 리스트 받아오기 */
	List<QnaBoardDto> getBoardList(Map<String, Object> paramMap);

	/** 게시판 번호로 컨텐츠 보기 */
	QnaBoardDto getBoardContents(Map<String, Object> paramMap);

	/** 글 번호로 조회수 증가 */
	void hitsUpBoard(Map<String, Object> paramMap);

	/** 게시판 글쓰고 작성한 글 번호 받아오기 */
	int addBoard(Map<String, Object> paramMap);

	/** 코멘트 쓰고 작성한 글 번호 받아오기 */
	int addComment(Map<String, Object> paramMap);

	/** 게시판 글 수정하기 */
	void editBoard(Map<String, Object> paramMap);

	/** 게시판 글 삭제하기 */
	void delBoard(Map<String, Object> paramMap);

	/** 답변 단글 처리현황 확인으로 변경 */
	void editCheckFlag(Map<String, Object> paramMap);

	/** 게시판 번호로 첨부파일 보기 */
	List<AttachfileDto> selectAttachFileList(Map<String, Object> paramMap);

	/** 메인 문의/의견 리스트 가져오기 */
	List<QnaBoardDto> getMainQnaList(Map<String, Object> paramMap);
}
