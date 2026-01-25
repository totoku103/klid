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

package com.klid.webapp.main.controller.rpt;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.rpt.reportCollection.service.ReportCollectionService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;

@RequestMapping("/api/main/rpt/reportCollection")
@Controller
public class ReportCollectionController {

	@Resource(name = "reportCollectionService")
	private ReportCollectionService service;

	@RequestMapping(value = "getRetrieveSecurityHackingDetail")
	public @ResponseBody ReturnData getRetrieveSecurityHackingDetail(@RequestParam Map<String, Object> reqMap) {
			return service.getRetrieveSecurityHackingDetail(new Criterion(reqMap));
	}

	@RequestMapping(value = "getSecuListDetail")
	public @ResponseBody ReturnData getSecuListDetail(@RequestParam Map<String, Object> reqMap) {
			return service.getSecuListDetail(new Criterion(reqMap));
	}

	@RequestMapping(value = "getNoticeListDetail")
	public @ResponseBody ReturnData getNoticeListDetail(@RequestParam Map<String, Object> reqMap) {
		return service.getNoticeListDetail(new Criterion(reqMap));
	}

	@RequestMapping(value = "getRetrieveSecurityVulnerabilityDetail")
	public @ResponseBody ReturnData getRetrieveSecurityVulnerabilityDetail(@RequestParam Map<String, Object> reqMap) {
		return service.getRetrieveSecurityVulnerabilityDetail(new Criterion(reqMap));
	}

	/** 공지사항현황 엑셀 출력 */
	@RequestMapping(value="exportNoticeList")
	public @ResponseBody ReturnData exportNoticeList(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
		return service.exportNoticeList(response, new Criterion(reqMap));
	}

	@RequestMapping(value = "getRetrieveIncidentDetail")
	public @ResponseBody ReturnData getRetrieveIncidentDetail(@RequestParam Map<String, Object> reqMap) {
			return service.getRetrieveIncidentDetail(new Criterion(reqMap));
	}

	/** 보안자료실현황 엑셀 출력 */
	@RequestMapping(value="exportSecuList")
	public @ResponseBody ReturnData exportSecuList(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
			return service.exportSecuList(response, new Criterion(reqMap));
	}

	/** 해킹관리대장 엑셀 출력 */
	@RequestMapping(value="exportRetrieveSecurityHacking")
	public @ResponseBody ReturnData exportRetrieveSecurityHacking(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
			return service.exportRetrieveSecurityHacking(response, new Criterion(reqMap));
	}

	/** 취약점관리대장 엑셀 출력 */
	@RequestMapping(value="exportRetrieveSecurityVulnerability")
	public @ResponseBody ReturnData exportRetrieveSecurityVulnerability(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
			return service.exportRetrieveSecurityVulnerability(response, new Criterion(reqMap));
	}

	/** 처리중현황 엑셀 출력 */
	@RequestMapping(value="exportRetrieveIncidentDetail")
	public @ResponseBody ReturnData exportRetrieveIncidentDetail(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
			return service.exportRetrieveIncidentDetail(response, new Criterion(reqMap));
	}

	/** 일일운영현황 엑셀 출력 */
	@RequestMapping(value="exportReportCtrsDaily")
	public @ResponseBody ReturnData exportReportCtrsDaily(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
			return service.exportReportCtrsDaily(response, new Criterion(reqMap));
	}
}
