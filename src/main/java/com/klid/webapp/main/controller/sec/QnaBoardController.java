/**
 * Program Name : NoticeBoardController.java
 *
 * Version  :  3.0
 *
 * Creation Date : 2015. 12. 22.
 * 
 * Programmer Name  : kim dong ju
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE   : PROGRAMMER : REASON
 */

package com.klid.webapp.main.controller.sec;

import java.util.Map;

import jakarta.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.sec.qnaBoard.service.QnaBoardService;

/**
 * @author kdj
 *
 */
@RequestMapping("/api/main/sec/qnaBoard")
@Controller
public class QnaBoardController {

	@Resource(name = "qnaBoardService")
	private QnaBoardService service;
	
	/** 게시판 최근리스트 받아오기 */
	@RequestMapping(value = "getPostBoardList")
	public @ResponseBody ReturnData getPostBoardList(@RequestParam Map<String, Object> reqMap) {
			return service.getPostBoardList(new Criterion(reqMap));
	}
	
	/** 타입으로 게시판 리스트 받아오기 */
	@RequestMapping(value = "getBoardList")
	public @ResponseBody ReturnData getBoardList(@RequestParam Map<String, Object> reqMap) {
			return service.getBoardList(new Criterion(reqMap));
	}

	/** 게시판 번호로 컨텐츠 보기 */
	@RequestMapping(value = "getBoardContents")
	public @ResponseBody ReturnData getBoardContentsByNo(@RequestParam Map<String, Object> reqMap) {
			return service.getBoardContents(new Criterion(reqMap));
	}

	/** 게시판 글쓰고 작성한 글 번호 받아오기 */
	@RequestMapping(value = "addBoard", method = RequestMethod.POST)
	public @ResponseBody ReturnData addBoard(@RequestBody Map<String, Object> reqMap) {
			return service.addBoard(new Criterion(reqMap, false));
	}
	
	/** 코멘트 쓰고 번호 받아오기 */
	@RequestMapping(value = "addComment", method = RequestMethod.POST)
	public @ResponseBody ReturnData addComment(@RequestBody Map<String, Object> reqMap) {
		return service.addComment(new Criterion(reqMap, false));
	}
	/** 게시판 번호로 게시판 글 수정하기 */
	@RequestMapping(value = "editBoard", method = RequestMethod.POST)
	public @ResponseBody ReturnData editBoard(@RequestBody Map<String, Object> reqMap) {
		return service.editBoard(new Criterion(reqMap, false));
	}

	/** 게시판 번호로 게시판 글 삭제하기 */
	@RequestMapping(value = "delBoard")
	public @ResponseBody ReturnData delBoard(@RequestParam Map<String, Object> reqMap) {
			return service.delBoard(new Criterion(reqMap));
	}

	/** 메인 문의/의견 리스트 조회 */
	@PostMapping(value = "getMainQnaList")
	public @ResponseBody ReturnData getMainQnaList(@RequestParam Map<String, Object> reqMap) {
			return service.getMainQnaList(new Criterion(reqMap, false));
	}

	@RequestMapping(value = "checkAuth")
	public@ResponseBody ReturnData checkId(@RequestParam Map<String, Object> reqMap) {
		return service.checkAuth(new Criterion(reqMap));
	}
}

