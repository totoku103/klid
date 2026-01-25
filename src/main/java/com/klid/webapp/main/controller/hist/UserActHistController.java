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
import com.klid.webapp.main.hist.userActHist.service.UserActHistService;

@RequestMapping("/api/main/hist/userActHist")
@Controller
public class UserActHistController {

	@Resource(name = "userActHistService")
	private UserActHistService service;


	@RequestMapping(value = "getUserActHistList")
	public @ResponseBody ReturnData getUserActHistList(@RequestParam Map<String, Object> reqMap) {
		return service.getUserActHist(new Criterion(reqMap));
	}
}
