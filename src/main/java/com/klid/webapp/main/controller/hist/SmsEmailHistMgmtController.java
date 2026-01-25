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
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.hist.smsEmailHist.service.SmsEmailHistMgmtService;

@RequestMapping("/api/main/hist/smsEmailHist")
@Controller
public class SmsEmailHistMgmtController {

	@Resource(name = "smsEmailHistMgmtService")
	private SmsEmailHistMgmtService service;


	@RequestMapping(value = "getSmsHist")
	public @ResponseBody
	ReturnData getSmsHist(@RequestParam Map<String, Object> reqMap) {
		return service.getSmsHist(new Criterion(reqMap));
	}

	@RequestMapping(value = "getEmailHist")
	public @ResponseBody
	ReturnData getEmailHist(@RequestParam Map<String, Object> reqMap) {
		return service.getEmailHist(new Criterion(reqMap));
	}
	
	/** 엑셀 출력 (SMS) */
	@RequestMapping(value="export_sms")
	public @ResponseBody ReturnData export_sms(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
		return service.export_sms(response, new Criterion(reqMap));
	}
	
	/** 엑셀 출력 (E-MAIL) */
	@RequestMapping(value="export_email")
	public @ResponseBody ReturnData export_email(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
		return service.export_email(response, new Criterion(reqMap));
	}
}
