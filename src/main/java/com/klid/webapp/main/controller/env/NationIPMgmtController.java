/**
 * Program Name : NationIPMgmtController.java
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
import jakarta.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.main.env.nationIPMgmt.service.NationIPMgmtService;

/**
 * @author kdj
 *
 */
@RequestMapping("/api/main/env/nationIPMgmt")
@Controller
public class NationIPMgmtController {

	@Resource(name = "nationIPMgmtService")
	private NationIPMgmtService service;

	/** 국가 리스트 조회 */
	@RequestMapping(value = "getNationMgmtList")
	public @ResponseBody ReturnData getNationMgmtList(@RequestParam Map<String, Object> reqMap) {
		return service.getNationMgmtList(new Criterion(reqMap));
	}

	/** 국가정보 조회 */
	@RequestMapping(value = "getNationMgmtInfo")
	public @ResponseBody ReturnData getNationMgmtInfo(@RequestBody Map<String, Object> reqMap) {
			return service.getNationMgmtInfo(new Criterion(reqMap));
	}
	
	/** 국가 도메인 리스트 조회  */
	@RequestMapping(value = "getNationList_domain")
	public @ResponseBody ReturnData getNationList_domain(@RequestBody Map<String, Object> reqMap) {
		return service.getNationList_domain(new Criterion(reqMap));
	}

	/** IP대역에 해당하는 국가코드 조회  */
	@RequestMapping(value = "getNationIP_nationCd")
	public @ResponseBody ReturnData getNationIP_nationCd(@RequestBody Map<String, Object> reqMap) {
		return service.getNationIP_nationCd(new Criterion(reqMap));
	}

	/** 국가별 IP대역 리스트 조회  */
	@RequestMapping(value = "getNationIPList")
	public @ResponseBody ReturnData getNationIPList(@RequestParam Map<String, Object> reqMap) {
			return service.getNationIPList(new Criterion(reqMap));
	}

	/** 국가IP 추가 */
	@RequestMapping(value = "addNationIPMgmt", method = RequestMethod.POST)
	public @ResponseBody ReturnData addNationIPMgmt(@RequestParam("uploadFile") MultipartFile uploadedFile, @RequestParam Map<String, Object> reqMap, HttpServletRequest request) {

			reqMap.put("file", uploadedFile);

			//사용자 ID 정보
			String usrId = SessionManager.getUser().getUserId();
			reqMap.put("usrId", usrId);
			
			// 사용자 IP 정보
			String usrIp = request.getRemoteAddr();
			reqMap.put("usrIp", usrIp);
			
			return service.addNationIPMgmt(new Criterion(reqMap, false));

	}

	/** 국가IP 삭제 */
	@RequestMapping(value = "delNationIPMgmt")
	public @ResponseBody ReturnData delNationIPMgmt(@RequestBody Map<String, Object> reqMap) {
		return service.delNationIPMgmt(new Criterion(reqMap));
	}
	
	/** 엑셀 출력 */
	@RequestMapping(value="export")
	public @ResponseBody ReturnData export(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
		return service.export(response, new Criterion(reqMap));
	}
	

	/** 엑셀 출력 */
	@RequestMapping(value="export_ip")
	public @ResponseBody ReturnData export_ip(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
		return service.export_ip(response, new Criterion(reqMap));
	}

	/** 국가정보조회 */
	@PostMapping(value = "getNationDetail")
	public @ResponseBody ReturnData getNationDetail(@RequestParam Map<String, Object> reqMap) {
		return service.getNationDetail(new Criterion(reqMap, false));
	}

	/** 국가정보수정 */
	@PostMapping(value = "editNation")
	public @ResponseBody ReturnData editNation(@RequestParam Map<String, Object> reqMap) {
		return service.editNation(new Criterion(reqMap, false));
	}

}
