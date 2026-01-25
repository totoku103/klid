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

package com.klid.webapp.main.controller.ctrs;

import com.klid.common.HwpmlMaker;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.rpt.reportDaily.service.ReportDailyService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.net.URLEncoder;
import java.util.Map;

@RequestMapping("/api/main/ctrs/accidentProc")
@Controller
public class AccidentProcController {

	@Resource(name = "reportDailyService")
	private ReportDailyService service;


	@RequestMapping(value = "getReportDayStat")
	public @ResponseBody ReturnData getReportDayStat(@RequestParam Map<String, Object> reqMap) {
		return service.getReportDayStat(new Criterion(reqMap));
	}
}
