/**
 * Program Name	: NmsViewController.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 1. 27.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.main.controller;

import com.klid.common.CommonController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author jung
 *
 */
@RequestMapping("/main/rpt")
@Controller
public class RptViewController extends CommonController {

	/**
	 *  유형별보고서
	 *  */

	@RequestMapping("reportInciType.do") public void reportInciType(Model model) { setBaseInfo(model); }

	@RequestMapping("reportInciAttNatn.do") public void reportInciAttNatn(Model model) { setBaseInfo(model); }

	@RequestMapping("reportInciPrty.do") public void reportInciPrty(Model model) { setBaseInfo(model); }

	@RequestMapping("reportInciPrcsStat.do") public void reportInciPrcsStat(Model model) { setBaseInfo(model); }

	@RequestMapping("reportInciLocal.do") public void reportInciLocal(Model model) { setBaseInfo(model); }

	@RequestMapping("reportInciSido") public void reportInciSido(Model model) { setBaseInfo(model); }


	/**
	 *  일일보고서
	 *  */

	@RequestMapping("reportDailyInciState.do") public void reportDailyInciState(Model model) { setBaseInfo(model); }

	@RequestMapping("reportDailyState.do") public void reportDailyState(Model model) { setBaseInfo(model); }

	@RequestMapping("reportWeeklyState.do") public void reportWeeklyState(Model model) { setBaseInfo(model); }

	@RequestMapping("reportSecurityResult.do") public void reportSecurityResult(Model model) { setBaseInfo(model); }


	/**
	 *  상세보고서
	 *  */

	@RequestMapping("reportInciDetail.do") public void reportInciDetail(Model model) { setBaseInfo(model); }


	/**
	 *  운영보고서
	 *  */

	@RequestMapping("reportCtrsDailyState.do") public void reportCtrsDailyState(Model model) { setBaseInfo(model); }

	@RequestMapping("reportCtrsDailyDetail.do") public void reportCtrsDailyDetail(Model model) { setBaseInfo(model); }

	@RequestMapping("reportSecurityHacking.do") public void reportSecurityHacking(Model model) { setBaseInfo(model); }

	@RequestMapping("reportSecurityData.do") public void reportSecurityData(Model model) { setBaseInfo(model); }

	@RequestMapping("reportNotice.do") public void reportNotice(Model model) { setBaseInfo(model); }

	@RequestMapping("reportSecurityVulnerability.do") public void reportSecurityVulnerability(Model model) { setBaseInfo(model); }

}
