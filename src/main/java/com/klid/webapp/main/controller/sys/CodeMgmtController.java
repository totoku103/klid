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

package com.klid.webapp.main.controller.sys;

import java.util.Map;

import jakarta.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.code.service.CodeService;

/**
 * @author imhojong
 *
 */
@RequestMapping("/api/main/sys")
@Controller
public class CodeMgmtController {
	
	@Resource(name = "codeService")
	private CodeService service;

	//코드관리 목록
    @RequestMapping(value="getCodeList")
    public @ResponseBody ReturnData getCodeList(@RequestParam Map<String, Object> reqMap) {
        return service.getCodeList(new Criterion(reqMap));
    }

	//코드 등록
	@RequestMapping(value = "addCode", method = RequestMethod.POST)
	public @ResponseBody ReturnData addCode(@RequestBody Map<String, Object> reqMap) {
            return service.addCode(new Criterion(reqMap, false));
	}

    @RequestMapping(value = "editCode", method = RequestMethod.POST)
    public @ResponseBody ReturnData editCode(@RequestBody Map<String, Object> reqMap) {
        return service.editCode(new Criterion(reqMap, false));
    }

    @RequestMapping(value="getCodeDuplCnt")
    public @ResponseBody ReturnData getCodeDuplCnt(@RequestParam Map<String, Object> reqMap) {
            return service.getCodeDuplCnt(new Criterion(reqMap));
    }

    //공휴일 등록
    @RequestMapping(value = "addWeekDay", method = RequestMethod.POST)
    public @ResponseBody ReturnData addWeekDay(@RequestBody Map<String, Object> reqMap) {
            return service.addWeekDay(new Criterion(reqMap, false));
    }

    //공휴일 삭제
    @RequestMapping(value = "delWeekDay", method = RequestMethod.POST)
    public @ResponseBody ReturnData delWeekDay(@RequestBody Map<String, Object> reqMap) {
        return service.delWeekDay(new Criterion(reqMap, false));
    }


    // 외부사용자 조회
    @RequestMapping(value="getCustUserList")
    public @ResponseBody ReturnData getCustUserList(@RequestParam Map<String, Object> reqMap) {
            return service.getCustUserList(new Criterion(reqMap));
    }
    // 외부사용자 등록
    @RequestMapping(value="addCustUser", method = RequestMethod.POST)
    public @ResponseBody ReturnData addCustUser(@RequestBody Map<String, Object> reqMap) {
        return service.addCustUser(new Criterion(reqMap));
    }
    // 외부사용자 수정
    @RequestMapping(value="editCustUser", method = RequestMethod.POST)
    public @ResponseBody ReturnData editCustUser(@RequestBody Map<String, Object> reqMap) {
        return service.editCustUser(new Criterion(reqMap));
    }
    // 외부사용자 삭제
    @RequestMapping(value="delCustUser", method = RequestMethod.POST)
    public @ResponseBody ReturnData delCustUser(@RequestBody Map<String, Object> reqMap) {
        return service.delCustUser(new Criterion(reqMap));
    }

    // 게시판 관리 조회
    @RequestMapping(value="getBoardMgmtList")
    public @ResponseBody ReturnData getBoardMgmtList(@RequestParam Map<String, Object> reqMap) {
        return service.getBoardMgmtList(new Criterion(reqMap));
    }

    // 게시판 관리 조회
    @RequestMapping(value="getBoardMgmt")
    public @ResponseBody ReturnData getBoardMgmt(@RequestParam Map<String, Object> reqMap) {
        return service.getBoardMgmt(new Criterion(reqMap));
    }

    // 게시판관리 수정
    @RequestMapping(value="editBoardMgmt", method = RequestMethod.POST)
    public @ResponseBody ReturnData editBoardMgmt(@RequestBody Map<String, Object> reqMap) {
        return service.editBoardMgmt(new Criterion(reqMap, false));
    }

    //게시판관리 상세설정
    @RequestMapping(value="getDetailBoardMgmtList")
    public @ResponseBody ReturnData getDetailBoardMgmtList(@RequestParam Map<String, Object> reqMap) {
        return service.getDetailBoardMgmtList(new Criterion(reqMap));
    }

}
