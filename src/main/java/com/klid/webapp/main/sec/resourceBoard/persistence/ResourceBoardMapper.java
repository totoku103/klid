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
package com.klid.webapp.main.sec.resourceBoard.persistence;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.klid.webapp.common.file.dto.AttachfileDto;
import com.klid.webapp.main.sec.resourceBoard.dto.ResourceBoardDto;

/**
 * @author dongju
 *
 */
@Repository("resourceBoardMapper")
public interface ResourceBoardMapper {

	/** 게시판 최근리스트 받아오기 */
	List<ResourceBoardDto> getPostBoardList(Map<String, Object> paramMap);

	/** 타입으로 게시판 리스트 받아오기 */
	List<ResourceBoardDto> getBoardList(Map<String, Object> paramMap);

	/** 게시판 번호로 컨텐츠 보기 */
	ResourceBoardDto getBoardContents(Map<String, Object> paramMap);

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


	//////////////행안부
	List<ResourceBoardDto> getMoisBoardList(Map<String, Object> paramMap);

	ResourceBoardDto getMoisBoardContents(Map<String, Object> paramMap);

	int addMoisBoard(Map<String, Object> paramMap);

	void editMoisBoard(Map<String, Object> paramMap);

	void delMoisBoard(Map<String, Object> paramMap);
}
