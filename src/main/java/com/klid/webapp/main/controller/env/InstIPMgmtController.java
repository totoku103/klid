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

package com.klid.webapp.main.controller.env;

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
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.main.env.instIPMgmt.service.InstIPMgmtService;

/**
 * @author kdj
 *
 */
@RequestMapping("/api/main/env/instIPMgmt")
@Controller
public class InstIPMgmtController {

	@Resource(name = "instIPMgmtService")
	private InstIPMgmtService service;

	/** 기관IP대역 리스트 조회 */
	@RequestMapping(value = "getInstIPMgmtList")
	public @ResponseBody ReturnData getInstIPMgmtList(@RequestParam Map<String, Object> reqMap) {
		return service.getInstIPMgmtList(new Criterion(reqMap));
	}

	/** 기관별 IP정보 리스트 조회  */
	@RequestMapping(value = "getInstIPMgmtList_instCd")
	public @ResponseBody ReturnData getInstIPMgmtList_instCd(@RequestBody Map<String, Object> reqMap) {
			return service.getInstIPMgmtList_instCd(new Criterion(reqMap));
	}
	
	/** 기관IP 추가 */
	@RequestMapping(value = "addInstIPMgmt", method = RequestMethod.POST)
	public @ResponseBody ReturnData addInstIPMgmt(@RequestBody Map<String, Object> reqMap, HttpServletRequest request) {
		//사용자 ID 정보
		String usrId = SessionManager.getUser().getUserId();
		reqMap.put("usrId", usrId);

		// 사용자 IP 정보
		String usrIp = request.getRemoteAddr();
		reqMap.put("usrIp", usrIp);

		return service.addInstIPMgmt(new Criterion(reqMap, false));
	}

	/** 기관IP 수정 */
	@RequestMapping(value = "saveInstIPMgmt", method = RequestMethod.POST)
	public @ResponseBody ReturnData saveInstIPMgmt(@RequestBody Map<String, Object> reqMap, HttpServletRequest request) {
		//사용자 ID 정보
		String usrId = SessionManager.getUser().getUserId();
		reqMap.put("usrId", usrId);

		// 사용자 IP 정보
		String usrIp = request.getRemoteAddr();
		reqMap.put("usrIp", usrIp);

		return service.saveInstIPMgmt(new Criterion(reqMap, false));
	}

	/** 기관IP 삭제 */
	@RequestMapping(value = "delInstIPMgmt")
	public @ResponseBody ReturnData delInstIPMgmt(@RequestBody Map<String, Object> reqMap) {
			return service.delInstIPMgmt(new Criterion(reqMap));
	}
	
	/** 엑셀 출력 */
	@RequestMapping(value="export")
	public @ResponseBody ReturnData export(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
		return service.export(response, new Criterion(reqMap));
	}

}
