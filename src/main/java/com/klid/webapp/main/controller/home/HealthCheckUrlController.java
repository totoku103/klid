/**
 * Program Name : InstIPMgmtController.java
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

package com.klid.webapp.main.controller.home;

import java.util.Map;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.home.healthCheck.service.HealthCheckUrlService;

/**
 * @author kdj
 *
 */
@RequestMapping("/api/main/home/healthCheckUrl")
@Controller
public class HealthCheckUrlController {

	@Resource(name = "healthCheckUrlService")
	private HealthCheckUrlService service;

	/** 헬스체크 URL 목록 */
	@RequestMapping(value = "getHealthCheckUrl")
	public @ResponseBody ReturnData getHealthCheckUrl(@RequestParam Map<String, Object> reqMap) {
			return service.getHealthCheckUrl(new Criterion(reqMap));
	}

	/** 헬스체크 URL 등록 */
	@RequestMapping(value="addHealthCheckUrl" , method = RequestMethod.POST)
	public @ResponseBody ReturnData HealthCheckUrl(@RequestBody Map<String, Object> reqMap) {
		try {
			return service.addHealthCheckUrl(new Criterion(reqMap, false));
		} catch (Exception e) {
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}
	}

	/** 헬스체크 URL 수정 */
	@RequestMapping(value = "editHealthCheckUrl", method = RequestMethod.POST)
	public@ResponseBody  ReturnData editHealthCheckUrl(@RequestBody Map<String, Object> reqMap) {
		return service.editHealthCheckUrl(new Criterion(reqMap));
	}

	/** 헬스체크 URL 집중관리등록 */
	@RequestMapping(value = "editWatchOn", method = RequestMethod.POST)
	public@ResponseBody  ReturnData editWatchOn(@RequestBody Map<String, Object> reqMap) {
		return service.editWatchOn(new Criterion(reqMap));
	}

	/** 헬스체크 URL 집중관리해제 */
	@RequestMapping(value = "editWatchOff", method = RequestMethod.POST)
	public@ResponseBody  ReturnData editWatchOff(@RequestBody Map<String, Object> reqMap) {
		return service.editWatchOff(new Criterion(reqMap));
	}

	/** 헬스체크 URL 상세 */
	@RequestMapping(value = "getDetailHealthCheckUrl")
	public @ResponseBody ReturnData getDetailHealthCheckUrl(@RequestParam Map<String, Object> reqMap) {
		return service.getDetailHealthCheckUrl(new Criterion(reqMap));
	}

	/** 헬스체크 URL 삭제 */
	@RequestMapping(value = "delHealthCheckUrl", method = RequestMethod.POST)
	public @ResponseBody ReturnData delHealthCheckUrl(@RequestBody Map<String, Object> reqMap) {
			return service.delHealthCheckUrl(new Criterion(reqMap, false));
	}

	/** 헬스체크 장애이력 목록 */
	@RequestMapping(value = "getHealthCheckHist")
	public @ResponseBody ReturnData getHealthCheckHist(@RequestParam Map<String, Object> reqMap) {
		return service.getHealthCheckHist(new Criterion(reqMap));
	}

	/** 헬스체크 상태 조회 */
	@RequestMapping(value = "getHealthCheckStat")
	public @ResponseBody ReturnData getHealthCheckStat(@RequestParam Map<String, Object> reqMap) {
		return service.getHealthCheckStat(new Criterion(reqMap));
	}

	/** 엑셀 출력 */
	@RequestMapping(value="export")
	public @ResponseBody ReturnData export(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
		return service.export(new Criterion(reqMap));
	}

	/** 엑셀 Import */
	@RequestMapping(value="importXls")
	public @ResponseBody ReturnData importXls(@RequestParam Map<String, Object> reqMap, HttpServletResponse response) {
		return service.importXls(new Criterion(reqMap));
	}
}
