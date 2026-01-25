/**
 * Program Name	: LoginController.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 1. 5.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.controller;

import java.util.Map;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.code.service.CodeService;

@RequestMapping("/api/common/code")
@Controller
public class CodeController {

	@Resource(name="codeService")
	private CodeService service;
	
	//
	@RequestMapping(value="getCommonCode")
	public @ResponseBody ReturnData getCommonCode(@RequestParam Map<String, Object> reqMap) {
			return service.getCommonCode(new Criterion(reqMap));
	}

	// 지역코드 조회
	@RequestMapping(value="getLocalCode")
	public @ResponseBody ReturnData getLocalCode(@RequestParam Map<String, Object> reqMap) {
		return service.getLocalCode(new Criterion(reqMap));
	}

	// 공통코드 - 설문타입 목록
	@RequestMapping(value="getSurveyType")
	public @ResponseBody ReturnData getSurveyType(@RequestParam Map<String, Object> reqMap) {
		return service.getSurveyType(new Criterion(reqMap));
	}
	@RequestMapping(value="getCodeFilePath")
	public @ResponseBody ReturnData getCodeFilePath(@RequestParam Map<String, Object> reqMap) {
		return service.getCodeFilePath(new Criterion(reqMap));
	}

    //대시보드 상단 메시지
	@RequestMapping(value="getDashTextCode")
	public @ResponseBody ReturnData getDashTextCode(@RequestParam Map<String, Object> reqMap) {
		return service.getDashTextCode(new Criterion(reqMap));
	}

	@RequestMapping(value="getNoticeSrcType")
	public @ResponseBody ReturnData getNoticeSrcType(@RequestParam Map<String, Object> reqMap) {
		return service.getNoticeSrcType(new Criterion(reqMap));
	}
}
