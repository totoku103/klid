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

package com.klid.webapp.main.controller.hist;


import java.util.Map;

import jakarta.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.hist.userInoutHist.service.UserInoutHistMgmtService;

@RequestMapping("/api/main/hist/userInoutHist")
@Controller
public class UserInoutHistMgmtController {

	@Resource(name = "userInoutHistMgmtService")
	private UserInoutHistMgmtService service;


	/** 접근이력 테이블의 유저 리스트 조회*/
	@RequestMapping(value = "getLogUserList")
	public @ResponseBody ReturnData getLogUserList(@RequestParam Map<String, Object> reqMap) {
		return service.getLogUserList(new Criterion(reqMap));
	}
	
	/** 접근이력 리스트 조회 */
	@RequestMapping(value = "getUserInoutHist")
	public @ResponseBody ReturnData getUserInoutHist(@RequestParam Map<String, Object> reqMap) {
		return service.getUserInoutHist(new Criterion(reqMap));
	}
}
