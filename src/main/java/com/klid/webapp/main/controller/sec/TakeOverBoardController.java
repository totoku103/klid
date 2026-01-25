/**
 * Program Name : TakeOverBoardController.java
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.sec.takeOverBoard.service.TakeOverBoardService;

/**
 * @author kdj
 *
 */
@RequestMapping("/api/main/sec/takeOverBoard")
@Controller
public class TakeOverBoardController {

	@Resource(name = "takeOverBoardService")
	private TakeOverBoardService service;

	/** 게시판 리스트 받아오기 */
	@RequestMapping(value = "getBoardList")
	public @ResponseBody ReturnData getBoardList(@RequestParam Map<String, Object> reqMap) {
		return service.getBoardList(new Criterion(reqMap));
	}

	/** 게시판 번호로 컨텐츠 보기 */
	@RequestMapping(value = "getBoardInfo")
	public @ResponseBody ReturnData getBoardInfo(@RequestParam Map<String, Object> reqMap) {
		return service.getBoardInfo(new Criterion(reqMap));
	}

	/** 게시판 글 추가 */
	@RequestMapping(value = "addBoard", method = RequestMethod.POST)
	public @ResponseBody ReturnData addBoard(@RequestBody Map<String, Object> reqMap) {
		return service.addBoard(new Criterion(reqMap, false));
	}

	/** 인수인계 수정 */
	@RequestMapping(value = "editBoard", method = RequestMethod.POST)
	public @ResponseBody ReturnData editBoard(@RequestBody Map<String, Object> reqMap) {
		return service.editBoard(new Criterion(reqMap, false));
	}

	/** 인수인계 수정  - 확인상태로 변경 */
	@RequestMapping(value = "addBoardConfirm", method = RequestMethod.POST)
	public @ResponseBody ReturnData addBoardConfirm(@RequestBody Map<String, Object> reqMap) {
		return service.addBoardConfirm(new Criterion(reqMap, false));
	}

	/** 인수인계 수정 - 종결상태로 변경 */
	@RequestMapping(value = "editBoard_finish", method = RequestMethod.POST)
	public @ResponseBody ReturnData editBoard_finish(@RequestBody Map<String, Object> reqMap) {
			return service.editBoard_finish(new Criterion(reqMap, false));
	}
	
	/** 답글 리스트 조회 */
	@RequestMapping(value = "getAnsBoardList")
	public @ResponseBody ReturnData getAnsBoardList(@RequestParam Map<String, Object> reqMap) {
		return service.getAnsBoardList(new Criterion(reqMap));
	}

	/** 답글 추가 */
	@RequestMapping(value = "addAnsBoard", method = RequestMethod.POST)
	public @ResponseBody ReturnData addAnsBoard(@RequestBody Map<String, Object> reqMap) {
		return service.addAnsBoard(new Criterion(reqMap, false));
	}

}
